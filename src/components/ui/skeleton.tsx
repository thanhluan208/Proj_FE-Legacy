import { cn } from "@/utils"

function Skeleton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("animate-pulse rounded-md bg-alphii_skeleton", className)}
			{...props}
		/>
	)
}

export { Skeleton }
