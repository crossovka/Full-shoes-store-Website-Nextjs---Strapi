'use client'

import React from 'react'

interface PaginationProps {
	pageIndex: number
	totalPages: number
	handlePrevPage: () => void
	handleNextPage: () => void
}

const Pagination: React.FC<PaginationProps> = ({
	pageIndex,
	totalPages,
	handlePrevPage,
	handleNextPage
}) => {
	return (
		<div className="flex gap-3 items-center justify-center my-16 md:my-0">
			<button
				className="rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500"
				disabled={pageIndex === 1}
				onClick={handlePrevPage}
			>
				Previous
			</button>

			<span className="font-bold">{`${pageIndex} of ${totalPages}`}</span>

			<button
				className="rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500"
				disabled={pageIndex === totalPages}
				onClick={handleNextPage}
			>
				Next
			</button>
		</div>
	)
}

export default Pagination
