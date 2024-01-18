export type TStorage = {
	id: number
	product: {
		id: number
		category_id: number
		brand_id: number
		name: string
		created_at: string
		updated_at: string
	}
	purchased: number
	sales: number
	quantity: number
}
