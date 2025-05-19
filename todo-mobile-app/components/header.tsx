import { router } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

const Header = () => {
  const handleProfilePress = () => {
    console.log('🔍 [Navigation] Attempting to navigate to profile page')
    router.push('/profile')
  }

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={handleProfilePress}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbgk0yfCOe55931lf6q0osfhGRU-fnH8Im1g&s',
          }}
          style={{ width: 32, height: 32, borderRadius: 20 }}
          resizeMode="cover"
          alt="profile"
        />
      </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
})
