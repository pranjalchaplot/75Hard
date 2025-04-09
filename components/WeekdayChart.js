import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const WeekdayChart = ({
  selectedDate,
  setSelectedDate,
  progressData,
  theme,
}) => {
  const generateDates = () => {
    const dates = [];
    const currentDate = new Date();

    // Generate 7 days before and after current date
    for (let i = -10; i <= 10; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const dates = generateDates();

  const isSelected = (date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const hasProgress = (date) => {
    const dateKey = date.toISOString().split("T")[0];
    return progressData[dateKey] !== undefined;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {dates.map((date, index) => {
          const isToday = date.toDateString() === new Date().toDateString();
          const isComplete = hasProgress(date);

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateButton,
                isSelected(date) && styles.selectedDateButton,
                isSelected(date) &&
                  theme === "dark" &&
                  styles.selectedDateButtonDark,
                theme === "dark"
                  ? styles.darkDateButton
                  : styles.lightDateButton,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text
                style={[
                  styles.weekdayText,
                  theme === "dark" ? styles.darkText : styles.lightText,
                  isSelected(date) && styles.selectedText,
                ]}
              >
                {date
                  .toLocaleString("default", { weekday: "short" })
                  .toUpperCase()}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  theme === "dark" ? styles.darkText : styles.lightText,
                  isSelected(date) && styles.selectedText,
                ]}
              >
                {date.getDate()}
              </Text>
              <Text
                style={[
                  styles.monthText,
                  theme === "dark" ? styles.darkText : styles.lightText,
                  isSelected(date) && styles.selectedText,
                ]}
              >
                {date.toLocaleString("default", { month: "short" })}
              </Text>
              {isComplete && (
                <View
                  style={[
                    styles.completionDot,
                    theme === "dark"
                      ? styles.darkCompletionDot
                      : styles.lightCompletionDot,
                  ]}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  scrollContent: {
    paddingVertical: 8,
  },
  dateButton: {
    width: 70,
    height: 80,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    paddingVertical: 8,
    borderWidth: 1,
  },
  lightDateButton: {
    backgroundColor: "#F5F2EB",
    borderColor: "#E5E2DD",
  },
  darkDateButton: {
    backgroundColor: "#3E3B36",
    borderColor: "#4A4741",
  },
  selectedDateButton: {
    backgroundColor: "#FFBC2D",
    borderColor: "#FFBC2D",
  },
  selectedDateButtonDark: {
    backgroundColor: "#4A3729",
    borderColor: "#4A3729",
  },
  weekdayText: {
    fontSize: 12,
    fontWeight: "500",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 2,
  },
  monthText: {
    fontSize: 12,
    fontWeight: "500",
  },
  lightText: {
    color: "#302F2B",
  },
  darkText: {
    color: "#F5F2EB",
  },
  selectedText: {
    color: "#302F2B",
  },
  completionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 4,
  },
  lightCompletionDot: {
    backgroundColor: "#302F2B",
  },
  darkCompletionDot: {
    backgroundColor: "#F5F2EB",
  },
});

export default WeekdayChart;
