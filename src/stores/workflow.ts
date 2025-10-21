import { create } from 'zustand';
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
  setRows: (rows: ProductRow[]) => void;
  settings: Settings;
  setSettings: (patch: Partial<Settings>) => void;
  setPolicy: (key: keyof Settings['policy'], value: Policy) => void;
  reset: () => void;
};

const defaultSettings: Settings = {
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
};

export const useWorkflow = create<State>((set) => ({
  rows: [],
  settings: defaultSettings,
  setRows: (rows) => set({rows}),
  setSettings: (patch) =>
    set((setting) => ({
      settings: {...setting.settings, ...patch}})),
  setPolicy: (key, value) =>
    set((s) => ({
      settings: {
        ...s.settings,
        policy: {...s.settings.policy, [key]: value}
      }
    })),
  reset: () => set({rows: [], settings: defaultSettings})
}));
