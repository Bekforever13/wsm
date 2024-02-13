import { TPurveyors } from '@/features/queries/purveyors/purveyors.types'

export type purveyorsStoreTypes = {
  purveyorsToEdit: TPurveyors | null
  purveyorsModal: boolean
  setPurveyorsToEdit: (el: TPurveyors | null) => void
  setPurveyorsModal: (el: boolean) => void
}
