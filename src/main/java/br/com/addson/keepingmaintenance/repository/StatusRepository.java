package br.com.addson.keepingmaintenance.repository;

import br.com.addson.keepingmaintenance.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {
}
