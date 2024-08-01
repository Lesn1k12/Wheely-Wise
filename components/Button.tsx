import React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";

interface ChooseImageButtonProps {
  label: string;
  onPress: () => void;
  theme: "light" | "dark";
  buttonStyles?: any;
}

export default function Button({
  label,
  onPress,
  theme,
  buttonStyles,
}: ChooseImageButtonProps) {
  if (theme === "light") {
    return (
      <View style={[styles.buttonContainer, buttonStyles]}>
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return <div>ChooseImageButton</div>;
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderColor: "#457FE5",
  },
  button: {
    padding: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 25,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
  buttonIcon: {
    paddingRight: 8,
  },
});
