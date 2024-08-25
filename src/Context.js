import React, { createContext, useState, useContext, useCallback } from 'react';

const WidgetContext = createContext();

export const WidgetProvider = ({ children }) => {
  const [selectedWidgets, setSelectedWidgets] = useState(() => {
    const saved = localStorage.getItem('selectedWidgets');
    return saved ? JSON.parse(saved) : {};
  });
  const [searchQuery, setSearchQuery] = useState('');

  const updateSelectedWidgets = useCallback((categoryIndex, widgetIndex, isSelected) => {
    setSelectedWidgets(prev => {
      const newState = { ...prev };
      if (!newState[categoryIndex]) {
        newState[categoryIndex] = {};
      }
      newState[categoryIndex][widgetIndex] = isSelected;
      localStorage.setItem('selectedWidgets', JSON.stringify(newState));
      return newState;
    });
  }, []);

  const removeWidget = useCallback((categoryIndex, widgetIndex) => {
    setSelectedWidgets(prev => {
      const newState = { ...prev };
      if (newState[categoryIndex]) {
        newState[categoryIndex][widgetIndex] = false;
        localStorage.setItem('selectedWidgets', JSON.stringify(newState));
      }
      return newState;
    });
  }, []);

  const value = React.useMemo(() => ({
    selectedWidgets,
    updateSelectedWidgets,
    setSelectedWidgets,
    searchQuery,
    setSearchQuery,
    removeWidget
  }), [selectedWidgets, updateSelectedWidgets, searchQuery, removeWidget]);

  return (
    <WidgetContext.Provider value={value}>
      {children}
    </WidgetContext.Provider>
  );
};

export const useWidgetContext = () => useContext(WidgetContext);
