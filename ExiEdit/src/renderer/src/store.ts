import { create } from 'zustand'
import { Page } from './constants'

interface State {
  page: Page
  setPage: (page: Page) => void
}

export const useStore = create<State>((set) => ({
  page: Page.DirPicker,
  setPage: (page) => set({ page })
}))
