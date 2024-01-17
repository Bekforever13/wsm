import { create } from 'zustand'
import { brandStoreTypes } from './index.types'

const BrandStore = create<brandStoreTypes>()(set => ({
	brandsModal: false,
	brandsToEdit: null,
	setBrandsToEdit(item) {
		set(() => ({ brandsToEdit: item }))
	},
	setBrandsModal(item) {
		set(() => ({ brandsModal: item }))
	},
}))

export { BrandStore }
