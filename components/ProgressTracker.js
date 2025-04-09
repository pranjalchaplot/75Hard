import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ProgressTracker = ({
  title,
  icon,
  current,
  max,
  unit,
  category,
  updateProgress,
  editable,
  theme,
}) => {
  const increment = () => {
    if (current < max && editable) {
      updateProgress(category, current + 1);
    }
  };

  const decrement = () => {
    if (current > 0 && editable) {
      updateProgress(category, current - 1);
    }
  };

  // Calculate progress percentage
  const progress = (current / max) * 100;

  return (
    <View
      style={[
        styles.container,
        theme === "dark" ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.title,
            theme === "dark" ? styles.darkText : styles.lightText,
          ]}
        >
          {title} {icon}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressCircle}>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                theme === "dark"
                  ? styles.darkProgressFill
                  : styles.lightProgressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>
          <Text
            style={[
              styles.progressText,
              theme === "dark" ? styles.darkText : styles.lightText,
            ]}
          >
            {current} | {max}
          </Text>
          <Text
            style={[
              styles.unitText,
              theme === "dark" ? styles.darkText : styles.lightText,
            ]}
          >
            {unit}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            theme === "dark" ? styles.darkButton : styles.lightButton,
            !editable && styles.disabledButton,
          ]}
          onPress={decrement}
          disabled={!editable || current === 0}
        >
          <Text
            style={[
              styles.buttonText,
              theme === "dark" ? styles.darkButtonText : styles.lightButtonText,
            ]}
          >
            -
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            theme === "dark" ? styles.darkButton : styles.lightButton,
            !editable && styles.disabledButton,
          ]}
          onPress={increment}
          disabled={!editable || current === max}
        >
          <Text
            style={[
              styles.buttonText,
              theme === "dark" ? styles.darkButtonText : styles.lightButtonText,
            ]}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: "space-between",
    height: 150,
  },
  lightContainer: {
    backgroundColor: "#F5F2EB",
    borderColor: "#E5E2DD",
    borderWidth: 1,
  },
  darkContainer: {
    backgroundColor: "#3E3B36",
    borderColor: "#4A4741",
    borderWidth: 1,
  },
  titleContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  lightText: {
    color: "#302F2B",
  },
  darkText: {
    color: "#F5F2EB",
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  progressCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E5E2DD",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  progressFill: {
    height: "100%",
    position: "absolute",
    left: 0,
  },
  lightProgressFill: {
    backgroundColor: "#FFBC2D",
  },
  darkProgressFill: {
    backgroundColor: "#4A3729",
  },
  progressText: {
    position: "absolute",
    fontSize: 14,
    fontWeight: "700",
  },
  unitText: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  lightButton: {
    backgroundColor: "#E5E2DD",
  },
  darkButton: {
    backgroundColor: "#4A4741",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  lightButtonText: {
    color: "#302F2B",
  },
  darkButtonText: {
    color: "#F5F2EB",
  },
});

export default ProgressTracker;
