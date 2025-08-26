"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React, { ReactNode, useCallback } from "react";
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  useFormContext,
} from "react-hook-form";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface NumericFormatFieldProps<
  FormValues extends FieldValues,
  TName extends Path<FormValues>,
> extends Omit<NumericFormatProps, "name" | "value" | "onChange"> {
  control: Control<FormValues, any>;
  name: TName;
  label: string;

  onChangeCustomize?: (values: any, sourceInfo: any) => void;
  afterOnChange?: (value: string) => void;

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const NumericFormatField = <
  FormValues extends FieldValues,
  TName extends Path<FormValues>,
>({
  control,
  name,
  label,
  onChangeCustomize,
  afterOnChange,
  leftIcon,
  rightIcon,
  className,
  ...otherNumericFormatProps
}: NumericFormatFieldProps<FormValues, TName>) => {
  const form = useFormContext<FormValues>();

  const handleValueChange = (values: any, sourceInfo: any) => {
    if (onChangeCustomize) {
      onChangeCustomize(values, sourceInfo);
      return;
    }

    const { formattedValue, value, floatValue } = values;
    // Use the raw value for form state, you can adjust this based on your needs
    form.setValue(
      name,
      (floatValue || value || "") as PathValue<FormValues, TName>
    );

    if (afterOnChange) {
      afterOnChange(floatValue || value || "");
    }
  };

  const renderRightIcon = useCallback(() => {
    if (rightIcon) return rightIcon;
    return null;
  }, [rightIcon]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const { onChange, value, ...otherProps } = field;
        return (
          <FormItem className="flex flex-col gap-1">
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <div
                className={cn(
                  "relative flex items-center gap-1.5 overflow-hidden",
                  "border border-neutral-90 transition-colors duration-200",
                  "hover:border-primary focus-within:border-primary",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "rounded-[10px]",
                  leftIcon && "pl-2",
                  rightIcon && "pr-2"
                )}
              >
                {leftIcon}
                <NumericFormat
                  {...otherNumericFormatProps}
                  {...otherProps}
                  value={value}
                  onValueChange={handleValueChange}
                  className={cn(
                    "flex h-10 w-full border-none bg-transparent px-3 py-2 text-sm",
                    "placeholder:text-muted-foreground",
                    "focus-visible:outline-none",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    className
                  )}
                />
                {renderRightIcon()}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default NumericFormatField;
