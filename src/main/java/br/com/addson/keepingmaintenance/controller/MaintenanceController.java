package br.com.addson.keepingmaintenance.controller;

import br.com.addson.keepingmaintenance.dto.maintenance.MaintenanceRequest;
import br.com.addson.keepingmaintenance.dto.maintenance.MaintenanceRequestUpdate;
import br.com.addson.keepingmaintenance.service.MaintenanceService;
import com.sun.tools.javac.Main;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/maintenance")
public class MaintenanceController {

    private final MaintenanceService maintenanceService;

    public MaintenanceController(MaintenanceService maintenanceService) {
        this.maintenanceService = maintenanceService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return maintenanceService.getById(id);
    }

    @GetMapping
    public ResponseEntity<?> listAll(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return maintenanceService.listAll(page, size);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody MaintenanceRequest maintenanceRequest) {
        try {
            return maintenanceService.create(maintenanceRequest);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody MaintenanceRequestUpdate maintenanceRequestUpdate) {
        return maintenanceService.update(maintenanceRequestUpdate);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return maintenanceService.delete(id);
    }

}
