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


let tesseractReady = !!window.Tesseract;
function ensureTesseract() {
  return new Promise((resolve, reject) => {
    if (window.Tesseract) { resolve(); return; }
    let tries = 0, fallbackAdded = false;
    const check = setInterval(() => {
      tries++;
      if (window.Tesseract) { clearInterval(check); resolve(); }
      else if (tries === 30 && !fallbackAdded) {
        // The primary CDN didn't deliver Tesseract in ~3s; try a second CDN.
        fallbackAdded = true;
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/tesseract.js@4.1.1/dist/tesseract.min.js";
        document.head.appendChild(s);
      }
      else if (tries > 150) { clearInterval(check); reject(new Error("Tesseract failed to load")); }
    }, 100);
  });
}

function photoCanvas(imgEl, scale) {
  const c = document.createElement("canvas");
  c.width = Math.round(imgEl.naturalWidth * scale); c.height = Math.round(imgEl.naturalHeight * scale);
  c.getContext("2d").drawImage(imgEl, 0, 0, c.width, c.height);
  return c;
}
function photoVariants(src) {
  const w = src.width, h = src.height;
  const ctx = src.getContext("2d");
  const data = ctx.getImageData(0, 0, w, h).data;
  const gray = new Uint8ClampedArray(w * h);
  const hist = new Array(256).fill(0);
  for (let i = 0, p = 0; i < gray.length; i++, p += 4) {
    const g = Math.round(0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2]);
    gray[i] = g; hist[g]++;
  }
  // Contrast stretch between the 1st and 99th percentile.
  let lo = 0, hi = 255, acc = 0; const total = gray.length;
  for (let v = 0; v < 256; v++) { acc += hist[v]; if (acc >= total * 0.01) { lo = v; break; } }
  acc = 0; for (let v = 255; v >= 0; v--) { acc += hist[v]; if (acc >= total * 0.01) { hi = v; break; } }
  const span = Math.max(1, hi - lo);
  const stretched = gray.map(g => Math.max(0, Math.min(255, Math.round((g - lo) * 255 / span))));
  // Otsu threshold on the stretched image.
  const h2 = new Array(256).fill(0); stretched.forEach(v => h2[v]++);
  let sumAll = 0; for (let v = 0; v < 256; v++) sumAll += v * h2[v];
  let wB = 0, sumB = 0, best = 0, thr = 128;
  for (let t = 0; t < 256; t++) {
    wB += h2[t]; if (!wB) continue;
    const wF = total - wB; if (!wF) break;
    sumB += t * h2[t];
    const mB = sumB / wB, mF = (sumAll - sumB) / wF;
    const between = wB * wF * (mB - mF) * (mB - mF);
    if (between > best) { best = between; thr = t; }
  }
  const make = fn => {
    const c = document.createElement("canvas"); c.width = w; c.height = h;
    const cx = c.getContext("2d"); const img = cx.createImageData(w, h);
    for (let i = 0, p = 0; i < total; i++, p += 4) {
      const v = fn(i); img.data[p] = img.data[p + 1] = img.data[p + 2] = v; img.data[p + 3] = 255;
    }
    cx.putImageData(img, 0, 0); return c;
  };
  return [
    { name: "grayscale", canvas: make(i => stretched[i]) },
    { name: "inverted", canvas: make(i => 255 - stretched[i]) },
    { name: "black-and-white", canvas: make(i => stretched[i] > thr ? 255 : 0) },
    { name: "inverted black-and-white", canvas: make(i => stretched[i] > thr ? 0 : 255) },
  ];
}
function boxIoU(a, b) {
  const x0 = Math.max(a.x0, b.x0), y0 = Math.max(a.y0, b.y0), x1 = Math.min(a.x1, b.x1), y1 = Math.min(a.y1, b.y1);
  const inter = Math.max(0, x1 - x0) * Math.max(0, y1 - y0);
  const areaA = (a.x1 - a.x0) * (a.y1 - a.y0), areaB = (b.x1 - b.x0) * (b.y1 - b.y0);
  return inter / Math.max(1, areaA + areaB - inter);
}
// Reads the photo with every version and keeps one reading per box.
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
  if (!res.ok) throw Object.assign(new Error("HTTP " + res.status), { code: "NETWORK" });
  const data = await res.json();
  const txt = (data && data.responseData && data.responseData.translatedText) || "";
  // MyMemory reports quota and language errors inside a normal-looking reply.
  // Treat those as failures instead of showing them as the translation.
  if (!txt || /MYMEMORY WARNING|USED ALL AVAILABLE|QUOTA|INVALID LANGUAGE/i.test(txt) || (data.responseStatus && Number(data.responseStatus) !== 200)) {
    const quota = /USED ALL AVAILABLE|QUOTA|MYMEMORY WARNING/i.test(txt);
    throw Object.assign(new Error("MyMemory: " + (txt || "no translation")), { code: quota ? "QUOTA" : "API" });
  }
  return txt;
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

