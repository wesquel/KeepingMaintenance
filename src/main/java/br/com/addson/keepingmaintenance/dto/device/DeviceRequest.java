package br.com.addson.keepingmaintenance.dto.device;

import br.com.addson.keepingmaintenance.dto.deviceType.DeviceTypeRequest;
import br.com.addson.keepingmaintenance.model.Device;


public record DeviceRequest(String name, String description, DeviceTypeRequest deviceTypeRequest) {
    public Device toEntity() {
        Device device = new Device();
        device.setName(this.name);
        device.setDescription(this.description);
        return device;
    }
}
