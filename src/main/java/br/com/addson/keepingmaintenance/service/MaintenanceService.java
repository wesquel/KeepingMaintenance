package br.com.addson.keepingmaintenance.service;

import br.com.addson.keepingmaintenance.dto.maintenance.MaintenanceRequest;
import br.com.addson.keepingmaintenance.model.Component;
import br.com.addson.keepingmaintenance.model.DeviceType;
import br.com.addson.keepingmaintenance.model.Maintenance;
import br.com.addson.keepingmaintenance.model.Status;
import br.com.addson.keepingmaintenance.repository.*;
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


    public ResponseEntity<?> createMaintenance(MaintenanceRequest maintenanceRequest){

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

        return ResponseEntity.ok().body("maintenance created");
    }
}
