"use client"

import React, { ComponentPropsWithRef, useState } from "react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

interface CommonInputProps extends ComponentPropsWithRef<"input"> {
	iconLeft?: React.ReactNode
	iconRight?: React.ReactNode
	type?: string
}

export default function InputIcon({
	iconLeft,
	iconRight,
	className,
	type,
	...props
}: CommonInputProps) {
	const [showPassword, setShowPassword] = useState(false)

	const togglePassword = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className="relative flex items-center">
			{iconLeft && (
				<div className="absolute left-3  top-2/4 -translate-y-2/4 text-gray-500">
					{iconLeft}
				</div>
			)}
			<Input
				className={cn("pl-10 placeholder:text-alphii_text_sub_600", className)}
				type={type === "password" ? (showPassword ? "text" : "password") : type}
				{...props}
			/>
			{type === "password" ? (
				<div
					className="absolute right-3 top-2/4 -translate-y-2/4 text-gray-500 cursor-pointer"
					onClick={togglePassword}
				>
					{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
				</div>
			) : (
				iconRight && (
					<div className="absolute right-3  top-2/4 -translate-y-2/4 text-gray-500">
						{iconRight}
					</div>
				)
			)}
		</div>
	)
}
