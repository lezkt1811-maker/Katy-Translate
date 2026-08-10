/* ============================================================
   Language list — aiming for the same breadth as Google Translate's
   picker, using ISO 639-1 (mostly) codes that MyMemory understands.
   ============================================================ */
const LANGS = [
  { code: "en", label: "English" }, { code: "es", label: "Spanish" },
  { code: "fr", label: "French" }, { code: "de", label: "German" },
  { code: "it", label: "Italian" }, { code: "pt", label: "Portuguese" },
  { code: "ru", label: "Russian" }, { code: "ar", label: "Arabic" },
  { code: "zh-CN", label: "Chinese (Simplified)" }, { code: "zh-TW", label: "Chinese (Traditional)" },
  { code: "ja", label: "Japanese" }, { code: "ko", label: "Korean" },
  { code: "hi", label: "Hindi" }, { code: "bn", label: "Bengali" },
  { code: "pa", label: "Punjabi" }, { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" }, { code: "mr", label: "Marathi" },
  { code: "gu", label: "Gujarati" }, { code: "ur", label: "Urdu" },
  { code: "fa", label: "Persian" }, { code: "tr", label: "Turkish" },
  { code: "vi", label: "Vietnamese" }, { code: "th", label: "Thai" },
  { code: "he", label: "Hebrew" }, { code: "el", label: "Greek" },
  { code: "uk", label: "Ukrainian" }, { code: "ro", label: "Romanian" },
  { code: "nl", label: "Dutch" }, { code: "sv", label: "Swedish" },
  { code: "no", label: "Norwegian" }, { code: "da", label: "Danish" },
  { code: "fi", label: "Finnish" }, { code: "pl", label: "Polish" },
  { code: "cs", label: "Czech" }, { code: "sk", label: "Slovak" },
  { code: "hu", label: "Hungarian" }, { code: "bg", label: "Bulgarian" },
  { code: "sr", label: "Serbian" }, { code: "hr", label: "Croatian" },
  { code: "sl", label: "Slovenian" }, { code: "lt", label: "Lithuanian" },
  { code: "lv", label: "Latvian" }, { code: "et", label: "Estonian" },
  { code: "ga", label: "Irish" }, { code: "cy", label: "Welsh" },
  { code: "is", label: "Icelandic" }, { code: "mt", label: "Maltese" },
  { code: "sq", label: "Albanian" }, { code: "mk", label: "Macedonian" },
  { code: "bs", label: "Bosnian" }, { code: "ka", label: "Georgian" },
  { code: "hy", label: "Armenian" }, { code: "az", label: "Azerbaijani" },
  { code: "kk", label: "Kazakh" }, { code: "uz", label: "Uzbek" },
  { code: "mn", label: "Mongolian" }, { code: "my", label: "Burmese" },
  { code: "km", label: "Khmer" }, { code: "lo", label: "Lao" },
  { code: "ne", label: "Nepali" }, { code: "si", label: "Sinhala" },
  { code: "ml", label: "Malayalam" }, { code: "kn", label: "Kannada" },
  { code: "id", label: "Indonesian" }, { code: "ms", label: "Malay" },
  { code: "tl", label: "Filipino" }, { code: "sw", label: "Swahili" },
  { code: "am", label: "Amharic" }, { code: "so", label: "Somali" },
  { code: "zu", label: "Zulu" }, { code: "xh", label: "Xhosa" },
  { code: "af", label: "Afrikaans" }, { code: "yo", label: "Yoruba" },
  { code: "ig", label: "Igbo" }, { code: "ha", label: "Hausa" },
  { code: "la", label: "Latin" }, { code: "eo", label: "Esperanto" },
  { code: "ht", label: "Haitian Creole" }, { code: "jv", label: "Javanese" },
  { code: "su", label: "Sundanese" }, { code: "gl", label: "Galician" },
  { code: "eu", label: "Basque" }, { code: "ca", label: "Catalan" },
  { code: "be", label: "Belarusian" }, { code: "gd", label: "Scottish Gaelic" },
  { code: "yi", label: "Yiddish" }, { code: "ps", label: "Pashto" },
  { code: "sd", label: "Sindhi" }, { code: "ku", label: "Kurdish" },
  { code: "co", label: "Corsican" }, { code: "fy", label: "Frisian" },
  { code: "mg", label: "Malagasy" }, { code: "ny", label: "Chichewa" },
  { code: "sm", label: "Samoan" }, { code: "st", label: "Sesotho" },
  { code: "sn", label: "Shona" }, { code: "tg", label: "Tajik" },
  { code: "tk", label: "Turkmen" },
];
const langLabel = c => (LANGS.find(l => l.code === c) || {}).label || c;

/* ============================================================
   Script-based detection: instant and 100% reliable for text
   written in a non-Latin writing system (the classic "point the
   camera at a sign in another alphabet" case).
   ============================================================ */
const SCRIPT_RANGES = [
  { code: "zh-CN", re: /[\u4E00-\u9FFF\u3400-\u4DBF]/ },
  { code: "ja", re: /[\u3040-\u309F\u30A0-\u30FF]/ },
  { code: "ko", re: /[\uAC00-\uD7AF\u1100-\u11FF]/ },
  { code: "ru", re: /[\u0400-\u04FF]/ },
  { code: "ar", re: /[\u0600-\u06FF\u0750-\u077F]/ },
  { code: "he", re: /[\u0590-\u05FF]/ },
  { code: "el", re: /[\u0370-\u03FF]/ },
  { code: "th", re: /[\u0E00-\u0E7F]/ },
  { code: "hi", re: /[\u0900-\u097F]/ },
  { code: "bn", re: /[\u0980-\u09FF]/ },
  { code: "ta", re: /[\u0B80-\u0BFF]/ },
  { code: "te", re: /[\u0C00-\u0C7F]/ },
  { code: "kn", re: /[\u0C80-\u0CFF]/ },
  { code: "ml", re: /[\u0D00-\u0D7F]/ },
  { code: "gu", re: /[\u0A80-\u0AFF]/ },
  { code: "pa", re: /[\u0A00-\u0A7F]/ },
  { code: "ka", re: /[\u10A0-\u10FF]/ },
  { code: "hy", re: /[\u0530-\u058F]/ },
  { code: "my", re: /[\u1000-\u109F]/ },
  { code: "km", re: /[\u1780-\u17FF]/ },
  { code: "lo", re: /[\u0E80-\u0EFF]/ },
  { code: "si", re: /[\u0D80-\u0DFF]/ },
];

function detectByScript(text) {
  for (const s of SCRIPT_RANGES) {
    if (s.re.test(text)) return s.code;
  }
  return null; // Latin-script (or unrecognized) — needs the statistical detector
}

/* franc (loaded lazily as an ES module) handles Latin-script languages
   that share the same alphabet, e.g. telling Spanish from French. */
let francPromise = null;
function loadFranc() {
  if (!francPromise) {
    francPromise = import("https://esm.sh/franc-min@6?bundle")
      .then(mod => mod.franc || mod.default)
      .catch(() => null);
  }
  return francPromise;
}
// ISO 639-3 (franc) -> our list's codes
const FRANC_TO_OURS = {
  eng: "en", spa: "es", fra: "fr", deu: "de", ita: "it", por: "pt",
  rus: "ru", arb: "ar", cmn: "zh-CN", jpn: "ja", kor: "ko", hin: "hi",
  ben: "bn", pan: "pa", tam: "ta", tel: "te", mar: "mr", guj: "gu",
  urd: "ur", pes: "fa", tur: "tr", vie: "vi", tha: "th", heb: "he",
  ell: "el", ukr: "uk", ron: "ro", nld: "nl", swe: "sv", nob: "no",
  nno: "no", dan: "da", fin: "fi", pol: "pl", ces: "cs", slk: "sk",
  hun: "hu", bul: "bg", srp: "sr", hrv: "hr", slv: "sl", lit: "lt",
  lav: "lv", est: "et", gle: "ga", cym: "cy", isl: "is", mlt: "mt",
  sqi: "sq", mkd: "mk", bos: "bs", kat: "ka", hye: "hy", aze: "az",
  kaz: "kk", uzb: "uz", mon: "mn", mya: "my", khm: "km", lao: "lo",
  nep: "ne", sin: "si", mal: "ml", kan: "kn", ind: "id", zsm: "ms",
  tgl: "tl", swh: "sw", amh: "am", som: "so", zul: "zu", xho: "xh",
  afr: "af", yor: "yo", ibo: "ig", hau: "ha", lat: "la", epo: "eo",
  hat: "ht", jav: "jv", sun: "su", glg: "gl", eus: "eu", cat: "ca",
  bel: "be", gla: "gd", yid: "yi", pus: "ps", snd: "sd", cos: "co",
  fry: "fy", mlg: "mg", nya: "ny", smo: "sm", sot: "st", sna: "sn",
  tgk: "tg", tuk: "tk",
};

/* Full detector: script check first (instant, exact), then the
   statistical model for Latin-script text. Returns a code from LANGS
   or null if genuinely unsure. */
async function detectLanguage(text) {
  const byScript = detectByScript(text);
  if (byScript) return byScript;
  try {
    const franc = await loadFranc();
    if (!franc) return null;
    const guess = franc(text, { minLength: 3 });
    if (guess === "und") return null;
    return FRANC_TO_OURS[guess] || null;
  } catch { return null; }
}

/* ============================================================
   OCR script/language — separate from the translation languages
   above, because Tesseract needs to know which *alphabet* to read
   before it can find words at all. Scanning a Greek inscription
   with the English model, for example, finds almost nothing; this
   is very likely the "not catching enough words" problem.
   Codes are Tesseract traineddata codes, not ISO 639-1.
   ============================================================ */
const OCR_LANGS = [
  { code: "eng", label: "English / Latin script (default)" },
  { code: "spa", label: "Spanish" }, { code: "fra", label: "French" },
  { code: "deu", label: "German" }, { code: "ita", label: "Italian" },
  { code: "por", label: "Portuguese" }, { code: "nld", label: "Dutch" },
  { code: "pol", label: "Polish" }, { code: "ron", label: "Romanian" },
  { code: "vie", label: "Vietnamese" }, { code: "rus", label: "Russian (Cyrillic)" },
  { code: "ukr", label: "Ukrainian (Cyrillic)" }, { code: "ell", label: "Greek (modern)" },
  { code: "grc", label: "Ancient Greek" }, { code: "lat", label: "Latin (classical)" },
  { code: "heb", label: "Hebrew" }, { code: "ara", label: "Arabic" },
  { code: "fas", label: "Persian" }, { code: "hin", label: "Hindi (Devanagari)" },
  { code: "san", label: "Sanskrit (Devanagari)" }, { code: "ben", label: "Bengali" },
  { code: "tam", label: "Tamil" }, { code: "tha", label: "Thai" },
  { code: "chi_sim", label: "Chinese (Simplified)" }, { code: "chi_tra", label: "Chinese (Traditional)" },
  { code: "jpn", label: "Japanese" }, { code: "kor", label: "Korean" },
  { code: "cop", label: "Coptic" }, { code: "syr", label: "Syriac" },
  { code: "custom", label: "Custom model (set below in Settings)" },
];

let state = {
  regions: [], selectedIds: new Set(), mode: "standard", heatmap: false,
  chain: ["en", "ar", "de"], notes: [], naturalW: 0, naturalH: 0, ocrLang: "eng",
};

function $(id) { return document.getElementById(id); }

function fillLangSelect(sel, includeAuto) {
  sel.innerHTML = "";
  if (includeAuto) {
    const o = document.createElement("option"); o.value = "auto"; o.textContent = "Detect language"; sel.appendChild(o);
  }
  LANGS.forEach(l => {
    const o = document.createElement("option"); o.value = l.code; o.textContent = l.label; sel.appendChild(o);
  });
}
fillLangSelect($("sourceLang"), true);
$("sourceLang").value = "auto";
fillLangSelect($("targetLang"), false);
$("targetLang").value = "en";
fillLangSelect($("chainAddSelect"), false);
$("chainAddSelect").value = "fr";

OCR_LANGS.forEach(l => {
  const o = document.createElement("option"); o.value = l.code; o.textContent = l.label; $("ocrLang").appendChild(o);
});
$("ocrLang").value = "eng";
$("ocrLang").addEventListener("change", () => { state.ocrLang = $("ocrLang").value; });

function setStatus(msg) { $("status").textContent = msg || ""; }

$("dropzone").addEventListener("click", () => $("fileInput").click());
$("newImageBtn").addEventListener("click", () => $("fileInput").click());
$("fileInput").addEventListener("change", e => handleFile(e.target.files[0]));

function handleFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    $("mainImage").src = e.target.result;
    $("dropzone").style.display = "none";
    $("app").style.display = "block";
    state.regions = []; state.selectedIds = new Set();
    $("manualText").value = "";
    renderBoxes(); renderSelectionText();
    $("translationResult").innerHTML = ""; $("explanationResult").innerHTML = ""; $("reverseResult").innerHTML = "";
    $("chainResults").innerHTML = ""; $("symbolResult").innerHTML = "";
    setStatus("Image loaded. Choose a mode and press Scan.");
  };
  reader.readAsDataURL(file);
}

