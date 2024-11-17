package com.appserver.inventory;

import com.appserver.inventory.service.InventoryService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"com.appserver.inventory.model", "com.appserver.inventory.repository", "com.appserver.inventory.service", "com.appserver.inventory.controller"})

public class InventoryManagementService {

    private InventoryService service;

    public static void main(String[] args) {
        SpringApplication.run(InventoryManagementService.class, args);
    }

    public InventoryManagementService(InventoryService service) {
        this.service = service;
    }
}
