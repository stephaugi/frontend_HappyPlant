import { createContext, useState, useEffect, useContext } from "react";

const getInitialUserData = () => {
  return [
    {
      email: "bond007@gmail.com",
      first_name: "James",
      id: 1,
      last_name: "Bond",
      plants: [
        {
          averageWaterCycle: null,
          currentMoistureLevel: null,
          description: "",
          desiredMoistureLevel: null,
          id: null,
          name: "",
          nextWaterDate: "",
          photo: "",
        },
      ],
    },
  ];
};

const UserDataContext = createContext(getInitialUserData());

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(getInitialUserData);

  const updateUserData = (updates) => {
    setUserData(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const resetUserData = () => {
    setUserData(getInitialUserData());
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUserData, resetUserData }}>
      {children}
    </UserDataContext.Provider>
  )
}

const useUserData = () => useContext(UserDataContext);

export { UserDataProvider, useUserData };