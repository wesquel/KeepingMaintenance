package br.com.addson.keepingmaintenance.config;

import br.com.addson.keepingmaintenance.model.Status;
import br.com.addson.keepingmaintenance.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final StatusRepository statusRepository;

    public DataLoader(StatusRepository statusRepository) {
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
    }
}
