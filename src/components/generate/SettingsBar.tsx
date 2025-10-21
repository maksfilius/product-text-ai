'use client';

import { useWorkflow } from '@/stores/workflow';
import CustomCheckbox from '@/components/ui/CustomCheckbox';

function Pill({ active, children, onClick } : {active:boolean; children:React.ReactNode; onClick:()=>void}) {
  return (
    <button
      onClick={onClick}
      className={[
        'rounded-md border px-2.5 py-1 text-xs',
        active ? 'bg-black text-white border-black'
          : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
      ].join(' ')}
    >
      {children}
    </button>
  );
}

export default function SettingsBar() {
  const { settings, setSettings, setPolicy, rows } = useWorkflow();
  const total = rows.length;
  const missingTitles = rows.filter(row => !row.title?.trim()).length;
  const titleInvalid = settings.requireTitle && missingTitles > 0;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-800">What to generate</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">Language</span>
            <select
              value={settings.language}
              onChange={(event)=>setSettings({language: event.target.value as any})}
              className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs"
            >
              <option value="en">EN</option>
              <option value="de">DE</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <CustomCheckbox
          checked={settings.targets.title}
          onChange={(value)=>setSettings({targets:{...settings.targets, title:value}})}
          className="w-full justify-start items-start"
        >
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium">Rewrite Title</span>
            <span className="text-xs text-zinc-500">If disabled — keep value from CSV</span>
          </div>
        </CustomCheckbox>

        <CustomCheckbox
          checked={settings.targets.description}
          onChange={(value)=>setSettings({targets:{...settings.targets, description:value}})}
          className="w-full justify-start items-start"
        >
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium">Description (Body HTML)</span>
            <span className="text-xs text-zinc-500">Generate 1–2 paragraphs</span>
          </div>
        </CustomCheckbox>

        <div>
          <CustomCheckbox
            checked={settings.targets.seoTitle}
            onChange={(value)=>setSettings({targets:{...settings.targets, seoTitle:value}})}
            className="w-full justify-start items-start"
          >
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium">SEO Title</span>
              <span className="text-xs text-zinc-500">Meta title (≤ 70 characters)</span>
            </div>
          </CustomCheckbox>

          <div className="mt-2 flex flex-wrap gap-2">
            <Pill active={settings.policy.seoTitle==='overwrite'} onClick={()=>setPolicy('seoTitle','overwrite')}>Overwrite</Pill>
            <Pill active={settings.policy.seoTitle==='onlyEmpty'} onClick={()=>setPolicy('seoTitle','onlyEmpty')}>Only empty</Pill>
            <Pill active={settings.policy.seoTitle==='onlyProblematic'} onClick={()=>setPolicy('seoTitle','onlyProblematic')}>Only problematic</Pill>
          </div>
        </div>

        <div>
          <CustomCheckbox
            checked={settings.targets.seoDescription}
            onChange={(value)=>setSettings({targets:{...settings.targets, seoDescription:value}})}
            className="w-full justify-start items-start"
          >
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium">SEO Description</span>
              <span className="text-xs text-zinc-500">Meta description (≤ 160 characters)</span>
            </div>
          </CustomCheckbox>

          <div className="mt-2 flex flex-wrap gap-2">
            <Pill active={settings.policy.seoDescription==='overwrite'} onClick={()=>setPolicy('seoDescription','overwrite')}>Overwrite</Pill>
            <Pill active={settings.policy.seoDescription==='onlyEmpty'} onClick={()=>setPolicy('seoDescription','onlyEmpty')}>Only empty</Pill>
            <Pill active={settings.policy.seoDescription==='onlyProblematic'} onClick={()=>setPolicy('seoDescription','onlyProblematic')}>Only problematic</Pill>
          </div>
        </div>

        <div className="md:col-span-2">
          <CustomCheckbox
            checked={settings.targets.alt}
            onChange={(value)=>setSettings({targets:{...settings.targets, alt:value}})}
            className="w-full justify-start items-start"
          >
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium">ALT text (images)</span>
              <span className="text-xs text-zinc-500">Can fill only where empty</span>
            </div>
          </CustomCheckbox>

          <div className="mt-2 flex flex-wrap gap-2">
            <Pill active={settings.policy.alt==='onlyEmpty'} onClick={()=>setPolicy('alt','onlyEmpty')}>Only empty</Pill>
            <Pill active={settings.policy.alt==='overwrite'} onClick={()=>setPolicy('alt','overwrite')}>Overwrite</Pill>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600">
        Ready to generate: <b>{total}</b> · Language: <b>{settings.language.toUpperCase()}</b>
        {titleInvalid && <span> · <span className="text-red-600">Missing Title in {missingTitles} rows.</span></span>}
        <span className="ml-2 text-zinc-400">Disabled fields will remain as in CSV</span>
      </div>
    </section>
  );
}
