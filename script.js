const LANGS = [
  { code: "auto", label: "Detect language" },
  { code: "en", label: "English" }, { code: "es", label: "Spanish" },
  { code: "fr", label: "French" }, { code: "de", label: "German" },
  { code: "it", label: "Italian" }, { code: "pt", label: "Portuguese" },
  { code: "ru", label: "Russian" }, { code: "ar", label: "Arabic" },
  { code: "zh", label: "Chinese" }, { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" }, { code: "hi", label: "Hindi" },
  { code: "kn", label: "Kannada" }, { code: "ga", label: "Irish" },
  { code: "nl", label: "Dutch" }, { code: "sv", label: "Swedish" },
  { code: "pl", label: "Polish" }, { code: "tr", label: "Turkish" },
  { code: "vi", label: "Vietnamese" }, { code: "th", label: "Thai" },
  { code: "iw", label: "Hebrew" }, { code: "el", label: "Greek" },
  { code: "uk", label: "Ukrainian" }, { code: "ro", label: "Romanian" }
];

const $ = id => document.getElementById(id);
const state = {
  regions: [], selectedIds: new Set(), mode: "standard", heatmap: false,
  naturalW: 0, naturalH: 0, notes: []
};

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = String(value ?? "");
  return div.innerHTML;
}

function fillLangSelect(select, includeAuto) {
  select.innerHTML = "";
  LANGS.filter(l => includeAuto || l.code !== "auto").forEach(lang => {
    const option = document.createElement("option");
    option.value = lang.code;
    option.textContent = lang.label;
    select.appendChild(option);
  });
}

fillLangSelect($("sourceLang"), true);
fillLangSelect($("targetLang"), false);
fillLangSelect($("chainAddSelect"), false);
$("sourceLang").value = "auto";
$("targetLang").value = "en";
$("chainAddSelect").value = "fr";

function setStatus(message) { $("status").textContent = message || ""; }

$("dropzone").addEventListener("click", () => $("fileInput").click());
$("newImageBtn").addEventListener("click", () => $("fileInput").click());
$("fileInput").addEventListener("change", event => handleFile(event.target.files[0]));

function handleFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = event => {
    $("mainImage").src = event.target.result;
    $("dropzone").style.display = "none";
    $("app").style.display = "block";
    state.regions = [];
    state.selectedIds.clear();
    clearResults();
    renderBoxes();
    renderSelectionText();
    setStatus("Image loaded. Press Scan image.");
  };
  reader.readAsDataURL(file);
}

$("mainImage").addEventListener("load", () => {
  state.naturalW = $("mainImage").naturalWidth;
  state.naturalH = $("mainImage").naturalHeight;
  renderBoxes();
});

window.addEventListener("resize", renderBoxes);

function clearResults() {
  $("translationResult").innerHTML = "";
  $("explanationResult").innerHTML = "";
  $("reverseResult").innerHTML = "";
}

document.querySelectorAll("[data-mode]").forEach(button => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode;
    document.querySelectorAll("[data-mode]").forEach(b => b.classList.toggle("active", b === button));
    $("ancientNote").style.display = state.mode === "ancient" ? "block" : "none";
    $("stage").style.cursor = state.mode === "manual" ? "crosshair" : "default";
  });
});

document.querySelector('[data-mode="standard"]').classList.add("active");

$("heatmapBtn").addEventListener("click", () => {
  state.heatmap = !state.heatmap;
  $("heatmapBtn").textContent = state.heatmap ? "Heat map on" : "Heat map off";
  $("heatmapBtn").classList.toggle("active", state.heatmap);
  renderBoxes();
});

function imageScale() {
  const img = $("mainImage");
  return {
    x: state.naturalW ? img.clientWidth / state.naturalW : 1,
    y: state.naturalH ? img.clientHeight / state.naturalH : 1
  };
}

function confidenceClass(confidence) {
  if (!state.heatmap) return confidence < 50 ? " low" : "";
  if (confidence >= 80) return " high";
  if (confidence >= 50) return " mid";
  return " lowc";
}

