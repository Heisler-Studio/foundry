import '../global.css';

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
      <ThemeProvider>
        <StatusBar animated style="auto" />
        <Navigation />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
