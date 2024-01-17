import { TProducts } from '@/features/queries/products/products.types'

export type productsStoreTypes = {
	productsToEdit: TProducts | null
	productsModal: boolean
	setProductsToEdit: (el: TProducts | null) => void
	setProductsModal: (el: boolean) => void
}
