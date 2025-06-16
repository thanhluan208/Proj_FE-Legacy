import React, { ComponentPropsWithoutRef } from "react"

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "./tooltip"

interface TooltipContainerProps extends ComponentPropsWithoutRef<"div"> {
	tooltipContent?: React.ReactNode
}

const TooltipContainer = ({
	children,
	tooltipContent,
	className
}: TooltipContainerProps) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger className={className}>{children}</TooltipTrigger>
				<TooltipContent className="max-w-[300px] text-wrap z-[100000] whitespace-pre-line">
					{tooltipContent}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default TooltipContainer
