const $ = (id) => document.getElementById(id);

const LANGUAGES = [
  ["auto", "Detect language"], ["en", "English"], ["es", "Spanish"],
  ["fr", "French"], ["de", "German"], ["it", "Italian"], ["pt", "Portuguese"]
];

const OCR_LANGUAGE_MAP = { en: "eng", es: "spa", fr: "fra", de: "deu", it: "ita", pt: "por", auto: "eng" };
const MODEL_MAP = {
  "en-es":"Xenova/opus-mt-en-es", "es-en":"Xenova/opus-mt-es-en",
  "en-fr":"Xenova/opus-mt-en-fr", "fr-en":"Xenova/opus-mt-fr-en",
  "en-de":"Xenova/opus-mt-en-de", "de-en":"Xenova/opus-mt-de-en",
  "en-it":"Xenova/opus-mt-en-it", "it-en":"Xenova/opus-mt-it-en",
  "en-pt":"Xenova/opus-mt-en-pt", "pt-en":"Xenova/opus-mt-pt-en"
};

const state = {
  regions: [],
  selected: new Set(),
  naturalWidth: 0,
  naturalHeight: 0,
  boxesVisible: true,
  translatorCache: new Map(),
  transformers: null
};

function populateLanguages() {
  for (const [code, label] of LANGUAGES) {
    const sourceOption = new Option(label, code);
    $("sourceLang").add(sourceOption);
    if (code !== "auto") $("targetLang").add(new Option(label, code));
  }
  $("sourceLang").value = "auto";
  $("targetLang").value = "en";
}

function setStatus(message) {
  $("status").textContent = message || "";
}

function chooseImage() {
  $("fileInput").click();
}

$("chooseImageBtn").addEventListener("click", chooseImage);
$("newImageBtn").addEventListener("click", chooseImage);
$("emptyState").addEventListener("click", chooseImage);
$("emptyState").addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") chooseImage();
});

$("fileInput").addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  $("mainImage").src = url;
  $("emptyState").hidden = true;
  $("workspace").hidden = false;
  clearSelection();
  state.regions = [];
  renderBoxes();
  setStatus("Image loaded. Tap Scan text.");
});

$("mainImage").addEventListener("load", () => {
  state.naturalWidth = $("mainImage").naturalWidth;
  state.naturalHeight = $("mainImage").naturalHeight;
  renderBoxes();
});
window.addEventListener("resize", renderBoxes);

function getScale() {
  const img = $("mainImage");
  return {
    x: state.naturalWidth ? img.clientWidth / state.naturalWidth : 1,
    y: state.naturalHeight ? img.clientHeight / state.naturalHeight : 1
  };
}

function renderBoxes() {
  const overlay = $("overlay");
  overlay.innerHTML = "";
  const scale = getScale();
  for (const region of state.regions) {
    const box = document.createElement("div");
    box.className = "ocr-box" + (state.selected.has(region.id) ? " selected" : "");
    box.dataset.id = region.id;
    box.style.left = `${region.bbox.x0 * scale.x}px`;
    box.style.top = `${region.bbox.y0 * scale.y}px`;
    box.style.width = `${Math.max(3, (region.bbox.x1 - region.bbox.x0) * scale.x)}px`;
    box.style.height = `${Math.max(3, (region.bbox.y1 - region.bbox.y0) * scale.y)}px`;
    box.title = region.text;
    overlay.appendChild(box);
  }
}

function orderedSelectedRegions() {
  return state.regions
    .filter((region) => state.selected.has(region.id))
    .sort((a, b) => {
      const lineGap = Math.abs(a.bbox.y0 - b.bbox.y0);
      if (lineGap > Math.max(10, (a.bbox.y1 - a.bbox.y0) * 0.55)) return a.bbox.y0 - b.bbox.y0;
      return a.bbox.x0 - b.bbox.x0;
    });
}

function selectedText() {
  return orderedSelectedRegions().map((region) => region.text).join(" ").replace(/\s+/g, " ").trim();
}

function updateSelectionUI() {
  const text = selectedText();
  $("resultBar").hidden = !text;
  $("sourcePreview").textContent = text;
  $("selectedText").textContent = text || "Nothing selected.";
  $("selectedText").classList.toggle("muted", !text);
  if (!text) {
    $("translationPreview").textContent = "Select words to translate";
    $("translationText").textContent = "Nothing translated yet.";
    $("translationText").classList.add("muted");
  }
}

function clearSelection() {
  state.selected.clear();
  renderBoxes();
  updateSelectionUI();
  setStatus(state.regions.length ? "Selection cleared." : "");
}

$("clearBtn").addEventListener("click", clearSelection);
$("clearTopBtn").addEventListener("click", clearSelection);

$("selectAllBtn").addEventListener("click", () => {
  state.selected = new Set(state.regions.map((region) => region.id));
  renderBoxes();
  updateSelectionUI();
  setStatus(`${state.selected.size} words selected.`);
});

$("boxesBtn").addEventListener("click", () => {
  state.boxesVisible = !state.boxesVisible;
  $("overlay").classList.toggle("hidden-boxes", !state.boxesVisible);
  $("boxesBtn").textContent = state.boxesVisible ? "Hide boxes" : "Show boxes";
  $("boxesBtn").setAttribute("aria-pressed", String(state.boxesVisible));
});

$("expandBtn").addEventListener("click", () => {
  $("detailsPanel").scrollIntoView({ behavior: "smooth", block: "start" });
});