/* ============================================================
   Local translation — Transformers.js running NLLB-200-distilled
   entirely in the browser via ONNX Runtime + WebAssembly/WebGPU.
   No API key, no server, no cost, ever. Real tradeoff: ~600MB model
   download on first use (cached afterward), and noticeably slower
   than MyMemory, especially without WebGPU support. NLLB uses its
   own language codes (FLORES-200, e.g. "eng_Latn"), not the ISO
   codes used elsewhere in this app, so this table maps the ones
   this app supports that NLLB also supports. Languages not in this
   map fall back to MyMemory automatically.
   ============================================================ */
const NLLB_LANG_MAP = {
  en: "eng_Latn", es: "spa_Latn", fr: "fra_Latn", de: "deu_Latn", it: "ita_Latn",
  pt: "por_Latn", ru: "rus_Cyrl", ar: "arb_Arab", "zh-CN": "zho_Hans", "zh-TW": "zho_Hant",
  ja: "jpn_Jpan", ko: "kor_Hang", hi: "hin_Deva", bn: "ben_Beng", pa: "pan_Guru",
  ta: "tam_Taml", te: "tel_Telu", mr: "mar_Deva", gu: "guj_Gujr", ur: "urd_Arab",
  fa: "pes_Arab", tr: "tur_Latn", vi: "vie_Latn", th: "tha_Thai", he: "heb_Hebr",
  el: "ell_Grek", uk: "ukr_Cyrl", ro: "ron_Latn", nl: "nld_Latn", sv: "swe_Latn",
  no: "nob_Latn", da: "dan_Latn", fi: "fin_Latn", pl: "pol_Latn", cs: "ces_Latn",
  sk: "slk_Latn", hu: "hun_Latn", bg: "bul_Cyrl", sr: "srp_Cyrl", hr: "hrv_Latn",
  sl: "slv_Latn", lt: "lit_Latn", lv: "lvs_Latn", et: "est_Latn", ga: "gle_Latn",
  cy: "cym_Latn", is: "isl_Latn", mt: "mlt_Latn", sq: "als_Latn", mk: "mkd_Cyrl",
  bs: "bos_Latn", ka: "kat_Geor", hy: "hye_Armn", az: "azj_Latn", kk: "kaz_Cyrl",
  uz: "uzn_Latn", mn: "khk_Cyrl", my: "mya_Mymr", km: "khm_Khmr", lo: "lao_Laoo",
  ne: "npi_Deva", si: "sin_Sinh", ml: "mal_Mlym", kn: "kan_Knda", id: "ind_Latn",
  ms: "zsm_Latn", tl: "tgl_Latn", sw: "swh_Latn", am: "amh_Ethi", so: "som_Latn",
  zu: "zul_Latn", xh: "xho_Latn", af: "afr_Latn", yo: "yor_Latn", ig: "ibo_Latn",
  ha: "hau_Latn", ht: "hat_Latn", jv: "jav_Latn", su: "sun_Latn", gl: "glg_Latn",
  eu: "eus_Latn", ca: "cat_Latn", be: "bel_Cyrl", gd: "gla_Latn", yi: "ydd_Hebr",
  ps: "pbt_Arab", sd: "snd_Arab", ku: "kmr_Latn", mg: "plt_Latn", ny: "nya_Latn",
  sm: "smo_Latn", st: "sot_Latn", sn: "sna_Latn", tg: "tgk_Cyrl", tk: "tuk_Latn",
};

