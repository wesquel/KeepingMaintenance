package br.com.addson.keepingmaintenance.dto.maintenance;

import br.com.addson.keepingmaintenance.dto.device.DeviceResponse;
import br.com.addson.keepingmaintenance.dto.status.StatusResponse;
import br.com.addson.keepingmaintenance.model.Maintenance;

public record MaintenanceResponse(Long id, String name, String description,
                                  DeviceResponse deviceResponse, StatusResponse statusResponse) {
    public static MaintenanceResponse fromEntity(Maintenance maintenance){
        return new MaintenanceResponse(
                maintenance.getId(),
                maintenance.getName(),
                maintenance.getDescription(),
                DeviceResponse.fromEntity(maintenance.getDevice()),
                StatusResponse.fromEntity(maintenance.getStatus())
        );
    }
}
