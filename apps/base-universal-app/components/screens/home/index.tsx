import { BaseContainer } from '@/components/containers/BaseContainer';
import StyledExample from '@/components/example/StyledExample';
import { Text } from '@/components/primitives/ThemedText';
import { View } from 'react-native';

export default function Home() {
  return (
    <BaseContainer contentContainerClassName="p-4 py-8">
      <View className="w-full">
        <Text>* Hero: Heisler Studio</Text>
        <View className="p-1" />
        <Text>
          * Horizontal list of cards for work history: Thrive, Fountain Life, Bionic Health,
          LifeOmic
        </Text>
        <View className="p-1" />
        <Text>* Tab bar: About, contact</Text>
        <View className="p-1" />
        <Text>* Menu: GitHub, LinkedIn</Text>
        <StyledExample />
      </View>
    </BaseContainer>
  );
}
