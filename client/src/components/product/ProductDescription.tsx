'use client'

import { useState, useEffect } from 'react'

const ProductDescription = ({ description }) => {
	const [clientDescription, setClientDescription] = useState(null)

	useEffect(() => {
		setClientDescription(description)
	}, [description])

	if (!clientDescription) return <p className="text-gray-500">Загрузка...</p>

	return (
		<div className="markdown text-md mb-5">
			{clientDescription.map((block, index) => (
				<p key={index} className="mb-2">
					{block.children[0].text}
				</p>
			))}
		</div>
	)
}

export default ProductDescription
