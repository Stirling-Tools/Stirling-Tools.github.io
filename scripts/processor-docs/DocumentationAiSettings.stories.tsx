import type { Meta, StoryObj } from '@storybook/react-vite';
import { http, HttpResponse } from 'msw';
import AdminAiSection from '@app/components/shared/config/configSections/AdminAiSection';
import { AppConfigProvider } from '@app/contexts/AppConfigContext';
import { AuthContext } from '@app/auth/context';
import { UnsavedChangesProvider } from '@app/contexts/UnsavedChangesContext';

// Fixture for the AI settings screenshot: a linked server with Stirling Cloud AI selected.
const settings = {
  enabled: true,
  mode: 'CLOUD',
  cloudDocumentIndexing: true,
  url: 'http://stirling-pdf-engine:5001',
  pushConfigToEngine: true,
  timeoutSeconds: 120,
  longRunningTimeoutSeconds: 600,
  streamTimeoutSeconds: 1800,
  models: { provider: 'anthropic', smartModel: 'claude-haiku-4-5', fastModel: 'claude-haiku-4-5', smartMaxTokens: 8192, fastMaxTokens: 2048, apiKey: '', baseUrl: '' },
  rag: { embeddingProvider: 'voyageai', embeddingModel: 'voyage-4', embeddingApiKey: '', embeddingBaseUrl: '', topK: 20, maxSearches: 5 },
  limits: { maxPages: 200, maxCharacters: 200000, modelMaxConcurrency: 32 },
  features: { chat: true, documentQuestions: true, createPdf: true, mathAuditor: true, pdfComment: true, classify: true },
};

const auth = {
  session: { access_token: 'storybook' },
  user: { id: 1, username: 'admin', email: 'admin@example.com', orgOwner: true },
  displayName: 'Admin',
  isAnonymous: false,
  isAdmin: true,
  portalAccess: true,
  role: 'ROLE_ADMIN',
  loading: false,
  error: null,
  signOut: async () => {},
  refreshSession: async () => {},
};

export default {
  title: 'Documentation/AiSettings',
  component: AdminAiSection,
  parameters: {
    layout: 'padded',
    msw: { handlers: [
      http.get('*/api/v1/admin/settings/section/aiEngine', () => HttpResponse.json(settings)),
      http.get('*/api/v1/account-link/linked', () => HttpResponse.json({ linked: true })),
      http.get('*/api/v1/ai/status', () => HttpResponse.json({ enabled: true, reachable: true, latencyMs: 180, authenticated: true, cloudUp: true, cloudSharingEnabled: true })),
    ] },
  },
  decorators: [(Story) => (
    <AuthContext.Provider value={auth as never}>
      <AppConfigProvider initialConfig={{ enableLogin: true, isAdmin: true, aiEngineEnabled: true }} bootstrapMode="non-blocking" autoFetch={false}>
        <UnsavedChangesProvider>
          <div style={{ maxWidth: 760 }}><Story /></div>
        </UnsavedChangesProvider>
      </AppConfigProvider>
    </AuthContext.Provider>
  )],
} satisfies Meta<typeof AdminAiSection>;

export const CloudMode: StoryObj<typeof AdminAiSection> = {};
