import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { LocationData } from '../types';

type LocationContextType = {
  currentLocation: LocationData | null;
  setLocation: (location: LocationData) => void;
  isLocationSet: boolean;
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(() => {
    // Load from localStorage
    const savedLocation = localStorage.getItem('userLocation');
    return savedLocation ? JSON.parse(savedLocation) : null;
  });

  const isLocationSet = currentLocation !== null;

  useEffect(() => {
    // Save to localStorage when location changes
    if (currentLocation) {
      localStorage.setItem('userLocation', JSON.stringify(currentLocation));
    }
  }, [currentLocation]);

  const setLocation = (location: LocationData) => {
    setCurrentLocation(location);
  };

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        setLocation,
        isLocationSet,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};