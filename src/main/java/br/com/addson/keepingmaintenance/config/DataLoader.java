package br.com.addson.keepingmaintenance.config;

import br.com.addson.keepingmaintenance.model.Component;
import br.com.addson.keepingmaintenance.model.DeviceType;
import br.com.addson.keepingmaintenance.model.Status;
import br.com.addson.keepingmaintenance.repository.ComponentRepository;
import br.com.addson.keepingmaintenance.repository.DeviceTypeRepository;
import br.com.addson.keepingmaintenance.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Component
public class DataLoader implements CommandLineRunner {

    private final DeviceTypeRepository deviceTypeRepository;
    private final ComponentRepository componentRepository;
    private final StatusRepository statusRepository;

    public DataLoader(DeviceTypeRepository deviceTypeRepository, ComponentRepository componentRepository, StatusRepository statusRepository) {
        this.deviceTypeRepository = deviceTypeRepository;
        this.componentRepository = componentRepository;
        this.statusRepository = statusRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (statusRepository.count() == 0) {
            List<Status> status = List.of(
                new Status(null, "Pending Inspection", "The device requires a thorough inspection to ensure proper functionality."),
                new Status(null, "Operational", "The device is functioning normally and does not require any attention."),
                new Status(null, "Inoperative", "The device is non-functional and needs immediate repair or replacement."),
                new Status(null, "Parts Required", "The device is operational but requires specific parts for optimal performance.")
            );
            statusRepository.saveAll(status);
        }

        // Inserir Tipos de Dispositivos
        if (deviceTypeRepository.count() == 0) {
            DeviceType computerType = new DeviceType("Computer");
            deviceTypeRepository.saveAll(List.of(computerType));

            Status status = statusRepository.findById(1L).get();

            // Inserir Componentes para cada Tipo de Dispositivo
            List<Component> computerComponents = List.of(
                    new Component("HD", "Hard Drive", status, computerType),
                    new Component("RAM", "Memory", status, computerType),
                    new Component("CPU", "Processor", status, computerType)
            );

            componentRepository.saveAll(computerComponents);
        }
    }
}
