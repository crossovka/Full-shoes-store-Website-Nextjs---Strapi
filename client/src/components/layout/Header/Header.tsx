'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { IoMdHeartEmpty } from 'react-icons/io'
import { BiMenuAltRight } from 'react-icons/bi'
import { VscChromeClose } from 'react-icons/vsc'
import { BsCart } from 'react-icons/bs'

import Wrapper from '../Wrapper'
import Menu from './Menu'
import MenuMobile from './MenuMobile'
import { Category } from '@/types/category.types'
import { getCategories } from '@/utils/api'

const Header: React.FC = () => {
	const [mobileMenu, setMobileMenu] = useState(false)
	const [showCatMenu, setShowCatMenu] = useState(false)
	const [categories, setCategories] = useState<Category[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [show, setShow] = useState('translate-y-0')
	const [lastScrollY, setLastScrollY] = useState(0)

	// Загружаем категории при монтировании компонента
	useEffect(() => {
		const loadCategories = async () => {
			try {
				const data = await getCategories()
				setCategories(data)
			} catch (error) {
				console.error('Error fetching categories:', error)
			} finally {
				setIsLoading(false)
			}
		}

		loadCategories()
	}, [])

	const controlNavbar = () => {
		if (window.scrollY > 200) {
			if (window.scrollY > lastScrollY && !mobileMenu) {
				setShow('-translate-y-[80px]')
			} else {
				setShow('shadow-sm')
			}
		} else {
			setShow('translate-y-0')
		}
		setLastScrollY(window.scrollY)
	}

	useEffect(() => {
		window.addEventListener('scroll', controlNavbar)
		return () => {
			window.removeEventListener('scroll', controlNavbar)
		}
	}, [lastScrollY, mobileMenu])

	if (isLoading) {
		return <div>Loading...</div> // Можно добавить какой-то лоадер или спиннер
	}
	return (
		<header
			className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
		>
			<Wrapper className="h-[60px] flex justify-between items-center">
				<Link href="/">
					<img src="/logo.svg" className="w-[40px] md:w-[60px]" alt="Logo" />
				</Link>
				<Menu showCatMenu={showCatMenu} setShowCatMenu={setShowCatMenu} categories={categories} />
				{mobileMenu && (
					<MenuMobile
						showCatMenu={showCatMenu}
						setShowCatMenu={setShowCatMenu}
						setMobileMenu={setMobileMenu}
						categories={categories}
					/>
				)}
				<div className="flex items-center gap-2 text-black">
					<div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
						<IoMdHeartEmpty className="text-[19px] md:text-[24px]" />
						<div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
							51
						</div>
					</div>
					<Link href="/cart">
						<div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative">
							<BsCart className="text-[15px] md:text-[20px]" />
							<div className="h-[14px] md:h-[18px] min-w-[14px] md:min-w-[18px] rounded-full bg-red-600 absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-[5px]">
								0
							</div>
						</div>
					</Link>
					<div className="w-8 md:w-12 h-8 md:h-12 rounded-full flex md:hidden justify-center items-center hover:bg-black/[0.05] cursor-pointer relative -mr-2">
						{mobileMenu ? (
							<VscChromeClose className="text-[16px]" onClick={() => setMobileMenu(false)} />
						) : (
							<BiMenuAltRight className="text-[20px]" onClick={() => setMobileMenu(true)} />
						)}
					</div>
				</div>
			</Wrapper>
		</header>
	)
}

export default Header
