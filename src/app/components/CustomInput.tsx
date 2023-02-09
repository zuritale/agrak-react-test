import React from 'react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

import CompleteFieldMessage from './CompleteFieldMessage';

interface CustomInputProps {
  name: string
  value: string
  label: string
  disabled?: boolean
  handleChange: ($ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  type?: string
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  value,
  label,
  disabled = false,
  handleChange,
  type = 'text'
}: CustomInputProps) => {
  const isValid = Boolean(value ?? false);

  return (
    <FormControl isInvalid={!isValid}>
        <FormLabel>{label}</FormLabel>
        <Input
          disabled={disabled}
          value={value}
          onChange={handleChange}
          name={name}
          type={type}
        />
        {!isValid && (
        <CompleteFieldMessage />
        )}
    </FormControl>
  );
};

export default CustomInput;