function renderBoxes() {
  document.querySelectorAll(".box").forEach(box => box.remove());
  const scale = imageScale();
  state.regions.forEach(region => {
    const box = document.createElement("div");
    box.className = "box" + confidenceClass(region.confidence) + (state.selectedIds.has(region.id) ? " sel" : "");
    box.style.left = `${region.bbox.x0 * scale.x}px`;
    box.style.top = `${region.bbox.y0 * scale.y}px`;
    box.style.width = `${(region.bbox.x1 - region.bbox.x0) * scale.x}px`;
    box.style.height = `${(region.bbox.y1 - region.bbox.y0) * scale.y}px`;
    box.title = `${region.text} · ${Math.round(region.confidence)}% confidence`;
    box.dataset.regionId = region.id;
    box.setAttribute("role", "button");
    box.setAttribute("aria-label", `${region.text}, ${Math.round(region.confidence)} percent confidence`);
    $("stage").appendChild(box);
  });
}

// Google-Lens-style glide selection: touch a blue OCR box, then slide across
// other boxes to add or remove them from the current selection.
const glideSelection = {
  active: false,
  pointerId: null,
  action: "add",
  touched: new Set()
};

function regionBoxFromPoint(clientX, clientY) {
  const element = document.elementFromPoint(clientX, clientY);
  const box = element?.closest?.(".box");
  return box && $("stage").contains(box) ? box : null;
}

function applyGlideToBox(box) {
  if (!box) return;
  const id = box.dataset.regionId;
  if (!id || glideSelection.touched.has(id)) return;

  glideSelection.touched.add(id);
  if (glideSelection.action === "add") {
    state.selectedIds.add(id);
    box.classList.add("sel");
  } else {
    state.selectedIds.delete(id);
    box.classList.remove("sel");
  }
  renderSelectionText();
}

$("stage").addEventListener("pointerdown", event => {
  if (state.mode === "manual") return;
  const box = event.target.closest?.(".box");
  if (!box) return;

  event.preventDefault();
  glideSelection.active = true;
  glideSelection.pointerId = event.pointerId;
  glideSelection.action = state.selectedIds.has(box.dataset.regionId) ? "remove" : "add";
  glideSelection.touched.clear();
  $("stage").setPointerCapture(event.pointerId);
  applyGlideToBox(box);
  clearResults();
});

$("stage").addEventListener("pointermove", event => {
  if (!glideSelection.active || event.pointerId !== glideSelection.pointerId) return;
  event.preventDefault();
  applyGlideToBox(regionBoxFromPoint(event.clientX, event.clientY));
});

function finishGlideSelection(event) {
  if (!glideSelection.active || event.pointerId !== glideSelection.pointerId) return;
  glideSelection.active = false;
  glideSelection.pointerId = null;
  glideSelection.touched.clear();
  renderSelectionText();
  clearResults();
  setStatus(state.selectedIds.size
    ? `${state.selectedIds.size} word${state.selectedIds.size === 1 ? "" : "s"} selected. Glide again to add more, or start on a selected box to erase.`
    : "Selection cleared. Glide across the blue boxes to select words.");
}

$("stage").addEventListener("pointerup", finishGlideSelection);
$("stage").addEventListener("pointercancel", finishGlideSelection);

function selectedText() {
  return state.regions
    .filter(region => state.selectedIds.has(region.id))
    .sort((a, b) => a.bbox.y0 - b.bbox.y0 || a.bbox.x0 - b.bbox.x0)
    .map(region => region.text)
    .join(" ")
    .trim();
}

function renderSelectionText() {
  const text = selectedText();
  $("selectionText").innerHTML = text
    ? escapeHtml(text)
    : '<span class="empty">Glide your finger across the blue boxes to select words.</span>';
}

