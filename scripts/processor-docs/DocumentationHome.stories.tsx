import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProcessorFlow } from '@portal/components/ProcessorFlow';
import type { ProcessorFlow as ProcessorFlowModel } from '@portal/api/processorFlow';
import '@portal/views/Home.css';

// Fixture for the Processor intro screenshot: five busy sources, each feeding one policy.
const label = (id: string) => `portal.policies.categories.${id}.label`;

const model: ProcessorFlowModel = {
  sources: [
    { id: 'editor', name: 'Editor', type: 'editor', docs24h: 1240 },
    { id: 'src-supplier-sftp', name: 'Supplier invoices', type: 'sftp', docs24h: 3860 },
    { id: 'src-scanned-mail', name: 'Scanned mail', type: 'folder', docs24h: 2215 },
    { id: 'src-partner-uploads', name: 'Partner uploads', type: 'webhook', docs24h: 1105 },
    { id: 'src-contract-archive', name: 'Contract archive', type: 's3', docs24h: 640 },
  ],
  comingSoonSources: [
    { key: 'apiMcp', labelKey: 'portal.processorFlow.sources.comingSoon.apiMcp' },
    { key: 'cloud', labelKey: 'portal.processorFlow.sources.comingSoon.cloud' },
    { key: 'email', labelKey: 'portal.processorFlow.sources.comingSoon.email' },
  ],
  // Catalogue order, without Retention (excluded from the docs screenshots).
  policies: [
    { key: 'ingestion', labelKey: label('ingestion'), state: 'active', configured: true, runs24h: 2215 },
    { key: 'security', labelKey: label('security'), state: 'active', configured: true, runs24h: 1240 },
    { key: 'classification', labelKey: label('classification'), state: 'active', configured: true, runs24h: 640 },
    { key: 'compliance', labelKey: label('compliance'), state: 'active', configured: true, runs24h: 1105 },
    { key: 'routing', labelKey: label('routing'), state: 'active', configured: true, runs24h: 3860 },
  ],
  outcomes: [
    { key: 'success', labelKey: 'portal.processorFlow.outcomes.success', count24h: 8788 },
    { key: 'failed', labelKey: 'portal.processorFlow.outcomes.failed', count24h: 272 },
  ],
};

const meta: Meta<typeof ProcessorFlow> = {
  title: 'Documentation/Home',
  component: ProcessorFlow,
  parameters: { layout: 'fullscreen' },
};
export default meta;

// Rendered inside the Home view's own container so it has the page's width.
export const Flow: StoryObj<typeof ProcessorFlow> = {
  render: () => (
    <div className="portal-home">
      <ProcessorFlow dataOverride={model} />
    </div>
  ),
};
