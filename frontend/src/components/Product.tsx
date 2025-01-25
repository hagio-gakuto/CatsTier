import React from "react";

interface ProductProps {
  product: ProductType;
}

export type ProductType = {
  Item: {
    productCode: string;
    catchcopy: string;
    genreId: string;
    itemCaption: string;
    itemName: string;
    itemCode: string;
    itemPrice: number;
    itemUrl: string;
    mediumImageUrls: { imageUrl: string }[];
    pointRate: number;
    reviewAverage: number;
    reviewCount: number;
    shopName: string;
    shopUrl: string;
  };
};

const Product: React.FC<ProductProps> = ({ product }) => {
  const {
    itemName,
    reviewAverage,
    reviewCount,
    itemPrice,
    mediumImageUrls,
    shopName,
    shopUrl,
  } = product.Item;

  // console.log(product);

  // 星をレビューの平均に基づいて表示
  const renderStars = (average: number) => {
    const fullStars = Math.floor(average);
    const halfStar = average % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const stars = [
      ...Array(fullStars).fill("full"),
      ...Array(halfStar).fill("half"),
      ...Array(emptyStars).fill("empty"),
    ];

    return stars.map((star, index) => (
      <svg
        key={index}
        className={`w-3 h-3 ${
          star === "full"
            ? "text-yellow-300"
            : star === "half"
            ? "text-yellow-500"
            : "text-gray-200"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path
          d={
            star === "full"
              ? "M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              : "M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
          }
        />
      </svg>
    ));
  };

  return (
    <div className="w-full max-w-48 bg-white border hover:opacity-80 transition-opacity border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 mt-4">
      <div className="flex  justify-center items-center">
        <img
          className="" // 画像を横幅に合わせ、縦幅は固定
          src={mediumImageUrls[0]?.imageUrl}
          alt="product image"
        />
      </div>
      <div className="px-2 py-3">
        <a href={shopUrl} target="_blank" rel="noreferrer">
          <h5 className="text-xs tracking-tight text-gray-900 dark:text-white text-ellipsis overflow-hidden whitespace-nowrap">
            {shopName}
          </h5>
        </a>
        <a href="#">
          <h5 className="font-semibold tracking-tight text-gray-900 dark:text-white text-ellipsis overflow-hidden whitespace-nowrap">
            {itemName}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {renderStars(reviewAverage)}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-1 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            {reviewAverage} ({reviewCount}件)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-900 dark:text-white">
            {itemPrice.toLocaleString()}円
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
