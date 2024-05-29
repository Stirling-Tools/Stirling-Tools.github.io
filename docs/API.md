---
sidebar_position: 7
id: API
title: API
description: Overview of API offering in S-PDF
tags:
  - API
  
---
# Stirling PDF API

Stirling PDF exposes a simple API for easy integration with external scripts. For an exhaustive list of all available API endpoints and their functions, please refer to the [Swagger Documentation](https://app.swaggerhub.com/apis-docs/Frooodle/Stirling-PDF/).

Stirling-PDF's feature set is not entirely confined to the backend, hence not all functionalities are accessible via the API. Certain operations, such as the "view-pdf" or "visually sign", are executed exclusively on the front-end, and as such, they are only available through the Web-UI. If you encounter a situation where some API endpoints appear to be absent, it is likely attributable to these front-end exclusive features.

Stirling-PDF also has statistic and health endpoints to integrate with monitoring/dashboard applications
[Stats API docs](https://app.swaggerhub.com/apis-docs/Frooodle/Stirling-PDF/0.24.6#/Info)


# Example CURL Commands

## Unix

```
curl -X POST "http://localhost:8080/add-watermark" \
     -H "Content-Type: multipart/form-data" \
     -F "fileInput=@/Users/username/Downloads/sample-1_cropped.pdf" \
     -F "watermarkType=text" \
     -F "watermarkText=YOUR_WATERMARK_TEXT" \
     -F "alphabet=roman" \
     -F "fontSize=30" \
     -F "rotation=0" \
     -F "opacity=0.5" \
     -F "widthSpacer=50" \
     -F "heightSpacer=50" \
     > "/Users/username/Downloads/output.pdf"
```
## Windows CMD (Not powershell) 

```
curl -X POST "http://localhost:8080/add-watermark" ^
     -H "Content-Type: multipart/form-data" ^
     -F "fileInput=@C:\Users\systo\Downloads\sample-1_cropped.pdf" ^
     -F "watermarkType=text" ^
     -F "watermarkText=YOUR_WATERMARK_TEXT" ^
     -F "alphabet=roman" ^
     -F "fontSize=30" ^
     -F "rotation=0" ^
     -F "opacity=0.5" ^
     -F "widthSpacer=50" ^
     -F "heightSpacer=50" ^
     > "C:\Users\systo\Downloads\output.pdf"
```