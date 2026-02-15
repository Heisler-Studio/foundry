import { Text } from '@/components/primitives/ThemedText';
import { useThemeStore } from '@/store/theme-store';
import { colors } from '@/theme';
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM, ThemeValue } from '@/types/theme';
import { Pressable, View } from 'react-native';

interface ThemePreviewCardProps {
  theme: ThemeValue;
  isSelected: boolean;
  onSelect: () => void;
}

const ThemePreviewCard = ({ theme, isSelected, onSelect }: ThemePreviewCardProps) => {
  const getCardStyles = () => {
    switch (theme) {
      case THEME_SYSTEM:
        return {
          container: { backgroundColor: colors.system.backgroundLight },
          header: { backgroundColor: colors.system.header },
          card: { backgroundColor: colors.system.card },
          accent: { backgroundColor: colors.system.primary },
        };
      case THEME_LIGHT:
        return {
          container: { backgroundColor: colors.light.background },
          header: { backgroundColor: colors.light.card },
          card: { backgroundColor: colors.light.card },
          accent: { backgroundColor: colors.light.primary },
        };
      case THEME_DARK:
        return {
          container: { backgroundColor: colors.dark.background },
          header: { backgroundColor: colors.dark.card },
          card: { backgroundColor: colors.dark.card },
          accent: { backgroundColor: colors.dark.primary },
        };
      default:
        return {
          container: { backgroundColor: colors.light.background },
          header: { backgroundColor: colors.light.card },
          card: { backgroundColor: colors.light.card },
          accent: { backgroundColor: colors.light.primary },
        };
    }
  };

  const styles = getCardStyles();

  return (
    <Pressable
      onPress={onSelect}
      className={`rounded-xl overflow-hidden border-2 ${
        isSelected ? 'border-primary' : 'border-transparent'
      }`}
    >
      <View className="w-24 h-32" style={styles.container}>
        {/* Mock Header */}
        <View className="h-6 mx-2 mt-2 rounded-t" style={styles.header} />

        {/* Mock Content Card */}
        <View className="mx-2 mt-1 h-16 rounded-b p-2" style={styles.card}>
          {/* Mock Text Lines */}
          <View className="h-1.5 bg-gray-400/30 rounded w-3/4 mb-1" />
          <View className="h-1.5 bg-gray-400/30 rounded w-1/2 mb-2" />

          {/* Mock Accent Button */}
          <View className="h-4 rounded w-8" style={styles.accent} />
        </View>
      </View>

      {/* Label */}
      <View className={`py-2 ${isSelected ? 'bg-primary/10' : 'bg-muted'}`}>
        <Text className="text-center text-xs font-medium capitalize">{theme}</Text>
      </View>
    </Pressable>
  );
};

export const ThemeSwitcher = () => {
  const { mode, setMode } = useThemeStore();

  const themes: ThemeValue[] = [THEME_SYSTEM, THEME_LIGHT, THEME_DARK];

  return (
    <View className="flex-row justify-center gap-3 py-4">
      {themes.map((theme) => (
        <ThemePreviewCard
          key={theme}
          theme={theme}
          isSelected={mode === theme}
          onSelect={() => setMode(theme)}
        />
      ))}
    </View>
  );
};
