import React, { createContext, useContext, useState, useEffect } from 'react';

import { pasteles as initialPasteles } from '../utils/mockPasteles.js';

const PastelesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePasteles = () => useContext(PastelesContext);

export const PastelesProvider = ({ children }) => {

  const [pasteles, setPasteles] = useState([]);

  useEffect(() => {
    let storedPasteles = localStorage.getItem('pasteles');
    if (storedPasteles) {
      setPasteles(JSON.parse(storedPasteles));
    } else {
      localStorage.setItem('pasteles', JSON.stringify(initialPasteles));
      setPasteles(initialPasteles);
    }
  }, []);

  const updatePasteles = (newPasteles) => {
    setPasteles(newPasteles);
    localStorage.setItem('pasteles', JSON.stringify(newPasteles));
  };

  const value = { pasteles, updatePasteles };

  return (
    <PastelesContext.Provider value={value}>
      {children}
    </PastelesContext.Provider>
  );
};