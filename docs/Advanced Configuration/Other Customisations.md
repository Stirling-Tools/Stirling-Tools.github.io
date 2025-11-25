---
sidebar_position: 13
---
# Other Customisations

Stirling PDF offers various other customisation options, such as:

### Defaulting Language
Default language selection via the `SYSTEM_DEFAULTLOCALE` environment variable. Accepted values include `de-DE`, `fr-FR`, `ar-AR` and all other languages codes that are within Stirling-PDFs current list.

### Google Search Visibility (robots.txt)
Enable or disable search engine visibility with the `ALLOW_GOOGLE_VISIBILITY` variable.

### Custom Root path
Redirect the root path of the application using `APP_ROOT_PATH`.
This is for changing websites like stirlingtools.com to instead host the interface at stirlingtools.com/`APP_ROOT_PATH` like stirlingtools.com/demo

### Enable/Disable Analytics
Analytics can be enabled/disabled with ``SYSTEM_ENABLEANALYTICS`` or
```yaml
system:
  enableAnalytics: 'true'
```
In configs/Settings.yml

### Using an outgoing HTTP(S) proxy
To make Stirling PDF use an outgoing proxy server (e.g. for checking the license validity), the `JAVA_CUSTOM_OPTS` environment variable need to be used to set some Java properties:
```
-Dhttp.proxyHost=proxyserver -Dhttp.proxyPort=8888
-Dhttp.nonProxyHosts="localhost|127.0.0.1|127.0.1.1|127.0.0.0/8|::1|10.0.0.0/8|.svc|.cluster.local"
-Dhttps.proxyHost=proxyserver -Dhttps.proxyPort=888
-Dhttps.nonProxyHosts="localhost|127.0.0.1|127.0.1.1|127.0.0.0/8|::1|10.0.0.0/8|.svc|.cluster.local"
```
