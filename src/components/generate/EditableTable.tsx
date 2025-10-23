'use client';

import { useWorkflow } from '@/stores/workflow';

export default function EditableTable() {
  const { rows, settings } = useWorkflow();

  const columns = [
    {
      key: 'title',
      label: 'Title',
      show: true
    },
    {
      key: 'description',
      label: 'Description',
      show: settings.targets.description
    },
    {
      key: 'meta_title',
      label: 'SEO Title',
      show: settings.targets.seoTitle
    },
    {
      key: 'meta_description',
      label: 'SEO Description',
      show: settings.targets.seoDescription
    },
    {
      key: 'alt',
      label: 'ALT',
      show: settings.targets.alt
    },
  ].filter(column => column.show);

  return (
    <div className="overflow-x-auto border border-zinc-200 bg-white shadow-sm">
      <table className="min-w-[900px] w-full">
        <thead className="bg-zinc-50">
        <tr>
          {columns.map(column => (
            <th key={column.key} className={['px-3 py-2 text-left font-medium text-zinc-700 text-sm'].join(' ')}>
              {column.label}
            </th>
          ))}
        </tr>
        </thead>
        <tbody className="text-center">
          {rows.map((row, idx) => {
            return (
              <tr key={idx} className="border-t align-top">
                {columns.map(column => {
                  switch (column.key) {
                    case 'title':
                      return (
                        <td key={column.key} className="px-3 py-2">
                          <input className="w-full rounded-s border bg-white px-2 py-1 outline-none text-sm" placeholder={column.label}/>
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
                        <td key={column.key} className="px-3 py-2">
                          <input className="w-full rounded-s border bg-white px-2 py-1 outline-none text-sm" placeholder={column.label}/>
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
                        <td key={column.key} className="px-3 py-2">
                          <input className="w-full rounded-s border bg-white px-2 py-1 outline-none text-sm" placeholder={column.label}/>
                        </td>
                      );
                    default:
                      return null;
                    }
                  }
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
