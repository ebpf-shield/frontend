import { ChangeEvent, useState } from "react";
import { useDebounce } from "use-debounce";
import { Input, InputProps } from "../ui/input";

export interface DebounceInputProps extends InputProps {
  delay?: number;
}

export const DebounceInput = ({ delay, ...rest }: DebounceInputProps) => {
  const [inputValue, setInputValue] = useState(rest.value || "");
  const [debouncedValue] = useDebounce(inputValue, delay || 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return <Input value={debouncedValue} onChange={handleChange} {...rest} />;
};
