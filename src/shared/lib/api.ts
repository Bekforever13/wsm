import axios from 'axios'

const axiosInterceptor = axios.create({
	baseURL: 'https://demo.sales-up.uz/api/v1',
})

axiosInterceptor.interceptors.request.use(function (config) {
	const token = localStorage.getItem('access_token_wsm')
	config.headers.Authorization = token ? `Bearer ${token}` : ''
	return config
})

export { axiosInterceptor }
