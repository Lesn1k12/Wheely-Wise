import React from 'react'
import { Text, View } from '@/components/Themed';
import { StyleSheet, useColorScheme } from 'react-native';

interface AnalizingComponentProps {
  googleResponse: string | null;
}

const AnalizingComponent: React.FC<AnalizingComponentProps> = ({ googleResponse }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={styles.container}>
        {googleResponse && (
            <View style={[
              styles.responseContainer,
              { backgroundColor: isDarkMode ? '#333' : '#f9f9f9' }
            ]}>
              <Text style={[
                styles.text,
                { color: isDarkMode ? '#fff' : '#000' }
              ]}>
                {googleResponse}
              </Text>
            </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  responseContainer: {
    padding: 10,
    borderRadius: 5,
    width: "90%",
  },
})

export default AnalizingComponent;
