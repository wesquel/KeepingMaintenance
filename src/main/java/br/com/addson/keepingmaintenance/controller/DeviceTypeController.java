package br.com.addson.keepingmaintenance.controller;

import br.com.addson.keepingmaintenance.service.DeviceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/deviceType")
public class DeviceTypeController {
    private final DeviceTypeService deviceTypeService;

    public DeviceTypeController(DeviceTypeService deviceTypeService) {
        this.deviceTypeService = deviceTypeService;
    }
    @GetMapping
    public ResponseEntity<?> listAll() {
        return deviceTypeService.listAll();
    }
}
