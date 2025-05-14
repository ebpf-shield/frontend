// TODO: Use shadcn ui form

import { FormErrorHelperText } from "@/components/form/FormErrorHelperText";
import { Input, InputProps } from "@/components/ui/input";
import { Label, LabelProps } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ChangeEventHandler, createElement, useState } from "react";
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

  const label = (
    <Label {...labelProps} htmlFor={name}>
      {labelProps?.children}
    </Label>
  );

  return (
    <>
      {labelProps?.children && label}
      <Input
        {...field}
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

export const FormInputNumber = ({ name, labelProps, inputProps }: FormInputProps) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  const {
    fieldState: { error, invalid },
    field,
  } = useController({
    name,
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.value || isNaN(Number(e.target.value))) {
      // TODO: Please check if we are want to set to empty string
      // if (defaultValues) {
      //   field.onChange(defaultValues[name]);
      //   return;
      // }

      // field.onChange(0);
      field.onChange("");
      return;
    }

    field.onChange(Number(e.target.value));
  };

  const label = (
    <Label {...labelProps} htmlFor={name}>
      {labelProps?.children}
    </Label>
  );

  return (
    <>
      {labelProps?.children && label}
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

export const FormInputPassword = ({ name, labelProps, inputProps }: FormInputProps) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

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

  return (
    <>
      {labelProps?.children && (
        <Label {...labelProps} htmlFor={name}>
          {labelProps?.children}
        </Label>
      )}
      <div className="relative">
        <Input
          {...field}
          type={passwordVisibility ? "text" : "password"}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-errormessage={error?.message}
          id={name}
          {...inputProps}
        />
        <div
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
          onClick={() => setPasswordVisibility(!passwordVisibility)}
        >
          {createElement(passwordVisibility ? EyeOffIcon : EyeIcon, {
            className: "h-4 w-4",
          })}
        </div>
      </div>
      <FormErrorHelperText error={invalid} message={error?.message} />
    </>
  );
};
