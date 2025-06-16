import createMiddleware from "next-intl/middleware"
import { NextRequest } from "next/server"

import { routing } from "./i18n/routing"

export default async function middleware(request: NextRequest) {
	// const [, locale, ...segments] = request.nextUrl.pathname.split("/")

	// const path = `/${segments.join("/")}`

	// const token = await getCookie(ACCESS_TOKEN)

	// if (!token) {
	// 	return NextResponse.redirect(
	// 		new URL(`/${locale || LANGUAGE.EN}/login`, request.url)
	// 	)
	// }

	// if (!token) {
	// 	return NextResponse.redirect(
	// 		new URL(`/${locale || LANGUAGE.EN}/`, request.url)
	// 	)
	// }

	const handleI18nRouting = createMiddleware(routing)

	const response = handleI18nRouting(request)

	return response
}

export const config = {
	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
}
