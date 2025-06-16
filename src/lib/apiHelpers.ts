import { getCookie, removeCookie, setCookie } from "@/app/actions"
import { redirect } from "@/i18n/routing"
import {
	ACCESS_TOKEN,
	BASE_URL,
	NEXT_LOCALE,
	REFRESH_TOKEN,
	Routes
} from "@/lib/constant"
import { LANGUAGE, STATUS_CODE } from "@/types"
import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse
} from "axios"

export const TOKEN_KEY = "token"
export const REFRESH_TOKEN_KEY = "refreshToken"
export const USER_KEY = "user"

class httpServices {
	axios: AxiosInstance
	isRefreshing = false
	requestQueue: ((token: string) => void)[] = []

	constructor() {
		this.axios = axios
		this.axios.defaults.withCredentials = true
		this.axios.defaults.baseURL = BASE_URL

		this.axios.defaults.headers["ngrok-skip-browser-warning"] = true

		//! Interceptor request
		this.axios.interceptors.request.use(
			async function (config) {
				config.headers["x-timezone"] =
					Intl.DateTimeFormat().resolvedOptions().timeZone

				return config
			},
			function (error) {
				return Promise.reject(error)
			}
		)

		//! Interceptor response
		this.axios.interceptors.response.use(
			function (response: AxiosResponse) {
				// Pass through successful responses
				return response
			},
			async (error: AxiosError) => {
				const originalRequest = error.config // Access the original request
				const access_token = await getCookie(ACCESS_TOKEN)
				const refreshToken = await getCookie(REFRESH_TOKEN)
				const locale = await getCookie(NEXT_LOCALE)

				if (
					error.response?.status === STATUS_CODE.UNAUTHORIZED &&
					refreshToken &&
					access_token
				) {
					if (!this.isRefreshing) {
						this.isRefreshing = true

						// try {
						// 	// Refresh the token
						// 	this.attachTokenToHeader(refreshToken)
						// 	const response = await AuthServices.refreshToken()
						// 	const newAccessToken = response?.data?.access_token

						// 	// Update cookies with the new token
						// 	if (newAccessToken) {
						// 		setCookie(ACCESS_TOKEN, newAccessToken)
						// 	}

						// 	this.attachTokenToHeader(newAccessToken)

						// 	// Resolve all queued requests with the new token
						// 	this.requestQueue.forEach((cb) => {
						// 		cb(newAccessToken)
						// 	})
						// 	this.requestQueue = [] // Clear the queue

						// 	this.isRefreshing = false
						// 	if (originalRequest?.headers) {
						// 		originalRequest.headers["Authorization"] =
						// 			`Bearer ${newAccessToken}`
						// 		return this.axios.request(originalRequest)
						// 	}
						// } catch (refreshError) {
						// 	this.isRefreshing = false
						// 	removeCookie(ACCESS_TOKEN)
						// 	removeCookie(REFRESH_TOKEN)
						// 	// Redirect to login or handle appropriately
						// 	// window.location.reload()
						// 	redirect({
						// 		href: Routes.LOGIN,
						// 		locale: locale || LANGUAGE.EN
						// 	})
						// 	return Promise.reject(refreshError)
						// }
					}

					// Queue the current request until the token refresh is complete
					return new Promise((resolve) => {
						this.requestQueue.push((newToken: string) => {
							if (originalRequest?.headers) {
								originalRequest.headers["Authorization"] = `Bearer ${newToken}`
							}
							originalRequest && resolve(this.axios(originalRequest))
						})
					})
				}

				return Promise.reject(error) // Reject all other errors
			}
		)
	}

	attachTokenToHeader(token: string) {
		this.axios.defaults.headers.Authorization = `Bearer ${token}`
	}

	setupInterceptors() {
		this.axios.interceptors.response.use(
			(response) => {
				return response
			},
			(error) => {
				const { status } = error?.response || {}
				if (status === 200) {
					window.localStorage.clear()
					window.location.reload()
				}

				return Promise.reject(error)
			}
		)
	}

	get(url: string, config?: AxiosRequestConfig) {
		return this.axios.get(url, config)
	}

	post(url: string, data: any, config?: AxiosRequestConfig) {
		return this.axios.post(url, data, config)
	}

	delete(url: string, config?: AxiosRequestConfig) {
		return this.axios.delete(url, config)
	}

	put(url: string, data: any, config?: AxiosRequestConfig) {
		return this.axios.put(url, data, config)
	}

	patch(url: string, data: any, config?: AxiosRequestConfig) {
		return this.axios.patch(url, data, config)
	}
}

export const api = new httpServices()
