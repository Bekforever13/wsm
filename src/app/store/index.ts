import { create } from 'zustand'
import { Store } from './index.types'

const adminStore = create<Store>()(set => ({
	categoriesToEdit: null,
	categoriesModal: false,
	setCategoryToEdit(item) {
		set(() => ({ categoriesToEdit: item }))
	},
	setCategoriesModal(el) {
		set(() => ({ categoriesModal: el }))
	},
}))

export { adminStore }
