import { Text as BaseText } from '@foundry/react-native-components';
import type { ComponentProps, ReactNode } from 'react';

type ThemedTextProps = Omit<ComponentProps<typeof BaseText>, 'children'> & {
  children?: ReactNode;
};

export const Text = ({ children, ...props }: ThemedTextProps) => {
  return <BaseText {...props}>{children}</BaseText>;
};
