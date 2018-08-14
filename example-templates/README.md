The template system uses Jinja2 to sub in variables. The complete list of variables is provided further down.

In order to define a template, 4 core files are used. The first two are absolutely required.
- index
- inner_page
- sample_not_included
- final_page

Additional files can be used but it is strongly advised to include those into a `_partials` folder so that only the core files are at the root level.

Please, review the `default_ingest_templates` folder for a working example.

The following variables are available within the templates:

- sample.title
- sample.keywords
- sample.description
- sample.coverimage.protocolRelativeURL
- sample.protocolRelativeURL
- author.name
- author.description
- author.links : array of links objects
- publisher.name
- publisher.description
- publisher.links : array of links objects
- sample.navigation.homeURL
- sample.navigation.previousURL
- sample.navigation.nextURL
- purchaseURLs : array of purchaseURL objects [#.customClass,#.literal,#.faviconLink]
- cover.relativePath : url pointing to an image of the cover
- tocHTML
- templateData.linkedinSocialMessageToggle
- templateData.twitterSocialMessageToggle
- templateData.facebookSocialMessageToggle
- templateData.tumblrSocialMessageToggle
- templateData.pinterestSocialMessageToggle
- templateData.linkedinSocialMessage
- templateData.twitterSocialMessage
- templateData.facebookSocialMessage
- templateData.tumblrSocialMessage
- templateData.pinterestSocialMessage
- templateData.generated
- templateData.embedCss
- templateData.cssClasses : array of custom cssClasses [#.id,#.style]

The following variables are only available in the inner_page template:

- originalPage.headContent
- originalPage.bodyTagAttributesString
- originalPage.bodyContent