export const languages = ["en", "th"]

export const ACCESS_TOKEN = "access_token"
export const REFRESH_TOKEN = "refresh_token"
export const BASE_URL = process.env.BASE_URL || "http://backend-default"
export const NEXT_LOCALE = "NEXT_LOCALE"
export const DEFAULT_INIT_PAGE = "1"

export const Routes = {
	ROOT: "/",
	SHOWCASE: "/showcases",
	PROJECT: "/project",
	STUDIO: "/studio",
	LOGIN: "/login",
	REGISTER: "/register",
	FORGOT_PASSWORD: "/forgot-password",
	RESET_PASSWORD: "/reset-password",
	GOOGLE_LOGIN: "http://localhost:8000/auth/google",
	GITHUB_LOGIN: "http://localhost:8000/auth/github",
	SOCIAL_LOGIN_ORIGIN: "http://localhost:8000"
}

export const QueryKeys = {
	VALIDATE_RESET: "VALIDATE_RESET",

	PARTNER_SERVICE_ALL: "PARTNER_SERVICE_ALL",
	PARTNER_SERVICE_DETAIL: "PARTNER_SERVICE_DETAIL",
	PARTNER_SUB_SERVICE_DETAIL: "PARTNER_SUB_SERVICE_DETAIL",
	PARTNER_CATEGORY_ALL: "PARTNER_CATEGORY_ALL",
	PARTNER_PERMISSION_ALL: "PARTNER_PERMISSION_ALL",
	PARTNER_CATEGORY_INFINITE: "PARTNER_CATEGORY_INFINITE"
}

export const TIME_IN_SECONDS = {
	ONE_MINUTE: 60,
	ONE_HOUR: 60 * 60,
	ONE_DAY: 60 * 60 * 24
}

export const COUNT_DOWN_OTP = 60 //In seconds

//! USER API
export const logout = BASE_URL + "/user/log_out"
export const refreshToken =
	BASE_URL + "/user/generate_access_token_from_refresh_token"
export const signInApi = BASE_URL + "/user/log_in"
export const signUpApi = BASE_URL + "/user/sign_up"
export const verifyEmail = BASE_URL + "/user/resend_verification_code"
export const submitOTP = BASE_URL + "/user/verify_verification_code"
export const changePasswordApi = BASE_URL + "/user/change_password_user"
export const getUserData = BASE_URL + "/user/show_user_data"
export const searchUser = BASE_URL + "/user/search_user"
export const updateUser = BASE_URL + "/user/update_user"
export const voteStarAgent = BASE_URL + "/user/vote_star_agent"
export const forgotPass = BASE_URL + "/user/forget_password"
export const changePassword = BASE_URL + "/user/change_password_with_reset_code"
export const getAvatar = BASE_URL + "/user/get_avatar"
export const uploadAvatar = BASE_URL + "/user/upload_avatar"

export const LOCAL_STORAGE_KEY = {
	ACCESS_TOKEN: "ACCESS_TOKEN",
	REFRESH_TOKEN: "REFRESH_TOKEN",
	USER_ID: "USER_ID",
	USER_DATA: "USER_DATA"
}
