import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import { Text, View } from "@/components/Themed";
import placeholderImage from "@/assets/images/car.png";
import Button from "@/components/Button";
import { router } from "expo-router";

export default function TabOneScreen() {

  const handleContinue = () => {
    router.push("optionsPage");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What A Car?</Text>
      <View style={styles.imageContainer}>
        <Image source={placeholderImage} style={styles.image} />
      </View>
      <Text style={styles.text}>Click the button to start identifying</Text>
      <Button
        theme="light"
        label="Start identifying"
        onPress={handleContinue}
        buttonStyles={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    position: "absolute",
    top: "10%",
    fontSize: 30,
    fontWeight: "bold",
  },
  imageContainer: {
    width: '80%', 
    height: '50%', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%', 
    resizeMode: 'contain', 
  },
  text: {
    fontSize: 15,
    fontWeight: "300",
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ec9d6f',
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    height: 50,
    gap: 20,
  },
});
