import { TClient } from '@/features/queries/clients/clients.types'

export type clientsStoreTypes = {
  clientToEdit: TClient | null
  clientsModal: boolean
  setClientToEdit: (el: TClient | null) => void
  setClientsModal: (el: boolean) => void
}
