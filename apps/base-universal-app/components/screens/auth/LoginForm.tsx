import { Text } from '@/components/primitives/ThemedText';
import { BRAND_APPLE_BLACK } from '@/theme/colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View } from 'react-native';

export default function LoginForm() {
  return (
    <View className="items-center p-10 h-72">
      <Text variant="h1" className="text-center pb-8">
        Sign in
      </Text>
      <View className="gap-2 pb-4 w-full max-w-sm">
        <FontAwesome.Button name="google" className="self-center">
          Sign in with Google
        </FontAwesome.Button>
        <FontAwesome.Button
          name="apple"
          className="self-center"
          backgroundColor={BRAND_APPLE_BLACK}
        >
          Sign in with Apple
        </FontAwesome.Button>
      </View>
      <Text className="text-muted-foreground text-sm">By signing up, you agree to blah, blah</Text>
    </View>
  );
}
