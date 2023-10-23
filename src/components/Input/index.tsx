import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Control, Controller } from 'react-hook-form';
import { BaseTextFieldProps, TextField } from '@mui/material';

interface InputProps extends BaseTextFieldProps {
  control: Control;
  name: string;
  errors: any;
  label: string;
  onBlur?: () => void;
}

function Input({ control, name, errors, label, ...rest }: InputProps, ref: any) {
  const inputElementRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current?.focus();
    },
  }));

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <TextField
          {...rest}
          label={label}
          onBlur={onBlur}
          onChange={onChange}
          value={value || ''}
          ref={ref}
          name={name}
          error={errors ? errors : null}
        />
      )}
    />
  );
}

export default forwardRef(Input);