$("mainImage").addEventListener("load", () => {
  state.naturalW = $("mainImage").naturalWidth;
  state.naturalH = $("mainImage").naturalHeight;
});

document.querySelectorAll("[data-mode]").forEach(btn => {
  btn.addEventListener("click", () => {
    state.mode = btn.dataset.mode;
    document.querySelectorAll("[data-mode]").forEach(b => b.classList.toggle("active", b === btn));
    $("ancientNote").style.display = state.mode === "ancient" ? "block" : "none";
    $("stage").style.cursor = state.mode === "manual" ? "crosshair" : "default";
    // Manual drawing needs free-form drag; selection swiping only needs
    // horizontal freedom, so let vertical page scroll keep working then.
    $("stage").style.touchAction = state.mode === "manual" ? "none" : "pan-y";
  });
});
$("stage").style.touchAction = "pan-y";

$("heatmapBtn").addEventListener("click", () => {
  state.heatmap = !state.heatmap;
  $("heatmapBtn").textContent = state.heatmap ? "Heat map on" : "Heat map off";
  $("heatmapBtn").classList.toggle("active", state.heatmap);
  renderBoxes();
});

function scale() {
  const img = $("mainImage");
  return state.naturalW ? img.clientWidth / state.naturalW : 1;
}

function confTier(c) { return c >= 80 ? "high" : c >= 50 ? "mid" : "low"; }

