import type { Meta, StoryObj } from '@storybook/react-vite';
import base, { Edit } from './PipelineBuilder.stories';
import { AppConfigProvider } from '@app/contexts/AppConfigContext';
const meta = {
  ...base,
  title: 'Documentation/PipelineBuilder',
  decorators: [
    ...(base.decorators ?? []),
    (Story) => <AppConfigProvider initialConfig={{enableLogin: true, isAdmin: true, aiEngineEnabled: true, aiFeatures: {classify: true}}} bootstrapMode="non-blocking" autoFetch={false}><Story /></AppConfigProvider>,
  ],
} satisfies Meta;
export default meta;
export const Builder: StoryObj = {...Edit};
