import React, { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"
import { CommonOption } from "@/types"
import { SelectProps } from "@radix-ui/react-select"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "./select"

interface CommonSelectProps extends ComponentPropsWithoutRef<"input"> {
	options: CommonOption[]
	value: string
	placeholder?: string
	icon?: React.ReactNode
	onValueChange?: (value: string) => void
}

const CommonSelect = ({
	options,
	value,
	icon,
	onValueChange,
	placeholder,
	className
}: CommonSelectProps) => {
	return (
		<Select value={value} onValueChange={onValueChange}>
			<SelectTrigger className={cn("w-[180px] h-14 rounded-xl", className)}>
				<div className="flex items-center gap-2">
					{icon}
					<SelectValue placeholder={placeholder} />
				</div>
			</SelectTrigger>
			<SelectContent>
				{options.map((opt) => {
					return (
						<SelectItem value={opt.value} key={opt.value}>
							{opt.label}
						</SelectItem>
					)
				})}
			</SelectContent>
		</Select>
	)
}

export default CommonSelect