function renderBoxes() {
  document.querySelectorAll(".box").forEach(b => b.remove());
  const s = scale();
  state.regions.forEach(r => {
    const div = document.createElement("div");
    const tier = confTier(r.confidence);
    div.className = "box" + (state.heatmap ? " " + (tier === "high" ? "high" : tier === "mid" ? "mid" : "lowc") : (tier === "low" ? " low" : "")) + (state.selectedIds.has(r.id) ? " sel" : "");
    div.style.left = (r.bbox.x0 * s) + "px";
    div.style.top = (r.bbox.y0 * s) + "px";
    div.style.width = ((r.bbox.x1 - r.bbox.x0) * s) + "px";
    div.style.height = ((r.bbox.y1 - r.bbox.y0) * s) + "px";
    div.dataset.id = r.id;
    div.title = r.text + " · " + Math.round(r.confidence) + "% confidence";
    div.addEventListener("click", () => {
      if (dragSelected) { dragSelected = false; return; } // a drag just ended on this box; don't also toggle it
      state.selectedIds.has(r.id) ? state.selectedIds.delete(r.id) : state.selectedIds.add(r.id);
      renderBoxes(); renderSelectionText();
      $("translationResult").innerHTML = ""; $("explanationResult").innerHTML = ""; $("reverseResult").innerHTML = "";
    });
    $("stage").appendChild(div);
  });
}

