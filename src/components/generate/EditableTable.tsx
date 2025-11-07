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
        {rows.length === 0 && (
          <tr>
            <td colSpan={columns.length + 1} className="px-3 py-6 text-center text-sm text-zinc-500">
              No rows yet — add or upload data.
            </td>
          </tr>
        )}

        {rows.map((row, idx) => (
          <tr key={idx} className="border-t align-top">
            {columns.map((column) => {
              const value = String(((row as any)[column.key] ?? ''));
              const applyValue = (raw: string) => {
                const next = typeof column.maxLength === 'number'
                  ? raw.slice(0, column.maxLength)
                  : raw;
                setRows(rows.map((row, i) => (i === idx ? { ...row, [column.key]: next } : row)));
              };

              switch (column.key) {
                case 'title':
                  return (
                    <td key={`${idx}-${column.key}`} className="px-3 py-2 text-left">
                      <input
                        className="w-full rounded-md border bg-white px-2 py-1 outline-none text-sm max-w-80 min-h-12"
                        placeholder={column.label}
                        value={value}
                        maxLength={column.maxLength as number | undefined}
                        onChange={(e) => applyValue(e.target.value)}
                      />
                    </td>
                  );

                case 'description':
                  return (
                    <td key={`${idx}-${column.key}`} className="px-3 py-2">
                <textarea
                  className="w-full rounded-md border bg-white px-2 py-1 outline-none text-sm"
                  placeholder={column.label}
                  rows={3}
                  value={value}
                  maxLength={column.maxLength as number | undefined}
                  onChange={(event) => applyValue(event.target.value)}
                />
                    </td>
                  );

                case 'meta_title':
                  return (
                    <td key={`${idx}-${column.key}`} className="px-3 py-2 text-left">
                      <input
                        className="w-full rounded-md border bg-white px-2 py-1 outline-none text-sm max-w-80 min-h-12"
                        placeholder={column.label}
                        value={value}
                        maxLength={column.maxLength as number | undefined}
                        onChange={(event) => applyValue(event.target.value)}
                      />
                    </td>
                  );

                case 'meta_description':
                  return (
                    <td key={`${idx}-${column.key}`} className="px-3 py-2">
                <textarea
                  className="w-full rounded-md border bg-white px-2 py-1 outline-none text-sm"
                  placeholder={column.label}
                  rows={3}
                  value={value}
                  maxLength={column.maxLength as number | undefined}
                  onChange={(event) => applyValue(event.target.value)}
                />
                    </td>
                  );

                case 'alt':
                  return (
                    <td key={`${idx}-${column.key}`} className="px-3 py-2 text-left">
                      <input
                        className="w-full rounded-md border bg-white px-2 py-1 outline-none text-sm max-w-80 min-h-12"
                        placeholder={column.label}
                        value={value}
                        maxLength={column.maxLength as number | undefined}
                        onChange={(e) => applyValue(e.target.value)}
                      />
                    </td>
                  );

                default:
                  return null;
              }
            })}

            <td className="px-3 py-3">
              <button onClick={() => removeRow(idx)} className="text-zinc-500 hover:text-red-600">✕</button>
            </td>
          </tr>
        ))}

        <tr>
          <td colSpan={columns.length + 1} className="px-3 py-3">
            <button
              onClick={addRow}
              className="rounded-md border border-zinc-200 px-3 py-1.5 text-sm hover:bg-zinc-50"
            >
              + Add row
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}
