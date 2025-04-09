import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const DailyProgress = ({
  title,
  subtitle,
  checked,
  category,
  updateProgress,
  editable,
  theme,
}) => {
  const toggleCheck = () => {
    if (editable) {
      updateProgress(category, !checked);
    }
  };

  return (
    <View
      style={[
        styles.container,
        theme === "dark" ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            theme === "dark" ? styles.darkText : styles.lightText,
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            theme === "dark" ? styles.darkSubText : styles.lightSubText,
          ]}
        >
          {subtitle}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.checkbox,
          checked && styles.checkedBox,
          checked &&
            (theme === "dark" ? styles.darkCheckedBox : styles.lightCheckedBox),
          theme === "dark" ? styles.darkCheckbox : styles.lightCheckbox,
          !editable && styles.disabledCheckbox,
        ]}
        onPress={toggleCheck}
        disabled={!editable}
      >
        <Text
          style={[
            styles.checkText,
            theme === "dark" ? styles.darkCheckText : styles.lightCheckText,
          ]}
        >
          {checked ? "Ate On-Plan" : "Ate Off-Plan?"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "column",
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
  textContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  lightText: {
    color: "#302F2B",
  },
  darkText: {
    color: "#F5F2EB",
  },
  subtitle: {
    fontSize: 14,
    fontStyle: "italic",
  },
  lightSubText: {
    color: "#606057",
  },
  darkSubText: {
    color: "#BEBAA5",
  },
  checkbox: {
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 16,
    marginTop: 4,
  },
  lightCheckbox: {
    backgroundColor: "#E5E2DD",
    borderColor: "#D5D2CC",
    borderWidth: 1,
  },
  darkCheckbox: {
    backgroundColor: "#4A4741",
    borderColor: "#5A5751",
    borderWidth: 1,
  },
  checkedBox: {
    borderWidth: 0,
  },
  lightCheckedBox: {
    backgroundColor: "#FFBC2D",
  },
  darkCheckedBox: {
    backgroundColor: "#4A3729",
  },
  disabledCheckbox: {
    opacity: 0.7,
  },
  checkText: {
    fontSize: 14,
    fontWeight: "600",
  },
  lightCheckText: {
    color: "#302F2B",
  },
  darkCheckText: {
    color: "#F5F2EB",
  },
});

export default DailyProgress;
