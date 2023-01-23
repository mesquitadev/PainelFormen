import React from 'react';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { Controller } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Option = ({ control, name, label, options, placeholder, isMulti, ...rest }: any) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
        <FormControl py={4} isInvalid={!!error}>
          {label && <FormLabel>{label}</FormLabel>}

          {isMulti ? (
            <Select
              isMulti
              name={name}
              ref={ref}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              options={options}
              placeholder={placeholder ? placeholder : label}
              closeMenuOnSelect={false}
              {...rest}
            />
          ) : (
            <Select
              name={name}
              ref={ref}
              value={
                options && value ? options.find((option: any) => option.value === value) : null
              }
              onChange={(option: any) => onChange(option.value)}
              onBlur={onBlur}
              options={options}
              placeholder={placeholder ? placeholder : label}
              closeMenuOnSelect={true}
              {...rest}
            />
          )}

          <FormErrorMessage>{error && error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default Option;
