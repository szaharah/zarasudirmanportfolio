# Zara Asudirman — Portfolio

A modern, dark-themed personal portfolio website. Single-page, fully responsive, no build step required — just plain HTML, CSS, and JavaScript.

## Files

- `index.html` — page structure and content
- `style.css` — all styling (dark theme, gradients, animations)
- `script.js` — mobile nav, scroll animations, counters, role-text cycling

## How to add your own photo

Right now the hero section shows a placeholder avatar with your initials ("ZA"). To swap in a real photo:

1. Add your image file to this folder, e.g. `photo.jpg`.
2. Open `index.html` and find this block (in the Hero section):

   ```html
   <div class="avatar-photo" id="avatarPhoto">
     <span>ZA</span>
   </div>
   ```

3. Replace it with:

   ```html
   <div class="avatar-photo" id="avatarPhoto">
     <img src="photo.jpg" alt="Zara Asudirman">
   </div>
   ```

That's it — the circular gradient ring and floating badges will automatically wrap around your photo.

## Customizing content

- Update your name, role, and bio text directly in `index.html`.
- Replace the placeholder Projects (`#projects` section) with your real projects, links, and tech tags.
- Update the Experience/Education timeline with your real history.
- Update social links (GitHub, LinkedIn, email) in the header and footer.
- To change the color theme, edit the CSS variables at the top of `style.css`:

  ```css
  :root{
    --accent: #7c5cff;   /* primary accent color */
    --accent-2: #ff5c8a; /* secondary accent color */
    --accent-3: #21e6c1; /* tertiary accent color */
  }
  ```

## Deploying with GitHub Pages

1. Create a new repository on GitHub (e.g. `portfolio` or `yourusername.github.io`).
2. Upload these three files (`index.html`, `style.css`, `script.js`) plus your photo to the repository root.
3. Go to the repo's **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, choose the `main` branch and `/ (root)` folder, then save.
5. GitHub will give you a live URL, usually `https://yourusername.github.io/portfolio/` (or `https://yourusername.github.io/` if the repo is named `yourusername.github.io`).

That's it — your portfolio is live and shareable.
