import React from 'react'
import Image from 'next/image'
import { RiDeleteBin6Line } from 'react-icons/ri'

import { useAppDispatch } from '@/store/store'
import { CartItem as CartItemType } from '@/store/cart/cart.types'
import { increaseQuantity, decreaseQuantity, removeFromCart } from '@/store/cart/cart.slice'

import { StrapiImage } from '../ui/StrapiImage'

interface CartItemProps {
	data: CartItemType
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
	console.log('cart item', data)

	const dispatch = useAppDispatch()

	const productIdWithSize = `${data.id}-${data.size}` // Используем уникальный идентификатор товара с размером

	const handleIncrease = () => {
		dispatch(increaseQuantity(productIdWithSize))
	}

	const handleDecrease = () => {
		if (data.quantity <= 1) {
			// Стандартный браузерный попап для подтверждения удаления
			const shouldRemove = window.confirm('Вы уверены, что хотите удалить товар?')
			if (shouldRemove) {
				dispatch(removeFromCart(productIdWithSize))
			}
		} else {
			dispatch(decreaseQuantity(productIdWithSize))
		}
	}

	const handleRemove = () => {
		// Стандартный браузерный попап для подтверждения удаления
		const shouldRemove = window.confirm('Вы уверены, что хотите удалить этот товар из корзины?')
		if (shouldRemove) {
			dispatch(removeFromCart(productIdWithSize))
		}
	}

	return (
		<div className="flex py-5 gap-3 md:gap-5 border-b">
			<div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
				{/* <Image src={data.image} alt={data.name} width={120} height={120} /> */}
				<StrapiImage
						src={data.thumbnail.url}
						alt={data.thumbnail.alternativeText}
						className="rounded-lg"
						width={800}
						height={600}
					/>
			</div>
			<div className="w-full flex flex-col">
				<div className="flex flex-col md:flex-row justify-between">
					<div className="text-lg md:text-2xl font-semibold text-black/[0.8]">{data.name}</div>
					<div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
						Цена: &#8377;{data.price}
					</div>
				</div>

			{/* Добавим информацию о размере */}
			<div className="text-sm md:text-md text-black/[0.5] mt-2">
					Размер: {data.size}
				</div>

				<div className="flex items-center justify-between mt-4">
					<div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
						<div className="flex items-center gap-1">
							<div className="font-semibold">Количество:</div>
							<div className="flex items-center">
								<button
									onClick={handleDecrease}
									className="px-2 py-1 border rounded-md text-black hover:bg-gray-200"
								>
									-
								</button>
								<span className="mx-2">{data.quantity}</span>
								<button
									onClick={handleIncrease}
									className="px-2 py-1 border rounded-md text-black hover:bg-gray-200"
								>
									+
								</button>
							</div>
						</div>
					</div>
					<RiDeleteBin6Line
						onClick={handleRemove}
						className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
					/>
				</div>
			</div>
		</div>
	)
}

export default CartItem
