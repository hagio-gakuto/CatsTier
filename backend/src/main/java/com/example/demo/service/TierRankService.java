package com.example.demo.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.TierProductResDto;
import com.example.demo.dto.TierRankReqDto;
import com.example.demo.dto.TierRankResDto;
import com.example.demo.entity.Products;
import com.example.demo.entity.TierRanks;
import com.example.demo.repository.TierRankCustomRepository;
import com.example.demo.repository.TierRankRepository;

@Service
public class TierRankService {

    private TierRankRepository tierRankRepository;

    private TierRankCustomRepository tierRankCustomRepository;

    private ProductService productService;

    private RakutenApiService rakutenApiService;

    private CommonUtilService commonUtilService;

    public TierRankService(TierRankRepository tierRankRepository, TierRankCustomRepository tierRankCustomRepository,
	    RakutenApiService rakutenApiService, ProductService productService, CommonUtilService commonUtilService) {
	this.tierRankRepository = tierRankRepository;
	this.tierRankCustomRepository = tierRankCustomRepository;
	this.rakutenApiService = rakutenApiService;
	this.productService = productService;
	this.commonUtilService = commonUtilService;
    }

    /**
     * tier表の新規登録用サービスメソッド
     * 
     * @param dto
     */
    @Transactional
    public void putTierRank(TierRankReqDto dto) {

	commonUtilService.checkUid(dto.getUid());
	TierRanks entity = new TierRanks(dto.getItemCode(), dto.getPetId(), dto.getUid(), dto.getTierCategory(),
		dto.getTierRank(), dto.getRankInTier(), 0, LocalDate.now());
	tierRankRepository.save(entity);
	productService.saveProduct(dto.getItemCode());
    }



    /**
     * tier表の取得コントローラメソッド
     * 
     * @param petId
     * @param tierCategory
     */
    @Transactional
    public TierRankResDto getTierRank(int petId, String tierCategory) {
	List<TierRanks> entity = tierRankCustomRepository.getTier(petId, tierCategory);
	// Listの初期化
	List<TierProductResDto> S = new ArrayList<>();
	List<TierProductResDto> A = new ArrayList<>();
	List<TierProductResDto> B = new ArrayList<>();
	List<TierProductResDto> C = new ArrayList<>();
	List<TierProductResDto> D = new ArrayList<>();

	for (TierRanks e : entity) {
	    char tierRank = e.getTierRank();
	    int rankInTier = e.getRankInTier(); // rankInTierがインデックスとして使われる
	    Products product = productService.getProduct(e.getItemCode());
	    
	    TierProductResDto dto = new TierProductResDto();
	    dto.setId(e.getId());
	    dto.setItemCode(product.getItemCode());
	    dto.setPetId(e.getPetId());
	    dto.setUid(e.getUid());
	    dto.setTierCategory(e.getTierCategory());
	    dto.setTierRank(e.getTierRank());
	    dto.setRankInTier(e.getRankInTier());
	    dto.setGenreId(product.getGenreId());
	    dto.setName(product.getName());
	    dto.setImageUrl(product.getImageUrl());
	    dto.setPrice(product.getPrice());
	    dto.setItemUrl(product.getItemUrl());

	    switch (tierRank) {
	    case 'S':
		// SのリストがrankInTierの位置まで拡張されるようにする
		ensureListSize(S, rankInTier);
		S.set(rankInTier, dto);

		break;
	    case 'A':
		ensureListSize(A, rankInTier);
		A.set(rankInTier, dto);
		break;
	    case 'B':
		ensureListSize(B, rankInTier);
		B.set(rankInTier, dto);
		break;
	    case 'C':
		ensureListSize(C, rankInTier);
		C.set(rankInTier, dto);
		break;
	    case 'D':
		ensureListSize(D, rankInTier);
		D.set(rankInTier, dto);
		break;
	    default:
		// tierRank が予期しない値の場合、何もせず無視する
		break;
	    }
	}

	// ランクの配列にitemIdを順番通りに格納
	TierRankResDto res = new TierRankResDto(S, A, B, C, D);

	return res;
    }

    /**
     * ListのサイズがrankInTierに足りていない場合、サイズを調整するメソッド
     * 
     * @param s
     * @param index
     */
    private static void ensureListSize(List<TierProductResDto> s, int index) {
	while (s.size() <= index) {
	    s.add(null); // 空の値でリストを拡張
	}
    }

    /**
     * tier表の更新サービスメソッド
     * 
     * @param dto
     */
//    @Transactional
//    public void patchTierRank(TierRankReqDto dto) {
//
//	commonUtilService.checkUid(dto.getUid());
//	TierRanks entity = new TierRanks(dto.getItemCode(), dto.getPetId(), dto.getUid(), dto.getTierCategory(),
//		dto.getTierRank(), dto.getRankInTier(), 0, LocalDate.now());
//	tierRankRepository.(entity);
//    }
}
