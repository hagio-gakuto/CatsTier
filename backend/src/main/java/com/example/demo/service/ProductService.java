package com.example.demo.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.constant.Const;
import com.example.demo.dto.RakutenItemResDto;
import com.example.demo.entity.Products;
import com.example.demo.repository.ProductRepository;

@Service
public class ProductService {

    private ProductRepository productRepository;

    private RakutenApiService rakutenApiService;

    public ProductService(ProductRepository productRepository, RakutenApiService rakutenApiService) {
	this.productRepository = productRepository;
	this.rakutenApiService = rakutenApiService;

    }

    /**
     * 商品がDBに保存されているか確認し、なければ保存する
     * 
     * @param itemCode
     */
    public void saveProduct(String itemCode) {
	Optional<Products> result = productRepository.findById(itemCode);
	// なければ保存する
	if (!result.isPresent()) {
	    try {
		RakutenItemResDto item = rakutenApiService.fetchRakutenAPI(itemCode);
		Products entity = new Products(item.getItemCode(), item.getGenreId(), item.getName(),
			item.getImageUrl(), item.getPrice(), item.getItemUrl(), Const.DELETE_FLG_FALSE,
			LocalDate.now());
		productRepository.save(entity);
	    } catch (IOException e1) {
		// TODO 自動生成された catch ブロック
		e1.printStackTrace();
	    }

	}
    }


    /**
     * 商品がDBに保存されている商品を取得
     * 
     * @param itemCode
     * @return
     */
    public Products getProduct(String itemCode) {
	return productRepository.findById(itemCode).orElse(null);

    }

}
