import { View, Text, ScrollView } from 'react-native';

export default function StyledExample() {
  return (
    <ScrollView className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-primary p-6">
        <Text className="text-2xl font-bold text-white">NativeWind Example</Text>
        <Text className="text-white/80 mt-1">Tailwind CSS in React Native</Text>
      </View>

      {/* Basic Styling */}
      <View className="p-4">
        <Text className="text-lg font-semibold mb-4 text-foreground">Basic Styling</Text>
        <View className="bg-muted p-4 rounded-lg border border-border">
          <Text className="text-foreground">
            This box uses utility classes for padding, background, and border.
          </Text>
        </View>
      </View>

      {/* Custom Design Tokens */}
      <View className="p-4">
        <Text className="text-lg font-semibold mb-4 text-foreground">Custom Design Tokens</Text>
        <View className="flex-row gap-2">
          <View className="bg-primary px-4 py-2 rounded-md">
            <Text className="text-white font-medium">Primary</Text>
          </View>
          <View className="bg-secondary px-4 py-2 rounded-md">
            <Text className="text-white font-medium">Secondary</Text>
          </View>
        </View>
      </View>

      {/* Responsive Design */}
      <View className="p-4">
        <Text className="text-lg font-semibold mb-4 text-foreground">Responsive Design</Text>
        <View className="flex-col sm:flex-row gap-2">
          <View className="flex-1 bg-muted p-3 rounded-md">
            <Text className="text-sm text-muted-foreground">Column 1</Text>
          </View>
          <View className="flex-1 bg-muted p-3 rounded-md">
            <Text className="text-sm text-muted-foreground">Column 2</Text>
          </View>
        </View>
      </View>

      {/* Spacing Scale */}
      <View className="p-4">
        <Text className="text-lg font-semibold mb-4 text-foreground">Spacing Scale</Text>
        <View className="gap-2">
          <View className="w-4 h-4 bg-primary rounded" />
          <View className="w-8 h-4 bg-primary rounded" />
          <View className="w-12 h-4 bg-primary rounded" />
          <View className="w-16 h-4 bg-primary rounded" />
        </View>
      </View>

      {/* Border Radius */}
      <View className="p-4">
        <Text className="text-lg font-semibold mb-4 text-foreground">Border Radius</Text>
        <View className="flex-row gap-3 flex-wrap">
          <View className="w-16 h-16 bg-secondary rounded-sm" />
          <View className="w-16 h-16 bg-secondary rounded-md" />
          <View className="w-16 h-16 bg-secondary rounded-lg" />
          <View className="w-16 h-16 bg-secondary rounded-xl" />
          <View className="w-16 h-16 bg-secondary rounded-full" />
        </View>
      </View>

      {/* Footer */}
      <View className="p-4 mt-4 bg-muted">
        <Text className="text-center text-muted-foreground text-sm">
          NativeWind v4 + Tailwind CSS v3 Setup Complete
        </Text>
      </View>
    </ScrollView>
  );
}
