import React from "react";
import { fetchAPI } from "../../lib/api";

const Product = ({ product }) => {
  return (
    <div>
      <div key={product.id}>
        <p>{product.product_name}</p>
        <p>{product.Description}</p>
        <a href={product.link_url}>link</a>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const products = await fetchAPI("/products");

  return {
    paths: products.map((product) => ({
      params: {
        id: product.id.toString(),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log("parammmsssss", params);
  // Run API calls in parallel
  const [product] = await fetchAPI(`/products?id=${params.id}`);
  console.log("productproductproductproduct", product);
  return {
    props: { product },
    revalidate: 1,
  };
}

export default Product;
