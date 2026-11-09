# Sai Kishore: portfolio

A static, single-page portfolio in plain HTML, CSS and JavaScript. It has no dependencies, no build step and no backend.

```
index.html         all content
css/style.css      all styles, with the color tokens at the top
js/main.js         phone menu, active section, scroll animations
assets/            favicon, and later your resume, headshot and project screenshots
.nojekyll          tells GitHub Pages to serve the files as they are
```

## Edit your content

Open `index.html` and edit the text directly. Search the file for `TODO` and `[` to find every placeholder.

- **Links:** any link with `href=""` is hidden automatically. Paste the real URL to show its icon. Email links use the form `mailto:you@example.com`.
- **Resume:** save it as `assets/resume.pdf` and set the Resume links to `href="assets/resume.pdf"`. It appears in both the About section and the footer.
- **Headshot:** save it as `assets/headshot.jpg` (about 600 × 750 px, under 150 KB) and follow the comment in the About section.
- **Project screenshots:** save a 1280 × 720 WebP or JPG in `assets/projects/` and follow the comment in the Projects section.
- **Adding items:** copy an existing job, project or certification block and edit it.
- **Favicon:** `assets/favicon.svg` is a placeholder you can replace.

To preview, open `index.html` in a browser. For an exact preview, run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Deploy

**GitHub Pages**

1. Create a repository named `your-username.github.io` (or any name), and upload these files to the `main` branch with `index.html` at the top level.
2. Go to **Settings → Pages**, set **Source** to **Deploy from a branch**, then choose `main` and `/ (root)`.
3. The site goes live at `https://your-username.github.io` (or `https://your-username.github.io/repo-name/`) within a few minutes.

**Netlify**

- Drag this folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or
- Connect the GitHub repository in Netlify, leave the build command empty, and set the publish directory to `/`.

After the site is live, fill in the commented `og:url`, `og:image` and `canonical` tags at the top of `index.html` with your site address.
