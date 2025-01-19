package br.com.addson.keepingmaintenance.controller;

import br.com.addson.keepingmaintenance.model.Status;
import br.com.addson.keepingmaintenance.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/status")
public class StatusController {

    private final StatusService statusService;

    public StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    @GetMapping
    public ResponseEntity<?> listAll() {
        return statusService.getAllStatus();
    }
}