function selectedText() {
  const manual = $("manualText").value.trim();
  if (manual) return manual;
  return state.regions.filter(r => state.selectedIds.has(r.id))
    .sort((a, b) => a.bbox.y0 - b.bbox.y0 || a.bbox.x0 - b.bbox.x0)
    .map(r => r.text).join(" ").trim();
}
function renderSelectionText() {
  const manual = $("manualText").value.trim();
  if (manual) { $("selectionText").innerHTML = escapeHtml(manual) + ' <span style="color:#8fae9a;font-size:11.5px;">(typed text)</span>'; return; }
  const t = selectedText();
  $("selectionText").innerHTML = t ? escapeHtml(t) : '<span class="empty">Tap boxes on the image to build a selection.</span>';
}
$("manualText").addEventListener("input", () => {
  renderSelectionText();
  $("translationResult").innerHTML = ""; $("explanationResult").innerHTML = ""; $("reverseResult").innerHTML = "";
});
function escapeHtml(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

/* ============================================================
   Select all / Clear — the old app's quick way to grab everything
   or start over without re-tapping every box.
   ============================================================ */
$("selectAllBtn").addEventListener("click", () => {
  state.regions.forEach(r => state.selectedIds.add(r.id));
  renderBoxes(); renderSelectionText();
});
$("clearSelectionBtn").addEventListener("click", () => {
  state.selectedIds.clear();
  $("manualText").value = "";
  renderBoxes(); renderSelectionText();
  $("translationResult").innerHTML = ""; $("explanationResult").innerHTML = ""; $("reverseResult").innerHTML = "";
});

/* ============================================================
   Swipe-to-select: drag a finger/cursor across the image and every
   box your path touches gets selected — mirrors the old Translate
   app's "run your thumb across a line" gesture. Works with mouse
   and touch via Pointer Events. Separate from Manual Select's
   free-drawn OCR rectangles.
   ============================================================ */
let dragSelected = false; // guards the click handler firing right after a drag ends
let swipeActive = false, swipeBox = null, swipeStartX = 0, swipeStartY = 0;

$("stage").addEventListener("pointerdown", e => {
  if (state.mode === "manual") return;
  if (e.pointerType === "mouse" && e.button !== 0) return;
  const rect = $("stage").getBoundingClientRect();
  swipeStartX = e.clientX - rect.left; swipeStartY = e.clientY - rect.top;
  swipeActive = true;
  swipeBox = document.createElement("div");
  swipeBox.className = "drawrect";
  $("stage").appendChild(swipeBox);
});
$("stage").addEventListener("pointermove", e => {
  if (!swipeActive || state.mode === "manual") return;
  const rect = $("stage").getBoundingClientRect();
  const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
  const moved = Math.hypot(cx - swipeStartX, cy - swipeStartY);
  if (moved < 6) return; // still a tap, not a swipe yet
  e.preventDefault();
  const x = Math.min(cx, swipeStartX), y = Math.min(cy, swipeStartY);
  const w = Math.abs(cx - swipeStartX), h = Math.abs(cy - swipeStartY);
  Object.assign(swipeBox.style, { left: x + "px", top: y + "px", width: w + "px", height: h + "px" });
  // select any box overlapping the swipe rectangle
  let changed = false;
  document.querySelectorAll(".box").forEach(div => {
    const bx = parseFloat(div.style.left), by = parseFloat(div.style.top);
    const bw = parseFloat(div.style.width), bh = parseFloat(div.style.height);
    const overlaps = x < bx + bw && x + w > bx && y < by + bh && y + h > by;
    const id = div.dataset.id;
    if (overlaps && !state.selectedIds.has(id)) { state.selectedIds.add(id); changed = true; div.classList.add("sel"); }
  });
  if (changed) renderSelectionText();
  dragSelected = true;
});
$("stage").addEventListener("pointerup", () => {
  if (swipeBox) { swipeBox.remove(); swipeBox = null; }
  swipeActive = false;
  if (dragSelected) {
    $("translationResult").innerHTML = ""; $("explanationResult").innerHTML = ""; $("reverseResult").innerHTML = "";
    setTimeout(() => { dragSelected = false; }, 0);
  }
});
$("stage").addEventListener("pointercancel", () => {
  if (swipeBox) { swipeBox.remove(); swipeBox = null; }
  swipeActive = false; dragSelected = false;
});

let tesseractReady = !!window.Tesseract;
function ensureTesseract() {
  return new Promise((resolve, reject) => {
    if (window.Tesseract) { resolve(); return; }
    let tries = 0;
    const check = setInterval(() => {
      tries++;
      if (window.Tesseract) { clearInterval(check); resolve(); }
      else if (tries > 100) { clearInterval(check); reject(new Error("Tesseract failed to load")); }
    }, 100);
  });
}

$("scanBtn").addEventListener("click", async () => {
  if (!$("mainImage").src) return;
  $("scanBtn").disabled = true;
  setStatus("Loading OCR engine…");
  try {
    await ensureTesseract();
    const isCustom = state.ocrLang === "custom";
    const customCode = $("customOcrCode").value.trim();
    const customPath = $("customOcrPath").value.trim();
    if (isCustom && (!customCode || !customPath)) {
      setStatus("Set a code and folder URL for the custom OCR model in Settings first.");
      $("scanBtn").disabled = false;
      return;
    }
    const recognizeLang = isCustom ? customCode : state.ocrLang;
    setStatus("Loading " + (isCustom ? customCode : (OCR_LANGS.find(l => l.code === state.ocrLang) || {}).label) + " script data…");
    // Sparse-text mode (PSM 11) doesn't assume a coherent paragraph layout,
    // so it finds scattered/isolated words (signage, inscriptions) that
    // the default "assume one block of text" mode misses. Standard mode
    // keeps the default layout assumption, which is faster and works
    // well for a page of continuous prose.
    const psm = (state.mode === "broad" || state.mode === "ancient") ? "11" : "3";
    const recognizeOptions = {
      tessedit_pageseg_mode: psm,
      logger: m => { if (m.status && m.progress != null) setStatus(m.status + " · " + Math.round(m.progress * 100) + "%"); }
    };
    if (isCustom) {
      recognizeOptions.langPath = customPath.replace(/\/$/, "");
      recognizeOptions.gzip = $("customOcrGzip").checked;
    }
    const result = await Tesseract.recognize($("mainImage").src, recognizeLang, recognizeOptions);
    const words = result.data.words || [];
    const threshold = state.mode === "standard" ? 55 : 0;
    state.regions = words.filter(w => w.text.trim().length > 0 && w.confidence >= threshold).map((w, i) => ({
      id: "w" + i, text: w.text, confidence: w.confidence, bbox: w.bbox,
      symbols: (w.symbols || []).map((s, j) => ({ id: "w" + i + "s" + j, text: s.text, confidence: s.confidence, bbox: s.bbox }))
    }));
    renderBoxes();
    setStatus("Found " + state.regions.length + " region" + (state.regions.length === 1 ? "" : "s") + ".");
    if ($("autoAiRead").checked && getApiKey()) {
      setStatus("Found " + state.regions.length + " region" + (state.regions.length === 1 ? "" : "s") + " — also asking Claude for a reading attempt…");
      runAiRead();
    }
  } catch (err) {
    setStatus(state.ocrLang === "custom"
      ? "Couldn't load the custom OCR model — double-check the folder URL and code match a real {code}.traineddata file, and that gzip is set correctly."
      : "OCR failed to load — check your network settings for this chat, or that pop-up/script blockers aren't active.");
    console.error(err);
  } finally {
    $("scanBtn").disabled = false;
  }
});

// Manual region drawing (Manual Select mode only)
let drawStart = null, drawDiv = null;
$("stage").addEventListener("pointerdown", e => {
  if (state.mode !== "manual") return;
  const rect = $("stage").getBoundingClientRect();
  drawStart = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  drawDiv = document.createElement("div"); drawDiv.className = "drawrect";
  $("stage").appendChild(drawDiv);
});
$("stage").addEventListener("pointermove", e => {
  if (state.mode !== "manual" || !drawStart) return;
  e.preventDefault();
  const rect = $("stage").getBoundingClientRect();
  const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
  const x = Math.min(cx, drawStart.x), y = Math.min(cy, drawStart.y);
  const w = Math.abs(cx - drawStart.x), h = Math.abs(cy - drawStart.y);
  Object.assign(drawDiv.style, { left: x + "px", top: y + "px", width: w + "px", height: h + "px" });
});
$("stage").addEventListener("pointerup", async () => {
  if (state.mode !== "manual" || !drawStart || !drawDiv) { drawStart = null; return; }
  const w = parseFloat(drawDiv.style.width), h = parseFloat(drawDiv.style.height);
  const x = parseFloat(drawDiv.style.left), y = parseFloat(drawDiv.style.top);
  drawDiv.remove(); drawDiv = null; drawStart = null;
  if (w < 8 || h < 8) return;
  const s = 1 / scale();
  const x0 = Math.round(x * s), y0 = Math.round(y * s), x1 = Math.round((x + w) * s), y1 = Math.round((y + h) * s);
  const canvas = document.createElement("canvas");
  canvas.width = x1 - x0; canvas.height = y1 - y0;
  canvas.getContext("2d").drawImage($("mainImage"), x0, y0, x1 - x0, y1 - y0, 0, 0, x1 - x0, y1 - y0);
  setStatus("Reading manual selection…");
  try {
    await ensureTesseract();
    const isCustom = state.ocrLang === "custom";
    const customCode = $("customOcrCode").value.trim();
    const customPath = $("customOcrPath").value.trim();
    const manualOptions = { tessedit_pageseg_mode: "7" }; // single text line
    if (isCustom) { manualOptions.langPath = customPath.replace(/\/$/, ""); manualOptions.gzip = $("customOcrGzip").checked; }
    const result = await Tesseract.recognize(canvas.toDataURL(), isCustom ? customCode : state.ocrLang, manualOptions);
    const text = result.data.text.trim() || "(no text found)";
    const id = "manual" + Date.now();
    state.regions.push({ id, text, confidence: result.data.confidence || 50, bbox: { x0, y0, x1, y1 }, symbols: [], manual: true });
    state.selectedIds.add(id);
    renderBoxes(); renderSelectionText();
    setStatus("Manual region added.");
  } catch { setStatus("Couldn't read that region."); }
});

/* ============================================================
   Translation — chunked so there's no practical length ceiling.
   MyMemory (the free translation API this app uses) caps each
   individual request at roughly 500 characters, so long text is
   split on sentence boundaries and stitched back together. Note:
   MyMemory's free tier also has a daily character quota shared by
   all users of this page — that's a limit of the free service
   itself, not something client-side code can lift. See README.
   ============================================================ */
function chunkText(text, maxLen) {
  const sentences = text.match(/[^.!?…。！？]+[.!?…。！？]*\s*/g) || [text];
  const chunks = [];
  let current = "";
  for (const sentence of sentences) {
    if ((current + sentence).length > maxLen) {
      if (current) chunks.push(current.trim());
      if (sentence.length > maxLen) {
        for (let i = 0; i < sentence.length; i += maxLen) chunks.push(sentence.slice(i, i + maxLen).trim());
        current = "";
      } else {
        current = sentence;
      }
    } else {
      current += sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.length ? chunks : [text];
}

async function myMemoryTranslateChunk(text, src, tgt) {
  const url = "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(text) + "&langpair=" + src + "|" + tgt;
  const res = await fetch(url);
  const data = await res.json();
  return (data && data.responseData && data.responseData.translatedText) || "(no translation returned)";
}

async function myMemoryTranslate(text, src, tgt, onProgress) {
  const chunks = chunkText(text, 480);
  if (chunks.length === 1) return myMemoryTranslateChunk(chunks[0], src, tgt);
  const out = [];
  for (let i = 0; i < chunks.length; i++) {
    if (onProgress) onProgress(i + 1, chunks.length);
    out.push(await myMemoryTranslateChunk(chunks[i], src, tgt));
    await new Promise(r => setTimeout(r, 150)); // be polite to the free API
  }
  return out.join(" ");
}

/* Optional: Claude-powered "Explain" nuance and "Attempt AI reading" from a
   photo. Both need a real Anthropic API key, supplied by the person using
   this app and kept only in their browser's local storage — never in this
   file, never committed to a repo. The direct-browser-access header below
   is what lets a request go straight from this page to Anthropic without a
   backend; the key is still visible to anyone with access to this browser
   session, which is fine for personal use with your own key, but this repo
   should never ship with a key hardcoded in it. */
const API_KEY_STORAGE = "palimpsest_claude_key";
function getApiKey() { return localStorage.getItem(API_KEY_STORAGE) || ""; }
function setKeyStatus() {
  $("keyStatus").textContent = getApiKey() ? "Key saved on this device." : "No key saved yet.";
}
setKeyStatus();
$("saveKeyBtn").addEventListener("click", () => {
  const v = $("apiKeyInput").value.trim();
  if (!v) return;
  localStorage.setItem(API_KEY_STORAGE, v);
  $("apiKeyInput").value = "";
  setKeyStatus();
});
$("clearKeyBtn").addEventListener("click", () => {
  localStorage.removeItem(API_KEY_STORAGE);
  setKeyStatus();
});

async function callClaude(content, maxTokens) {
  const key = getApiKey();
  if (!key) { const e = new Error("No API key saved — add one in Settings above."); e.code = "NO_KEY"; throw e; }
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: maxTokens || 1000, messages: [{ role: "user", content }] })
  });
  if (!response.ok) {
    let detail = "";
    try { detail = (await response.json()).error?.message || ""; } catch {}
    throw new Error("Claude API error " + response.status + (detail ? ": " + detail : ""));
  }
  const data = await response.json();
  return (data.content || []).map(b => b.text || "").join("\n").trim();
}
async function askClaude(prompt) { return callClaude(prompt); }

