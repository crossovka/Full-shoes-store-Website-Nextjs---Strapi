import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'
// import { Provider } from 'react-redux';
// import store from '@/store/store';
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer'
import Head from 'next/head'

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

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
			>
				<Head>
					<title>{metadata.title}</title>
					<meta name="description" content={metadata.description} />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
					<link
						href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Urbanist:wght@100..900&display=swap"
						rel="stylesheet"
					/>
				</Head>
				{/* <Provider store={store}> */}
				<Header />
				<main className="container mx-auto p-4 flex-grow">{children}</main>
				<Footer />
				{/* </Provider> */}
			</body>
		</html>
	)
}
