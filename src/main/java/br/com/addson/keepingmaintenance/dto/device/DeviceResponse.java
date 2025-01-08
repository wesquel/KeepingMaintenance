package br.com.addson.keepingmaintenance.dto.device;

import br.com.addson.keepingmaintenance.dto.component.ComponentRequest;

import java.util.List;

public record DeviceResponse(Long id, String name, String description, List<ComponentRequest> componentRequestList) {
}
