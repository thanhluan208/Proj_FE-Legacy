"use client"

import React, { useMemo } from "react"
import { useSearchParams } from "next/navigation"

import { usePathname, useRouter } from "@/i18n/routing"
import { cn, createQueryString, generatePageNumbers } from "@/lib/utils"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "./button"

interface PaginationProps {
	currentPage: number
	totalPage: number
	onPageChange?: (page: number) => void
}

const Pagination = ({
	currentPage,
	totalPage,
	onPageChange
}: PaginationProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const listPagination = useMemo(() => {
		return generatePageNumbers(currentPage, totalPage) || []
	}, [currentPage, totalPage])

	const isFirst = currentPage === 1
	const isLast = currentPage === totalPage

	const handleChangePage = (page: number) => {
		onPageChange && onPageChange(page)
		const queries = [{ name: "page", value: String(page) }]
		searchParams.forEach((value, key) => {
			if (value && key !== "page") {
				queries.push({
					name: key,
					value
				})
			}
		})

		const queryString = createQueryString(searchParams, queries)
		router.replace(`${pathname}?${queryString}`)
	}

	return (
		<div className="w-full flex justify-end gap-6 items-center mt-5">
			<Button
				disabled={isFirst}
				variant="ghost"
				className="text-primary h-9 w-10 hover:text-primary  rounded-[6px] border border-grey-3"
				onClick={() => {
					if (isFirst) return
					handleChangePage(currentPage - 1)
				}}
			>
				<ArrowLeft />
			</Button>
			<div className="flex gap-2">
				{listPagination.map((elm) => {
					const isCurrent = currentPage === +elm
					return (
						<Button
							onClick={() => {
								if (isCurrent) return
								handleChangePage(+elm)
							}}
							key={elm}
							variant={"ghost"}
							className={cn(
								"h-9 w-9 border border-grey-3 rounded-[6px]",
								isCurrent &&
									"text-white bg-primary hover:bg-primary hover:text-white"
							)}
						>
							{elm}
						</Button>
					)
				})}
			</div>
			<Button
				disabled={isLast}
				onClick={() => {
					if (isLast) return
					handleChangePage(currentPage + 1)
				}}
				variant="ghost"
				className="text-primary h-9 w-10 hover:text-primary  rounded-[6px] border border-grey-3"
			>
				<ArrowRight />
			</Button>
		</div>
	)
}

export default Pagination