let nllbPipelinePromise = null;
function loadNllbPipeline() {
  if (!nllbPipelinePromise) {
    nllbPipelinePromise = import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1")
      .then(mod => mod.pipeline("translation", "Xenova/nllb-200-distilled-600M", {
        progress_callback: (p) => {
          if (p && p.status === "progress" && p.file) {
            const pct = p.total ? Math.round((p.loaded / p.total) * 100) : null;
            setLocalEngineStatus("Downloading local model (" + p.file + ")" + (pct != null ? " · " + pct + "%" : "") + " — one-time only, cached after this.");
          } else if (p && p.status === "ready") {
            setLocalEngineStatus("Local model ready.");
          }
        },
      }));
  }
  return nllbPipelinePromise;
}

function setLocalEngineStatus(text) {
  const el = $("localEngineStatus");
  if (!text) { el.style.display = "none"; el.textContent = ""; return; }
  el.style.display = "block"; el.textContent = text;
}

async function localNllbTranslate(text, src, tgt, onProgress) {
  const srcCode = NLLB_LANG_MAP[src], tgtCode = NLLB_LANG_MAP[tgt];
  if (!srcCode || !tgtCode) { const e = new Error("Language not supported by the local model"); e.code = "UNSUPPORTED"; throw e; }
  const translator = await loadNllbPipeline();
  setLocalEngineStatus("");
  const chunks = chunkText(text, 700);
  const out = [];
  for (let i = 0; i < chunks.length; i++) {
    if (onProgress) onProgress(i + 1, chunks.length);
    const result = await translator(chunks[i], { src_lang: srcCode, tgt_lang: tgtCode });
    out.push((result && result[0] && result[0].translation_text) || "");
  }
  return out.join(" ");
}

async function translateWithSelectedEngine(text, src, tgt, onProgress) {
  // Online first: MyMemory is free and needs no key. If it fails (for example
  // its daily free limit is used up), fall back to the free offline model.
  try {
    return { out: await myMemoryTranslate(text, src, tgt, onProgress), engineNote: "" };
  } catch (onlineErr) {
    try {
      const out = await localNllbTranslate(text, src, tgt, onProgress);
      return { out, engineNote: "Online translation was unavailable, so this used the offline model." };
    } catch {
      throw onlineErr;
    }
  }
}


/* ============================================================
   Katy Translate — photo translation to English.
   Point at text in a photo, tap or swipe the boxes you want, and the
   words appear in the white bar with their English translation in the
   blue bar. Hover (mouse) previews one box. Nothing else.
   ============================================================ */
const state = { regions: [], selectedIds: new Set(), hoverId: null, pendingAutoScan: false };
const TARGET = "en";
function $(id) { return document.getElementById(id); }
function setStatus(msg) { $("status").textContent = msg || ""; }
function escapeHtml(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
function scale() { const img = $("mainImage"); return img.naturalWidth ? img.clientWidth / img.naturalWidth : 1; }

/* Languages read in one pass each. The first pack gets all four image
   versions; the others get two, to keep scans from taking forever. */
const OCR_PACKS = [
  { langs: "eng+spa+fra+deu+ita+por", variants: 4 },
  { langs: "nld+pol+ron+vie+tur+swe", variants: 2 },
  { langs: "dan+fin+ces+hun+ind+cat", variants: 2 },
  { langs: "rus+ukr+bul+srp", variants: 2 },
  { langs: "ell", variants: 2 },
  { langs: "ara+fas+urd", variants: 2 },
  { langs: "heb", variants: 2 },
  { langs: "hin+mar", variants: 2 },
  { langs: "tha", variants: 2 },
  { langs: "chi_sim+jpn+kor", variants: 2 },
];
const MIN_WORD_CONFIDENCE = 10;

/* ---------- Photo in, boxes out ---------- */
$("dropzone").addEventListener("click", () => $("fileInput").click());
$("uploadBtn").addEventListener("click", e => { e.stopPropagation(); $("fileInput").click(); });
$("cameraBtn").addEventListener("click", e => { e.stopPropagation(); $("cameraInput").click(); });
$("newPhotoBtn").addEventListener("click", () => $("cameraInput").click());
$("fileInput").addEventListener("change", e => handleFile(e.target.files[0]));
$("cameraInput").addEventListener("change", e => handleFile(e.target.files[0]));
$("newImageBtn").addEventListener("click", resetAll);

function handleFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    state.regions = []; state.selectedIds = new Set(); state.hoverId = null;
    state.pendingAutoScan = true;
    $("mainImage").src = e.target.result;
    $("dropzone").style.display = "none";
    $("app").style.display = "block";
    renderBoxes(); renderSelectionText(); setOutput("");
    setStatus("Reading the photo…");
  };
  reader.readAsDataURL(file);
}
function resetAll() {
  state.regions = []; state.selectedIds = new Set(); state.hoverId = null;
  $("mainImage").removeAttribute("src");
  document.querySelectorAll(".box").forEach(b => b.remove());
  $("app").style.display = "none"; $("dropzone").style.display = "";
  renderSelectionText(); setOutput(""); setStatus("");
}
$("mainImage").addEventListener("load", () => {
  if (state.pendingAutoScan) { state.pendingAutoScan = false; scanPhoto(); }
});

