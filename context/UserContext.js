import { createContext } from "react";

const UserContext = createContext({
  userData: {
    name: "User",
    startDate: new Date(),
    currentDay: 1,
  },
  setUserData: () => {},
});

export default UserContext;
