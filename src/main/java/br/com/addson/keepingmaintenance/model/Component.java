package br.com.addson.keepingmaintenance.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
}
