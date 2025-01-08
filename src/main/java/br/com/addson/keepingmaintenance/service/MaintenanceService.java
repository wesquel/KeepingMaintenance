package br.com.addson.keepingmaintenance.service;

import br.com.addson.keepingmaintenance.dto.maintenance.MaintenanceRequest;
import br.com.addson.keepingmaintenance.model.Device;
import br.com.addson.keepingmaintenance.model.Maintenance;
import br.com.addson.keepingmaintenance.model.Status;
import br.com.addson.keepingmaintenance.repository.MaintenanceRepository;
import br.com.addson.keepingmaintenance.repository.StatusRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MaintenanceService {

    private final MaintenanceRepository maintenanceRepository;
    private final StatusRepository statusRepository;

    public MaintenanceService(MaintenanceRepository maintenanceRepository, StatusRepository statusRepository) {
        this.maintenanceRepository = maintenanceRepository;
        this.statusRepository = statusRepository;
    }

    public ResponseEntity<?> createMaintenance(MaintenanceRequest maintenanceRequest){

        Maintenance maintenance = maintenanceRequest.toEntity();
        Optional<Status> status = statusRepository.findById((long) maintenanceRequest.statusRequest().id());
        status.ifPresent(maintenance::setStatus);

        maintenanceRepository.save(maintenance);

        return ResponseEntity.ok().body("d");
    }
}
