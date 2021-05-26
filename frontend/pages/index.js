import React from "react";
import { fetchAPI } from "../lib/api";

const Home = ({ products }) => {
  return (
    <div>
      {products.map(product => {
        return (
          <div key={product.id}>
            <p>{product.product_name}</p>
            <p>{product.Description}</p>
            <a href={product.link_url}>go to product</a>
          </div>
        );
      })}
    </div>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [products] = await Promise.all([
    fetchAPI("/products"),
  ]);

  return {
    props: { products },
    revalidate: 1,
  };
}

export default Home;
