import { useAuth } from '@/hooks/useAuth'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '@/constants/style'
import { FontAwesome } from '@expo/vector-icons'

export default function Index() {
  const { token, isLoading } = useAuth()

  useEffect(() => {
    if (token && !isLoading) {
      console.log('🔀 [Navigation] User logged in, redirecting to todos')
      router.replace('/todos')
    }
  }, [token, isLoading])

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.splashContainer}>
          <View style={styles.logoContainer}>
            <FontAwesome name="check-square-o" size={80} color={colors.accentPrimary} />
            <Text style={styles.logoText}>Todo App</Text>
          </View>
          <ActivityIndicator size="large" color={colors.accentPrimary} style={styles.loader} />
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <FontAwesome name="check-square-o" size={60} color={colors.accentPrimary} />
            <Text style={styles.title}>Todo App</Text>
          </View>
          <Text style={styles.subtitle}>Stay organized and boost your productivity</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => router.push('/auth/register')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>I already have an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgPrimary,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.accentPrimary,
    marginTop: 16,
  },
  loader: {
    marginTop: 30,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.accentPrimary,
    textAlign: 'center',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    gap: 15,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: colors.accentPrimary,
    shadowColor: colors.accentPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.accentPrimary,
  },
  buttonText: {
    color: colors.surfacePrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: colors.accentPrimary,
  },
})
