package br.com.addson.keepingmaintenance.controller;

import br.com.addson.keepingmaintenance.dto.maintenance.MaintenanceRequest;
import br.com.addson.keepingmaintenance.service.MaintenanceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/maintenance")
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    public MaintenanceController(MaintenanceService maintenanceService) {
        this.maintenanceService = maintenanceService;
    }

    @GetMapping
    public String get(){
        return "get";
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody MaintenanceRequest maintenanceRequest) {
        try {
            return maintenanceService.createMaintenance(maintenanceRequest);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
