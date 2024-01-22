import { TCompany } from '@/features/queries/company/companies.types'

export type companiesStoreTypes = {
	companiesToEdit: TCompany | null
	companiesModal: boolean
	setCompaniesToEdit: (el: TCompany | null) => void
	setCompaniesModal: (el: boolean) => void
}
