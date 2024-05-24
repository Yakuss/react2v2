import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const value = { userId, setUserId };

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
