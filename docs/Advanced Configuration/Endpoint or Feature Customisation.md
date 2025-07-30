---
sidebar_position: 6
---
# Endpoints Customisation

You can selectively disable and remove endpoints and functionalities from Stirling PDF as per your requirements.
There are many use-cases for this such as
- Avoid confusion for users for functionality you/your business don't use.
- Running a reduced version of Stirling-PDF that doesn't have the necessary server power to support the more advanced features.
- Cleanup interface for features you don't use


To do this `ENDPOINTS_TOREMOVE` and `ENDPOINTS_GROUPSTOREMOVE` have been set up.
They can include comma-separated lists of endpoints and groups to disable. For example, `ENDPOINTS_TOREMOVE=img-to-pdf,remove-pages` would disable both the "image to PDF" and "remove pages" functionalities.
`ENDPOINTS_GROUPSTOREMOVE=Libre` Would disable a group of endpoints, in this case all endpoints which use Libre in the backend.
