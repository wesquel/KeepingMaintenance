package br.com.addson.keepingmaintenance.dto.maintenance;

import br.com.addson.keepingmaintenance.dto.device.DeviceRequest;
import br.com.addson.keepingmaintenance.dto.status.StatusRequest;
import br.com.addson.keepingmaintenance.model.Maintenance;

public record MaintenanceRequestUpdate(Long id, String name, String description, StatusRequest statusRequest, DeviceRequest deviceRequest) {
}
