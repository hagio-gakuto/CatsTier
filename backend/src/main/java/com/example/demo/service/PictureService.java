package com.example.demo.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.Base64;

import jakarta.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.example.demo.constant.Const;
import com.example.demo.entity.Picture;
import com.example.demo.repository.PictureRepository;

@Service
public class PictureService {

    private PictureRepository picRepo;

    // @Autowired
    public PictureService(PictureRepository picRepo) {
	this.picRepo = picRepo;
    }

    // http://192.168.3.49

    // ユーザーネームとアイコン設定
    @Transactional
    public void registerIcon(int category, String specificId, String icon) {

	// ファイル操作
	String UPLOAD_DIR = "C:\\MyApp\\pets-tier-app\\img\\";
	String base64Image = icon;

	// base64のヘッダー部分を削除
	String[] parts = base64Image.split(",");
	String imageData = parts[1]; // ヘッダーの後のデータ部分

	// base64データをデコード
	byte[] imageBytes = Base64.getDecoder().decode(imageData);

	// アップロードディレクトリが存在しない場合は作成
	File uploadDir = new File(UPLOAD_DIR);
	if (!uploadDir.exists()) {
	    uploadDir.mkdir();
	}

	// 新しいファイル名を生成 (タイムスタンプを使う)
	String newFileName = System.currentTimeMillis() + "_" + specificId + ".png";

	// 画像ファイルとして保存
	Path path = Paths.get(UPLOAD_DIR + newFileName);
	try {
	    Files.write(path, imageBytes);
	} catch (IOException e) {

	    e.printStackTrace();
	}

	// DBに保存
	Picture pic = new Picture();
	// カテゴリ
	pic.setCategory(category);
	// 特定ID
	pic.setSpecificId(specificId);
	// 名前
	pic.setName(newFileName);
	pic.setDeleteFlg(Const.DELETE_FLG_FALSE);
	pic.setCreatedDate(LocalDate.now());

	picRepo.save(pic);


    }

}
