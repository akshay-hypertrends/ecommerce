import React from "react";
import axios from "axios";

class ProductService extends React.Component {
  ProductList = async () => {
    const products = await axios.get(`${process.env.API_URL}/products`);
    return products.data;
  };

  getProduct = async (id) => {
    if(!id) return null;
    const product = await axios.get(`${process.env.API_URL}/products/${id}`);
    return product.data;
  };
}

export default new ProductService();