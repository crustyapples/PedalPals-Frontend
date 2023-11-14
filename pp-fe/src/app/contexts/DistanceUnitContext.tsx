import React, { createContext, useContext, useState, ReactNode } from 'react';


interface DistanceUnitType {
    distanceUnit: string;
    toggleDistanceUnit: () => void;
  }

const DistanceUnitContext = createContext<DistanceUnitType | undefined>(undefined);

interface DistanceUnitProviderProps {
    children: ReactNode;
  }

export const DistanceUnitProvider: React.FC<DistanceUnitProviderProps> = ({ children }) => {
  const [distanceUnit, setDistanceUnit] = useState('kilometers'); // Default unit

  const toggleDistanceUnit = () => {
    setDistanceUnit((prevUnit) => (prevUnit === 'kilometers' ? 'miles' : 'kilometers'));
  };

  return (
    <DistanceUnitContext.Provider value={{ distanceUnit, toggleDistanceUnit }}>
      {children}
    </DistanceUnitContext.Provider>
  );
};

export const useDistanceUnit = () => {
  const context = useContext(DistanceUnitContext);
  if (!context) {
    throw new Error('useDistanceUnit must be used within a DistanceUnitProvider');
  }
  return context;
};
