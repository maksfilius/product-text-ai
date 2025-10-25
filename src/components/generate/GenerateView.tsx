'use client';

import { useRef } from 'react';
import { useWorkflow } from '@/stores/workflow';
import SettingsBar from './SettingsBar';
import EditableTable from "@/components/generate/EditableTable";
import { BaseButton } from "@/components/ui/BaseButton";
import type { ProductRow } from '@/types/product';


export default function GenerateView() {
  const { rows, setRows } = useWorkflow();
  const fileRef = useRef<HTMLInputElement>(null);

  const SAMPLE: ProductRow[] = [
    { title: '', description: '', meta_title: '', meta_description: '', alt: '' },
    { title: '', description: '', meta_title: '', meta_description: '', alt: '' },
  ];

  const uploadFile = () => fileRef.current?.click();
  const onUpload = async () => setRows(SAMPLE);
  const useSample = () => setRows(SAMPLE);
  const onExport = () => console.log('export')
  const onGenerate = () => console.log('generate')

  if (rows.length > 0) {
    return (
      <section className="mx-auto max-w-6xl space-y-4">
        <SettingsBar />
        <div className="flex gap-3 justify-end">
          <BaseButton variant="secondary" onClick={onExport}>Export CSV</BaseButton>
          <BaseButton variant="primary" onClick={onGenerate}>Generate</BaseButton>
        </div>
        <EditableTable/>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl space-y-5">
      <header className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Create product content</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Start with your CSV or a tiny sample. You’ll configure what to generate on the next step.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <BaseButton variant="primary" onClick={uploadFile}>Upload CSV</BaseButton>
          <BaseButton variant="secondary" onClick={useSample}>Try sample</BaseButton>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={onUpload}
          />
        </div>
      </header>

      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
        <span className="font-medium">What happens next:</span>{' '}
        Select what to generate (Title, Description, SEO, ALT), choose overwrite rules, then generate, review, and export.
      </div>
    </section>
  );
}
