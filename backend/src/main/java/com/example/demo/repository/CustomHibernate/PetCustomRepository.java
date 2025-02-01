package com.example.demo.repository.CustomHibernate;

import java.util.List;

import com.example.demo.entity.Pets;

public interface PetCustomRepository {
    List<Pets> findPetsByCustomCriteria(String uid);
}
