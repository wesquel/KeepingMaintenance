package br.com.addson.keepingmaintenance.model;

import br.com.addson.keepingmaintenance.repository.StatusRepository;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Entity
public class Component {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(
        name = "component_status",
        joinColumns = @JoinColumn(name = "component_id"),
        inverseJoinColumns = @JoinColumn(name = "status_id")
    )
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "device_type_id")
    private DeviceType deviceType; // Adicionando a referência ao tipo de dispositivo

    public Component(String name, String description, Status status, DeviceType deviceType) {
        this.name = name;
        this.description = description;
        this.deviceType = deviceType;
        this.status = status;
    }
}
