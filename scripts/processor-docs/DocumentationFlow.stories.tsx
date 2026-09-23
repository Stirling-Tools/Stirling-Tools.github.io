import type { Meta, StoryObj } from '@storybook/react-vite';
import { Route, Routes } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import base from './PipelineBuilder.stories';
import { AppConfigProvider } from '@app/contexts/AppConfigContext';

// Fixture data for the Processor overview and first-pipeline screenshots.
const sources = [
  { id: 'src-supplier-sftp', name: 'Supplier SFTP drop', type: 'sftp', options: { directory: '/outgoing/invoices' } },
  { id: 'src-accounts-payable', name: 'Accounts payable', type: 's3', options: { prefix: 'finance/accounts-payable/' } },
  { id: 'src-procurement', name: 'Procurement archive', type: 'folder', options: { directory: '/data/processor/procurement' } },
  { id: 'src-treasury', name: 'Treasury inbox', type: 'folder', options: { directory: '/data/processor/treasury' } },
  { id: 'src-needs-review', name: 'Needs review', type: 'folder', options: { directory: '/data/processor/review' } },
  { id: 'src-invoice-inbox', name: 'Invoice inbox', type: 'folder', options: { directory: '/data/processor/inbox', mode: 'track' } },
  { id: 'src-processed-invoices', name: 'Processed invoices', type: 'folder', options: { directory: '/data/processor/processed' } },
];

const byLabels = (values: string[], outputId: string) => ({
  condition: { input: { source: 'document', field: 'classification.labels' }, operator: 'matches-any', values },
  outputId,
});

const policies: Record<string, unknown> = {
  'plc-supplier-intake': {
    id: 'plc-supplier-intake',
    name: 'Supplier document intake',
    owner: 'finance-ops@example.com',
    enabled: true,
    inputs: [{
      sourceId: 'src-supplier-sftp',
      trigger: { type: 'schedule', options: { schedule: { type: 'every', count: 15, unit: 'MINUTES' } } },
    }],
    steps: [
      { operation: '/api/v1/misc/repair', parameters: {} },
      { operation: '/api/v1/misc/ocr-pdf', parameters: { languages: ['eng'], ocrType: 'skip-text', ocrRenderType: 'hocr', deskew: true } },
      { operation: '/api/v1/ai/tools/classify-and-label', parameters: { reclassify: false } },
      { operation: '/api/v1/security/sanitize-pdf', parameters: {} },
      { operation: '/api/v1/misc/add-stamp', parameters: { stampType: 'text', stampText: 'RECEIVED' } },
      { operation: '/api/v1/misc/compress-pdf', parameters: {} },
    ],
    output: { type: 'inline', options: {} },
    outputIds: ['src-needs-review'],
    routingRules: [
      byLabels(['invoice', 'credit-note'], 'src-accounts-payable'),
      byLabels(['purchase-order'], 'src-procurement'),
      byLabels(['remittance-advice', 'statement-of-account'], 'src-treasury'),
    ],
  },
  'plc-first-pipeline': {
    id: 'plc-first-pipeline',
    name: 'Compress incoming invoices',
    owner: 'admin@example.com',
    enabled: false,
    inputs: [{ sourceId: 'src-invoice-inbox', trigger: null }],
    steps: [{ operation: '/api/v1/misc/compress-pdf', parameters: {} }],
    output: { type: 'inline', options: {} },
    outputIds: ['src-processed-invoices'],
  },
};

const sourceView = (s: (typeof sources)[number]) => ({
  id: s.id, name: s.name, type: s.type, status: 'active', referenceCount: 1,
  referencingPolicies: [], config: [], docsTotal: 0, docs24h: 0, docs30d: 0,
});

const handlers = [
  http.get('*/api/v1/sources', () => HttpResponse.json({
    kpis: [],
    sources: [
      { ...sourceView({ id: 'editor', name: 'Editor', type: 'editor', options: {} }) },
      ...sources.map(sourceView),
    ],
  })),
  http.get('*/api/v1/sources/:id', ({ params }) => {
    const source = sources.find((s) => s.id === params.id);
    return source ? HttpResponse.json({ ...source, enabled: true }) : new HttpResponse(null, { status: 404 });
  }),
  http.get('*/api/v1/policies/:id', ({ params }) => {
    const policy = policies[String(params.id)];
    return policy ? HttpResponse.json(policy) : undefined;
  }),
];

function withRoute(path: string) {
  return function RouteDecorator(Story: () => React.ReactElement) {
    return (
      <Routes location={path}>
        <Route path="/processor/pipelines/:id" element={<Story />} />
      </Routes>
    );
  };
}

const meta = {
  ...base,
  title: 'Documentation/Flow',
  parameters: { ...base.parameters, msw: { handlers } },
  decorators: [
    ...(base.decorators ?? []),
    (Story) => <AppConfigProvider initialConfig={{ enableLogin: true, isAdmin: true, aiEngineEnabled: true, aiFeatures: { classify: true } }} bootstrapMode="non-blocking" autoFetch={false}><Story /></AppConfigProvider>,
  ],
} satisfies Meta;
export default meta;

export const SupplierIntake: StoryObj = { decorators: [withRoute('/processor/pipelines/plc-supplier-intake')] };
export const FirstPipeline: StoryObj = { decorators: [withRoute('/processor/pipelines/plc-first-pipeline')] };
