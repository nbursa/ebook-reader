# E-Book Reader - [Demo](https://textcafe.co/books/FAoLSq/?1665166991518)

<img width="1451" alt="Screenshot 2024-07-20 at 10 46 55" src="https://github.com/user-attachments/assets/2aaff208-5e3e-40fa-9c27-ee285838fa48">

> A Vue.js Book Reader project

A Vue.js-based e-publishing reader for books, comics, brochures, posters, and more. This project has been in production for 6 years without any maintenance, showcasing its robustness and reliability.

## Key Features
- Customizable UI for various reading materials
- Multiple themes and font settings for an optimal user experience
- Offline capabilities with PWA support

## Technology Stack
- **Frontend:** Vue.js, Vuex, SCSS
- **Backend:** Django

## Longevity and Stability
**More than 5 Years in Production:** The project has been running flawlessly since its deployment, handling millions of content displays without requiring maintenance.

---

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

---

## Updating style.sass and ms_templates

To work on ms templates, execute `npm run watch_ms`. This is currently only operational for the `readertemplate.mustache` file.

### Option A
Using an instance where the profile `tc-user` is authorized to access the ingest-pwa-assets bucket on TextCafe AWS. If the default profile has access, you can omit `--profile tc-user`.

```bash
aws s3 cp static/style.sass s3://ingest-pwa-assets/pwa_starter/static/style.sass --profile tc-user
aws s3 sync example-templates/pwa_reader_templates_ms/ s3://ingest-pwa-assets/pwa_reader_templates_ms/ --profile tc-user
```

### Option B
Manually upload the files using the AWS Console:
- [Sass file](https://s3.console.aws.amazon.com/s3/buckets/ingest-pwa-assets/pwa_starter/static/?region=us-east-1&tab=overview)
- [MS templates files](https://s3.console.aws.amazon.com/s3/buckets/ingest-pwa-assets/pwa_reader_templates_ms/?region=us-east-1&tab=overview)

Please keep in mind that only the Sass file and the MS templates files are being tracked. Other files in static are not tracked.
