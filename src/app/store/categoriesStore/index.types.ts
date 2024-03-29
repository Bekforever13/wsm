import { TCategory } from '@/features/queries/categories/categories.types'

export type categoriesStoreTypes = {
  categoriesToEdit: TCategory | null
  categoriesModal: boolean
  setCategoryToEdit: (el: TCategory | null) => void
  setCategoriesModal: (el: boolean) => void
}
