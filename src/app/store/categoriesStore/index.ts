import { create } from 'zustand'
import { categoriesStoreTypes } from './index.types'

const CategoriesStore = create<categoriesStoreTypes>()(set => ({
	categoriesToEdit: null,
	categoriesModal: false,
	setCategoryToEdit(el) {
		set(() => ({ categoriesToEdit: el }))
	},
	setCategoriesModal(el) {
		set(() => ({ categoriesModal: el }))
	},
}))

export { CategoriesStore }
