"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"

import { Button } from "../ui"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTrigger
} from "../ui/dialog"

interface ConfirmDialogProps {
	title?: React.ReactNode
	description?: React.ReactNode
	handleConfirm?: () => void
	buttonDelete: React.ReactNode
	isDestructive?: boolean
	disabled?: boolean
}

const ConfirmDialog = ({
	description,
	handleConfirm,
	title,
	buttonDelete,
	isDestructive = true,
	disabled
}: ConfirmDialogProps) => {
	const commonTranslation = useTranslations("common")
	const [open, setOpen] = useState(false)

	const onConfirm = () => {
		handleConfirm && handleConfirm()
		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={(open) => setOpen(open)}>
			<div
				onClick={() => {
					if (disabled) return
					setOpen(true)
				}}
			>
				{buttonDelete}
			</div>
			<DialogContent className="items-center flex flex-col w-[412px] p-12 gap-8">
				<div className="flex flex-col items-center">
					<DialogHeader
						className={cn(
							"text-center font-bold text-xl",
							isDestructive ? "text-destructive" : "text-primary"
						)}
					>
						{title}
					</DialogHeader>

					<DialogDescription className="text-center text-base text-description">
						{description}
					</DialogDescription>
				</div>

				<div className="w-full  gap-4 grid grid-cols-2">
					<Button
						className="col-span-1 font-semibold rounded-xl"
						variant={isDestructive ? "destructive" : "outline"}
						onClick={() => setOpen(false)}
					>
						{commonTranslation("lCancel")}
					</Button>
					<Button
						className={cn(
							"col-span-1 font-semibold rounded-xl text-white bg-destructive hover:bg-destructive",
							!isDestructive && "bg-primary hover:bg-primary"
						)}
						variant={isDestructive ? "destructive" : "outline"}
						onClick={onConfirm}
					>
						{commonTranslation("lConfirm")}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default ConfirmDialog
