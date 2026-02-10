import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/primitives/ThemedCard';
import { Text } from '@/components/primitives/ThemedText';
import { SocialConnections } from '@foundry/react-native-components';
import { ScrollView, View } from 'react-native';

export default function LoginForm() {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerClassName="sm:flex-1 items-center justify-center p-4 py-8 sm:py-4 sm:p-6 mt-safe"
      keyboardDismissMode="interactive"
    >
      <View className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Please sign in to continue</CardDescription>
          </CardHeader>
          <CardContent className="gap-2">
            {/* TODO: replace with locally configured actions. This pre-built component doesn't provide any config */}
            <SocialConnections />
          </CardContent>
          <CardFooter>
            <Text className="text-muted-foreground text-sm">Sign up</Text>
          </CardFooter>
        </Card>
      </View>
    </ScrollView>
  );
}
