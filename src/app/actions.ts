"use server"

import { cookies } from "next/headers"

export async function getCookie(name: string) {
	const cookie = cookies().get(name)?.value

	return cookie || ""
}

export async function setCookie(
	name: string,
	value: string,
	maxAge = 60 * 60 * 24
) {
	cookies().set(name, value, {
		maxAge
	})
}

export async function removeCookie(name: string) {
	return cookies().delete(name)
}
