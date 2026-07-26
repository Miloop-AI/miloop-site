# Miloop AI website

Static site. No build step, no framework, no dependencies.

## Structure

```
index.html          Homepage
about.html           About Us page
css/style.css        Single stylesheet
js/main.js            Single script (i18n, nav, services panel, reveal animations)
assets/icons/         Favicons, apple-touch-icon, nav wordmark
assets/img/           Photography used on the homepage
```

Three languages (English, Simplified Chinese, Traditional Chinese) are handled
client-side in `js/main.js` via `data-i18n` / `data-i18n-html` attributes. No
server-side rendering or routing is involved.

## Deploying (Vercel)

1. Push this repo to GitHub under the Miloop-AI org.
2. In Vercel, import the repo. Framework preset: "Other" (no build command,
   no output directory override needed, it will serve the static files as is).
3. Add the custom domain (miloop.ai and www.miloop.ai) under Project Settings
   > Domains, then add the DNS records Vercel provides at the domain
   registrar (Namecheap).
4. `/api` is reserved for serverless functions (lead-intake chatbot, built
   separately). Nothing in this repo currently uses that path, and there is
   no vercel.json overriding routes, so adding files under `/api` later will
   work with zero additional configuration.

## Language notes

Traditional Chinese (`zh-Hant`) is a script conversion of the Simplified
Chinese copy (same wording and word order), generated with OpenCC. It is not
a separate regional localization.