function renderBoxes() {
  document.querySelectorAll(".box").forEach(b => b.remove());
  const s = scale();
  state.regions.forEach(r => {
    const div = document.createElement("div");
    div.className = "box";
    div.dataset.id = r.id;
    div.title = r.text;
    Object.assign(div.style, {
      left: (r.bbox.x0 * s) + "px", top: (r.bbox.y0 * s) + "px",
      width: ((r.bbox.x1 - r.bbox.x0) * s) + "px", height: ((r.bbox.y1 - r.bbox.y0) * s) + "px",
    });
    div.addEventListener("click", () => { if (Date.now() < suppressClickUntil) return; toggle(r.id); });
    div.addEventListener("pointerenter", e => {
      if (e.pointerType !== "mouse" || swipeOn) return;
      state.hoverId = r.id; refreshBoxClasses(); renderSelectionText();
    });
    div.addEventListener("pointerleave", e => {
      if (e.pointerType !== "mouse") return;
      if (state.hoverId === r.id) state.hoverId = null;
      refreshBoxClasses(); renderSelectionText();
    });
    $("stage").appendChild(div);
  });
  refreshBoxClasses();
}
function refreshBoxClasses() {
  document.querySelectorAll(".box").forEach(b => {
    b.classList.toggle("sel", state.selectedIds.has(b.dataset.id));
    b.classList.toggle("hover", state.hoverId === b.dataset.id);
  });
}
function toggle(id) {
  state.selectedIds.has(id) ? state.selectedIds.delete(id) : state.selectedIds.add(id);
  refreshBoxClasses(); renderSelectionText();
}

/* ---------- Tap, hover, and swipe selection ---------- */
let swipeOn = false, swipeMoved = false, swipeStart = null, swipeBox = null, suppressClickUntil = 0;
$("stage").addEventListener("pointerdown", e => {
  if (e.pointerType === "mouse" && e.button !== 0) return;
  const rect = $("stage").getBoundingClientRect();
  swipeStart = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  swipeOn = true; swipeMoved = false;
  swipeBox = document.createElement("div"); swipeBox.className = "drawrect";
  $("stage").appendChild(swipeBox);
});
$("stage").addEventListener("pointermove", e => {
  if (!swipeOn) return;
  const rect = $("stage").getBoundingClientRect();
  const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
  if (!swipeMoved && Math.hypot(cx - swipeStart.x, cy - swipeStart.y) < 6) return;
  swipeMoved = true; e.preventDefault();
  const x = Math.min(cx, swipeStart.x), y = Math.min(cy, swipeStart.y);
  const w = Math.abs(cx - swipeStart.x), h = Math.abs(cy - swipeStart.y);
  Object.assign(swipeBox.style, { left: x + "px", top: y + "px", width: w + "px", height: h + "px" });
  let changed = false;
  document.querySelectorAll(".box").forEach(div => {
    const bx = parseFloat(div.style.left), by = parseFloat(div.style.top);
    const bw = parseFloat(div.style.width), bh = parseFloat(div.style.height);
    const hit = x <= bx + bw && x + w >= bx && y <= by + bh && y + h >= by;
    if (hit && !state.selectedIds.has(div.dataset.id)) { state.selectedIds.add(div.dataset.id); changed = true; }
  });
  if (changed) { refreshBoxClasses(); renderSelectionText(); }
});
function endSwipe() {
  if (!swipeOn) return;
  swipeOn = false;
  if (swipeBox) { swipeBox.remove(); swipeBox = null; }
  // The click that follows a swipe must not toggle the box back.
  if (swipeMoved) suppressClickUntil = Date.now() + 400;
}
$("stage").addEventListener("pointerup", endSwipe);
$("stage").addEventListener("pointercancel", endSwipe);

