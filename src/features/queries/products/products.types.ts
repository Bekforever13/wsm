export type TProducts = {
	id: number
	category_id: number
	brand_id: number
	name: string
	created_at?: string
	updated_at?: string
}

export type TProductsFormData = {
	category_id: number
	brand_id: number
	name: string
}
