# Katy-Translate
# Katy Translate

A camera-first translator that shows its uncertainty instead of hiding it — inspired by the old Google Translate "point your camera at a sign" mode: tap or swipe over the words you want, pick a language, and translate. Built for signage, book pages, inscriptions, and anything else with writing on it, including scripts an OCR engine only partly trusts.

## What it does

- **Photo → text.** Upload or capture a photo. [Tesseract.js](https://tesseract.projectnaptha.com/) runs OCR entirely in the browser and boxes every word it finds. A **script selector** in the toolbar tells it which alphabet to expect (Latin, Cyrillic, Greek, Ancient Greek, Coptic, Hebrew, Arabic, Devanagari, CJK, and more) — OCR can only find words in an alphabet it's been told to look for, so this matters a lot for non-English photos.
- **Four scan modes.**
  - *Standard* — filters out low-confidence noise.
  - *Broad Scan* — keeps everything Tesseract found, confidence filtering off.
  - *Ancient Mode* — same as Broad Scan, plus a symbol workspace for segmenting, counting, and exporting individual glyphs for manual study instead of trusting an auto-translation.
  - *Manual Select* — draw a box yourself and OCR just that region (useful when auto-detection misses something or splits a word oddly).

  Broad Scan and Ancient Mode also switch Tesseract to sparse-text layout analysis, which looks for scattered/isolated words instead of assuming one continuous paragraph — this catches far more of the words in signage or an inscription photo than the default layout mode does.
- **Tap or swipe to select.** Tap a word box to toggle it, or drag across several boxes to grab a whole phrase in one motion — plus Select all / Clear selection buttons.
- **Custom OCR models — free, no API key.** Point the app's existing free Tesseract engine at any community-trained model (e.g. Akkadian cuneiform, Old Persian cuneiform) instead of the built-in language list. See *Free community OCR models* below.
- **Type/paste text directly.** For scripts nothing can OCR — cuneiform, undeciphered scripts like the Voynich manuscript, or dense medieval scribal hands the OCR model won't recognize — a manual text box lets you transcribe by hand (or paste a known reading) and run it through Translate/Explain/Chain/Reverse-check exactly like a tapped selection.
- **Heat map** toggle colors every box by OCR confidence (green/yellow/red) so you can see at a glance what the engine is unsure about.
- **Translate**, powered by the free [MyMemory](https://mymemory.translated.net/) API, with automatic language detection.
- **No practical length limit.** Long selections are split on sentence boundaries and translated in sequence, then stitched back together (see *Known limits* below for the one limit that's outside this app's control).
- **Read aloud** (🔊), using the browser's built-in text-to-speech. Automatically picks the best-sounding voice your device has installed for each language (most systems ship several per language, and the one used by default isn't always the best one) — with a manual voice picker and test button in Settings if you want to override the pick.
- **Translation Chain.** Push text through a sequence of languages, one hop at a time, and watch it drift.
- **Reverse check.** Translate to English and back to the source language, with word-level diff highlighting, as a rough gut-check on translation quality.
- **✨ Explain** and **🔍 Attempt AI reading** (both optional). "Explain" asks Claude for nuance on a translated selection — alternate meanings, idiom, tone, historical/cultural notes. "Attempt AI reading" sends the photo itself to Claude and asks for an honest, hedged attempt at identifying the script and reading what it genuinely can — the right tool for cuneiform or other photos no OCR engine can touch. There's a Settings toggle to run the AI reading automatically every time you scan, so it happens hands-off rather than needing a separate click. Both need your own Anthropic API key; see *Setting up AI features* below.
- **Research workspace.** Save selections + translations as notes, export the whole workspace as JSON.

## Running it

This is a static site — no build step. Either:

- Open `index.html` directly in a browser, or
- Serve the folder (`python3 -m http.server`, GitHub Pages, Netlify, etc.)

All the core features (OCR, translation, swipe-select, read-aloud, symbol export) work with **zero configuration and no API keys**, because they call free public services or run entirely client-side.

## What this app genuinely can't do

Some scripts are outside what OCR/translation tooling — this app's or anyone else's — can handle, and it's worth being upfront about which:

- **Cuneiform, generally.** Standard OCR has no trained data for it. However — see *Free community OCR models* below, because this has a real, free, partial answer now.
- **The Voynich manuscript** (and other genuinely undeciphered scripts). Nobody has translated this — its script, and whether it even encodes a real language, is unsolved. No tool can translate what no one has decoded.
- **Medieval scribal handwriting** (blackletter, insular minuscule, heavily abbreviated hands). This is real, readable Latin, but Tesseract's Latin model is trained on printed text, not handwriting full of abbreviation marks and ligatures — expect poor OCR results here even with the right script selected.

For all three, the **Ancient Text Workspace's "Analyze symbols"** tool is the right approach: it segments, counts, and exports the individual glyphs as a numbered sheet for side-by-side comparison, which mirrors how this research is actually done. And the **manual text box** in the Selection panel lets you type your own transcription or a known reading and run it through translation/explanation like any other selection.

## Free community OCR models (no API key, ever)

The Settings panel has a **Custom OCR model** field that points this app's existing, free, in-browser Tesseract engine at any community-trained model, instead of the built-in list. This is a real (if partial) answer for cuneiform specifically:

- **[tesseract-ocr/tessdata_contrib](https://github.com/tesseract-ocr/tessdata_contrib)** — the official (Apache-2.0 licensed) community data repo for Tesseract itself, maintained by the same project as the OCR engine this app already uses. It includes trained models for **Akkadian cuneiform**, Ancient Greek, and Old Persian, among others.
- **[Melanee-Melanee/Old-Persian-Cuneiform-OCR](https://github.com/Melanee-Melanee/Old-Persian-Cuneiform-OCR)** — a from-scratch Tesseract model specifically for Old Persian cuneiform (a simpler, more alphabet-like script than Sumerian/Akkadian cuneiform), with a working example transliterating part of a real Darius inscription. Licensed CC-BY-NC — personal/non-commercial use only.

To use one: open the model file on GitHub, click "Raw," copy everything in the URL up to (not including) the filename, paste that as the folder URL in Settings along with the language code (e.g. `akk`), and select "Custom model" in the script picker before scanning.

**Setting real expectations:** Old Persian cuneiform is a genuinely different, much simpler script (about 36 signs, semi-alphabetic) than the Sumerian/Akkadian logographic cuneiform on most Mesopotamian tablets (600+ signs, heavily context-dependent) — a model trained for one won't read the other. For general Sumerian/Akkadian tablets, real progress requires the heavier sign-detection pipelines below, which need Python and a GPU, not a browser.

## Free (but heavier) options for general cuneiform

For Sumerian/Akkadian tablets specifically — the majority of what actually turns up in museum photos — genuine sign detection needs a trained computer-vision model (Mask R-CNN or similar object detection), which is too heavy to run in a browser tab. These are real, free, open-source projects built for exactly that, meant to run in **Google Colab** (free GPU, no cost):

- **[cdli-gh/Cuneiform-OCR](https://github.com/cdli-gh/Cuneiform-OCR)** — line and character detection on 2D cuneiform photos using Mask R-CNN.
- **[ElectronicBabylonianLiterature/cuneiform-ocr](https://github.com/ElectronicBabylonianLiterature/cuneiform-ocr)** (and its companion [cuneiform-ocr-classification-detection](https://github.com/ElectronicBabylonianLiterature/cuneiform-ocr-classification-detection)) — a two-stage MMOCR/MMDetection pipeline that's been run on roughly 75,000 real tablet photographs from the eBL platform.
- **[ancient-world-citation-analysis/OCR_Sumerian](https://github.com/ancient-world-citation-analysis/OCR_Sumerian)** — a Colab-ready Jupyter notebook walking through Tesseract-based cuneiform transliteration.

These aren't part of this repo — they're separate Python/PyTorch projects with real dependency-version fussiness (their own docs warn about exact `torch`/`mmcv`/CUDA version pinning). The realistic workflow: run one of these in Colab on your tablet photo, take whatever transliteration or sign-classification it produces, and paste it into this app's **manual text box** to run through Translate/Explain/Reverse-check. That combination — free specialist tooling for the hard vision problem, this app for everything downstream of getting text out of the image — is the most capable fully-free setup available right now.

## Setting up AI features (Explain / AI reading)

These two buttons call Claude directly from the browser and need your own Anthropic API key:

1. Get a key at [console.anthropic.com](https://console.anthropic.com/settings/keys).
2. Paste it into the Settings panel at the top of the app and click **Save key**.
3. That's it — the key is saved only in that browser's local storage on that device. It is **never** written into `script.js`, never committed to git, and never sent anywhere except directly to Anthropic when you click Explain or Attempt AI reading.

Two things worth knowing:

- **This costs money.** Every Explain or AI-reading request is billed to your key by Anthropic's usual API rates. Keep an eye on usage at the console if you're using it a lot.
- **Never commit a key to this repo.** The key lives in your browser's storage, not in these files — if you fork or share this repo, nothing about your key goes with it, and no one else's use of the deployed page can spend your money. Don't paste a key into `script.js` itself; that would expose it to anyone who views the page source.
- **What to actually expect from "Attempt AI reading."** It's prompted to be honest rather than impressive — for most cuneiform photos, a genuinely accurate answer is "this is cuneiform, roughly N signs, likely [period/style], but I can't reliably transliterate the specific signs from this image," not a full translation. That's the real ceiling for photo-based cuneiform reading with any current tool, not a bug in this app. For the Voynich manuscript specifically, no honest answer will include a translation — its script and language are unsolved, full stop.

## Known limits (and what's actually fixable)

**Language auto-detection** now runs entirely client-side: an instant script-based check (Cyrillic, CJK, Arabic, Devanagari, Thai, Greek, Hebrew, and more are detected on sight) followed by a statistical model ([franc](https://github.com/wooorm/franc)) for same-script languages like telling French from Spanish. This replaced an earlier version that tried to call Anthropic's API directly from the browser for detection — that call has no API key and is blocked by the browser outside of Claude's own preview, so it silently failed once deployed. It's fixed now.

**The ✨ Explain and 🔍 AI reading buttons** now work on a plain deployed site — see *Setting up AI features* above. They use your own key with Anthropic's direct-browser-access header rather than a hardcoded key, which is the responsible way to do this without standing up a backend. If you'd rather not have visitors to a shared deployment need their own key each, the alternative is a small serverless proxy (Cloudflare Worker, Vercel/Netlify function) holding one key server-side — a reasonable next step if this becomes a multi-user tool rather than a personal one.

**Translation length** — MyMemory's free API caps each individual request at roughly 500 characters, so this app chunks longer text automatically. MyMemory's free tier also enforces a **daily character quota shared across everyone using this page** (about 5,000 characters/day per IP, or more if you register an email with them). That quota is a property of the free service itself — no amount of client-side code changes it. For real production use or bulk translation, you'd want a paid translation API key.

## Files

- `index.html` — structure
- `style.css` — dark, manuscript-inspired theme
- `script.js` — all app logic

## Credits

OCR by [Tesseract.js](https://tesseract.projectnaptha.com/). Translation by [MyMemory](https://mymemory.translated.net/). Language detection by [franc](https://github.com/wooorm/franc).
