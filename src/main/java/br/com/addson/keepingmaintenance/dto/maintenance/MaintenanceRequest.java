package br.com.addson.keepingmaintenance.dto.maintenance;

import br.com.addson.keepingmaintenance.dto.device.DeviceRequest;
import br.com.addson.keepingmaintenance.dto.status.StatusRequest;
import br.com.addson.keepingmaintenance.model.Maintenance;

public record MaintenanceRequest(String name, String description, StatusRequest statusRequest, DeviceRequest deviceRequest) {
    public Maintenance toEntity(){
        Maintenance maintenance = new Maintenance();
        maintenance.setName(this.name);
        maintenance.setDescription(this.description);
        maintenance.setDevice(deviceRequest.toEntity());
        return maintenance;
    }
}
