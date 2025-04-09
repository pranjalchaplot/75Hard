import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera } from "lucide-react";

// Components
import DailyProgress from "./components/DailyProgress";
import ProgressTracker from "./components/ProgressTracker";
import WeekdayChart from "./components/WeekdayChart";
import ThemeContext from "./context/ThemeContext";
import UserContext from "./context/UserContext";

const Stack = createStackNavigator();

const App = () => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState(systemColorScheme || "light");
  const [userData, setUserData] = useState({
    name: "User",
    startDate: new Date(),
    currentDay: 1,
  });
  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    // Load user data and progress from AsyncStorage
    const loadData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        const storedProgressData = await AsyncStorage.getItem("progressData");

        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }

        if (storedProgressData) {
          setProgressData(JSON.parse(storedProgressData));
        }

        const storedTheme = await AsyncStorage.getItem("theme");
        if (storedTheme) {
          setTheme(storedTheme);
        }
      } catch (error) {
        console.log("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Save user data and progress to AsyncStorage
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("userData", JSON.stringify(userData));
        await AsyncStorage.setItem(
          "progressData",
          JSON.stringify(progressData)
        );
        await AsyncStorage.setItem("theme", theme);
      } catch (error) {
        console.log("Error saving data:", error);
      }
    };

    saveData();
  }, [userData, progressData, theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const getTimeOfDay = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Morning";
    if (hours < 17) return "Afternoon";
    if (hours < 21) return "Evening";
    return "Night";
  };

  const HomeScreen = () => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString("default", { month: "short" });
    const day = currentDate.getDate();
    const dayOfWeek = currentDate
      .toLocaleString("default", { weekday: "short" })
      .toUpperCase();

    const [selectedDate, setSelectedDate] = useState(currentDate);
    const selectedDateKey = selectedDate.toISOString().split("T")[0];
    const todayKey = currentDate.toISOString().split("T")[0];

    const dailyProgress = progressData[selectedDateKey] || {
      hydration: 0,
      workouts: 0,
      reading: 0,
      cleanFood: false,
    };

    const updateProgress = (category, value) => {
      setProgressData((prev) => ({
        ...prev,
        [selectedDateKey]: {
          ...(prev[selectedDateKey] || {}),
          [category]: value,
        },
      }));
    };

    const savePhoto = () => {
      // Camera functionality to be implemented
      console.log("Opening camera...");
    };

    return (
      <SafeAreaView
        style={[
          styles.container,
          theme === "dark" ? styles.darkContainer : styles.lightContainer,
        ]}
      >
        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.greeting,
              theme === "dark" ? styles.darkText : styles.lightText,
            ]}
          >
            Good {getTimeOfDay()}, {userData.name}!
          </Text>
        </View>

        <WeekdayChart
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          progressData={progressData}
          theme={theme}
        />

        <View style={styles.progressContainer}>
          <View style={styles.progressRow}>
            <ProgressTracker
              title="Hydration"
              icon="💧"
              current={dailyProgress.hydration}
              max={10}
              unit="glasses"
              category="hydration"
              updateProgress={updateProgress}
              editable={selectedDateKey === todayKey}
              theme={theme}
            />

            <ProgressTracker
              title="Workouts"
              icon="💪"
              current={dailyProgress.workouts}
              max={2}
              unit="sessions"
              category="workouts"
              updateProgress={updateProgress}
              editable={selectedDateKey === todayKey}
              theme={theme}
            />
          </View>

          <DailyProgress
            title="Clean Food"
            subtitle="follow your chosen diet, no cheat meals"
            checked={dailyProgress.cleanFood}
            category="cleanFood"
            updateProgress={updateProgress}
            editable={selectedDateKey === todayKey}
            theme={theme}
          />

          <View style={styles.progressRow}>
            <ProgressTracker
              title="Reading"
              icon="📚"
              current={dailyProgress.reading}
              max={10}
              unit="pages"
              category="reading"
              updateProgress={updateProgress}
              editable={selectedDateKey === todayKey}
              theme={theme}
            />

            <TouchableOpacity
              style={[
                styles.cameraButton,
                theme === "dark" ? styles.darkCard : styles.lightCard,
              ]}
              onPress={savePhoto}
              disabled={selectedDateKey !== todayKey}
            >
              <Text
                style={[
                  styles.cameraTitle,
                  theme === "dark" ? styles.darkText : styles.lightText,
                ]}
              >
                Save the day with a click
              </Text>
              <View style={styles.cameraIcon}>
                <Camera
                  size={48}
                  color={theme === "dark" ? "#BEBAA5" : "#000"}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.scoreContainer}>
          <View
            style={[
              styles.scoreCard,
              theme === "dark" ? styles.darkScoreCard : styles.lightScoreCard,
            ]}
          >
            <Text
              style={[
                styles.scoreText,
                theme === "dark" ? styles.darkText : styles.lightText,
              ]}
            >
              {userData.currentDay}
            </Text>
          </View>
          <View
            style={[
              styles.scoreCard,
              theme === "dark" ? styles.darkScoreCard : styles.lightScoreCard,
            ]}
          >
            <Text
              style={[
                styles.scoreText,
                theme === "dark" ? styles.darkText : styles.lightText,
              ]}
            >
              75
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserContext.Provider value={{ userData, setUserData }}>
        <NavigationContainer>
          <StatusBar
            barStyle={theme === "dark" ? "light-content" : "dark-content"}
          />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  lightContainer: {
    backgroundColor: "#FFFFFF",
  },
  darkContainer: {
    backgroundColor: "#2F2C28",
  },
  headerContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "600",
  },
  lightText: {
    color: "#302F2B",
  },
  darkText: {
    color: "#F5F2EB",
  },
  progressContainer: {
    marginTop: 16,
    gap: 16,
  },
  progressRow: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
  },
  cameraButton: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
    height: 150,
  },
  lightCard: {
    backgroundColor: "#F5F2EB",
    borderColor: "#E5E2DD",
    borderWidth: 1,
  },
  darkCard: {
    backgroundColor: "#3E3B36",
    borderColor: "#4A4741",
    borderWidth: 1,
  },
  cameraTitle: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  cameraIcon: {
    marginTop: 20,
    alignItems: "center",
  },
  scoreContainer: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    marginTop: 32,
  },
  scoreCard: {
    flex: 1,
    borderRadius: 30,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
  lightScoreCard: {
    backgroundColor: "#EBEBAA",
  },
  darkScoreCard: {
    backgroundColor: "#4A4741",
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "700",
  },
});

export default App;
