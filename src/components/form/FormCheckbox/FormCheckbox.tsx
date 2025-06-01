import { Checkbox, CheckboxProps } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LabelProps } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export interface FormCheckboxProps {
  name: string;
  description?: string;
  labelProps?: LabelProps;
  checkboxProps?: CheckboxProps;
}

export const FormCheckbox = ({
  name,
  checkboxProps,
  labelProps,
  description,
}: FormCheckboxProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState: { isSubmitting } }) => {
        return (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isSubmitting || checkboxProps?.disabled}
                {...checkboxProps}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              {labelProps?.children && <FormLabel {...labelProps} />}
              {description && <FormDescription>{description}</FormDescription>}
              <FormMessage />
            </div>
          </FormItem>
        );
      }}
    />
  );
};
