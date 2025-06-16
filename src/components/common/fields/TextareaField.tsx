import React, { ComponentPropsWithoutRef } from "react"
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form"

import { cn } from "@/lib/utils"

import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage
} from "../../ui/form"
import { Textarea } from "../../ui/textarea"

interface TextAreaFieldProps<
	TFieldValue extends FieldValues,
	TName extends Path<TFieldValue>
> extends ComponentPropsWithoutRef<"textarea"> {
	label?: string
	field: ControllerRenderProps<TFieldValue, TName>
	description?: string
	icon?: React.ReactNode
}

const TextAreaField = <
	TFieldValue extends FieldValues,
	TName extends Path<TFieldValue>
>({
	label,
	field,
	description,
	placeholder,
	icon,
	className,
	...otherInputProps
}: TextAreaFieldProps<TFieldValue, TName>) => {
	return (
		<FormItem>
			{label && (
				<FormLabel
					className="text-base font-semibold"
					htmlFor={otherInputProps.name}
				>
					{label}
				</FormLabel>
			)}
			<FormControl>
				<div className="relative">
					<Textarea
						id={otherInputProps.name}
						placeholder={placeholder}
						className={cn(
							"resize-none font-SegoeUI no-scrollbar",
							otherInputProps.maxLength && "pr-16",
							className
						)}
						{...field}
						{...otherInputProps}
					/>
					{otherInputProps.maxLength && (
						<div className="absolute right-1.5 text-sm bottom-0 h-9 flex justify-center items-center  text-muted-foreground">
							{`${field.value.length}/${otherInputProps.maxLength}`}
						</div>
					)}
				</div>
			</FormControl>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage />
		</FormItem>
	)
}

export default TextAreaField
