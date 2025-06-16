import { CSSProperties } from "react"
import { ReadonlyURLSearchParams } from "next/navigation"

import { Column } from "@tanstack/react-table"
import { clsx, type ClassValue } from "clsx"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import { Atom, Braces, File } from "lucide-react"
import { twMerge } from "tailwind-merge"

import { STATUS_CODE } from "./../types/index"
import { TIME_IN_SECONDS } from "./constant"

dayjs.extend(duration)

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const toTimeFormat = (seconds: number, format?: string) => {
	const duration = dayjs.duration(seconds, "seconds")
	let formatTime = ""
	if (seconds >= TIME_IN_SECONDS.ONE_DAY) {
		formatTime = "DD:HH"
	} else if (seconds >= TIME_IN_SECONDS.ONE_HOUR) {
		formatTime = "H[h]:m[m]"
	} else {
		formatTime = "mm:ss"
	}

	return duration.format(format ?? formatTime)
}

export const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
	const isPinned = column.getIsPinned()
	const isLastLeftPinnedColumn =
		isPinned === "left" && column.getIsLastColumn("left")
	const isFirstRightPinnedColumn =
		isPinned === "right" && column.getIsFirstColumn("right")

	return {
		transition: "filter .25s ease",
		filter: isLastLeftPinnedColumn
			? "-4px 0 4px -4px gray inset"
			: isFirstRightPinnedColumn
				? "drop-shadow(0px -24px 20px rgba(0, 0, 0, 0.25))"
				: undefined,
		left: isPinned === "left" ? `${column.getStart("left") - 1}px` : undefined,
		right:
			isPinned === "right"
				? `${column.getAfter("right") - (isFirstRightPinnedColumn ? 2 : 0)}px`
				: undefined,
		position: isPinned ? "sticky" : "relative",
		width: column.getSize(),
		zIndex: isPinned ? 1 : 0
	}
}

export const optionFromEnum = (enumInput: object) => {
	return Object.entries(enumInput).map(([key, value]) => {
		return {
			label: key,
			value
		}
	})
}

export const generatePageNumbers = (page: number, totalPage: number) => {
	if (totalPage > 5) {
		if (page < 3 || page > totalPage - 2) {
			return [1, 2, "...", totalPage - 1, totalPage]
		} else {
			return [1, "...", page - 1, page, page + 1, "...", totalPage]
		}
	} else {
		return Array.from({ length: totalPage }, (_, i) => i + 1)
	}
}

export const createQueryString = (
	searchParams: ReadonlyURLSearchParams,
	queries: { name: string; value: string }[]
) => {
	const params = new URLSearchParams(searchParams.toString())
	queries.forEach((query) => {
		params.set(query.name, query.value)
	})

	return params.toString()
}

export const fileIcon = (fileName: string) => {
	const fileType = fileName.split(".").pop()

	if (fileType === 'tsx' || fileType === "jsx") return Atom

	if(fileType === 'json') return Braces

	return File
}


export const extractMessage = (message: string) => {
	const regex = /^\[Message\] from .+? to .+?: ([\s\S]+)$/;
	const match = message.match(regex);

	if (match) {
		return match[1]
	}

	return ''
}