/* Downscale the current photo before sending it to Claude — keeps the
   request fast and cheap, and 1200px is plenty of detail for this use. */
function imageToBase64Block(imgEl, maxDim, quality) {
  const canvas = document.createElement("canvas");
  const w = imgEl.naturalWidth, h = imgEl.naturalHeight;
  const scale = Math.min(1, (maxDim || 1200) / Math.max(w, h));
  canvas.width = Math.round(w * scale); canvas.height = Math.round(h * scale);
  canvas.getContext("2d").drawImage(imgEl, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL("image/jpeg", quality || 0.85);
  const [header, data] = dataUrl.split(",");
  const media_type = header.match(/data:(.*);base64/)[1];
  return { type: "image", source: { type: "base64", media_type, data } };
}

const AI_READ_PROMPT = 'You are looking at a photograph of an inscribed or written object — it may be a cuneiform tablet, an undeciphered manuscript, a worn stone inscription, ordinary signage, or something else entirely. Help me get the most genuine value out of it, with rigorous honesty about uncertainty. Structure your answer as:\n\n1. What you can actually observe: the apparent writing system/script, rough sign or character count, layout (columns, rows, damage), and physical condition/material if visible.\n2. Script/language identification, if you can support it with real confidence — and why.\n3. A reading attempt, ONLY for parts you can genuinely support from the visual detail in front of you, not general pattern-matching on what tablets/manuscripts of this type usually say. If you cannot reliably read specific signs or words — which is true for the great majority of cuneiform photographs, and true for every attempt ever made at the Voynich manuscript — say so plainly and explain why, rather than producing a plausible-sounding invented reading. A confident wrong answer is worse than an honest "I can\'t read this from a photo."\n4. Anything genuinely useful to a curious non-specialist: likely period/culture/style, what kind of object this typically is, and a concrete next step (e.g. a specific museum database, a named corpus like CDLI for cuneiform, or the kind of specialist who could actually read this).\n5. ONLY if you can transcribe some or all of the text with genuine confidence — this is realistic for a clear photo of a known alphabetic script, even an old or unusual one like a medieval hand, and unrealistic for cuneiform or Voynich — add a section headed exactly on its own line: ===TRANSCRIPTION=== followed by your best-effort transcription. Modernized spelling is fine; mark illegible stretches with […]. Leave this whole section out entirely if you can\'t responsibly produce one — do not pad it with guesses.\n6. ONLY if you included section 5, also add a section headed exactly on its own line: ===TRANSLATION=== followed by a natural English translation of that transcription (skip this if the transcription is already in English, or if section 5 was omitted).\n\nBe direct and specific rather than generic. Skip sections that don\'t apply.';

function parseAiReading(text) {
  const tIdx = text.indexOf("===TRANSCRIPTION===");
  const trIdx = text.indexOf("===TRANSLATION===");
  const mainText = (tIdx >= 0 ? text.slice(0, tIdx) : text).trim();
  let transcription = null, translation = null;
  if (tIdx >= 0) {
    transcription = (trIdx >= 0 ? text.slice(tIdx + 20, trIdx) : text.slice(tIdx + 20)).trim();
  }
  if (trIdx >= 0) {
    translation = text.slice(trIdx + 18).trim();
  }
  return { mainText, transcription, translation };
}

const AUTO_AI_STORAGE = "palimpsest_auto_ai_read";
$("autoAiRead").checked = localStorage.getItem(AUTO_AI_STORAGE) === "true";
$("autoAiRead").addEventListener("change", () => {
  localStorage.setItem(AUTO_AI_STORAGE, $("autoAiRead").checked ? "true" : "false");
});

async function runAiRead() {
  if (!$("mainImage").src) return;
  $("aiReadBtn").disabled = true; $("aiReadBtn").textContent = "Reading…";
  $("aiReadResult").innerHTML = '<div class="empty" style="margin-top:8px;">Asking Claude to read the photo…</div>';
  try {
    const imageBlock = imageToBase64Block($("mainImage"));
    const out = await callClaude([imageBlock, { type: "text", text: AI_READ_PROMPT }], 1600);
    const parsed = parseAiReading(out || "");
    let html = '<div class="explain-box" style="margin-top:12px;">' + escapeHtml(parsed.mainText || out || "No response returned.") + '</div>';
    if (parsed.transcription) {
      html += '<div class="result-box" style="margin-top:10px;">'
        + '<div style="font-size:12px;color:#9c9382;margin-bottom:4px;">📜 Best-effort transcription</div>'
        + escapeHtml(parsed.transcription) + '</div>';
      if (parsed.translation) {
        html += '<div class="result-box" style="margin-top:10px;border-left-color:#c45a4e;">'
          + '<div style="font-size:12px;color:#9c9382;margin-bottom:4px;">🌐 Claude\'s translation — reads and translates in one step, since the regular translator can\'t handle archaic or unusual text well</div>'
          + escapeHtml(parsed.translation) + '</div>';
      }
      html += '<button class="btn primary" id="useTranscriptionBtn" style="margin-top:8px;">Use this transcription in Selection →</button>';
    }
    $("aiReadResult").innerHTML = html;
    const useBtn = $("useTranscriptionBtn");
    if (useBtn) useBtn.addEventListener("click", () => {
      $("manualText").value = parsed.transcription;
      renderSelectionText();
      $("selectionText").scrollIntoView({ behavior: "smooth", block: "center" });
    });
  } catch (err) {
    const msg = err && err.code === "NO_KEY"
      ? "No API key saved — add one in Settings at the top of the page."
      : "Couldn't complete the reading attempt (" + (err && err.message ? err.message : "request failed") + ").";
    $("aiReadResult").innerHTML = '<div class="explain-box" style="margin-top:12px;">' + escapeHtml(msg) + '</div>';
  }
  $("aiReadBtn").disabled = false; $("aiReadBtn").textContent = "🔍 Attempt AI reading (uses your API key)";
}
$("aiReadBtn").addEventListener("click", runAiRead);

$("translateBtn").addEventListener("click", async () => {
  const t = selectedText(); if (!t) return;
  $("translateBtn").disabled = true; $("translateBtn").textContent = "Translating…";
  try {
    let src = $("sourceLang").value;
    let detectedNote = "";
    if (src === "auto") {
      $("translateBtn").textContent = "Detecting language…";
      const detected = await detectLanguage(t);
      if (detected) {
        src = detected;
        detectedNote = "Detected language: " + langLabel(detected);
      } else {
        src = "en";
        detectedNote = "Couldn't confidently detect the language — assumed English.";
      }
      $("translateBtn").textContent = "Translating…";
    }
    const out = await myMemoryTranslate(t, src, $("targetLang").value,
      (i, n) => setStatus("Translating part " + i + " of " + n + "…"));
    setStatus("");
    $("translationResult").innerHTML =
      (detectedNote ? '<div style="font-size:12px;color:#9c9382;margin-bottom:6px;">' + escapeHtml(detectedNote) + '</div>' : '') +
      '<div class="result-box">' + escapeHtml(out) +
      ' <button class="btn speak-btn" data-target="translationResult" data-lang="' + escapeHtml($("targetLang").value) + '" title="Read aloud">🔊</button></div>';
    $("translationResult").querySelector(".speak-btn").addEventListener("click", () => speak(out, $("targetLang").value));
  } catch { $("translationResult").innerHTML = '<div class="result-box">Translation request failed.</div>'; }
  $("translateBtn").disabled = false; $("translateBtn").textContent = "Translate";
});

/* ============================================================
   Read aloud — Web Speech API, entirely client-side, no key needed.
   Default browser voices vary a lot in quality; most systems ship
   several voices per language and the one picked by default isn't
   always the best-sounding. Auto-pick the best available match,
   with a manual override.
   ============================================================ */
let availableVoices = [];
function loadVoices() {
  if (!("speechSynthesis" in window)) return;
  availableVoices = window.speechSynthesis.getVoices() || [];
  populateVoiceSelect();
}
function voiceQualityScore(v) {
  const n = v.name.toLowerCase();
  let score = 0;
  if (/neural|natural|premium|enhanced|studio/.test(n)) score += 3; // usually the good ones
  if (/google/.test(n)) score += 2;
  if (v.localService === false) score += 1; // cloud voices tend to sound better than on-device fallback
  if (/compact|espeak|robot/.test(n)) score -= 3; // the classic robotic ones
  return score;
}
function bestVoiceForLang(langCode) {
  if (!langCode || langCode === "auto") langCode = "en";
  const prefix = langCode.split("-")[0].toLowerCase();
  const matches = availableVoices.filter(v => v.lang.toLowerCase().startsWith(prefix));
  if (matches.length === 0) return null;
  return matches.sort((a, b) => voiceQualityScore(b) - voiceQualityScore(a))[0];
}
function populateVoiceSelect() {
  const sel = $("voiceSelect");
  const prev = sel.value;
  sel.innerHTML = '<option value="auto">Auto (best match per language)</option>';
  availableVoices.slice().sort((a, b) => a.lang.localeCompare(b.lang) || voiceQualityScore(b) - voiceQualityScore(a))
    .forEach(v => {
      const o = document.createElement("option");
      o.value = v.name;
      o.textContent = v.name + " (" + v.lang + ")";
      sel.appendChild(o);
    });
  if (prev && [...sel.options].some(o => o.value === prev)) sel.value = prev;
}
if ("speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
}
$("voiceTestBtn").addEventListener("click", () => speak("This is what the selected voice sounds like.", "en"));

function speak(text, langCode) {
  if (!("speechSynthesis" in window)) { alert("This browser doesn't support text-to-speech."); return; }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = langCode || "en";
  const chosenName = $("voiceSelect").value;
  const voice = (chosenName && chosenName !== "auto")
    ? availableVoices.find(v => v.name === chosenName)
    : bestVoiceForLang(langCode);
  if (voice) utter.voice = voice;
  utter.rate = 0.95; // the default reads slightly fast, which reads as more clipped/robotic
  window.speechSynthesis.speak(utter);
}
$("speakSelectionBtn").addEventListener("click", () => {
  const t = selectedText(); if (!t) return;
  const src = $("sourceLang").value;
  speak(t, src === "auto" ? "en" : src);
});

$("explainBtn").addEventListener("click", async () => {
  const t = selectedText(); if (!t) return;
  $("explainBtn").disabled = true; $("explainBtn").textContent = "Thinking…";
  $("explanationResult").innerHTML = "";
  try {
    const translationEl = $("translationResult").textContent || "not yet translated";
    const prompt = 'You are helping someone understand a piece of text captured from a photo (via OCR, so it may contain minor errors) and its translation.\n\nSource text: "' + t + '"\nTranslation target language: ' + langLabel($("targetLang").value) + '\nCurrent translation (if any): "' + translationEl + '"\n\nGive a concise, well-organized explanation covering, only where relevant (skip sections that don\'t apply):\n- Why this translation / the most natural rendering\n- Other possible meanings or senses\n- Alternative word choices and how they\'d shift tone\n- Historical meaning, if notable\n- Cultural connotation, if notable\n- Whether any part is idiomatic, and the literal vs. contextual reading\nKeep it tight — a few short paragraphs, not an essay.';
    const out = await askClaude(prompt);
    $("explanationResult").innerHTML = '<div class="explain-box">' + escapeHtml(out || "No explanation returned.") + '</div>';
  } catch (err) {
    const msg = err && err.code === "NO_KEY"
      ? "No API key saved — add one in Settings at the top of the page."
      : "Couldn\'t reach the explanation service (" + (err && err.message ? err.message : "request failed") + ").";
    $("explanationResult").innerHTML = '<div class="explain-box">' + escapeHtml(msg) + '</div>';
  }
  $("explainBtn").disabled = false; $("explainBtn").textContent = "✨ Explain";
});

$("reverseBtn").addEventListener("click", async () => {
  const t = selectedText(); if (!t) return;
  $("reverseBtn").disabled = true; $("reverseBtn").textContent = "Checking…";
  $("reverseResult").innerHTML = "";
  try {
    let src = $("sourceLang").value;
    let detectedNote = "";
    if (src === "auto") {
      const detected = await detectLanguage(t);
      src = detected || "en";
      detectedNote = detected ? ("Detected language: " + langLabel(detected)) : "Couldn't confidently detect the language — assumed English.";
    }
    const toEnglish = await myMemoryTranslate(t, src, "en");
    const back = await myMemoryTranslate(toEnglish, "en", src);
    const origWords = new Set(t.toLowerCase().split(/\s+/));
    const backWords = back.toLowerCase().split(/\s+/);
    let html = '<div class="explain-box">';
    if (detectedNote) html += '<div style="color:#9c9382;margin-bottom:6px;">' + escapeHtml(detectedNote) + '</div>';
    html += '<div style="color:#9c9382;margin-bottom:6px;">Round-trip: source → English → back</div>';
    html += '<div style="margin-bottom:6px;">English: ' + escapeHtml(toEnglish) + '</div><div>Back: ';
    backWords.forEach(w => {
      const diff = !origWords.has(w);
      html += '<span style="background:' + (diff ? 'rgba(196,90,78,0.35)' : 'transparent') + ';padding:0 2px;border-radius:2px;">' + escapeHtml(w) + ' </span>';
    });
    html += '</div></div>';
    $("reverseResult").innerHTML = html;
  } catch { $("reverseResult").innerHTML = '<div class="explain-box">Reverse check failed.</div>'; }
  $("reverseBtn").disabled = false; $("reverseBtn").textContent = "↺ Reverse check";
});

$("saveNoteBtn").addEventListener("click", () => {
  const t = selectedText(); if (!t) return;
  state.notes.push({ id: Date.now(), text: t, translation: $("translationResult").textContent || "" });
  renderNotes();
});
function renderNotes() {
  if (state.notes.length === 0) { $("notesList").innerHTML = '<div class="empty">Saved selections will appear here.</div>'; $("exportBtn").style.display = "none"; return; }
  $("notesList").innerHTML = state.notes.map(n =>
    '<div class="note-item"><div>' + escapeHtml(n.text) + '</div>' + (n.translation ? '<div class="tr">' + escapeHtml(n.translation) + '</div>' : '') + '</div>'
  ).join("");
  $("exportBtn").style.display = "inline-flex";
}
$("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify({ notes: state.notes }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = "katy-translate-workspace.json"; a.click();
  URL.revokeObjectURL(url);
});

