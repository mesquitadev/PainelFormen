import React from 'react';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { Controller } from 'react-hook-form';

const Option = ({ control, name, errors, label, options, placeholder, isMulti, ...rest }) => {
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
              value={options && value ? options.find((option) => option.value === value) : null}
              onChange={(option) => onChange(option.value)}
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