$("selectAllBtn").addEventListener("click", () => {
  state.regions.forEach(r => state.selectedIds.add(r.id));
  refreshBoxClasses(); renderSelectionText();
});
function clearSelection() {
  state.selectedIds.clear(); state.hoverId = null;
  refreshBoxClasses(); renderSelectionText(); setOutput("");
}
$("clearSelectionBtn").addEventListener("click", clearSelection);
$("clearAllBtn").addEventListener("click", clearSelection);

/* ---------- Scan: read every pack, merge the best reading of each box ---------- */
function photoScale(img) { return Math.max(1, Math.min(2, 2400 / Math.max(img.naturalWidth, img.naturalHeight))); }
async function readPack(img, langs, count, onProgress) {
  const s = photoScale(img);
  const variants = photoVariants(photoCanvas(img, s)).slice(0, count);
  const out = [];
  for (let i = 0; i < variants.length; i++) {
    const r = await Tesseract.recognize(variants[i].canvas, langs, {
      tessedit_pageseg_mode: "11",
      logger: m => { if (m.status && m.progress != null && onProgress) onProgress(Math.round(m.progress * 100) + "%"); },
    });
    const unscale = b => ({ x0: b.x0 / s, y0: b.y0 / s, x1: b.x1 / s, y1: b.y1 / s });
    for (const w of (r.data.words || [])) {
      if (!w.text || !w.text.trim() || w.confidence < MIN_WORD_CONFIDENCE) continue;
      out.push({ text: w.text.trim(), confidence: w.confidence, bbox: unscale(w.bbox) });
    }
  }
  return out;
}
function mergeReadings(list) {
  const sorted = list.slice().sort((a, b) => b.confidence - a.confidence);
  const kept = [];
  for (const c of sorted) if (!kept.some(k => boxIoU(k.bbox, c.bbox) > 0.5)) kept.push(c);
  return kept.sort((a, b) => a.bbox.y0 - b.bbox.y0 || a.bbox.x0 - b.bbox.x0);
}
async function scanPhoto() {
  $("scanBtn").disabled = true;
  $("scanOverlay").style.display = "block";
  $("scanBar").style.display = "block"; // sweeps left to right three times while reading
  const all = [];
  const failed = [];
  // Keep whatever boxes the user already selected, matched by position.
  const showRegions = (first) => {
    const prev = state.regions.filter(r => state.selectedIds.has(r.id)).map(r => r.bbox);
    state.regions = mergeReadings(all).map((w, i) => ({ id: "w" + i, text: w.text, confidence: w.confidence, bbox: w.bbox }));
    state.selectedIds = new Set(state.regions.filter(r => prev.some(b => boxIoU(b, r.bbox) > 0.5)).map(r => r.id));
    state.hoverId = null;
    renderBoxes(); renderSelectionText();
    if (first) setOutput("");
  };
  const runPack = async (p, variants) => {
    try {
      await readPack($("mainImage"), OCR_PACKS[p].langs, variants, pct => setStatus("Reading languages, group " + (p + 1) + " of " + OCR_PACKS.length + " · " + pct))
        .then(got => all.push(...got));
    } catch (err) {
      failed.push(OCR_PACKS[p].langs); console.error("pack failed", OCR_PACKS[p].langs, err);
    }
  };
  try {
    await ensureTesseract();
    // Fast first pass: the main languages, two image versions. Boxes show as soon as it is done.
    await runPack(0, 2);
    if (failed.length === 1) throw new Error("main language pack failed to load");
    showRegions(true);
    $("scanOverlay").style.display = "none";
    $("scanBar").style.display = "none";
    setStatus("Found " + state.regions.length + " words. Reading more languages in the background…");
    // The rest of the languages: their boxes are added as each group finishes.
    for (let p = 1; p < OCR_PACKS.length; p++) {
      await runPack(p, OCR_PACKS[p].variants);
      showRegions(false);
    }
    const note = failed.length ? " (" + failed.length + " language group(s) couldn't load.)" : "";
    setStatus((state.regions.length
      ? "Tap or swipe the boxes you want. Hover a box on a computer to preview one word."
      : "No text found in this photo. Try a sharper or brighter photo.") + note);
  } catch (err) {
    setStatus("Couldn't read the photo. Check your connection and try again.");
    console.error(err);
  } finally {
    $("scanBtn").disabled = false;
    $("scanOverlay").style.display = "none";
    $("scanBar").style.display = "none";
  }
}
$("scanBtn").addEventListener("click", scanPhoto);

