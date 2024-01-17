import { create } from 'zustand'
import { productsStoreTypes } from './index.types'

const ProductsStore = create<productsStoreTypes>()(set => ({
	productsModal: false,
	productsToEdit: null,
	setProductsToEdit(item) {
		set(() => ({ productsToEdit: item }))
	},
	setProductsModal(item) {
		set(() => ({ productsModal: item }))
	},
}))

export { ProductsStore }
