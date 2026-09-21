# Processor documentation maintenance

The September 2026 refresh was checked against Stirling-PDF `origin/main` at
`eac9799c64965fa712b4e8504a707dcd69a55d32`, including the simplified Team and
Processor purchase dialogs. The docs branch was rebased onto docs main
`4a1605993466522b89f899d00bff2e499a848d18`.

## Screenshots

The PNGs under `static/img/processor` are browser captures of the current
application components rendered through the app's Storybook. They use its
isolated fixture API, without connecting production accounts or exposing secrets.
Captions describe the screen directly. No image generation or DOM restyling was
used.

Run the application frontend's dependency and generated-icon setup, then launch
Storybook. The two stories in this directory can be copied beside the app's
`frontend/editor/src/portal/views/*.stories.tsx` for capture. They are capture
harnesses, not changes to the application:

- `DocumentationCapture.stories.tsx` wraps the existing PipelineBuilder Edit
  story with the app configuration provider it needs to finish loading.
- `DocumentationDocuments.stories.tsx` supplies document activity shaped like
  `PortalDocumentsService` output, instead of the richer legacy gallery fixture.
  It shows processed/error outcomes without invented extraction or approval data.

| Image | Story and state |
|---|---|
| `sources.png` | `portal-views-sources--default` |
| `folder-source.png` | Sources → Connect source → Folder; Invoice inbox, `/data/processor/inbox`, Advanced expanded, retain and process only changes |
| `pipelines.png` | `portal-views-pipelines--default`; full page |
| `compliance-template.png` | Pipelines → Compliance → Set up |
| `pipeline-builder.png` | `documentation-pipelinebuilder--builder` |
| `documents.png` | `documentation-documents--activity` |
| `review.png` | `portal-views-review--default` |
| `integrations.png` | `portal-views-integrations--default`; Storage tab |

Use the browser's normal viewport and inspect each saved image. Keep filenames
stable when refreshing images so existing Markdown links continue to work.

## Source audit map

Paths below are relative to the Stirling-PDF repository. Frontend components are
under `frontend/editor/src`; Java paths are under `app/proprietary/src/main/java/
stirling/software/proprietary` unless noted otherwise.

| Documentation | Main implementation references |
|---|---|
| Navigation and access | `portal/ViewRouter.tsx`, `portal/components/sidebarGroups.tsx`, `ResourceAccessService`, `PolicyManagementAuthority`, embedded Dockerfiles |
| Sources and cleanup | `portal/views/Sources.tsx`, source forms/types, `SourceController`, source adapters and per-consumer processing history |
| Pipelines and templates | `portal/views/PipelineBuilder.tsx`, `portal/views/Pipelines.tsx`, `proprietary/policies/catalog.ts`, policy validation and execution services |
| Routing | Pipeline output settings, routing schema and server rule evaluator |
| Processing folders | `ProcessingFolderWizard`, processing-folder controllers and scheduler |
| Documents | `PortalDocumentsController`, `PortalDocumentsService`, `PortalAuditReadService`, `DefaultPortalDocumentsScopeResolver`, `AuditService`, `AuditCleanupService`, `portal/components/documents` |
| Review | `FileRunEventController`, file-run event service, `portal/queries/fileRunEvents.ts`, `FileRunEventList` |
| Integrations | Connection forms/catalogue, connection validation, `IntegrationStepValidator`, Purview controllers, credential encryption service |
| Usage and account link | `accountlink/AccountLinkProperties.java`, `InstanceEntitlementGate`, `InstanceEntitlementInterceptor`, `BillableOperationClassifier`, usage sync payload |
| AI corrections | Common `ApplicationProperties`, `engine/src/stirling` configuration/runtime/embedder, `.github/workflows/push-docker.yml` |

The UI contains some forward-looking labels. Verify an executable backend path
before documenting them as functionality: notably document content access,
extractions/approvals, Ingestion/Retention templates, and ConsignO operations.

## Validation

Run `npm run build` and `git diff --check`. Inspect the built `/Processor/`
category, its 12 child pages, image assets, local links, and heading fragments.
Also review the related onboarding, usage, folder-scanning, and AI pages when
their implementation changes. This refresh is a source/UI audit; it does not
claim an end-to-end deployment test of every integration or paid entitlement.
