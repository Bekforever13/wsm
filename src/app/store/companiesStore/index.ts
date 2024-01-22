import { create } from 'zustand'
import { companiesStoreTypes } from './index.types'

const CompaniesStore = create<companiesStoreTypes>()(set => ({
	companiesToEdit: null,
	companiesModal: false,
	setCompaniesToEdit(el) {
		set(() => ({ companiesToEdit: el }))
	},
	setCompaniesModal(el) {
		set(() => ({ companiesModal: el }))
	},
}))

export { CompaniesStore }
