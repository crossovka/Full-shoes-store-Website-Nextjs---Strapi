import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'

import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer'
import StoreProvider from '@/components/layout/StoreProvider'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Online Shoe Store',
	description: 'Find the best shoes for any occasion.'
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
			>
				<StoreProvider>
					<Header />
					<main>{children}</main>
					<Footer />
				</StoreProvider>
			</body>
		</html>
	)
}
