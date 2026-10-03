# HOLA RASA

Professional bilingual Ang Ku Kueh brand website. All local project files are in `C:\Hola Rasa`.

## Pages

- `index.html`: brand hero, filling close-ups, five-flavour switcher, gifting and custom design.
- `products.html`: signature Ang Ku Kueh, other treats and gift sets.
- `gifts.html`: four Baby Full Moon gift sets.
- `customization.html`: company shape/design services and briefing process.
- `order.html`: persistent product list, quantities, reference gift pricing, contact and delivery details.
- `booking.html`: pre-order request with date, occasion and selected product.
- `inquiry.html`: general / corporate inquiries, design references and contact details.
- `about.html`: the brand story and the symbolism of good wishes.

Chinese / English switching preserves current form values and the selected flavour. Language and the product list are device-local preferences. Personal form details remain in page memory and are not saved to localStorage.

## Preview and build

Requires Node.js 20 or newer. No package installation or external dependencies are required.

```powershell
Set-Location -LiteralPath 'C:\Hola Rasa'
npm start
```

Open `http://127.0.0.1:4173`. Alternatively, open `index.html` directly (clipboard functionality and preference storage vary by browser for local files).

```powershell
npm run check
npm run build
```

Build generates eight pre-rendered Chinese pages, with client-side English switching, and a self-contained `dist` folder. The build checks all local asset references and internal page links. Edit `app.js`, `styles.css` and `shell.html`, then rebuild. Generated root HTML pages remain directly usable locally.

## Hosting

Source repository: https://github.com/uksoftware2u/holarasa

Live website: https://uksoftware2u.github.io/holarasa/

GitHub Pages publishes the pre-rendered root files from `main`, with `.nojekyll` preserving plain static output. It was enabled following the user's repeated request to use that specific address. Requests are prepared locally and sent by the customer through WhatsApp; there is no server-side order processing or payment system on Pages.

`netlify.toml` is also ready for a Netlify Git-connected deployment: build command `npm run build`, publish directory `dist`. Cloudflare Pages can use the same command and output directory. Those alternatives still require a hosting account and site connection.

GitHub Pages commercial-use limits still apply: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

## Current request flow

Forms validate details, then show an editable-by-returning review dialog. No request has been sent at that stage. The customer opens WhatsApp and presses Send to deliver the request to **+60 17-393 7708**, the number shown in the supplied brochures. A copy-message fallback is provided.

This version does not collect payments, store orders in a merchant database, confirm bookings automatically, send email, upload reference files to a server, or call a Ninja Cold API. Reference filenames can be included in a brief; the customer must attach the actual files in WhatsApp. The interface explains this clearly. Dates, stock, pack sizes, shipping, payment instructions and final prices are confirmed by the merchant.

## Product content

Five Ang Ku Kueh flavours: Original, Savory, Peanut, Earl Grey and Matcha. Supplied real product photos are used for all fillings and the brand hero. Gift reference prices from the supplied brochures: Wood A RM28, Wood B RM27, Cradle A RM23, Cradle B RM28. Other product prices, ingredients, allergens, pack sizes and storage conditions remain unconfirmed and are not invented.

Brand title follows the user's requested **HOLA RASA**. The supplied **Hola Soon Lee** logo and brochure branding are preserved. Instagram: https://www.instagram.com/holasoonlee/

## Accessibility and privacy

Responsive layouts, semantic landmarks, visible keyboard focus, reduced-motion support, keyboard-controlled flavour tabs, native modal dialogs and labelled forms. All production imagery is local. No analytics, cookies, external fonts or third-party scripts. WhatsApp and Instagram are opened only through explicit customer links. Netlify headers disable camera, microphone and geolocation and restrict framing.

Optional browser WebMCP tools expose product data and the device-local unsent order list; staging products never sends a message, confirms an order or takes payment. Feature detection keeps other browsers unaffected.
