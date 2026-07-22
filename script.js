const LANGS = [
  { code: "en", label: "English" }, { code: "es", label: "Spanish" },
  { code: "fr", label: "French" }, { code: "de", label: "German" },
  { code: "it", label: "Italian" }, { code: "pt", label: "Portuguese" },
  { code: "ru", label: "Russian" }, { code: "ar", label: "Arabic" },
  { code: "zh-CN", label: "Chinese" }, { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" }, { code: "hi", label: "Hindi" },
  { code: "kn", label: "Kannada" }, { code: "ga", label: "Irish" },
  { code: "nl", label: "Dutch" }, { code: "sv", label: "Swedish" },
  { code: "pl", label: "Polish" }, { code: "tr", label: "Turkish" },
  { code: "vi", label: "Vietnamese" }, { code: "th", label: "Thai" },
  { code: "he", label: "Hebrew" }, { code: "el", label: "Greek" },
  { code: "uk", label: "Ukrainian" }, { code: "ro", label: "Romanian" },
];
const langLabel = c => (LANGS.find(l => l.code === c) || {}).label || c;

let state = {
  regions: [], selectedIds: new Set(), mode: "standard", heatmap: false,
  chain: ["en", "ar", "de"], notes: [], naturalW: 0, naturalH: 0,
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
fillLangSelect($("targetLang"), false);
$("targetLang").value = "en";
fillLangSelect($("chainAddSelect"), false);
$("chainAddSelect").value = "fr";

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
  });
});

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
    div.title = r.text + " · " + Math.round(r.confidence) + "% confidence";
    div.addEventListener("click", () => {
      state.selectedIds.has(r.id) ? state.selectedIds.delete(r.id) : state.selectedIds.add(r.id);
      renderBoxes(); renderSelectionText();
      $("translationResult").innerHTML = ""; $("explanationResult").innerHTML = ""; $("reverseResult").innerHTML = "";
    });
    $("stage").appendChild(div);
  });
}

function selectedText() {
  return state.regions.filter(r => state.selectedIds.has(r.id))
    .sort((a, b) => a.bbox.y0 - b.bbox.y0 || a.bbox.x0 - b.bbox.x0)
    .map(r => r.text).join(" ").trim();
}
function renderSelectionText() {
  const t = selectedText();
  $("selectionText").innerHTML = t ? escapeHtml(t) : '<span class="empty">Tap boxes on the image to build a selection.</span>';
}
function escapeHtml(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

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
    setStatus("Scanning…");
    const result = await Tesseract.recognize($("mainImage").src, "eng", {
      logger: m => { if (m.status && m.progress != null) setStatus(m.status + " · " + Math.round(m.progress * 100) + "%"); }
    });
    const words = result.data.words || [];
    const threshold = state.mode === "standard" ? 55 : 0;
    state.regions = words.filter(w => w.text.trim().length > 0 && w.confidence >= threshold).map((w, i) => ({
      id: "w" + i, text: w.text, confidence: w.confidence, bbox: w.bbox,
      symbols: (w.symbols || []).map((s, j) => ({ id: "w" + i + "s" + j, text: s.text, confidence: s.confidence, bbox: s.bbox }))
    }));
    renderBoxes();
    setStatus("Found " + state.regions.length + " region" + (state.regions.length === 1 ? "" : "s") + ".");
  } catch (err) {
    setStatus("OCR failed to load — check your network settings for this chat, or that pop-up/script blockers aren't active.");
    console.error(err);
  } finally {
    $("scanBtn").disabled = false;
  }
});

// Manual region drawing
let drawStart = null, drawDiv = null;
$("stage").addEventListener("mousedown", e => {
  if (state.mode !== "manual") return;
  const rect = $("stage").getBoundingClientRect();
  drawStart = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  drawDiv = document.createElement("div"); drawDiv.className = "drawrect";
  $("stage").appendChild(drawDiv);
});
$("stage").addEventListener("mousemove", e => {
  if (state.mode !== "manual" || !drawStart) return;
  const rect = $("stage").getBoundingClientRect();
  const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
  const x = Math.min(cx, drawStart.x), y = Math.min(cy, drawStart.y);
  const w = Math.abs(cx - drawStart.x), h = Math.abs(cy - drawStart.y);
  Object.assign(drawDiv.style, { left: x + "px", top: y + "px", width: w + "px", height: h + "px" });
});
$("stage").addEventListener("mouseup", async () => {
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
    const result = await Tesseract.recognize(canvas.toDataURL(), "eng");
    const text = result.data.text.trim() || "(no text found)";
    const id = "manual" + Date.now();
    state.regions.push({ id, text, confidence: result.data.confidence || 50, bbox: { x0, y0, x1, y1 }, symbols: [], manual: true });
    state.selectedIds.add(id);
    renderBoxes(); renderSelectionText();
    setStatus("Manual region added.");
  } catch { setStatus("Couldn't read that region."); }
});

async function myMemoryTranslate(text, src, tgt) {
  const url = "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(text) + "&langpair=" + src + "|" + tgt;
  const res = await fetch(url);
  const data = await res.json();
  return (data && data.responseData && data.responseData.translatedText) || "(no translation returned)";
}
async function askClaude(prompt) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content: prompt }] })
  });
  const data = await response.json();
  return (data.content || []).map(b => b.text || "").join("\n").trim();
}

async function detectLanguage(text) {
  const codeList = LANGS.map(l => l.code + "=" + l.label).join(", ");
  const prompt = 'Identify the language of the following text. Choose the single best-matching code from this exact list (format code=name): ' + codeList + '. Respond with ONLY the two/four-letter code itself, nothing else, no punctuation.\n\nText: "' + text + '"';
  const out = await askClaude(prompt);
  const code = (out || "").trim().toLowerCase().replace(/[^a-z-]/g, "");
  const match = LANGS.find(l => l.code.toLowerCase() === code);
  return match ? match.code : null;
}

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
    const out = await myMemoryTranslate(t, src, $("targetLang").value);
    $("translationResult").innerHTML =
      (detectedNote ? '<div style="font-size:12px;color:#9c9382;margin-bottom:6px;">' + escapeHtml(detectedNote) + '</div>' : '') +
      '<div class="result-box">' + escapeHtml(out) + '</div>';
  } catch { $("translationResult").innerHTML = '<div class="result-box">Translation request failed.</div>'; }
  $("translateBtn").disabled = false; $("translateBtn").textContent = "Translate";
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
  } catch { $("explanationResult").innerHTML = '<div class="explain-box">Couldn\'t reach the explanation service.</div>'; }
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
  const a = document.createElement("a"); a.href = url; a.download = "palimpsest-workspace.json"; a.click();
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
