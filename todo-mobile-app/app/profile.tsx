import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import GoBackButton from '@/components/go-back-button';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '@/constants/style';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <GoBackButton />

      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarCircle}>
          <FontAwesome name="user" size={40} color={colors.accentPrimary} />
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  profileCard: {
    backgroundColor: colors.surfacePrimary,
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    shadowColor: colors.surfacePrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 30,
  },
  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: colors.red,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  logoutButtonText: {
    color: colors.surfacePrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
