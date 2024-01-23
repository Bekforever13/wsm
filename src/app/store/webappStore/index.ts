import { create } from 'zustand'
import { WebappStoreTypes } from './index.types'

const WebappStore = create<WebappStoreTypes>()((set) => ({
  webappUserId: 0,
  setWebappUserID(id: number) {
    set(() => ({ webappUserId: id }))
  },
}))

export { WebappStore }
