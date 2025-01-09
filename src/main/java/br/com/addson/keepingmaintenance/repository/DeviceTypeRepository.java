package br.com.addson.keepingmaintenance.repository;

import br.com.addson.keepingmaintenance.model.DeviceType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceTypeRepository extends JpaRepository<DeviceType, Long> {
}
