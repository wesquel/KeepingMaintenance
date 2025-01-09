package br.com.addson.keepingmaintenance.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class DeviceType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "deviceType", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Component> components;

    public DeviceType(String name) {
        this.name = name;
    }
}
