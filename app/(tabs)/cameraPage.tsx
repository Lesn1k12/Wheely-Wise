import { useEffect, useRef, useState } from "react";
import { Camera, CameraType, CameraView, FlashMode } from "expo-camera";
import { View, StyleSheet, Dimensions } from "react-native";
import { router } from "expo-router";
import SignButton from "@/components/SignButton";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

export default function CameraPage() {
  const [image, setImage] = useState<string | null>(null);
  const [flash, setFlash] = useState<FlashMode>("off");
  const [cameraTorch, setCameraTorch] = useState<boolean>(false);
  const cameraRef = useRef<CameraView>(null);

  const takePictureAsync = async () => {
    const response = await cameraRef.current?.takePictureAsync({});
    if (response?.uri) {
      const croppedImage = await cropImageToSquare(response.uri);
      setImage(croppedImage);
    }
  };

  const cropImageToSquare = async (uri: string) => {
    const image = await manipulateAsync(uri, []);
    const { width, height } = image;

    const cropSize = Math.min(width, height);
    const cropX = (width - cropSize) / 2;
    const cropY = (height - cropSize) / 2;

    const croppedImage = await manipulateAsync(
      uri,
      [{ crop: { originX: cropX, originY: cropY, width: cropSize, height: cropSize } }],
      { format: SaveFormat.JPEG }
    );
    return croppedImage.uri;
  };

  const handleBack = () => {
    router.back();
  };

  const handleFlash = () => {
    setFlash(flash === "off" ? "on" : "off");
    setCameraTorch(!cameraTorch);
  };

  useEffect(() => {
    if (image) {
      router.push({
        pathname: "/finalPage",
        params: {
          selectedImage: image,
        },
      });
    }
  }, [image]);

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        flash={flash}
        enableTorch={cameraTorch}
        facing="back"
      >
        <SignButton
          iosName={"arrow.left"}
          androidName={"return-up-back-outline"}
          onPress={handleBack}
          styles={styles.returnButton}
          width={25}
          height={25}
        />
        <SignButton
          iosName={"camera"}
          androidName={"camera-outline"}
          onPress={takePictureAsync}
          styles={styles.cameraButton}
          width={25}
          height={25}
        />
        <SignButton
          iosName={"bolt.fill"}
          androidName={"flash"}
          onPress={handleFlash}
          styles={styles.flashButton}
          width={25}
          height={25}
        />
      </CameraView>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  returnButton: {
    position: "absolute",
    top: height * 0.05,
    left: width * 0.05,
  },
  cameraButton: {
    position: "absolute",
    bottom: height * 0.05,
    left: width / 2 - 12.5,
    transform: [{ translateX: -12.5 }],
  },
  flashButton: {
    position: "absolute",
    top: height * 0.05,
    right: width * 0.05,
  },
});
