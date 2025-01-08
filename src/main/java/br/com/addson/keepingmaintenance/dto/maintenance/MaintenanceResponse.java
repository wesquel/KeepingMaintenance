package br.com.addson.keepingmaintenance.dto.maintenance;

import br.com.addson.keepingmaintenance.model.Status;

public record MaintenanceResponse(Long id, String name, String description, Status status) {
}
