import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Animated } from "react-native";
import { Text, View } from "@/components/Themed";
import Button from "@/components/Button";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import placeholderImage from "@/assets/images/car.png";
import SignButton from "@/components/SignButton";

export default function optionsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const animatedValue = useRef(new Animated.Value(1)).current;

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      const image = result.assets[0].uri;
      setSelectedImage(image);
    } else {
      alert("No image selected");
    }
  };

  const toCamera = async () => {
    router.push("/cameraPage");
  };

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (selectedImage) {
      Animated.spring(animatedValue, {
        toValue: 1.1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedImage]);

  const handleContinue = () => {
    if (selectedImage) {
      router.push({
        pathname: "/finalPage",
        params: {
          selectedImage: selectedImage,
          placeholderImage: placeholderImage,
        },
      });
    } else {
      alert("Please select an image first");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload a photo</Text>
      <Text style={styles.text}>Choose the way you want to continue</Text>
      <Button
        theme="light"
        label="Pick an image"
        onPress={pickImageAsync}
        buttonStyles={styles.optionButton}
      />
      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.text}>or</Text>
        <View style={styles.line} />
      </View>
      <Button
        theme="light"
        label="Take a photo"
        onPress={toCamera}
        buttonStyles={styles.optionButton}
      />
      <SignButton
        iosName={"arrow.left"}
        androidName={"return-up-back-outline"}
        onPress={handleBack}
        styles={styles.returnButton}
        width={25}
        height={25}
      />
      <Animated.View style={[styles.animatedContinueButton, { transform: [{ scale: animatedValue }] }]}>
        <Button
          theme="light"
          label="Continue"
          onPress={handleContinue}
          buttonStyles={styles.ContinueButton}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: "15%",
  },
  text: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: "2%",
    textAlign: "center",
    color: "#777",
  },
  optionButton: {
    marginVertical: "4%",
    backgroundColor: "#e3e4e4",
    width: "80%",
    height: "5%",
  },
  animatedContinueButton: {
    position: "absolute",
    bottom: "5%",
    marginTop: 20,
    backgroundColor: "#ec9d6f",
    width: "80%",
    height: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10, 
  },
  ContinueButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10, 
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "3%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  returnButton: {
    position: "absolute",
    left: 20,
    top: '7%',
  },
});
