import type { Meta, StoryObj } from '@storybook/react-vite';
import { Route, Routes } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import base from './PipelineBuilder.stories';
import { AppConfigProvider } from '@app/contexts/AppConfigContext';

// Fixture data for the first-pipeline screenshots.
const sources = [
  { id: 'src-invoice-inbox', name: 'Invoice inbox', type: 'folder', options: { directory: '/data/processor/inbox', mode: 'track' } },
  { id: 'src-processed-invoices', name: 'Processed invoices', type: 'folder', options: { directory: '/data/processor/processed' } },
];

const policies: Record<string, unknown> = {
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

export const FirstPipeline: StoryObj = { decorators: [withRoute('/processor/pipelines/plc-first-pipeline')] };