function ensureTesseract() {
  return new Promise((resolve, reject) => {
    if (window.Tesseract) return resolve();
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      if (window.Tesseract) {
        clearInterval(timer);
        resolve();
      } else if (tries > 100) {
        clearInterval(timer);
        reject(new Error("OCR engine did not load."));
      }
    }, 100);
  });
}

$("scanBtn").addEventListener("click", async () => {
  if (!$("mainImage").src) return;
  $("scanBtn").disabled = true;
  setStatus("Loading OCR engine…");
  try {
    await ensureTesseract();
    const result = await Tesseract.recognize($("mainImage").src, "eng", {
      logger: message => {
        if (message.status && message.progress != null) {
          setStatus(`${message.status} · ${Math.round(message.progress * 100)}%`);
        }
      }
    });
    const words = result.data.words || [];
    const threshold = state.mode === "standard" ? 55 : 0;
    state.regions = words
      .filter(word => word.text.trim() && word.confidence >= threshold)
      .map((word, index) => ({
        id: `w${index}`,
        text: word.text.trim(),
        confidence: word.confidence,
        bbox: word.bbox,
        symbols: word.symbols || []
      }));
    state.selectedIds.clear();
    renderBoxes();
    renderSelectionText();
    setStatus(`Found ${state.regions.length} text region${state.regions.length === 1 ? "" : "s"}. Glide across the blue boxes to select only the words you want.`);
  } catch (error) {
    console.error(error);
    setStatus(error.message || "OCR failed.");
  } finally {
    $("scanBtn").disabled = false;
  }
});

// Touch-friendly manual selection using Pointer Events.
let drawStart = null;
let drawDiv = null;

$("stage").addEventListener("pointerdown", event => {
  if (state.mode !== "manual") return;
  event.preventDefault();
  $("stage").setPointerCapture(event.pointerId);
  const rect = $("stage").getBoundingClientRect();
  drawStart = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  drawDiv = document.createElement("div");
  drawDiv.className = "drawrect";
  $("stage").appendChild(drawDiv);
});

$("stage").addEventListener("pointermove", event => {
  if (!drawStart || !drawDiv || state.mode !== "manual") return;
  const rect = $("stage").getBoundingClientRect();
  const currentX = event.clientX - rect.left;
  const currentY = event.clientY - rect.top;
  const x = Math.min(currentX, drawStart.x);
  const y = Math.min(currentY, drawStart.y);
  drawDiv.style.left = `${x}px`;
  drawDiv.style.top = `${y}px`;
  drawDiv.style.width = `${Math.abs(currentX - drawStart.x)}px`;
  drawDiv.style.height = `${Math.abs(currentY - drawStart.y)}px`;
});

$("stage").addEventListener("pointerup", async event => {
  if (!drawStart || !drawDiv || state.mode !== "manual") return;
  const width = parseFloat(drawDiv.style.width) || 0;
  const height = parseFloat(drawDiv.style.height) || 0;
  const left = parseFloat(drawDiv.style.left) || 0;
  const top = parseFloat(drawDiv.style.top) || 0;
  drawDiv.remove();
  drawDiv = null;
  drawStart = null;
  if (width < 8 || height < 8) return;

  const scale = imageScale();
  const x0 = Math.round(left / scale.x);
  const y0 = Math.round(top / scale.y);
  const x1 = Math.round((left + width) / scale.x);
  const y1 = Math.round((top + height) / scale.y);

  const canvas = document.createElement("canvas");
  canvas.width = x1 - x0;
  canvas.height = y1 - y0;
  canvas.getContext("2d").drawImage($("mainImage"), x0, y0, x1 - x0, y1 - y0, 0, 0, x1 - x0, y1 - y0);

  setStatus("Reading manual selection…");
  try {
    await ensureTesseract();
    const result = await Tesseract.recognize(canvas.toDataURL(), "eng");
    const id = `manual${Date.now()}`;
    state.regions.push({
      id,
      text: result.data.text.trim() || "(no text found)",
      confidence: result.data.confidence || 50,
      bbox: { x0, y0, x1, y1 },
      symbols: []
    });
    state.selectedIds.add(id);
    renderBoxes();
    renderSelectionText();
    setStatus("Manual region added.");
  } catch (error) {
    console.error(error);
    setStatus("Could not read that region.");
  }
});

