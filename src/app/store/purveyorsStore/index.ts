import { create } from 'zustand'
import { purveyorsStoreTypes } from './index.types'

const PurveyorsStore = create<purveyorsStoreTypes>()((set) => ({
  purveyorsToEdit: null,
  purveyorsModal: false,
  setPurveyorsToEdit(el) {
    set(() => ({ purveyorsToEdit: el }))
  },
  setPurveyorsModal(el) {
    set(() => ({ purveyorsModal: el }))
  },
}))

export { PurveyorsStore }
