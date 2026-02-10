import { Button as BaseButton } from '@foundry/react-native-components';
import type { ComponentProps, ReactNode } from 'react';

type ThemedButtonProps = Omit<ComponentProps<typeof BaseButton>, 'children'> & {
  children?: ReactNode;
};

export const Button = ({ children, ...props }: ThemedButtonProps) => {
  return <BaseButton {...props}>{children}</BaseButton>;
};
