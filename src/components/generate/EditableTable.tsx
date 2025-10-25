'use client';

import { useWorkflow } from '@/stores/workflow';

export default function EditableTable() {
  const { rows, settings, setRows } = useWorkflow();

  const columns = [
    {
      key: 'title',
      label: 'Title',
      show: true
    },
    {
      key: 'description',
      label: 'Description',
      show: settings.targets.description,
      multiline: true
    },
    {
      key: 'meta_title',
      label: 'SEO Title',
      show: settings.targets.seoTitle,
      maxLength: 70
    },
    {
      key: 'meta_description',
      label: 'SEO Description',
      show: settings.targets.seoDescription,
      maxLength: 160,
      multiline: true
    },
    {
      key: 'alt',
      label: 'ALT',
      show: settings.targets.alt,
      maxLength: 125
    },
  ].filter(column => column.show);

  const addRow = () => setRows([...rows, {
    title: '',
    description: '',
    meta_title: '',
    meta_description: '',
    alt: ''
  }]);

  const removeRow = (i:number) => setRows(rows.filter((_, idx) => idx!==i));

  return (
    <div className="overflow-x-auto border rounded-2xl border-zinc-200 bg-white shadow-xl">
      <table className="min-w-[900px] w-full">
        <thead className="bg-zinc-50">
        <tr>
          {columns.map(column => (
            <th key={column.key} className={['px-3 py-2 text-left font-medium text-zinc-700 text-sm'].join(' ')}>
              {column.label}
            </th>
          ))}
          <th className="px-3 py-2" />
        </tr>
        </thead>
        <tbody>
        {rows.map((row, idx) => {
            return (
              <tr key={idx} className="border-t align-top">
                {columns.map(column => {
                  switch (column.key) {
                    case 'title':
                      return (
                        <td key={column.key} className="px-3 py-2 text-left">
                          <input className="w-full rounded-s border bg-white px-2 py-1 outline-none text-sm max-w-80 min-h-12" placeholder={column.label}/>
                        </td>
                      );
                    case 'description':
                      return (
                        <td key={column.key} className="px-3 py-2">
                          <textarea className="w-full rounded-s border bg-white px-2 py-1 outline-none text-sm" placeholder={column.label}/>
                        </td>
                      );
                    case 'meta_title':
                      return (
                        <td key={column.key} className="px-3 py-2 text-left">
                          <input className="w-full rounded-s border bg-white px-2 py-1 outline-none text-sm max-w-80 min-h-12" placeholder={column.label}/>
                        </td>
                      );
                    case 'meta_description':
                      return (
                        <td key={column.key} className="px-3 py-2">
                          <textarea className="w-full rounded-s border bg-white px-2 py-1 outline-none text-sm" placeholder={column.label}/>
                        </td>
                      );
                    case 'alt':
                      return (
                        <td key={column.key} className="px-3 py-2 text-left">
                          <input className="w-full rounded-s border bg-white px-2 py-1 outline-none text-sm max-w-80 min-h-12" placeholder={column.label}/>
                        </td>
                      );
                    default:
                      return null;
                    }
                  }
                )}
                <td className="px-3 py-3">
                  <button onClick={()=>removeRow(idx)} className="text-zinc-500 hover:text-red-600">✕</button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={columns.length + 1} className="px-3 py-2">
              <button onClick={addRow} className="rounded-md border border-zinc-200 px-3 py-1.5 text-sm hover:bg-zinc-50">
                + Add row
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
