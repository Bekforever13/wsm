import dayjs from 'dayjs'

export const capatilize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const clearSpaces = (phone: string) =>
	phone.substring(1).split(' ').join('')

export const formatPrice = (price: string) =>
	price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const formatPhone = (phone: string) =>
	phone.replace(/^(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1$2 $3 $4 $5')

export const formattedDate = (date: any) =>
	dayjs(date.$d).format('YYYY-MM-DD HH:mm')
