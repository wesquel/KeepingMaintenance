package br.com.addson.keepingmaintenance.repository;

import br.com.addson.keepingmaintenance.model.Maintenance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaintenanceRepository extends JpaRepository<Maintenance, Long> {
}
