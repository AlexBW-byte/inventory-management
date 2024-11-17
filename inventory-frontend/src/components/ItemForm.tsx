import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { InventoryItem } from '../types/inventoryItem';
import { addInventoryItem } from '../services/inventoryService';

// Define form validation type
// Define form validation type
interface ItemFormProps {
  onClose: () => void; 
  onAddItem: (item: InventoryItem) => void; 
}

const ItemForm: React.FC<ItemFormProps> = ({ onClose, onAddItem }) => {
  
  const [newItem, setNewItem] = useState<InventoryItem>({
    id: 0,
    name: '',
    sku: '',
    quantity: 0,
    price: 0,
    category: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // Handle input changes for the form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation before submitting
    const validationErrors: { [key: string]: string } = {};
    if (!newItem.name) validationErrors.name = 'Name is required';
    if (!newItem.sku) validationErrors.sku = 'SKU is required';
    if (newItem.quantity <= 0) validationErrors.quantity = 'Quantity must be greater than zero';
    if (newItem.price <= 0) validationErrors.price = 'Price must be greater than zero';
    if (!newItem.category) validationErrors.category = 'Category is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Don't submit if there are validation errors
    }

    try {
      // Assuming you have a service method to add an item to your backend
      const addedItem = await addInventoryItem(newItem);

      // Pass the new item to the parent component
      onAddItem(addedItem);

      // Close the form after successful submission
      onClose();
    } catch (error) {
      console.error('Error adding inventory item:', error);
    }
  };

  return (
    <div className="item-form">
      <h2>Add New Inventory Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newItem.name}
            onChange={handleChange}
            placeholder="Enter item name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={newItem.sku}
            onChange={handleChange}
            placeholder="Enter item SKU"
          />
          {errors.sku && <span className="error">{errors.sku}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={newItem.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
          />
          {errors.quantity && <span className="error">{errors.quantity}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newItem.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={newItem.category}
            onChange={handleChange}
            placeholder="Enter category"
          />
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        <div className="form-actions">
          <button type="submit">Add Item</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
