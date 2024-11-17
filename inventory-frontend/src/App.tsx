import React, { useState, useEffect } from 'react';
import './App.css';
import { InventoryProvider } from './context/InventoryContext';
import InventoryList from './components/InventoryList';
import SearchBar from './components/SearchBar';
import { InventoryItem } from './types/inventoryItem'; 
import { getInventory } from './services/inventoryService'; 
import ItemForm from './components/ItemForm'; 

const App: React.FC = () => {
  // State to hold inventory items
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch inventory items on component mount
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getInventory();
        setInventoryItems(data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  // Search handler
  const handleSearch = (query: string) => {

    const filteredItems = inventoryItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.sku.toLowerCase().includes(query.toLowerCase())
    );
    setInventoryItems(filteredItems);
  };

  const handleDeleteItem = (id: number) => {
    setInventoryItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (updatedItem: InventoryItem) => {
    setInventoryItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? { ...updatedItem } : item
      )
    );
  };

  const handleAddItem = (newItem: InventoryItem) => {
    setInventoryItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <InventoryProvider>
      <div className="app">
        <h1>Inventory Management</h1>
  
        <SearchBar onSearch={handleSearch} />
  
        {/* Button to show the form */}
        <button onClick={() => setShowForm(true)}>Add New Item</button>
  
        {/* Conditional rendering of the form */}
        {showForm && (
          <ItemForm onClose={() => setShowForm(false)} onAddItem={handleAddItem} />
        )}
  
        <InventoryList 
          items={inventoryItems}
          onDeleteItem={handleDeleteItem}
          onUpdateItem={handleUpdateItem}
        />
      </div>
    </InventoryProvider>
  );
};

export default App;

