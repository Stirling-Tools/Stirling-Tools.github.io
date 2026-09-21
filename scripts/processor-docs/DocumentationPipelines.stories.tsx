import type { Meta, StoryObj } from '@storybook/react-vite';
import { http, HttpResponse } from 'msw';
import { Pipelines } from '@portal/views/Pipelines';
import { POLICY_CATEGORIES } from '@app/policies/catalog';
import { AppConfigProvider } from '@app/contexts/AppConfigContext';

// Documentation release scope excludes the unfinished Retention template.
const retention = POLICY_CATEGORIES.findIndex((entry) => entry.id === 'retention');
if (retention !== -1) POLICY_CATEGORIES.splice(retention, 1);

export default {
  title: 'Documentation/Pipelines',
  component: Pipelines,
  parameters: {
    layout: 'padded',
    msw: { handlers: [
      http.get('*/api/v1/docparse/capabilities', () => HttpResponse.json({
        enabled: true, mode: 'auto', advancedInstalled: false,
        engineReachable: true, indexingConfigured: true, doclingVersion: null,
      })),
    ] },
  },
  decorators: [(Story) => <AppConfigProvider
    initialConfig={{ enableLogin: true, isAdmin: true, aiEngineEnabled: true, aiFeatures: { classify: true } }}
    bootstrapMode="non-blocking" autoFetch={false}
  ><Story /></AppConfigProvider>],
} satisfies Meta<typeof Pipelines>;
export const Gallery: StoryObj<typeof Pipelines> = {};
