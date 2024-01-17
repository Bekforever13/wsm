import { TBrand } from '@/features/queries/brands/brands.types'

export type brandStoreTypes = {
	brandsToEdit: TBrand | null
	brandsModal: boolean
	setBrandsToEdit: (el: TBrand | null) => void
	setBrandsModal: (el: boolean) => void
}
