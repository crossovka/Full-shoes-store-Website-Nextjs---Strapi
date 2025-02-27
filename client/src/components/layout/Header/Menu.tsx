import Link from 'next/link'
import { BsChevronDown } from 'react-icons/bs'
import { Category } from '@/types/category.types'

interface MenuProps {
	showCatMenu: boolean
	setShowCatMenu: (value: boolean) => void
	categories: Category[] | null
}

const Menu: React.FC<MenuProps> = ({ showCatMenu, setShowCatMenu, categories }) => {
	return (
		<ul className="hidden md:flex items-center gap-8 font-medium text-black">
			<li className="cursor-pointer">
				<Link href="/">Home</Link>
			</li>
			<li className="cursor-pointer">
				<Link href="/about">About</Link>
			</li>
			<li
				className="cursor-pointer flex items-center gap-2 relative"
				onMouseEnter={() => setShowCatMenu(true)}
				onMouseLeave={() => setShowCatMenu(false)}
			>
				Categories
				<BsChevronDown size={14} />
				{showCatMenu && categories && (
					<ul className="bg-white absolute top-6 left-0 min-w-[250px] px-1 py-1 text-black shadow-lg">
						{categories.map(({ id, name, slug, products }) => (
							<Link key={id} href={`/category/${slug}`} onClick={() => setShowCatMenu(false)}>
								<li className="h-12 flex justify-between items-center px-3 hover:bg-black/[0.03] rounded-md">
									{name}
									<span className="opacity-50 text-sm">{`(${products.length})`}</span>
								</li>
							</Link>
						))}
					</ul>
				)}
			</li>
			<li className="cursor-pointer">
				<Link href="/contact">Contact</Link>
			</li>
		</ul>
	)
}

export default Menu
