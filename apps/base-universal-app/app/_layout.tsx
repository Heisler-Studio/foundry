import '../global.css';

import { I18nProvider } from '@/providers/I18nProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const queryClient = new QueryClient();

function Navigation() {
  return (
    <Stack>
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <ThemeProvider>
          <StatusBar animated style="auto" />
          <Navigation />
        </ThemeProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
