package br.com.addson.keepingmaintenance.dto.status;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public record StatusRequest(int id) {
    @JsonCreator
    public StatusRequest(@JsonProperty("id") int id) {
        this.id = id;
    }
}
