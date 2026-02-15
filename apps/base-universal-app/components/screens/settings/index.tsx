import { BaseContainer } from '@/components/containers/BaseContainer';
import { ModalHeader } from '@/components/headers/ModalHeader';
import { Button } from '@/components/primitives/ThemedButton';
import { Card, CardContent } from '@/components/primitives/ThemedCard';
import { Text } from '@/components/primitives/ThemedText';
import { Badge } from '@foundry/react-native-components';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export const SettingsScreen = () => {
  const router = useRouter();

  const handleLoginOpen = () => {
    router.push('/(public)/login');
  };

  return (
    <BaseContainer contentContainerClassName="bg-popover flex-1">
      <View className="p-4 gap-4">
        <ModalHeader />
        <Card>
          <CardContent>
            <View className="justify-between">
              <Text>Placeholder for theme switcher</Text>
              <Text>Toggle</Text>
            </View>
            <View className="justify-between">
              <Text>Placeholder for sign in</Text>
              <Button onPress={handleLoginOpen}>
                <Text>Sign in</Text>
              </Button>
            </View>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Text>Placeholder for build details</Text>
          </CardContent>
        </Card>
        {/* TODO: get environment */}
        <Badge className="bg-secondary self-center px-4">
          <Text className="text-lg">dev</Text>
        </Badge>
      </View>
    </BaseContainer>
  );
};