/* ---------- Selected boxes → rows → language pieces ---------- */
function selectedRows() {
  const ids = (state.hoverId && !state.selectedIds.has(state.hoverId)) ? new Set([state.hoverId]) : state.selectedIds;
  const regs = state.regions.filter(r => ids.has(r.id))
    .sort((a, b) => a.bbox.y0 - b.bbox.y0 || a.bbox.x0 - b.bbox.x0);
  const rows = [];
  for (const r of regs) {
    const yc = (r.bbox.y0 + r.bbox.y1) / 2, h = r.bbox.y1 - r.bbox.y0;
    const last = rows[rows.length - 1];
    if (last && Math.abs(yc - last.yc) < 0.6 * Math.max(h, last.h)) last.regs.push(r);
    else rows.push({ regs: [r], yc, h });
  }
  return rows.map(row => row.regs.slice().sort((a, b) => a.bbox.x0 - b.bbox.x0));
}
function scriptOf(word) {
  if (/[Ѐ-ӿ]/.test(word)) return "cyr";
  if (/[Ͱ-Ͽ]/.test(word)) return "grk";
  if (/[؀-ۿ]/.test(word)) return "ara";
  if (/[֐-׿]/.test(word)) return "heb";
  if (/[ऀ-ॿ]/.test(word)) return "hin";
  if (/[฀-๿]/.test(word)) return "tha";
  if (/[぀-ヿ]/.test(word)) return "jpn";
  if (/[가-힯]/.test(word)) return "kor";
  if (/[一-鿿]/.test(word)) return "cjk";
  if (/[A-Za-zÀ-ÿ]/.test(word)) return "lat";
  return null;
}
function selectedSegments() {
  const segs = [];
  for (const row of selectedRows()) {
    let cur = null;
    for (const r of row) {
      const s = scriptOf(r.text);
      if (cur && (s === null || s === cur.script)) { cur.words.push(r.text); if (s && !cur.script) cur.script = s; }
      else { if (cur) segs.push(cur); cur = { words: [r.text], script: s }; }
    }
    if (cur) segs.push(cur);
  }
  return segs.map(s => ({ text: s.words.join(" "), script: s.script })).filter(s => s.text.trim());
}
function renderSelectionText() {
  $("selectionText").textContent = selectedRows().map(row => row.map(r => r.text).join(" ")).join("\n").trim();
  scheduleTranslate();
}

