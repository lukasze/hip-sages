package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Truck;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface TruckRepositoryWithBagRelationships {
    Optional<Truck> fetchBagRelationships(Optional<Truck> truck);

    List<Truck> fetchBagRelationships(List<Truck> trucks);

    Page<Truck> fetchBagRelationships(Page<Truck> trucks);
}
