---
sidebar_position: 3
---
# Other Customisations

Stirling PDF offers various other customisation options, such as:

### Defaulting Language
Default language selection via the `APP_LOCALE` environment variable. Accepted values include `de-DE`, `fr-FR`, `ar-AR` and all other languages codes that are within Stirling-PDFs current list.

### Google Search Visability (robots.txt)
Enable or disable search engine visibility with the `ALLOW_GOOGLE_VISIBILITY` variable.

### Custom Root path
Redirect the root path of the application using `APP_ROOT_PATH`.
This is for changing websites like stirlingtools.com to instead host the interface at stirlingtools.com/{APP_ROOT_PATH} like stirlingtools.com/demo

