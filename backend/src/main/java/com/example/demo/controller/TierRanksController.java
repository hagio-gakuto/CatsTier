package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.TierRankReqDto;
import com.example.demo.dto.TierRankResDto;
import com.example.demo.service.TierRankService;

@RestController
@RequestMapping("/api")
public class TierRanksController {

    private TierRankService tierRankService;

    // @Autowired
    public TierRanksController(TierRankService tierRankService) {
	this.tierRankService = tierRankService;

    }

    /**
     * tier表の新規登録用コントローラメソッド
     * 
     * @param dto
     */
    @PutMapping("/tier")
    public ResponseEntity<Void> putTierRank(@RequestBody TierRankReqDto dto) {
	tierRankService.putTierRank(dto);
	return ResponseEntity.noContent().build();
    }

    /**
     * tier表の取得コントローラメソッド
     * 
     * @param petId
     * @param tierCategory
     */
    @GetMapping("/tier")
    public ResponseEntity<TierRankResDto> getTierRank(@RequestParam int petId,
	    @RequestParam String tierCategory) {
	TierRankResDto response = tierRankService.getTierRank(petId, tierCategory);
	return ResponseEntity.ok(response);
    }

//    /**
//     * tier表の更新コントローラメソッド
//     * 
//     * @param petId
//     * @param tierCategory
//     */
//    @PatchMapping("/tier")
//    public ResponseEntity<TierRankResDto> patchTierRank(@RequestBody TierRankReqDto dto) {
//	TierRankResDto response = tierRankService.patchTier(dto);
//	return ResponseEntity.ok(response);
//    }
}
