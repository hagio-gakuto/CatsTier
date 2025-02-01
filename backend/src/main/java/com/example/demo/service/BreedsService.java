package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.BreedsOptionResDto;
import com.example.demo.entity.Breeds;
import com.example.demo.repository.BreedRepository;

@Service
public class BreedsService {

    private BreedRepository breedRepository;

    // @Autowired
    public BreedsService(BreedRepository breedRepository) {
	this.breedRepository = breedRepository;
    }

    @Transactional
    public List<BreedsOptionResDto> getOptions() {
	List<Breeds> response = breedRepository.findAll();

	List<BreedsOptionResDto> res = new ArrayList<>();
	res.add(new BreedsOptionResDto(0, "未選択", 1, ""));
	res.add(new BreedsOptionResDto(0, "未選択", 2, ""));

	res.addAll(response.stream().map(this::entityToBreedsOptionResDto).collect(Collectors.toList()));

	return res;

    }

    @Transactional
    private BreedsOptionResDto entityToBreedsOptionResDto(Breeds entity) {
	BreedsOptionResDto dto = new BreedsOptionResDto();
	dto.setValue(entity.getId());
	dto.setOption(entity.getBreed());
	dto.setSpecies(entity.getSpeacies());
	dto.setDescription(entity.getDescription());
	return dto;
    }

}
