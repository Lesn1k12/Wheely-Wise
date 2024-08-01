import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'

export default function ImageViewer({ placeholderImageSource, selectedImage}: { placeholderImageSource: any, selectedImage: string | null }) {
    const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource
  return (
    <Image source={imageSource} style={styles.image}  />
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 500,
    resizeMode: 'contain',
  },
});