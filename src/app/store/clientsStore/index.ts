import { create } from 'zustand'
import { clientsStoreTypes } from './index.types'

const ClientsStore = create<clientsStoreTypes>()((set) => ({
  clientToEdit: null,
  clientsModal: false,
  setClientToEdit(el) {
    set(() => ({ clientToEdit: el }))
  },
  setClientsModal(el) {
    set(() => ({ clientsModal: el }))
  },
}))

export { ClientsStore }
