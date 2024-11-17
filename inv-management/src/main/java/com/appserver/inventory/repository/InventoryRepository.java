package com.appserver.inventory.repository;

import com.appserver.inventory.model.InventoryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author alexs
 */
@Repository
public interface InventoryRepository extends JpaRepository<InventoryItem, Long> {

}
