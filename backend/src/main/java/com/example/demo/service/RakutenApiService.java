package com.example.demo.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.demo.dto.RakutenItemResDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class RakutenApiService {

    @Value("${rakuten.api.key}")
    private String rakutenApiKey;

    /**
     * 楽天APIを呼び出し、一致する商品を返却する。
     * 
     * @param itemCode
     * @return
     * @throws IOException
     */
    public RakutenItemResDto fetchRakutenAPI(String itemCode) throws IOException {
	String baseUrl = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706";
	String charset = "UTF-8";
	String query = String.format("applicationId=%s&itemCode=%s", rakutenApiKey,
		URLEncoder.encode(itemCode, charset));

	@SuppressWarnings("deprecation")
	URL url = new URL(baseUrl + "?" + query);
	HttpURLConnection connection = (HttpURLConnection) url.openConnection();
	connection.setRequestMethod("GET");

	int responseCode = connection.getResponseCode();
	if (responseCode == HttpURLConnection.HTTP_OK) {
	    BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream(), charset));
	    StringBuilder response = new StringBuilder();
	    String inputLine;

	    while ((inputLine = in.readLine()) != null) {
		response.append(inputLine);
	    }
	    in.close();

	    // JSONパース
	    ObjectMapper mapper = new ObjectMapper();
	    JsonNode root = mapper.readTree(response.toString());
	    JsonNode itemsNode = root.get("Items");

	    if (itemsNode != null && itemsNode.isArray()) {
		for (JsonNode itemNode : itemsNode) {
		    RakutenItemResDto item = mapper.treeToValue(itemNode.get("Item"), RakutenItemResDto.class);
		    System.out.println("Item: " + item.getName() + ", Price: " + item.getPrice());
		    return item;
		}
	    }

	} else {
	    int retries = 3;
	    for (int i = 0; i < retries; i++) {
		if (responseCode == 429) {
		    try {
			Thread.sleep(1000);
		    } catch (InterruptedException e) {
			// TODO 自動生成された catch ブロック
			e.printStackTrace();
		    } // 1秒待つ
		    continue;
		}
		break;
	    }

	    BufferedReader errorReader = new BufferedReader(
		    new InputStreamReader(connection.getErrorStream(), charset));
	    StringBuilder errorResponse = new StringBuilder();
	    String errorLine;
	    while ((errorLine = errorReader.readLine()) != null) {
		errorResponse.append(errorLine);
	    }
	    errorReader.close();

	    System.out.println("Error body: " + errorResponse.toString());

	    System.out.println("HTTP error code: " + responseCode);
	}
	return null;
    }
}