import { FormErrorHelperText } from "@/components/form/FormErrorHelperText";
import { Input, InputProps } from "@/components/ui/input";
import { Label, LabelProps } from "@/components/ui/label";
import clsx from "clsx";
import { ChangeEventHandler } from "react";
import { useController, useFormContext } from "react-hook-form";

export interface FormInputProps {
  name: string;
  labelProps?: LabelProps;
  inputProps?: InputProps;
}

export const FormInput = ({ name, labelProps, inputProps }: FormInputProps) => {
  const {
    formState: { isSubmitting, defaultValues },
  } = useFormContext();

  const {
    fieldState: { error, invalid },
    field,
  } = useController({
    name,
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.value) {
      if (defaultValues) {
        field.onChange(defaultValues[name]);
        return;
      }

      field.onChange("");
      return;
    }

    field.onChange(e.target.value);
  };

  const errorStyles = "";
  const classes = clsx(inputProps?.className, {
    [errorStyles]: invalid,
  });

  return (
    <>
      <Label {...labelProps} htmlFor={name}>
        {labelProps?.children}
      </Label>
      <Input
        {...field}
        onChange={handleChange}
        disabled={isSubmitting}
        aria-errormessage={error?.message}
        id={name}
        {...inputProps}
        className={classes}
      />
      <FormErrorHelperText error={invalid} message={error?.message} />
    </>
  );
};

export const FormInputNumber = ({ name, labelProps, inputProps }: FormInputProps) => {
  const {
    formState: { isSubmitting, defaultValues },
  } = useFormContext();

  const {
    fieldState: { error, invalid },
    field,
  } = useController({
    name,
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.value) {
      if (defaultValues) {
        field.onChange(defaultValues[name]);
        return;
      }
      field.onChange(0);
      return;
    }

    field.onChange(Number(e.target.value));
  };

  return (
    <>
      <Label {...labelProps} htmlFor={name} />
      <Input
        {...field}
        inputMode="numeric"
        type="number"
        pattern="[0-9]*"
        onChange={handleChange}
        disabled={isSubmitting}
        aria-errormessage={error?.message}
        id={name}
        {...inputProps}
      />
      <FormErrorHelperText error={invalid} message={error?.message} />
    </>
  );
};
