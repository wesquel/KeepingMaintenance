package br.com.addson.keepingmaintenance.dto.deviceType;

import br.com.addson.keepingmaintenance.model.DeviceType;


public record DeviceTypeResponse (Long id, String name){
    public static DeviceTypeResponse fromEntity(DeviceType deviceType) {
        return new DeviceTypeResponse(
                deviceType.getId(),
                deviceType.getName()
        );
    }
}
