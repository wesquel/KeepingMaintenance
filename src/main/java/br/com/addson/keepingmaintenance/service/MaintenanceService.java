package br.com.addson.keepingmaintenance.service;

import br.com.addson.keepingmaintenance.dto.maintenance.MaintenanceRequest;
import br.com.addson.keepingmaintenance.dto.maintenance.MaintenanceRequestUpdate;
import br.com.addson.keepingmaintenance.dto.maintenance.MaintenanceResponse;
import br.com.addson.keepingmaintenance.model.Component;
import br.com.addson.keepingmaintenance.model.Maintenance;
import br.com.addson.keepingmaintenance.model.Status;
import br.com.addson.keepingmaintenance.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaintenanceService {

    private final MaintenanceRepository maintenanceRepository;
    private final StatusRepository statusRepository;
    private final DeviceTypeRepository deviceTypeRepository;
    private final ComponentRepository componentRepository;

    public MaintenanceService(MaintenanceRepository maintenanceRepository, StatusRepository statusRepository
    , DeviceTypeRepository deviceTypeRepository, DeviceRepository deviceRepository, ComponentRepository componentRepository) {
        this.maintenanceRepository = maintenanceRepository;
        this.statusRepository = statusRepository;
        this.deviceTypeRepository = deviceTypeRepository;
        this.componentRepository = componentRepository;
    }


    public ResponseEntity<?> create(MaintenanceRequest maintenanceRequest){

        Maintenance maintenance = maintenanceRequest.toEntity();

        Optional<Status> status = statusRepository.findById((long) maintenanceRequest.statusRequest().id());

        if (status.isEmpty()){
          return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Status não encontrado!");
        }

        maintenance.setStatus(status.get());

        Long deviceTypeId = maintenanceRequest.deviceRequest().deviceTypeRequest().id();

        maintenance.getDevice().setDeviceType(deviceTypeRepository.getReferenceById(deviceTypeId));
        List<Component> componentList = componentRepository.findByDeviceTypeId(maintenance.getDevice().getDeviceType().getId());
        maintenance.getDevice().setComponentList(componentList);
        maintenanceRepository.save(maintenance);

        return ResponseEntity.status(HttpStatus.CREATED).body(MaintenanceResponse.fromEntity(maintenance));
    }

    public ResponseEntity<?> listAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<Maintenance> maintenancePage = maintenanceRepository.findAll(pageable);

        Page<MaintenanceResponse> responsePage = maintenancePage.map(MaintenanceResponse::fromEntity);

        return ResponseEntity.ok().body(responsePage);
    }

    public ResponseEntity<?> getById(Long id) {
        Optional<Maintenance> optionalMaintenance = maintenanceRepository.findById(id);
        if (optionalMaintenance.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Maintenance not found");
        }
        return ResponseEntity.ok(MaintenanceResponse.fromEntity(optionalMaintenance.get()));
    }


    public ResponseEntity<?> update(MaintenanceRequestUpdate maintenanceRequestUpdate) {
        Maintenance maintenance = maintenanceRepository.getReferenceById(maintenanceRequestUpdate.id());
        maintenance.setName(maintenanceRequestUpdate.name());
        maintenance.setDescription(maintenanceRequestUpdate.description());
        Long deviceTypeId = maintenanceRequestUpdate.deviceRequest().deviceTypeRequest().id();
        maintenance.getDevice().setDeviceType(deviceTypeRepository.getReferenceById(deviceTypeId));

        Optional<Status> status = statusRepository.findById((long) maintenanceRequestUpdate.statusRequest().id());

        if (status.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Status não encontrado!");
        }
        maintenance.setStatus(status.get());
        maintenanceRepository.save(maintenance);

        return ResponseEntity.ok().body(MaintenanceResponse.fromEntity(maintenance));
    }

    public ResponseEntity<?> delete(Long id) {
        maintenanceRepository.findById(id).ifPresent(maintenanceRepository::delete);
        return ResponseEntity.ok().build();
    }
}
