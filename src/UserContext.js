import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(null); // Create the context

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // Initialize user ID state

  const value = { userId, setUserId }; // Define context value

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
