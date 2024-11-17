package com.appserver.inventory.controller;

import com.appserver.inventory.model.InventoryItem;
import com.appserver.inventory.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 *
 * @author alexs
 */
@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping
    public List<InventoryItem> getAllItems() {
        return inventoryService.getAllItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryItem> getItemById(@PathVariable Long id) {
        Optional<InventoryItem> item = inventoryService.getItemById(id);
        return item.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<InventoryItem> addItem(@RequestBody InventoryItem item) {
        InventoryItem savedItem = inventoryService.addItem(item);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventoryItem> updateItem(@PathVariable Long id, @RequestBody InventoryItem itemDetails) {
        InventoryItem updatedItem = inventoryService.updateItem(id, itemDetails);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        inventoryService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
