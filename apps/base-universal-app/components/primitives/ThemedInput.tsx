import { Input as BaseInput } from '@foundry/react-native-components';
import type { ComponentProps } from 'react';

type ThemedInputProps = ComponentProps<typeof BaseInput>;

export const Input = (props: ThemedInputProps) => {
  return <BaseInput {...props} />;
};
