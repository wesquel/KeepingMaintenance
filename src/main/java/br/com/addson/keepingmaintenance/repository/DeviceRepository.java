package br.com.addson.keepingmaintenance.repository;

import br.com.addson.keepingmaintenance.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<Device, Long> {
}
