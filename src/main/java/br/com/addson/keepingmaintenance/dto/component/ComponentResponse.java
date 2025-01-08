package br.com.addson.keepingmaintenance.dto.component;

import br.com.addson.keepingmaintenance.dto.status.StatusRequest;

public record ComponentResponse(Long id, String name, String description, StatusRequest statusRequest) {
}
