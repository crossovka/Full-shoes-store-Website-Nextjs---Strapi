export const getDiscountedPricePercentage = (
	originalPrice: number,
	discountedPrice: number
): string => {
	const discount = originalPrice - discountedPrice
	const discountPercentage = (discount / originalPrice) * 100

	return discountPercentage.toFixed(2)
}
