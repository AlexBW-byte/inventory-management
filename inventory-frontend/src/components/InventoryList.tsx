import React from 'react';
import { useState } from 'react';
import { InventoryItem } from '../types/inventoryItem';
import AddItemButton from './AddItemButton';
import { deleteInventoryItem, updateInventoryItem } from '../services/inventoryService';

interface InventoryListProps {
  items: InventoryItem[];
  onDeleteItem: (id: number) => void; 
  onUpdateItem: (item: InventoryItem) => void; 
}

const InventoryList: React.FC<InventoryListProps> = ({ items, onDeleteItem, onUpdateItem }) => {
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<InventoryItem | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await deleteInventoryItem(id);
      onDeleteItem(id);
      const updatedItems = items.filter((item) => item.id !== id);
      alert('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof InventoryItem) => {
    if (editedItem) {
      setEditedItem({ ...editedItem, [field]: e.target.value });
    }
  };

  const handleEditClick = (item: InventoryItem) => {
    setEditingItemId(item.id);
    setEditedItem({ ...item });
  };

  const handleSaveClick = async (id: number, item: InventoryItem) => {
    try {
      await updateInventoryItem(id, item);
      onUpdateItem(item);
      setEditingItemId(null);
      setEditedItem(null);
      alert('Item updated successfully!');
      console.log('Saving item:', editedItem);
      updateInventoryItem(id, item);
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save item');
    }
  };


  return (
    <div>
      <h2>Inventory List</h2>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td>
                  {editingItemId === item.id ? (
                    <input
                      type="text"
                      value={editedItem?.name || ''}
                      onChange={(e) => handleInputChange(e, 'name')}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>{item.sku}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{editingItemId === item.id ? (
                  <>
                    <button onClick={() => handleSaveClick(item.id, editedItem!)}>Save</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </>
                )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No inventory items found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
