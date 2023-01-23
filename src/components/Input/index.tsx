import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { HiXCircle } from 'react-icons/hi';
import { Textarea } from '@chakra-ui/textarea';
import InputMask from 'react-input-mask';

interface InputProps extends ChakraInputProps {
  control: Control;
  name: string;
  errors: any;
  label: string;
  subtitle?: string;
  mask?: string;
  textArea?: boolean;
  validatePassword?: boolean;
  rightIcon?: React.ReactElement | null;
  leftIcon?: React.ReactElement | null;
}

function Input({ control, name, errors, label, textArea, mask, ...rest }: InputProps, ref: any) {
  const inputElementRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current?.focus();
    },
  }));

  const getError = (message: FieldError | undefined) => {
    if (message) {
      return (
        <Box mt='1' mb={{ base: '4', md: '6' }}>
          <FormErrorMessage mb='4' color='negative.pure' gap='1' ml='1'>
            <>
              <HiXCircle />
              {message}
            </>
          </FormErrorMessage>
        </Box>
      );
    }
    return null;
  };

  const getInputType = (onChange: any, onBlur: any, value: any, inputElementRef: any) => {
    if (mask) {
      return (
        <ChakraInput
          as={InputMask}
          mask={mask}
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
      );
    } else if (textArea) {
      return (
        // @ts-ignore
        <Textarea
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
      );
    } else {
      return (
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
      );
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
        <>
          <FormControl id={name} isInvalid={!!errors}>
            {label && (
              <FormLabel htmlFor={name} _invalid={{ color: 'negative.pure !important' }}>
                {label}
              </FormLabel>
            )}
            {getInputType(onChange, onBlur, value, ref)}
            <FormErrorMessage>{getError(error)}</FormErrorMessage>
          </FormControl>
        </>
      )}
    />
  );
}

export default forwardRef(Input);
