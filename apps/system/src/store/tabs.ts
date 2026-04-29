import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TabItem {
  key: string
  title: string
  path: string
  closable?: boolean
}

interface TabsState {
  items: TabItem[]
  activeKey: string
}

const initialState: TabsState = {
  items: [],
  activeKey: '',
}

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    addTab(state, action: PayloadAction<TabItem>) {
      const exists = state.items.find(t => t.key === action.payload.key)
      if (!exists) {
        state.items.push(action.payload)
      }
      state.activeKey = action.payload.key
    },
    removeTab(state, action: PayloadAction<string>) {
      const idx = state.items.findIndex(t => t.key === action.payload)
      if (idx === -1) return

      const wasActive = state.activeKey === action.payload
      state.items.splice(idx, 1)

      if (wasActive && state.items.length > 0) {
        const nextIdx = Math.min(idx, state.items.length - 1)
        state.activeKey = state.items[nextIdx].key
      }
    },
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeKey = action.payload
    },
  },
})

export const { addTab, removeTab, setActiveTab } = tabsSlice.actions
export default tabsSlice.reducer
