---
sidebar_position: 2
---
# Endpoints Customisation

You can selectively disable and remove endpoints and functionalities from Stirling PDF as per your requirements.
There are many use-cases for this such as 
- Avoid confusion for users for functionality you/your business don't use. 
- Running a reduced version of Stirling-PDF that doesn't have the necessary server power to support the more advanced features.
- Cleanup interface for features you don't use


To do this `ENDPOINTS_TO_REMOVE` and `GROUPS_TO_REMOVE` have been setup. 
They can include comma-separated lists of endpoints and groups to disable. For example, `ENDPOINTS_TO_REMOVE=img-to-pdf,remove-pages` would disable both the "image to PDF" and "remove pages" functionalities.
`GROUPS_TO_REMOVE=Libre` Would disable a group of endpoints, in this case all endpoints which use Libre in the backend.

A complete list of all endpoints and groups is available [here](https://github.com/Stirling-Tools/Stirling-PDF/blob/main/Endpoint-groups.md).
TODO?
