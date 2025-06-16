import React, { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

interface GroupHeaderProps extends ComponentPropsWithoutRef<"div"> {
	title: string
}

const GroupHeader = ({ title, className }: GroupHeaderProps) => {
	return (
		<div className={cn("flex gap-3 items-center", className)}>
			<p className="text-xl font-bold leading-[26px] align-middle text-[#524D4D]">
				{title}
			</p>
			<div className="flex-1 h-[1px] border border-[#ACACAC] border-dashed" />
		</div>
	)
}

export default GroupHeader
