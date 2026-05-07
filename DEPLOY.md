# Deploy Guide - Ella Du Website

## Architecture

| Domain | Purpose | Path |
|--------|---------|------|
| `elladu.com` | Frontend website | `/` `/music` `/research` `/life` |
| `ella-du-admin.vercel.app` | Sanity Studio (CMS) | `/studio` |

---

## 1. Push to GitHub

```bash
# In your local project folder
cd D:\AEllaPersonalWebsite\website

# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub (e.g. ella-du/website), then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

## 2. Deploy Frontend (elladu.com)

### Vercel Project Setup

1. Go to [vercel.com](https://vercel.com) → Add New Project
2. Import your GitHub repo
3. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Environment Variables**: Add these:

     | Key | Value |
     |-----|-------|
     | `VITE_SANITY_PROJECT_ID` | `zhrziy57` |
     | `VITE_SANITY_DATASET` | `production` |

4. Click Deploy

### Custom Domain

1. Go to Project Settings → Domains
2. Add `elladu.com`
3. Follow Vercel's DNS instructions (add A record / CNAME at your domain registrar)

---

## 3. Deploy Studio Backend (ella-du-admin.vercel.app)

### Option A: Same project, different domain (Recommended)

Deploy the same frontend project to a second Vercel project:

1. In Vercel → Create another project from the same GitHub repo
2. Same build settings as above
3. Add domain `ella-du-admin.vercel.app`
4. Go to Project Settings → Redirects:
   - Source: `/`
   - Destination: `/studio`
   - Status: 308 (Permanent Redirect)

### Option B: Create a minimal Studio-only entry

If you want ONLY the Studio on the admin domain (no website routes), create `studio-entry.html`:

```bash
# After building, the dist/public already has /studio route
# Just redirect / to /studio via Vercel dashboard
```

---

## 4. Sanity CORS Configuration

**IMPORTANT** - Without this, the website cannot fetch data from Sanity.

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select project `zhrziy57`
3. Go to **API → CORS Origins**
4. Add these origins:
   - `http://localhost:3000` (local dev)
   - `https://elladu.com`
   - `https://www.elladu.com`
   - `https://ella-du-admin.vercel.app`

---

## 5. Upload Images to Sanity (Important!)

The static images in `public/images/` work locally, but for production you should upload all images to Sanity as assets:

1. Go to Sanity Studio (`ella-du-admin.vercel.app/studio`)
2. In the left sidebar, click on **Assets**
3. Upload all your images there
4. Then in each document (songs, photos, etc.), select the uploaded images instead of using URLs

Alternatively, keep images in the `public/images/` folder and they will be included in the build.

---

## 6. Update .env on Vercel

In both Vercel projects, add these environment variables:

| Variable | Value |
|----------|-------|
| `VITE_SANITY_PROJECT_ID` | `zhrziy57` |
| `VITE_SANITY_DATASET` | `production` |

---

## Local Development

```bash
npm install
npm run dev
```

Visit:
- Website: `http://localhost:3000`
- Studio: `http://localhost:3000/studio`
- Admin: `http://localhost:3000/admin`
