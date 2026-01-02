---
sidebar_position: 13
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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
To make Stirling PDF use an outgoing proxy server (e.g. for checking the license validity):

<Tabs groupId="config-methods">
  <TabItem value="env" label="Environment Variable">
    ```bash
    JAVA_CUSTOM_OPTS="-Dhttp.proxyHost=proxyserver -Dhttp.proxyPort=8888 -Dhttp.nonProxyHosts='localhost|127.0.0.1|127.0.1.1|127.0.0.0/8|::1|10.0.0.0/8|.svc|.cluster.local' -Dhttps.proxyHost=proxyserver -Dhttps.proxyPort=8888 -Dhttps.nonProxyHosts='localhost|127.0.0.1|127.0.1.1|127.0.0.0/8|::1|10.0.0.0/8|.svc|.cluster.local'"
    ```
  </TabItem>
  <TabItem value="docker-run" label="Docker Run">
    ```bash
    docker run -d \
      -p 8080:8080 \
      -e JAVA_CUSTOM_OPTS="-Dhttp.proxyHost=proxyserver -Dhttp.proxyPort=8888 -Dhttp.nonProxyHosts='localhost|127.0.0.1|127.0.1.1|127.0.0.0/8|::1|10.0.0.0/8|.svc|.cluster.local' -Dhttps.proxyHost=proxyserver -Dhttps.proxyPort=8888 -Dhttps.nonProxyHosts='localhost|127.0.0.1|127.0.1.1|127.0.0.0/8|::1|10.0.0.0/8|.svc|.cluster.local'" \
      stirlingtools/stirling-pdf:latest
    ```
  </TabItem>
  <TabItem value="docker-compose" label="Docker Compose">
    ```yaml
    services:
      stirling-pdf:
        image: stirlingtools/stirling-pdf:latest
        environment:
          JAVA_CUSTOM_OPTS: "-Dhttp.proxyHost=proxyserver -Dhttp.proxyPort=8888 -Dhttp.nonProxyHosts='localhost|127.0.0.1|127.0.1.1|127.0.0.0/8|::1|10.0.0.0/8|.svc|.cluster.local' -Dhttps.proxyHost=proxyserver -Dhttps.proxyPort=8888 -Dhttps.nonProxyHosts='localhost|127.0.0.1|127.0.1.1|127.0.0.0/8|::1|10.0.0.0/8|.svc|.cluster.local'"
    ```
  </TabItem>
</Tabs>
