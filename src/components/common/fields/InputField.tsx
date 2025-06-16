import { ComponentPropsWithoutRef, useState } from "react"
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

import { FormControl, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"

interface InputFieldProps<
	TFieldValue extends FieldValues,
	TName extends Path<TFieldValue>
> extends ComponentPropsWithoutRef<"input"> {
	label?: React.ReactNode
	field: ControllerRenderProps<TFieldValue, TName>
	description?: string
	maxlengthClassname?: string
	icon?: React.ReactNode
	isEndIcon?: boolean
	labelClassname?: string
	onChangeCustomize?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = <
	TFieldValue extends FieldValues,
	TName extends Path<TFieldValue>
>({
	label,
	field,
	labelClassname,
	description,
	placeholder,
	icon,
	onChangeCustomize,
	maxlengthClassname,
	...otherInputProps
}: InputFieldProps<TFieldValue, TName>) => {
	const [showPass, setShowPass] = useState(false)

	return (
		<FormItem>
			{label && (
				<FormLabel
					className={cn(
						"text-base font-semibold leading-[18px]",
						labelClassname
					)}
					htmlFor={otherInputProps.name}
				>
					{label}
					{otherInputProps.required && (
						<span className="text-sm ml-1 -translate-y-1 text-destructive">
							*
						</span>
					)}
				</FormLabel>
			)}
			<FormControl>
				<div className="relative !mt-1">
					{icon && (
						<div className="absolute flex items-center justify-center left-3 top-4 h-6 w-6 text-muted-foreground">
							{icon}
						</div>
					)}
					{otherInputProps.type === "password" && (
						<div
							className="absolute right-3 top-3 flex items-center justify-center h-5 w-5 text-neutral-400"
							onClick={() => setShowPass(!showPass)}
						>
							{showPass ? <Eye /> : <EyeOff />}
						</div>
					)}
					<Input
						id={otherInputProps.name}
						className={cn(
							"w-full rounded-lg bg-background h-full",
							icon && "pl-[46px]",
							otherInputProps.maxLength && "pr-12"
						)}
						placeholder={placeholder}
						{...field}
						{...otherInputProps}
						type={
							otherInputProps?.type === "password"
								? showPass
									? "text"
									: "password"
								: otherInputProps?.type
						}
					/>
				</div>
			</FormControl>
			<FormMessage />
		</FormItem>
	)
}

export default InputField
