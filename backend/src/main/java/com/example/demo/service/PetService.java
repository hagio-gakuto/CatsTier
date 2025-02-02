package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.demo.constant.Const;
import com.example.demo.dto.PetReqDto;
import com.example.demo.dto.UserPetsResDto;
import com.example.demo.entity.Pets;
import com.example.demo.exception.GeneralException;
import com.example.demo.repository.PetCustomRepository;
import com.example.demo.repository.PetRepository;

@Service
public class PetService {

    private PetRepository petRepository;
    private PetCustomRepository petCustomRepository;
    private CommonUtilService commonUtilService;
    private TableMasterService tableMasterService;

    // @Autowired
    public PetService(PetRepository petRepository, PetCustomRepository petCustomRepository,
	    CommonUtilService commonUtilService, TableMasterService tableMasterService) {
	this.petRepository = petRepository;
	this.commonUtilService = commonUtilService;
	this.petCustomRepository = petCustomRepository;
	this.tableMasterService = tableMasterService;
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

    @Transactional
    public List<UserPetsResDto> getUserPets(String uid) {
	boolean b = commonUtilService.isUid(uid);
	if (!b) {
	    throw new GeneralException(Const.NOT_UID_MSG);
	}
	List<Pets> pets = petCustomRepository.getUserPets(uid);
	
	List<UserPetsResDto> dto = pets.stream().map(this::entityToUserPetsResDto)
		.collect(Collectors.toList());

//	if (dto.size() > 0) {
//	    dto.get(0).setActive(true);
//	}

	return dto;
    }

    @Transactional
    private UserPetsResDto entityToUserPetsResDto(Pets entity) {
	UserPetsResDto dto = new UserPetsResDto();
	dto.setId(entity.getId());
	dto.setName(entity.getName());
	dto.setSpecies(entity.getSpecies());
	dto.setSpeciesName(tableMasterService.getName(entity.getSpecies())); // あなたが持っているフィールドに合わせて変換を行う
	dto.setBirthday(entity.getBirthday());
	dto.setBreed(entity.getBreed());
	dto.setBreedName(tableMasterService.getName(entity.getBreed()));
	dto.setSex(entity.getSex());
	dto.setSexName(tableMasterService.getName(entity.getSex()));
	dto.setBreedingPlace(entity.getBreedingPlace());
	dto.setBreedingPlaceName(tableMasterService.getName(entity.getBreedingPlace()));
	dto.setContraception(entity.getContraception());
	dto.setContraceptionName(tableMasterService.getName(entity.getContraception()));
	dto.setWeight(entity.getWeight());
	dto.setActiveLevel(entity.getActiveLevel());
	dto.setActiveLevelName(tableMasterService.getName(entity.getActiveLevel()));
//	dto.setIcon(entity.getIcon());

	return dto;
    }


}
