package br.com.addson.keepingmaintenance.service;

import br.com.addson.keepingmaintenance.dto.status.StatusResponse;
import br.com.addson.keepingmaintenance.model.Status;
import br.com.addson.keepingmaintenance.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StatusService {

    private final StatusRepository statusRepository;

    public StatusService(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    public ResponseEntity<?> getAllStatus() {
        List<StatusResponse> statusResponseList = statusRepository.findAll()
                .stream().map(StatusResponse::fromEntity).collect(Collectors.toList());
        return ResponseEntity.ok().body(statusResponseList);
    }
}
