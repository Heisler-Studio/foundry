import { BaseContainer } from '@/components/containers/BaseContainer';
import { ModalHeader } from '@/components/headers/ModalHeader';
import { Button } from '@/components/primitives/ThemedButton';
import { Card, CardContent } from '@/components/primitives/ThemedCard';
import { Text } from '@/components/primitives/ThemedText';
import { ThemeSwitcher } from '@/components/screens/settings/ThemeSwitcher';
import { useSettingsStore } from '@/store/settings-store';
import { Badge } from '@foundry/react-native-components';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

const getLanguageDisplayName = (locale: string): string => {
  const displayNames: Record<string, string> = {
    en: 'English',
    es: 'Español',
  };
  return displayNames[locale] || locale;
};

export const SettingsScreen = () => {
  const router = useRouter();
  const locale = useSettingsStore((state) => state.language.locale);
  const deviceDetected = useSettingsStore(
    (state) => state.language.deviceDetected,
  );

  const handleLoginOpen = () => {
    router.push('/(public)/login');
  };

  return (
    <BaseContainer contentContainerClassName="bg-popover flex-1">
      <View className="p-4 gap-4">
        <ModalHeader />
        <Card>
          <CardContent>
            <View className="gap-4">
              <Text className="text-lg font-semibold">Theme</Text>
              <ThemeSwitcher />
            </View>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <View className="gap-4">
              <Text className="text-lg font-semibold">Language</Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-base">
                  {getLanguageDisplayName(locale)} ({locale})
                </Text>
              </View>
              {deviceDetected && (
                <Text className="text-sm text-muted-foreground">
                  Auto-detected
                </Text>
              )}
            </View>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
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
