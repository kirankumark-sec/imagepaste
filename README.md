# imagepaste

<div align="center">

<img src="assets/favicon.svg" alt="PasteBoard Logo" width="80" height="80" />

# PasteBoard

### Instant Image Embeds — No Servers. No Storage. No Nonsense.

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-kirankumark--sec.github.io%2Fimagepaste-00e0ff?style=for-the-badge&labelColor=080810)](https://kirankumark-sec.github.io/imagepaste/)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-181717?style=for-the-badge&logo=github&logoColor=white)](https://kirankumark-sec.github.io/imagepaste/)
[![License: MIT](https://img.shields.io/badge/License-MIT-7b61ff?style=for-the-badge)](LICENSE)

![CSS](https://img.shields.io/badge/CSS-38.8%25-264de4?style=flat-square&logo=css3&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-32.7%25-e34c26?style=flat-square&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-28.5%25-f7df1e?style=flat-square&logo=javascript&logoColor=black)

</div>

---

## 🎯 What is PasteBoard?

**PasteBoard** is a zero-dependency, browser-based tool that converts any image into ready-to-use embed codes — instantly. No file uploads, no external servers, no accounts. Just drop your image and copy the code you need.

> **The problem it solves:** Developers and content creators often need to embed images directly in HTML, Markdown, or CSS without hosting them on a separate server. PasteBoard converts images to Base64 data URIs and generates all the embed code formats you need in one click.

---

## ✨ Features

| Feature | Description |
|---|---|
| **3 Upload Methods** | Click to browse · Drag & Drop anywhere · `Ctrl+V` clipboard paste |
| **5 Embed Formats** | HTML `<img>`, Markdown, CSS background, Base64 string, Full Data URL |
| **Live Preview** | Instant image preview with checkered transparency background |
| **Image Stats** | Dimensions, file size, MIME type, aspect ratio, Base64 size |
| **One-Click Copy** | Per-format copy buttons with visual confirmation feedback |
| **Session History** | Quick-access thumbnail grid of all images from your current session |
| **Download Button** | Save the original image back to disk |
| **Zero Dependencies** | Pure HTML + CSS + JavaScript — no npm, no frameworks, no build step |
| **100% Private** | Everything runs in your browser. Nothing ever leaves your device. |
| **Works Offline** | Clone and open `index.html` — no internet required |

---

## 🚀 Live Demo

**👉 [kirankumark-sec.github.io/imagepaste](https://kirankumark-sec.github.io/imagepaste/)**

Try it right now:
1. Open the link above
2. Drag any image onto the page — or press `Ctrl+V` to paste from clipboard
3. Click any tab (HTML / Markdown / CSS / Base64 / Data URL)
4. Hit **Copy** and paste it anywhere

---

## 📦 Embed Formats Explained

```html
<!-- HTML <img> tag — paste into any .html file -->
<img src="data:image/png;base64,iVBORw0KGgo..." width="800" height="600" />
```

```markdown
<!-- Markdown — works in GitHub, Notion, Obsidian, Bear -->
![filename.png](data:image/png;base64,iVBORw0KGgo...)
```

```css
/* CSS background — no image file needed on your server */
.element {
  background-image: url("data:image/png;base64,iVBORw0KGgo...");
  background-size: cover;
}
```

```
Base64 string  →  Raw encoded data for APIs & JSON payloads
Data URL       →  Complete data:image/…;base64,… URI
```

---

## 🗂️ Project Structure

```
imagepaste/
├── index.html          ← Single-page app UI & structure
├── style.css           ← Dark obsidian theme, animations, layout
├── script.js           ← File processing, embed generation, copy logic
├── assets/
│   └── favicon.svg     ← SVG favicon
└── README.md
```

---

## 🛠️ Run Locally

No install needed. Seriously.

```bash
# Clone the repo
git clone https://github.com/kirankumark-sec/imagepaste.git
cd imagepaste

# Option 1 — just open the file
open index.html

# Option 2 — local dev server (optional)
npx serve .

# Option 3 — Python server
python3 -m http.server 8080
```

---

## 🌐 Deploy Your Own

This project is designed for **GitHub Pages** — zero configuration.

1. **Fork** this repository
2. Go to **Settings → Pages**
3. Under *Source*, choose `main` branch → `/ (root)` → **Save**
4. Your copy goes live at `https://yourusername.github.io/imagepaste/`

No CI/CD pipeline. No Docker. No cloud accounts. Just static files.

---

## 🧠 How It Works

```
User drops / pastes image
        ↓
FileReader API reads the file as a Data URL (Base64)
        ↓
Image element loads → extracts natural width & height
        ↓
Five embed code formats generated in-memory
        ↓
Rendered in tabbed code blocks, ready to copy
```

All processing uses the native browser **FileReader API** and **Canvas API** — no external libraries involved.

---

## 🔒 Privacy First

- ✅ No network requests made with your image data
- ✅ No analytics or tracking scripts
- ✅ No cookies stored
- ✅ No server — GitHub Pages serves only static files
- ✅ Your images never leave your browser tab

---

## 🧩 Use Cases

- **Web Developers** — Embed images in HTML prototypes without a CDN
- **Email Designers** — Inline images in HTML emails without external hosts
- **Technical Writers** — Embed screenshots in Markdown docs and READMEs
- **No-Code Builders** — Use image data URIs in tools that don't allow file uploads
- **Security Teams** — Share screenshots in internal docs without uploading to cloud storage

---

## 🙌 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-idea`
3. Commit your changes: `git commit -m 'Add your idea'`
4. Push to the branch: `git push origin feature/your-idea`
5. Open a Pull Request

---

## 📄 License

MIT © [Kiran Kumar](https://github.com/kirankumark-sec) — free to use, fork, and deploy.

---

<div align="center">

**Built with pure HTML, CSS & JavaScript · Runs entirely in your browser**

⭐ **If this project helped you, give it a star!** ⭐

[![GitHub Stars](https://img.shields.io/github/stars/kirankumark-sec/imagepaste?style=social)](https://github.com/kirankumark-sec/imagepaste/stargazers)

</div>
