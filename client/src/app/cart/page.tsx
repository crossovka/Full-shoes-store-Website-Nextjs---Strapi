'use client'
import React, { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useAppDispatch, useAppSelector } from '@/store/store'
import { selectCartItems } from '@/store/cart/cart.selectors'
import { clearCart } from '@/store/cart/cart.slice'

import Wrapper from '@/components/layout/Wrapper'
import CartItem from '@/components/cart/CartItem'

const Cart = () => {
	const dispatch = useAppDispatch()
	const cartItems = useAppSelector(selectCartItems)

	const subTotal = useMemo(() => {
		return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
	}, [cartItems])

	// Обработчик очистки корзины
	const handleClearCart = () => {
		dispatch(clearCart())
	}
	return (
		<div className="w-full md:py-20">
			<Wrapper>
				{cartItems.length > 0 ? (
					<>
						<div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
							<div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
								Shopping Cart
							</div>
						</div>

						<div className="flex flex-col lg:flex-row gap-12 py-10">
							<div className="flex-[2]">
								<div className="text-lg font-bold">Cart Items</div>
								{cartItems.map((item) => {
									// Создаем уникальный ключ с учетом размера
									const productIdWithSize = `${item.id}-${item.size}`
									return <CartItem key={productIdWithSize} data={item} />
								})}
							</div>

							<div className="flex-[1]">
								<div className="text-lg font-bold">Summary</div>

								<div className="p-5 my-5 bg-black/[0.05] rounded-xl">
									<div className="flex justify-between">
										<div className="uppercase text-md md:text-lg font-medium text-black">
											Subtotal
										</div>
										<div className="text-md md:text-lg font-medium text-black">
											&#8377;{subTotal}
										</div>
									</div>
									<div className="text-sm md:text-md py-5 border-t mt-5">
										The subtotal reflects the total price of your order, including duties and taxes,
										before any applicable discounts. It does not include delivery costs and
										international transaction fees.
									</div>
								</div>

								<button className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center">
									Checkout
								</button>

								{/* Кнопка для очистки корзины */}
								<button
									onClick={handleClearCart}
									className="w-full py-4 rounded-full bg-red-600 text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
								>
									Clear Cart
								</button>
							</div>
						</div>
					</>
				) : (
					<div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
						<Image
							src="/empty-cart.jpg"
							width={300}
							height={300}
							className="w-[300px] md:w-[400px]"
						/>
						<span className="text-xl font-bold">Your cart is empty</span>
						<span className="text-center mt-4">
							Looks like you have not added anything in your cart.
							<br />
							Go ahead and explore top categories.
						</span>
						<Link
							href="/"
							className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
						>
							Continue Shopping
						</Link>
					</div>
				)}
			</Wrapper>
		</div>
	)
}

export default Cart
