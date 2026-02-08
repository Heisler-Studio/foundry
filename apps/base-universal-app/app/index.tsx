import StyledExample from '@/components/example/StyledExample';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledExample />
    </QueryClientProvider>
  );
}
