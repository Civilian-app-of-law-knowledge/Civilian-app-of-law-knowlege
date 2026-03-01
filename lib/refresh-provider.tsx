import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REFRESH_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
const LAST_REFRESH_KEY = '@civilian_law_last_refresh';

interface RefreshContextType {
  lastRefresh: Date | null;
  isRefreshing: boolean;
  refreshData: () => Promise<void>;
  timeSinceRefresh: string;
  nextRefreshIn: string;
}

const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

export function RefreshProvider({ children }: { children: ReactNode }) {
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load last refresh time on mount
  useEffect(() => {
    loadLastRefresh();
  }, []);

  // Set up auto-refresh interval
  useEffect(() => {
    const checkAndRefresh = async () => {
      if (!lastRefresh) return;
      
      const timeSince = Date.now() - lastRefresh.getTime();
      if (timeSince >= REFRESH_INTERVAL) {
        await refreshData();
      }
    };

    // Check every minute if refresh is needed
    const interval = setInterval(checkAndRefresh, 60 * 1000);
    
    // Also check immediately
    checkAndRefresh();

    return () => clearInterval(interval);
  }, [lastRefresh]);

  const loadLastRefresh = async () => {
    try {
      const stored = await AsyncStorage.getItem(LAST_REFRESH_KEY);
      if (stored) {
        setLastRefresh(new Date(stored));
      } else {
        // First time - set to now
        const now = new Date();
        setLastRefresh(now);
        await AsyncStorage.setItem(LAST_REFRESH_KEY, now.toISOString());
      }
    } catch (error) {
      console.error('Error loading last refresh:', error);
    }
  };

  const refreshData = useCallback(async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    try {
      // Simulate data refresh - in a real app, this would fetch from an API
      // For now, we just update the timestamp
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const now = new Date();
      setLastRefresh(now);
      await AsyncStorage.setItem(LAST_REFRESH_KEY, now.toISOString());
      
      console.log('Data refreshed at:', now.toISOString());
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing]);

  const getTimeSinceRefresh = (): string => {
    if (!lastRefresh) return 'Never';
    
    const diff = Date.now() - lastRefresh.getTime();
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    
    if (hours === 0) {
      return minutes <= 1 ? 'Just now' : `${minutes} minutes ago`;
    } else if (hours === 1) {
      return '1 hour ago';
    } else {
      return `${hours} hours ago`;
    }
  };

  const getNextRefreshIn = (): string => {
    if (!lastRefresh) return 'Soon';
    
    const nextRefresh = lastRefresh.getTime() + REFRESH_INTERVAL;
    const diff = nextRefresh - Date.now();
    
    if (diff <= 0) return 'Now';
    
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    
    if (hours === 0) {
      return `${minutes} min`;
    } else {
      return `${hours}h ${minutes}m`;
    }
  };

  return (
    <RefreshContext.Provider
      value={{
        lastRefresh,
        isRefreshing,
        refreshData,
        timeSinceRefresh: getTimeSinceRefresh(),
        nextRefreshIn: getNextRefreshIn(),
      }}
    >
      {children}
    </RefreshContext.Provider>
  );
}

export function useRefresh() {
  const context = useContext(RefreshContext);
  if (context === undefined) {
    throw new Error('useRefresh must be used within a RefreshProvider');
  }
  return context;
}
