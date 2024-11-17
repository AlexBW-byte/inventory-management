import React, { createContext, useContext, useState, ReactNode } from "react";
import { InventoryItem } from '../types/inventoryItem';


interface InventoryContextType {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

export const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  return (
        <InventoryContext.Provider value = {{ inventory, setInventory }}>
            {children}
        </InventoryContext.Provider>
  );
};
