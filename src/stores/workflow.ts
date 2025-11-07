import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ProductRow } from '@/types/product';

export type GenerateTarget = 'title'|'description'|'seoTitle'|'seoDescription'|'alt';
export type Policy = 'overwrite'|'onlyEmpty'|'onlyProblematic';

type Settings = {
  language: 'en'|'de';
  requireTitle: boolean;
  targets: Record<GenerateTarget, boolean>;
  policy: Partial<Record<Extract<GenerateTarget,'seoTitle'|'seoDescription'|'alt'>, Policy>>;
};

type State = {
  rows: ProductRow[];
  setRows: (next: ProductRow[] | ((prev: ProductRow[]) => ProductRow[])) => void;

  settings: Settings;
  setSettings: (patch: Partial<Settings>) => void;
  setPolicy: (key: keyof Settings['policy'], value: Policy) => void;

  reset: () => void;
};

const getDefaultSettings = (): Settings => ({
  language: 'en',
  requireTitle: true,
  targets: {
    title: true,
    description: true,
    seoTitle: true,
    seoDescription: true,
    alt: true
  },
  policy: {
    seoTitle: 'overwrite',
    seoDescription: 'onlyEmpty',
    alt: 'onlyEmpty'
  }
});

export const useWorkflow = create<State>()(
  persist(
    (set) => ({
      rows: [],
      settings: getDefaultSettings(),

      setRows: (next) =>
        set((state) => ({ rows: typeof next === 'function' ? (next as (p: ProductRow[]) => ProductRow[])(state.rows) : next })),

      setSettings: (patch) =>
        set((state) => ({ settings: { ...state.settings, ...patch } })),

      setPolicy: (key, value) =>
        set((state) => ({ settings: { ...state.settings, policy: { ...state.settings.policy, [key]: value } } })),

      reset: () => set({ rows: [], settings: getDefaultSettings() }),
    }),
    {
      name: 'workflow',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ rows: state.rows, settings: state.settings }),
    }
  )
);
