import axios from "axios";
import { InventoryItem } from '../types/inventoryItem';

const API_URL = "http://localhost:8080/api/inventory"; 

export const getInventory = async (): Promise<InventoryItem[]> => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch inventory');
      }
      const data: InventoryItem[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching inventory:', error);
      return [];
    }
  };


export const addInventoryItem = async (newItem: InventoryItem) => {
    try {
      const response = await axios.post(API_URL, newItem);
      return response.data; 
    } catch (error) {
      console.error('Error adding inventory item:', error);
      throw error; 
    }
  };

export const updateInventoryItem = async (id: number, item: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, item);
    return response.data;
  } catch (error) {
    console.error("Error updating inventory item:", error);
    throw error;
  }
};

export const deleteInventoryItem = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    throw error;
  }
};