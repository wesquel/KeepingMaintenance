package br.com.addson.keepingmaintenance.service;

import br.com.addson.keepingmaintenance.dto.deviceType.DeviceTypeResponse;
import br.com.addson.keepingmaintenance.model.Device;
import br.com.addson.keepingmaintenance.repository.DeviceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeviceTypeService {

    private final DeviceTypeRepository deviceTypeRepository;


    public DeviceTypeService(DeviceTypeRepository deviceTypeRepository) {
        this.deviceTypeRepository = deviceTypeRepository;
    }

    public ResponseEntity<?> listAll() {
        List<DeviceTypeResponse> deviceTypeResponseList = deviceTypeRepository.findAll().stream()
                .map(DeviceTypeResponse::fromEntity).collect(Collectors.toList());

        return ResponseEntity.ok().body(deviceTypeResponseList);
    }
}
