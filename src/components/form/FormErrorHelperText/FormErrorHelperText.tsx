export interface FormErrorHelperTextProps {
  message?: string;
  error: boolean;
}

export const FormErrorHelperText = ({ error, message }: FormErrorHelperTextProps) => {
  if (error && message) {
    const errorClasses = "text-red-300 text-sm mt-1";
    return <span className={errorClasses}>{message}</span>;
  }

  return <></>;
};
