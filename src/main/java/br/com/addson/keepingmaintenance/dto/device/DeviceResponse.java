package br.com.addson.keepingmaintenance.dto.device;

import br.com.addson.keepingmaintenance.dto.component.ComponentResponse;
import br.com.addson.keepingmaintenance.dto.deviceType.DeviceTypeResponse;
import br.com.addson.keepingmaintenance.model.Device;

import java.util.List;

public record DeviceResponse(Long id, String name,
                             String description,
                             DeviceTypeResponse deviceTypeResponse,
                             List<ComponentResponse> componentResponseList) {
    public static DeviceResponse fromEntity (Device device) {
        return new DeviceResponse(
                device.getId(),
                device.getName(),
                device.getDescription(),
                DeviceTypeResponse.fromEntity(device.getDeviceType()), // Converte DeviceType para DeviceTypeResponse
                device.getComponentList().stream() // Converte a lista de Component para ComponentResponse
                        .map(ComponentResponse::fromEntity)
                        .toList()
        );
    }
}
