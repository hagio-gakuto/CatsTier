package com.example.demo.service;

import java.time.LocalDate;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.demo.constant.Const;
import com.example.demo.dto.PetReqDto;
import com.example.demo.entity.Pets;
import com.example.demo.exception.GeneralException;
import com.example.demo.repository.PetRepository;

@Service
public class PetService {

    private PetRepository petRepository;
    private CommonUtilService commonUtilService;

    // @Autowired
    public PetService(PetRepository petRepository, CommonUtilService commonUtilService) {
	this.petRepository = petRepository;
	this.commonUtilService = commonUtilService;
    }

    @Transactional
    public void savePet(PetReqDto dto) {
	boolean b = commonUtilService.isUid(dto.getUid());
	if (!b) {
	    throw new GeneralException(Const.NOT_UID_MSG);
	}
	Pets pets = new Pets();

	pets.setOwnerId(dto.getUid());
//	pets.setIcon(dto.getIcon());
	pets.setName(dto.getName());
	pets.setBreed(dto.getBreed());
	pets.setSpecies(dto.getSpecies());
	pets.setBreedingPlace(dto.getBreedingPlace());
	pets.setContraception(dto.getContraception());
	pets.setSex(dto.getSex());
	pets.setWeight(dto.getWeight());
	pets.setActiveLevel(dto.getActiveLevel());
	pets.setBirthday(dto.getBirthday());
	pets.setDeleteFlg(Const.DELETE_FLG_FALSE);
	pets.setCreatedDate(LocalDate.now());

	petRepository.save(pets);
    }


}
