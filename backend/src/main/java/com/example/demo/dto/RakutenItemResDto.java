package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RakutenItemResDto {

    @JsonProperty("itemCode")
    private String itemCode;

    @JsonProperty("itemName")
    private String name;

    @JsonProperty("mediumImageUrls")
    private ImageUrl[] imageUrls;

    @JsonProperty("itemPrice")
    private Integer price;

    @JsonProperty("genreId")
    private Integer genreId;

    @JsonProperty("itemUrl")
    private String itemUrl;

    public String getImageUrl() {
        return imageUrls != null && imageUrls.length > 0 ? imageUrls[0].getUrl() : null;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ImageUrl {
        @JsonProperty("imageUrl")
        private String url;

        public String getUrl() {
            return url;
        }
    }
}
