# Khushi Shah — Portfolio

## Deploy to GitHub Pages in 4 steps

### Step 1 — Edit package.json
Open `package.json` and replace `YOUR-GITHUB-USERNAME` with your actual GitHub username.

### Step 2 — Install and deploy
```bash
npm install
npm run deploy
```
That's it. Your site will be live at:
`https://YOUR-GITHUB-USERNAME.github.io/khushi-portfolio`

---

## Making changes after deploy

**Any content change** (text, descriptions, links):
1. Edit `src/App.js`
2. Run `npm run deploy`
3. Live in ~60 seconds

**Adding project screenshots:**
1. Add image files to `/public/images/` folder
2. In `src/App.js`, find the `projects` array
3. Replace the gradient strings with: `"url('/images/your-file.jpg')"`
4. Run `npm run deploy`

**Swapping the CSS avatar for a real 3D avatar:**
1. Export your Ready Player Me character as PNG (transparent background)
2. Add the PNG to `/public/images/avatar.png`
3. In `src/App.js`, find the `Avatar` component
4. Replace the entire component body with:
   ```jsx
   <img
     src="/images/avatar.png"
     alt="Khushi Shah"
     style={{ width: 180, height: 220, objectFit: 'contain',
              animation: 'pendulum 3.8s ease-in-out infinite',
              transformOrigin: 'top center' }}
   />
   ```
5. Run `npm run deploy`

**Custom domain (optional, ~10 min):**
1. Buy a domain (khushishah.design or similar) from Namecheap (~€10/year)
2. In GitHub repo → Settings → Pages → Custom domain → enter your domain
3. In your domain's DNS settings, add a CNAME record pointing to `YOUR-USERNAME.github.io`
4. Done — HTTPS is automatic

---

## Run locally (to preview before deploying)
```bash
npm start
```
Opens at http://localhost:3000
