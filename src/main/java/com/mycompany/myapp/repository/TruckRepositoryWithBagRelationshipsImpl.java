package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Truck;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class TruckRepositoryWithBagRelationshipsImpl implements TruckRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Truck> fetchBagRelationships(Optional<Truck> truck) {
        return truck.map(this::fetchDrivers);
    }

    @Override
    public Page<Truck> fetchBagRelationships(Page<Truck> trucks) {
        return new PageImpl<>(fetchBagRelationships(trucks.getContent()), trucks.getPageable(), trucks.getTotalElements());
    }

    @Override
    public List<Truck> fetchBagRelationships(List<Truck> trucks) {
        return Optional.of(trucks).map(this::fetchDrivers).orElse(Collections.emptyList());
    }

    Truck fetchDrivers(Truck result) {
        return entityManager
            .createQuery("select truck from Truck truck left join fetch truck.drivers where truck is :truck", Truck.class)
            .setParameter("truck", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Truck> fetchDrivers(List<Truck> trucks) {
        return entityManager
            .createQuery("select distinct truck from Truck truck left join fetch truck.drivers where truck in :trucks", Truck.class)
            .setParameter("trucks", trucks)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
    }
}
