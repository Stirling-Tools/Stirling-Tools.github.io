---
sidebar_position: 5
description: Pipeline Feature overview
---

# Features - Pipeline

The Pipeline feature in Stirling PDF enables automated, sequential processing of PDFs through multiple operations. This powerful automation tool allows you to:

- `create-pipeline`: Create custom workflows combining multiple PDF operations into a single automated process. For example, you could create a pipeline that:
  - Splits a PDF
  - Adds watermarks to each part
  - Compresses the results
  - All in one automated sequence

- `save-pipeline`: Save pipeline configurations for future use, share them with others, or use them in automated folder scanning processes

- `folder-scanning`: Set up automated processing of files in watched folders using your pipeline configurations. The system will automatically process any files placed in these folders according to your pipeline rules

## Additional Features

- Web UI configuration interface for easy pipeline setup
- JSON-based configuration for advanced users
- Support for multiple pipeline configurations
- Automatic unzipping of intermediate results
- Error handling and validation
- Ability to save and load pipeline configurations

For detailed information on setting up and using pipelines, see:
- [Pipeline Configuration Guide](/version-1.5/Advanced%20Configuration/Pipeline)
- [Folder Scanning Guide](/version-1.5/Advanced%20Configuration/Folder%20Scanning)

## Current Limitations

- Cannot have multiple instances of the same operation in a single pipeline
- Web UI does not support operations requiring multiple different types of inputs
- Files and operations run in serial mode
- Additional file inputs during processing are not supported via UI
