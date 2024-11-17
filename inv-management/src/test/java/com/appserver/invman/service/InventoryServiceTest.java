package com.appserver.invman.service;

import com.appserver.inventory.InventoryManagementService;
import static org.junit.jupiter.api.Assertions.assertEquals;
import com.appserver.inventory.model.InventoryItem;
import com.appserver.inventory.repository.InventoryRepository;
import com.appserver.inventory.service.InventoryService;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = InventoryManagementService.class)
class InventoryServiceTest {
    

    @Mock
    private InventoryRepository inventoryRepository;

    private InventoryItem inventoryItem;

    //@Autowired
    private InventoryService inventoryService;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        inventoryItem = new InventoryItem();
        inventoryItem.setId(1L);
        inventoryItem.setName("Item 1");
        inventoryItem.setSku("SKU001");
        inventoryItem.setQuantity(10);
        inventoryItem.setPrice(100.0);
        inventoryItem.setCategory("Category 1");
        
        inventoryService = new InventoryService(inventoryRepository);
        
        when(inventoryRepository.findById(1L)).thenReturn(Optional.of(inventoryItem)); 
        when(inventoryRepository.findAll()).thenReturn(List.of(inventoryItem));  
        when(inventoryRepository.save(any(InventoryItem.class))).thenReturn(inventoryItem);  
    }

    @Test
    void testGetAllItems() { 
        when(inventoryService.getAllItems()).thenReturn(List.of(inventoryItem));
        
        var items = inventoryService.getAllItems();

        assertNotNull(items);
        assertEquals(1, items.size());
        assertEquals("Item 1", items.get(0).getName());
    }

    @Test
    void testGetItemById() {
        when(inventoryRepository.findById(1L)).thenReturn(Optional.of(inventoryItem));
        
        Optional<InventoryItem> item = inventoryService.getItemById(1L);
        
        assertTrue(item.isPresent());
        assertEquals("Item 1", item.get().getName());
    }

    @Test
    void testAddItem() {
        when(inventoryRepository.save(inventoryItem)).thenReturn(inventoryItem);
        InventoryItem savedItem = inventoryService.addItem(inventoryItem);

        assertNotNull(savedItem);
        assertEquals("Item 1", savedItem.getName());
    }

    @Test
    void testUpdateItem() {
        InventoryItem updatedItem = new InventoryItem();
        updatedItem.setName("Updated Item");
        updatedItem.setSku("SKU002");
        updatedItem.setQuantity(20);
        updatedItem.setPrice(200.0);
        updatedItem.setCategory("Category 2");

        when(inventoryRepository.findById(1L)).thenReturn(Optional.of(inventoryItem));
        when(inventoryRepository.save(inventoryItem)).thenReturn(inventoryItem);

        InventoryItem result = inventoryService.updateItem(1L, updatedItem);

        assertNotNull(result);
        assertEquals("Updated Item", result.getName());
        assertEquals(20, result.getQuantity());
    }

    @Test
    void testDeleteItem() {
        inventoryService.deleteItem(1L);

        verify(inventoryRepository, times(1)).deleteById(1L);
    }
}
