import React, { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

const GradientBorderCard = ({
	className,
	children
}: ComponentPropsWithoutRef<"div">) => {
	return (
		<div
			className={cn(
				"bg-[linear-gradient(90deg,#B7C0FF_0%,#3B54FF_33.33%,#EA8CFF_66.67%,#7485FF_100%)] relative",
				className
			)}
		>
			{children}
		</div>
	)
}

export default GradientBorderCard
