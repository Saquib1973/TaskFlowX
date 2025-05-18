import { Stack } from 'expo-router';
import { useAuth } from '../hooks/useAuth';

export default function RootLayout() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
