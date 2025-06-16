import React from "react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"
import { StatusEnum } from "@/types"
import { cva, VariantProps } from "class-variance-authority"

const statusVariants = cva(
	"h-[34px] w-[131px] rounded-sm py-2 px-4 text-center",
	{
		variants: {
			variant: {
				[StatusEnum.ACTIVE]: "bg-[#E7F6F1] border border-primary text-primary",
				[StatusEnum.DEACTIVE]:
					"bg-[#FFE1E0] border border-destructive text-destructive"
			}
		},
		defaultVariants: {
			variant: StatusEnum.ACTIVE
		}
	}
)

interface StatusProps
	extends React.ButtonHTMLAttributes<HTMLDivElement>,
		VariantProps<typeof statusVariants> {
	asChild?: boolean
}

const Status = ({ variant, className }: StatusProps) => {
	const t = useTranslations("common")

	return (
		<div className={cn(statusVariants({ variant, className }))}>
			{t(variant)}
		</div>
	)
}

export default Status
