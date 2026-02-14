import { Icon as BaseIcon } from '@foundry/react-native-components';
import { SFSymbol, SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { Platform } from 'react-native';

type IconProps = ComponentProps<typeof BaseIcon> & {
  name?: SFSymbol; // iOS symbol
};

export const Icon = (props: IconProps) => {
  return Platform.select({
    ios: props.name ? <SymbolView name={props.name} tintColor={props.color} /> : null,
    default: <BaseIcon {...props} />,
  });
};
