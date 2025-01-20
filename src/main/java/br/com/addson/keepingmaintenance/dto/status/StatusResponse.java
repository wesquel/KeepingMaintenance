package br.com.addson.keepingmaintenance.dto.status;

import br.com.addson.keepingmaintenance.model.Status;

public record StatusResponse(Long id, String name, String description) {
    public static StatusResponse fromEntity(Status status) {
        return new StatusResponse(status.getId(), status.getName(), status.getDescription());
    }
}
