import React, { useEffect } from "react";
import { StyleSheet, Linking } from "react-native";
import { Text, View } from "@/components/Themed";
import { useLocalSearchParams, useRouter } from "expo-router";
import ImageViewer from "@/components/ImageViewer";
import AnalizingComponent from "@/components/AnalizingComponent";
import Button from "@/components/Button";
import SignButton from "@/components/SignButton";
import useVision from "@/hooks/useVision";

export default function FinalScreen() {
  const { selectedImage, placeholderImage } = useLocalSearchParams();
  const { submitToGoogle, imageInformation, googleResponse } = useVision();
  const router = useRouter();

  const handleBack = () => {
    router.navigate('/(tabs)');
  };

  useEffect(() => {
    if (selectedImage) {
      submitToGoogle({
        image: Array.isArray(selectedImage) ? selectedImage[0] : selectedImage,
      });
    }
  }, [selectedImage]);

  const handleSeeMore = () => {
    if (imageInformation) {
      Linking.openURL(imageInformation);
    }
  };

  if (selectedImage) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <SignButton
            iosName="arrow.left"
            androidName="return-up-back-outline"
            width={25}
            height={25}
            onPress={handleBack}
            styles={styles.returnButton}
          />
          <Text style={styles.uploadText}>Upload more</Text>
        </View>
        <View style={styles.imageContainer}>
          <ImageViewer
            placeholderImageSource={placeholderImage}
            selectedImage={
              Array.isArray(selectedImage) ? selectedImage[0] : selectedImage
            }
          />
        </View>
        {googleResponse && (
          <AnalizingComponent googleResponse={googleResponse} />
        )}
        <View style={styles.buttonContainer}>
          <Button
            theme="light"
            label="See more"
            onPress={handleSeeMore}
            buttonStyles={styles.button}
          />
          <Button
            theme="light"
            label="Home"
            onPress={handleBack}
            buttonStyles={styles.button}
          />
        </View>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    padding: "3%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 50,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    width: "38%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ec9d6f",
  },
  buttonContainer: {
    position: "absolute",
    bottom: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: "5%",
    paddingBottom: "5%",
  },
  uploadText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: "2%",
  },
  returnButton: {},
});