const glide = { active: false, pointerId: null, mode: "add", visited: new Set() };

function boxAt(clientX, clientY) {
  const element = document.elementFromPoint(clientX, clientY);
  return element?.closest?.(".ocr-box") || null;
}

function applyBox(box) {
  if (!box) return;
  const id = box.dataset.id;
  if (!id || glide.visited.has(id)) return;
  glide.visited.add(id);
  if (glide.mode === "add") state.selected.add(id);
  else state.selected.delete(id);
  box.classList.toggle("selected", state.selected.has(id));
  updateSelectionUI();
}

$("overlay").addEventListener("pointerdown", (event) => {
  const box = event.target.closest(".ocr-box");
  if (!box) return;
  event.preventDefault();
  glide.active = true;
  glide.pointerId = event.pointerId;
  glide.mode = state.selected.has(box.dataset.id) ? "remove" : "add";
  glide.visited.clear();
  $("overlay").setPointerCapture?.(event.pointerId);
  applyBox(box);
});

$("overlay").addEventListener("pointermove", (event) => {
  if (!glide.active || event.pointerId !== glide.pointerId) return;
  event.preventDefault();
  applyBox(boxAt(event.clientX, event.clientY));
});

function finishGlide(event) {
  if (!glide.active || event.pointerId !== glide.pointerId) return;
  glide.active = false;
  glide.pointerId = null;
  glide.visited.clear();
  updateSelectionUI();
  setStatus(state.selected.size ? `${state.selected.size} word${state.selected.size === 1 ? "" : "s"} selected.` : "Selection cleared.");
}
$("overlay").addEventListener("pointerup", finishGlide);
$("overlay").addEventListener("pointercancel", finishGlide);

async function scanImage() {
  if (!$("mainImage").src) return;
  if (!window.Tesseract) {
    setStatus("OCR library is still loading. Try again in a moment.");
    return;
  }
  const button = $("scanBtn");
  button.disabled = true;
  clearSelection();
  state.regions = [];
  renderBoxes();
  try {
    const source = $("sourceLang").value;
    const ocrLanguage = OCR_LANGUAGE_MAP[source] || "eng";
    const result = await Tesseract.recognize($("mainImage").src, ocrLanguage, {
      logger: (message) => {
        if (message.status && typeof message.progress === "number") {
          setStatus(`${message.status} · ${Math.round(message.progress * 100)}%`);
        }
      }
    });
    const words = result.data.words || [];
    state.regions = words
      .filter((word) => word.text?.trim() && Number(word.confidence) >= 35)
      .map((word, index) => ({ id: `word-${index}`, text: word.text.trim(), bbox: word.bbox, confidence: word.confidence }));
    renderBoxes();
    setStatus(`Found ${state.regions.length} text box${state.regions.length === 1 ? "" : "es"}. Glide over the words you want.`);
  } catch (error) {
    console.error(error);
    setStatus(error?.message || "OCR failed.");
  } finally {
    button.disabled = false;
  }
}
$("scanBtn").addEventListener("click", scanImage);

async function loadTransformers() {
  if (state.transformers) return state.transformers;
  state.transformers = await import("https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2");
  state.transformers.env.allowLocalModels = false;
  state.transformers.env.useBrowserCache = true;
  return state.transformers;
}

async function getTranslator(source, target) {
  const key = `${source}-${target}`;
  const model = MODEL_MAP[key];
  if (!model) throw new Error("This offline version currently supports English paired with Spanish, French, German, Italian, or Portuguese.");
  if (state.translatorCache.has(key)) return state.translatorCache.get(key);
  const { pipeline } = await loadTransformers();
  setStatus("Downloading the translation model. This only happens the first time for this language pair…");
  const translator = await pipeline("translation", model, { quantized: true });
  state.translatorCache.set(key, translator);
  return translator;
}

async function translateSelection() {
  const text = selectedText();
  if (!text) {
    setStatus("Select some blue boxes first.");
    return;
  }
  let source = $("sourceLang").value;
  const target = $("targetLang").value;
  if (source === "auto") {
    source = target === "en" ? "es" : "en";
    setStatus(`Automatic language detection is not available offline. Using ${source === "en" ? "English" : "Spanish"} as the source.`);
  }
  if (source === target) {
    $("translationPreview").textContent = text;
    $("translationText").textContent = text;
    $("translationText").classList.remove("muted");
    return;
  }
  const button = $("translateBtn");
  button.disabled = true;
  $("translationPreview").textContent = "Translating…";
  $("translationText").textContent = "Translating on this device…";
  $("translationText").classList.add("muted");
  try {
    const translator = await getTranslator(source, target);
    const output = await translator(text, { max_new_tokens: 256 });
    const translated = output?.[0]?.translation_text?.trim();
    if (!translated) throw new Error("The local model returned no translation.");
    $("translationPreview").textContent = translated;
    $("translationText").textContent = translated;
    $("translationText").classList.remove("muted");
    setStatus("Translation complete.");
  } catch (error) {
    console.error(error);
    const message = error?.message || "Translation failed.";
    $("translationPreview").textContent = "Translation unavailable";
    $("translationText").textContent = message;
    $("translationText").classList.remove("muted");
    setStatus(message);
  } finally {
    button.disabled = false;
  }
}
$("translateBtn").addEventListener("click", translateSelection);

populateLanguages();
