package br.com.addson.keepingmaintenance.dto.component;

import br.com.addson.keepingmaintenance.dto.status.StatusResponse;
import br.com.addson.keepingmaintenance.model.Component;

public record ComponentResponse(Long id, String name, String description, StatusResponse statusResponse) {
    public static ComponentResponse fromEntity(Component component) {
        return new ComponentResponse(
                component.getId(),
                component.getName(),
                component.getDescription(),
                StatusResponse.fromEntity(component.getStatus())
        );
    }
}