/* ---------- Translation output (blue bar) ---------- */
let runSeq = 0, liveTimer = null, lastOut = "", lastOutLang = TARGET;
function setOutput(html) { $("translationResult").innerHTML = html; }
function scheduleTranslate(delay) {
  clearTimeout(liveTimer);
  liveTimer = setTimeout(runTranslate, delay == null ? 300 : delay);
}
async function languageForSegment(text, script) {
  const map = { cyr: ["ru", "Russian"], grk: ["el", "Greek"], ara: ["ar", "Arabic"], heb: ["he", "Hebrew"],
    hin: ["hi", "Hindi"], tha: ["th", "Thai"], jpn: ["ja", "Japanese"], kor: ["ko", "Korean"], cjk: ["zh-CN", "Chinese"] };
  if (script && map[script]) return { lang: map[script][0], note: map[script][1] };
  const detected = await detectLanguage(text);
  if (detected) return { lang: detected, note: "Detected: " + langLabel(detected) };
  return { lang: "en", note: "Couldn't confidently detect the language, so it was treated as English." };
}
async function runTranslate() {
  const mySeq = ++runSeq;
  const segs = selectedSegments();
  if (!segs.length) { lastOut = ""; setOutput(""); return; }
  try {
    const tagged = [];
    for (const seg of segs) {
      const g = await languageForSegment(seg.text, seg.script);
      if (mySeq !== runSeq) return;
      tagged.push({ text: seg.text, lang: g.lang, note: g.note });
    }
    // Neighbouring pieces in the same language become one paragraph: fewer requests.
    const runs = [];
    for (const t of tagged) {
      const last = runs[runs.length - 1];
      if (last && last.lang === t.lang) last.text += " " + t.text;
      else runs.push({ ...t });
    }
    const results = [];
    for (const run of runs) {
      const { out, engineNote } = await translateWithSelectedEngine(run.text, run.lang, TARGET,
        (n, t) => { if (mySeq === runSeq) setStatus("Translating part " + n + " of " + t + "…"); });
      if (mySeq !== runSeq) return;
      results.push({ out, note: run.note, engineNote });
    }
    setStatus("");
    lastOut = results.map(r => r.out).join("\n"); lastOutLang = TARGET;
    setOutput(results.map(r =>
      (r.note ? '<div class="meta">' + escapeHtml(r.note) + '</div>' : '') +
      (r.engineNote ? '<div class="meta warn">' + escapeHtml(r.engineNote) + '</div>' : '') +
      '<div class="result-text">' + escapeHtml(r.out) + '</div>').join('') +
      '<div class="result-actions">' +
        '<button class="iconbtn speak-btn" title="Listen" aria-label="Listen">🔊</button>' +
        '<button class="iconbtn copy-btn" title="Copy" aria-label="Copy translation">📋</button>' +
      '</div>');
  } catch (err) {
    if (mySeq !== runSeq) return;
    const msg = err && err.code === "QUOTA"
      ? "Today's free translation limit is used up. Try again tomorrow."
      : "Translation failed. Check your connection and try again.";
    setOutput('<div class="meta warn">' + escapeHtml(msg) + '</div>');
  }
}
// Blue bar: tap it to translate the selection again. Listen and Copy buttons work here too.
document.addEventListener("click", e => {
  if (e.target.closest(".speak-btn") && lastOut) speak(lastOut, lastOutLang);
  if (e.target.closest(".copy-btn") && lastOut && navigator.clipboard) navigator.clipboard.writeText(lastOut);
  if (e.target.closest("#translationResult") && !e.target.closest("button") && lastOut) scheduleTranslate(0);
});

/* ---------- Read aloud (browser voices, best match for the language) ---------- */
let availableVoices = [];
function loadVoices() { if ("speechSynthesis" in window) availableVoices = window.speechSynthesis.getVoices() || []; }
function voiceQualityScore(v) {
  const n = v.name.toLowerCase(); let score = 0;
  if (/neural|natural|premium|enhanced|studio/.test(n)) score += 3;
  if (/google/.test(n)) score += 2;
  if (v.localService === false) score += 1;
  if (/compact|espeak|robot/.test(n)) score -= 3;
  return score;
}
function bestVoiceForLang(code) {
  const prefix = (code || "en").split("-")[0].toLowerCase();
  const matches = availableVoices.filter(v => v.lang.toLowerCase().startsWith(prefix));
  return matches.sort((a, b) => voiceQualityScore(b) - voiceQualityScore(a))[0] || null;
}
if ("speechSynthesis" in window) { loadVoices(); window.speechSynthesis.addEventListener("voiceschanged", loadVoices); }
function speak(text, langCode) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = langCode || TARGET;
  const voice = bestVoiceForLang(langCode);
  if (voice) utter.voice = voice;
  utter.rate = 0.95;
  window.speechSynthesis.speak(utter);
}

/* ---------- Start ---------- */
renderSelectionText();