// Chain
function renderChain() {
  $("chainChips").innerHTML = "";
  state.chain.forEach((lang, i) => {
    const chip = document.createElement("div"); chip.className = "chip";
    chip.innerHTML = "<span>" + langLabel(lang) + "</span>";
    const up = document.createElement("button"); up.textContent = "↑";
    up.addEventListener("click", () => { if (i > 0) { [state.chain[i - 1], state.chain[i]] = [state.chain[i], state.chain[i - 1]]; renderChain(); } });
    const down = document.createElement("button"); down.textContent = "↓";
    down.addEventListener("click", () => { if (i < state.chain.length - 1) { [state.chain[i + 1], state.chain[i]] = [state.chain[i], state.chain[i + 1]]; renderChain(); } });
    const rm = document.createElement("button"); rm.textContent = "✕";
    rm.addEventListener("click", () => { state.chain.splice(i, 1); renderChain(); });
    chip.appendChild(up); chip.appendChild(down); chip.appendChild(rm);
    $("chainChips").appendChild(chip);
  });
}
renderChain();
$("chainAddBtn").addEventListener("click", () => { state.chain.push($("chainAddSelect").value); renderChain(); });
$("chainRunBtn").addEventListener("click", async () => {
  const t = selectedText(); if (!t || state.chain.length === 0) return;
  $("chainRunBtn").disabled = true; $("chainRunBtn").textContent = "Running…";
  const steps = [{ label: "Source", text: t }];
  $("chainResults").innerHTML = steps.map(s => '<div class="chain-step"><span class="lang">' + s.label + '</span><span>' + escapeHtml(s.text) + '</span></div>').join("");
  let current = t, currentLang = "en";
  for (const lang of state.chain) {
    try {
      const translated = await myMemoryTranslate(current, currentLang, lang);
      steps.push({ label: langLabel(lang), text: translated });
      current = translated; currentLang = lang;
    } catch { steps.push({ label: langLabel(lang), text: "(hop failed)" }); }
    $("chainResults").innerHTML = steps.map(s => '<div class="chain-step"><span class="lang">' + s.label + '</span><span>' + escapeHtml(s.text) + '</span></div>').join("");
    await new Promise(r => setTimeout(r, 250));
  }
  $("chainRunBtn").disabled = false; $("chainRunBtn").textContent = "Run chain";
});

