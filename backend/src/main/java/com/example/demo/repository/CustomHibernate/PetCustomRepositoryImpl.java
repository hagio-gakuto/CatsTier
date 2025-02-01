package com.example.demo.repository.CustomHibernate;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.example.demo.entity.Pets;

@Repository
public class PetCustomRepositoryImpl implements PetCustomRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Pets> findPetsByCustomCriteria(String uid) {
	String hql = "SELECT p FROM Pet p WHERE p.name LIKE :name AND p.breed = :breed";
	return entityManager.createQuery(hql, Pets.class).setParameter("uid", uid).getResultList();
    }
}
