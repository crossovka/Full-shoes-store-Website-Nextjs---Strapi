"use client";
import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa'
import Wrapper from './Wrapper'

const socialLinks = [
	{ id: 1, icon: <FaFacebookF size={20} />, url: 'https://facebook.com' },
	{ id: 2, icon: <FaTwitter size={20} />, url: 'https://twitter.com' },
	{ id: 3, icon: <FaYoutube size={20} />, url: 'https://youtube.com' },
	{ id: 4, icon: <FaInstagram size={20} />, url: 'https://instagram.com' }
]

const menuItems = [
	['Find a store', 'Become a partner', 'Sign up for email', 'Send us feedback', 'Student discount'],
	['Order Status', 'Delivery', 'Returns', 'Payment Options', 'Contact Us'],
	['News', 'Careers', 'Investors', 'Sustainability']
]

const footerLinks = ['Guides', 'Terms of Sale', 'Terms of Use', 'Privacy Policy']

const Footer: React.FC = () => {
	return (
		<footer className="bg-black text-white pt-14 pb-3">
			<Wrapper className="flex justify-between flex-col md:flex-row gap-[50px] md:gap-0">
				{/* LEFT SECTION */}
				<div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
					{/* MAIN MENU */}
					<div className="flex flex-col gap-3 shrink-0">
						{menuItems[0].map((item, index) => (
							<div key={index} className="font-oswald font-medium uppercase text-sm cursor-pointer">
								{item}
							</div>
						))}
					</div>

					{/* INFO MENUS */}
					<div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0">
						{menuItems.slice(1).map((menu, idx) => (
							<div key={idx} className="flex flex-col gap-3">
								<div className="font-oswald font-medium uppercase text-sm">
									{idx === 0 ? 'Get help' : 'About Nike'}
								</div>
								{menu.map((item, index) => (
									<div
										key={index}
										className="text-sm text-white/[0.5] hover:text-white cursor-pointer"
									>
										{item}
									</div>
								))}
							</div>
						))}
					</div>
				</div>

				{/* SOCIAL LINKS */}
				<div className="flex gap-4 justify-center md:justify-start">
					{socialLinks.map(({ id, icon, url }) => (
						<button
							key={id}
							onClick={() => window.open(url, '_blank')}
							className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
							aria-label="Social link"
						>
							{icon}
						</button>
					))}
				</div>
			</Wrapper>

			{/* FOOTER BOTTOM */}
			<Wrapper className="flex justify-between mt-10 flex-col md:flex-row gap-[10px] md:gap-0">
				<div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer text-center md:text-left">
					© {new Date().getFullYear()} Nike, Inc. All Rights Reserved
				</div>

				<div className="flex gap-2 md:gap-5 text-center md:text-left flex-wrap justify-center">
					{footerLinks.map((link, index) => (
						<div
							key={index}
							className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer"
						>
							{link}
						</div>
					))}
				</div>
			</Wrapper>
		</footer>
	)
}

export default Footer
