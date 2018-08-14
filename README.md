# TextCafe E-Book Reader

> A Vuejs Book Reader project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



------------------------------

## Updating style.sass and ms_templates

To work on ms templates, execute `npm run watch_ms` . This is currently only operational for the `readertemplate.mustache` file.

### Option A
Using an instance where the profile `tc-user` is authorized to access the ingest-pwa-assets bucket on TextCafe AWS.
Note that if the default profile has access, you can leave out `--profile tc-user`.

```
aws s3 cp static/style.sass s3://ingest-pwa-assets/pwa_starter/static/style.sass --profile tc-user
aws s3 sync example-templates/pwa_reader_templates_ms/ s3://ingest-pwa-assets/pwa_reader_templates_ms/ --profile tc-user
```
### Option B
Manually upload the files using the AWS Console:
- sass file : [link](https://s3.console.aws.amazon.com/s3/buckets/ingest-pwa-assets/pwa_starter/static/?region=us-east-1&tab=overview)
- ms templates files : [link](https://s3.console.aws.amazon.com/s3/buckets/ingest-pwa-assets/pwa_reader_templates_ms/?region=us-east-1&tab=overview)

Please keep in mind that only the sass file and the ms templates files are being tracked. Other files in static are not tracked.