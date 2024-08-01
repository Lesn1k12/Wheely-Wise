import React, {useState} from 'react'
import { StyleSheet, Image, Platform, Alert } from 'react-native'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import { usePermissions } from "expo-media-library";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "@/components/Button";

export default function OnboardingScreen() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [mediaLibraryPermission, requestMediaLibraryPermission] = usePermissions();

    const handleContinue = async () => {
      const allPermissionsGranted = await requestAllPermissions();

      if (allPermissionsGranted) {
        router.replace("/(tabs)");
      } else {
        Alert.alert("To continue please provide permissions in settings");
      }
    }

    async function requestAllPermissions() {
      const cameraStatus = await requestCameraPermission();
      if (!cameraStatus.granted) {
        Alert.alert("Error", "Camera permission is required.");
        return false;
      }

      const mediaLibraryStatus = await requestMediaLibraryPermission();
      if (!mediaLibraryStatus.granted) {
        Alert.alert("Error", "Media Library permission is required.");
        return false;
    }
      await AsyncStorage.setItem("hasOpened", "true");
      return true;
    }



    return (
        <View style={styles.container}>
          <Text style={styles.title}>Hello, its`s Whelly Wise! Give us permissions to start</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Button label="Continue" theme='light' onPress={handleContinue} buttonStyles={styles.button} />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%',
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
      },
      button: {
        backgroundColor: "#ec9d6f",
        width: "38%",
        height: 50, 
      }
    });