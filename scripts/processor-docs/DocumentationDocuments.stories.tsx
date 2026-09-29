import type { Meta, StoryObj } from '@storybook/react-vite';
import { http, HttpResponse } from 'msw';
import { Documents } from '@portal/views/Documents';
import type { ReviewDocument } from '@portal/api/documents';
const rows: ReviewDocument[] = [
  ['invoice-1042.pdf', 'Automation', 'Compress PDF', 'processor', 'processed', 'Policy: Compress incoming invoices', '2m ago'],
  ['invoice-1041.pdf', 'Automation', 'Compress PDF', 'processor', 'processed', 'Policy: Compress incoming invoices', '5m ago'],
  ['contract.pdf', 'API', 'Sanitize PDF', 'alex@example.com', 'processed', 'API key · Intake service', '12m ago'],
  ['protected-report.pdf', 'Automation', 'Compress PDF', 'processor', 'error', 'Policy: Compress incoming invoices', '18m ago'],
  ['report.pdf', 'Editor', 'Merge PDFs', 'alex@example.com', 'processed', 'Web upload', '24m ago'],
].map(([name, product, action, user, status, source, time], i) => ({
  id: `doc-${100-i}-0`, name, type: 'PDF', classification: null, auto: false, note: null,
  product: product as ReviewDocument['product'], action, user, status: status as ReviewDocument['status'],
  reviewer: null, source, confidence: null, fieldsExtracted: 0, time, sensitive: false, extractions: [],
  audit: [{id: `${100-i}-0-op`, kind: status === 'error' ? 'flagged' : 'extracted', time, actor: user, detail: status === 'error' ? `${action} failed` : `${action} via ${source}`}],
}));
export default {title: 'Documentation/Documents', component: Documents, parameters: {layout: 'padded'}} satisfies Meta<typeof Documents>;
export const Activity: StoryObj<typeof Documents> = {parameters: {msw: {handlers: [
  http.get('*/api/v1/proprietary/ui-data/documents', () => HttpResponse.json({summary: {totalInQueue: 5, processed: 4, errors: 1, processedToday: 4}, documents: rows})),
]}}};
