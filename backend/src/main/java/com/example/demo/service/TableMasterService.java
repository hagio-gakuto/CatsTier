package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.TableMasterOptionReqDto;
import com.example.demo.dto.TableMasterOptionResDto;
import com.example.demo.entity.TableMaster;
import com.example.demo.repository.TableMasterCustomRepository;

@Service
public class TableMasterService {

    private TableMasterCustomRepository tableMasterCustomRepository;

    // @Autowired
    public TableMasterService(TableMasterCustomRepository tableMasterCustomRepository) {
	this.tableMasterCustomRepository = tableMasterCustomRepository;
    }


    @Transactional
    public List<TableMasterOptionResDto> getOptions(TableMasterOptionReqDto dto) {
	List<TableMaster> response = tableMasterCustomRepository.getOptions(dto.getCategoryType());
	
	List<TableMasterOptionResDto> res = new ArrayList<>();
	res.add(new TableMasterOptionResDto(0, "未選択"));

//	res = response.stream().map(this::entityToTableMasterOptionResDto)
//		.collect(Collectors.toList());

	res.addAll(response.stream().map(this::entityToTableMasterOptionResDto) // Assuming you have this mapping method
		.collect(Collectors.toList()));

	return res;

    }

    @Transactional
    private TableMasterOptionResDto entityToTableMasterOptionResDto(TableMaster entity) {
	TableMasterOptionResDto dto = new TableMasterOptionResDto();
	dto.setValue(entity.getId());
	dto.setOption(entity.getName());
	return dto;
    }


}
