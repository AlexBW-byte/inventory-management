import React, { useState } from 'react';
import ItemForm from './ItemForm';
import { InventoryItem } from '../types/inventoryItem';

interface AddItemButtonProps {
  onAddItem: (item: InventoryItem) => void; 
}

const AddItemButton: React.FC<AddItemButtonProps> = ({ onAddItem }) => {
  const [showForm, setShowForm] = useState(false);

  const handleClose = () => setShowForm(false);
  const handleOpen = () => setShowForm(true);

  return (
    <div>
      <button onClick={handleOpen}>Add New Item</button>

      {showForm && (
        <div className="modal">
          <ItemForm onClose={handleClose} onAddItem={onAddItem}/>
        </div>
      )}
    </div>
  );
};

export default AddItemButton;
