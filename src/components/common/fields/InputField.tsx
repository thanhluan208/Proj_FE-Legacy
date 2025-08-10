import { Input } from "@/components/ui";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React from "react";
import { Control, FieldValues, Path, PathValue, useFormContext } from "react-hook-form";

interface InputFieldProps<FormValues extends FieldValues, TName extends Path<FormValues>> {
  control: Control<FormValues, any>;
  name: TName;
  label: string;

  onChangeCustomize?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  afterOnChange?: (value: string) => void;
}

const InputField = <FormValues extends FieldValues, TName extends Path<FormValues>>({
  control,
  name,
  label,
  onChangeCustomize,
  afterOnChange,
}: InputFieldProps<FormValues, TName>) => {
  const form = useFormContext<FormValues>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeCustomize) {
      onChangeCustomize(e);
      return;
    }

    form.setValue(name, e.target.value as PathValue<FormValues, TName>);

    if (afterOnChange) {
      afterOnChange(e.target.value);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const { onChange, ...otherProps } = field;
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input onChange={handleChange} {...otherProps} />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

export default InputField;