const OFFLINE_MODELS = {
  "en-es": "Xenova/opus-mt-en-es", "es-en": "Xenova/opus-mt-es-en",
  "en-fr": "Xenova/opus-mt-en-fr", "fr-en": "Xenova/opus-mt-fr-en",
  "en-de": "Xenova/opus-mt-en-de", "de-en": "Xenova/opus-mt-de-en",
  "en-it": "Xenova/opus-mt-en-it", "it-en": "Xenova/opus-mt-it-en",
  "en-pt": "Xenova/opus-mt-en-ROMANCE", "pt-en": "Xenova/opus-mt-ROMANCE-en"
};

let transformersModulePromise = null;
const translatorCache = new Map();

async function loadTransformers() {
  if (!transformersModulePromise) {
    transformersModulePromise = import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1");
  }
  return transformersModulePromise;
}

function modelForPair(source, target) {
  return OFFLINE_MODELS[`${source}-${target}`] || null;
}

async function getLocalTranslator(source, target) {
  const key = `${source}-${target}`;
  if (translatorCache.has(key)) return translatorCache.get(key);

  const model = modelForPair(source, target);
  if (!model) {
    throw new Error("This offline build currently supports English paired with Spanish, French, German, Italian, or Portuguese.");
  }

  const { pipeline, env } = await loadTransformers();
  env.useBrowserCache = true;
  env.allowLocalModels = false;

  setStatus("Downloading the private translation model for first use…");
  const translator = await pipeline("translation", model, {
    dtype: "q4",
    progress_callback: progress => {
      if (progress?.status === "progress" && Number.isFinite(progress.progress)) {
        setStatus(`Downloading translation model · ${Math.round(progress.progress)}%`);
      } else if (progress?.status) {
        setStatus(`Translation model · ${progress.status}`);
      }
    }
  });

  translatorCache.set(key, translator);
  return translator;
}

$("translateBtn").addEventListener("click", async () => {
  const text = selectedText();
  if (!text) {
    $("translationResult").innerHTML = '<div class="result-box">Select one or more text boxes first.</div>';
    return;
  }

  const source = $("sourceLang").value;
  const target = $("targetLang").value;

  if (source === "auto") {
    $("translationResult").innerHTML = '<div class="result-box">Choose the source language. Offline translation cannot reliably auto-detect it yet.</div>';
    setStatus("Choose the language shown in the photo.");
    return;
  }
  if (source === target) {
    $("translationResult").innerHTML = `<div class="result-box">${escapeHtml(text)}</div>`;
    setStatus("Source and target languages are the same.");
    return;
  }

  $("translateBtn").disabled = true;
  $("translationResult").innerHTML = '<div class="result-box">Preparing local translation…</div>';
  try {
    const translator = await getLocalTranslator(source, target);
    setStatus("Translating on this device…");
    const output = await translator(text, { max_new_tokens: 256 });
    const translated = output?.[0]?.translation_text || output?.[0]?.generated_text;
    if (!translated) throw new Error("The local model returned no translation.");
    $("translationResult").innerHTML = `<div class="result-box"><strong>Translation</strong><br>${escapeHtml(translated)}</div>`;
    setStatus("Translated locally. The model is cached for later use.");
  } catch (error) {
    console.error(error);
    $("translationResult").innerHTML = `<div class="result-box">${escapeHtml(error.message || "Local translation failed.")}</div>`;
    setStatus("Could not run the local translation model on this device.");
  } finally {
    $("translateBtn").disabled = false;
  }
});

$("explainBtn").addEventListener("click", () => {
  const text = selectedText();
  $("explanationResult").innerHTML = text
    ? '<div class="explain-box">Translation runs in your browser with a downloaded open-source model. After the first download, the model is cached on this device. No API key is used and no Google translation service is opened.</div>'
    : '<div class="explain-box">Select text first.</div>';
});

