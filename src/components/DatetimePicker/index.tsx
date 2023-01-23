import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { Control, Controller } from 'react-hook-form';
import { HiXCircle } from 'react-icons/hi';

interface InputProps extends ChakraInputProps {
  control: Control;
  name: string;
  errors: any;
  label: string;
  subtitle?: string;
  validatePassword?: boolean;
  rightIcon?: React.ReactElement | null;
  leftIcon?: React.ReactElement | null;
}

function Input({ control, name, errors, label, ...rest }: InputProps, ref: any) {
  const inputElementRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current?.focus();
    },
  }));

  const getError = (message: string | undefined | null) => {
    if (message) {
      return (
        <Box mt='1' mb={{ base: '4', md: '6' }}>
          <FormErrorMessage mb='4' color='negative.pure' gap='1' ml='1'>
            <HiXCircle />
            {message}
          </FormErrorMessage>
        </Box>
      );
    }
    return null;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, onBlur } }) => (
        <>
          <FormControl id={name} isInvalid={!!errors}>
            {label && (
              <FormLabel htmlFor={name} _invalid={{ color: 'negative.pure !important' }}>
                {label}
              </FormLabel>
            )}
            <ChakraInput
              focusBorderColor={errors ? 'negative.pure' : 'primary.pure'}
              placeholder=' '
              autoComplete='off'
              errorBorderColor='negative.pure'
              fontSize={{ base: '14px', md: '16px' }}
              bgColor='neutral.background'
              borderColor='neutral.pure'
              color='neutral.pure'
              border='1px'
              borderRadius='8px'
              size='lg'
              _hover={{ bg: 'primary' }}
              onBlur={onBlur}
              onChange={onChange}
              value={value || ''}
              ref={inputElementRef}
              {...rest}
            />

            <Box mt='1' mb={{ base: '4', md: '6' }}>
              {getError(errors)}
            </Box>
          </FormControl>
        </>
      )}
    />
  );
}

export default forwardRef(Input);
