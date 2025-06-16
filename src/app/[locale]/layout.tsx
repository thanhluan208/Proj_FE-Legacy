import type { Metadata } from "next"
import { Instrument_Sans, Inter, Josefin_Sans } from "next/font/google"

import { Providers } from "@/providers"

import { siteConfig } from "@/config/site"

import "./globals.css"

import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"

import { Toaster } from "@/components/ui/toaster"
import { routing } from "@/i18n/routing"
import { ThemeProvider } from "@/providers/themeProvider"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { twJoin } from "tailwind-merge"

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-inter"
})

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description
}

export default async function RootLayout({
	children,
	params: { locale }
}: Readonly<{
	children: React.ReactNode
	params: { locale: string }
}>) {
	if (!routing.locales.includes(locale as any)) {
		notFound()
	}

	const messages = await getMessages()

	return (
		<html lang={locale}>
			<body className={twJoin(inter.variable)}>
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						<Providers>
							<SpeedInsights />
							<main>{children}</main>
						</Providers>
					</ThemeProvider>
				</NextIntlClientProvider>
				<Toaster />
			</body>
		</html>
	)
}
