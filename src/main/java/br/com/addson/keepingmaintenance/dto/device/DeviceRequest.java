package br.com.addson.keepingmaintenance.dto.device;

import br.com.addson.keepingmaintenance.model.Device;


public record DeviceRequest(String name, String description) {
    public Device toEntity() {
        Device device = new Device();
        device.setName(this.name);
        device.setDescription(this.description);
        return device;
    }
}