// Ancient symbols
$("analyzeSymbolsBtn").addEventListener("click", () => {
  const allSymbols = state.regions.flatMap(r => r.symbols || []);
  if (allSymbols.length === 0) { $("symbolResult").innerHTML = '<div class="empty" style="margin-top:8px;">No symbols to analyze yet — scan an image first.</div>'; return; }
  const counts = {};
  allSymbols.forEach(s => { counts[s.text] = (counts[s.text] || 0) + 1; });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([t, c]) => '"' + t + '" ×' + c).join(", ");
  $("symbolResult").innerHTML =
    '<div style="margin-top:12px;">' +
    '<div style="font-size:12.5px;color:#9c9382;margin-bottom:8px;">' + allSymbols.length + ' symbols segmented · ' + Object.keys(counts).length + ' distinct forms</div>' +
    '<div style="font-size:12.5px;margin-bottom:8px;">Most frequent: ' + top + '</div>' +
    '<button class="btn" id="downloadSheetBtn">⬇ Export numbered symbol sheet (PNG)</button></div>';
  $("downloadSheetBtn").addEventListener("click", () => downloadSymbolSheet(allSymbols));
});
function downloadSymbolSheet(symbols) {
  const cell = 64, cols = 10, rows = Math.ceil(symbols.length / cols);
  const canvas = document.createElement("canvas");
  canvas.width = cols * cell; canvas.height = rows * cell;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#1b1812"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  symbols.forEach((s, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x0 = s.bbox.x0, y0 = s.bbox.y0, w = s.bbox.x1 - s.bbox.x0, h = s.bbox.y1 - s.bbox.y0;
    const dx = col * cell, dy = row * cell, pad = 4;
    const fit = Math.min((cell - pad * 2) / w, (cell - pad * 2) / h);
    ctx.drawImage($("mainImage"), x0, y0, w, h, dx + pad, dy + pad, w * fit, h * fit);
    ctx.strokeStyle = "#4c8577"; ctx.strokeRect(dx + 1, dy + 1, cell - 2, cell - 2);
    ctx.fillStyle = "#c9b78c"; ctx.font = "9px monospace"; ctx.fillText(String(i + 1), dx + 2, dy + cell - 3);
  });
  const a = document.createElement("a"); a.href = canvas.toDataURL("image/png"); a.download = "symbol-sheet.png"; a.click();
}

$("startOverBtn").addEventListener("click", () => {
  $("app").style.display = "none"; $("dropzone").style.display = "block";
  $("mainImage").src = ""; state.regions = []; state.selectedIds = new Set();
  document.querySelectorAll(".box").forEach(b => b.remove());
});
