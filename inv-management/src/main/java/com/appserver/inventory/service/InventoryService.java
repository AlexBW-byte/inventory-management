package com.appserver.inventory.service;

import com.appserver.inventory.model.InventoryItem;
import com.appserver.inventory.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 *
 * @author alexs
 */
@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    @Autowired
    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public List<InventoryItem> getAllItems() {
        return inventoryRepository.findAll();
    }

    public Optional<InventoryItem> getItemById(Long id) {
        return inventoryRepository.findById(id);
    }

    public InventoryItem addItem(InventoryItem item) {
        return inventoryRepository.save(item);
    }

    public InventoryItem updateItem(Long id, InventoryItem itemDetails) {
        InventoryItem item = inventoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
        item.setName(itemDetails.getName());
        item.setSku(itemDetails.getSku());
        item.setQuantity(itemDetails.getQuantity());
        item.setPrice(itemDetails.getPrice());
        item.setCategory(itemDetails.getCategory());
        return inventoryRepository.save(item);
    }

    public void deleteItem(Long id) {
        inventoryRepository.deleteById(id);
    }
}
