package br.com.addson.keepingmaintenance.repository;

import br.com.addson.keepingmaintenance.model.Component;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComponentRepository extends JpaRepository<Component, Long> {
    List<Component> findByDeviceTypeId(Long deviceTypeId);
}