$("reverseBtn").addEventListener("click", async () => {
  const text = selectedText();
  if (!text) return;
  const source = $("sourceLang").value;
  const target = $("targetLang").value;
  if (source === "auto") {
    $("reverseResult").innerHTML = '<div class="explain-box">Choose a source language for a local reverse check.</div>';
    return;
  }
  try {
    const forward = await localTranslate(text, source, target);
    const back = await localTranslate(forward, target, source);
    $("reverseResult").innerHTML = `<div class="explain-box">Forward: ${escapeHtml(forward)}\n\nBack: ${escapeHtml(back)}</div>`;
  } catch {
    $("reverseResult").innerHTML = '<div class="explain-box">Reverse check needs a browser with local Translator support.</div>';
  }
});

$("saveNoteBtn").addEventListener("click", () => {
  const text = selectedText();
  if (!text) return;
  state.notes.push({ text, translation: $("translationResult").textContent.trim() });
  renderNotes();
});

function renderNotes() {
  $("notesList").innerHTML = state.notes.length
    ? state.notes.map(note => `<div class="note-item"><div>${escapeHtml(note.text)}</div>${note.translation ? `<div class="tr">${escapeHtml(note.translation)}</div>` : ""}</div>`).join("")
    : '<div class="empty">Saved selections will appear here.</div>';
  $("exportBtn").style.display = state.notes.length ? "inline-flex" : "none";
}

$("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify({ notes: state.notes }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "katy-translator-workspace.json";
  link.click();
  URL.revokeObjectURL(url);
});

// Translation chains require the local browser translator. This keeps the project API-free.
let chain = ["en", "ar", "de"];
function langLabel(code) { return LANGS.find(l => l.code === code)?.label || code; }
function renderChain() {
  $("chainChips").innerHTML = "";
  chain.forEach((lang, index) => {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.append(document.createTextNode(langLabel(lang)));
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "✕";
    remove.addEventListener("click", () => { chain.splice(index, 1); renderChain(); });
    chip.appendChild(remove);
    $("chainChips").appendChild(chip);
  });
}
renderChain();

$("chainAddBtn").addEventListener("click", () => {
  chain.push($("chainAddSelect").value);
  renderChain();
});

$("chainRunBtn").addEventListener("click", async () => {
  const text = selectedText();
  if (!text) return;
  let source = $("sourceLang").value;
  if (source === "auto") {
    $("chainResults").innerHTML = '<div class="explain-box">Choose a source language before running a local chain.</div>';
    return;
  }
  const steps = [{ label: "Source", text }];
  let current = text;
  try {
    for (const target of chain) {
      current = await localTranslate(current, source, target);
      steps.push({ label: langLabel(target), text: current });
      source = target;
    }
    $("chainResults").innerHTML = steps.map(step => `<div class="chain-step"><span class="lang">${escapeHtml(step.label)}</span><span>${escapeHtml(step.text)}</span></div>`).join("");
  } catch {
    $("chainResults").innerHTML = '<div class="explain-box">Translation Chain needs local Translator support, which is not available on most phones.</div>';
  }
});

$("analyzeSymbolsBtn").addEventListener("click", () => {
  const symbols = state.regions.flatMap(region => region.symbols || []);
  $("symbolResult").innerHTML = symbols.length
    ? `<div class="explain-box">${symbols.length} OCR symbols were segmented.</div>`
    : '<div class="empty" style="margin-top:8px;">No symbols to analyze yet.</div>';
});

$("startOverBtn").addEventListener("click", () => {
  $("app").style.display = "none";
  $("dropzone").style.display = "block";
  $("mainImage").src = "";
  $("fileInput").value = "";
  state.regions = [];
  state.selectedIds.clear();
  renderBoxes();
  renderSelectionText();
  clearResults();
  setStatus("");
});
