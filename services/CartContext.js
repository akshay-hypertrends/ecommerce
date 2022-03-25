import { snackActions } from "@components/Notification";
import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from "react";

export const Cart = createContext({});

const CartContext = (props) => {
  const { children } = props;
  const [products, setProduct] = useState([]);
  const [subTotal, setSubTotal] = useState(0.0);
  const [totalAmount, setTotal] = useState(0.0);
  const [totalTax, setTax] = useState(0.0);
  const [totalShipping, setShipping] = useState(0.0);

  const updateCart = (product) => {
    setProduct((products) => products.filter((item) => item.id !== product.id));
    setProduct((oldArray) => [...oldArray, product]);
  };

  const addToCart = (product, color = null, size = null) => {
    const data = {
      id: product.id,
      name: product.title,
      image: product.image,
      imageAlt: product.title,
      price: product.price,
      qty: 1,
      shipping: 5,
      tax: 2,
      color: color ? color : product.color ? product.color[0] : false,
      size: size ? size : product.size ? product.size[2] : false,
    };

    const found = products.find((element) => element.id === product.id);
    if (found) {
      data.qty = found.qty;
      updateCart(data);
    } else {
      setProduct((oldArray) => [...oldArray, data]);
    }
  };

  const clearCart = () => {
    setProduct([]);
  };

  useEffect(() => {
    var taxs = 0;
    var shippings = 0;
    var total = 0;
    products.map((product) => {
      taxs = taxs + parseFloat(product.tax);
      shippings = shippings + parseFloat(product.shipping);
      total = total + parseFloat(product.price) * parseInt(product.qty);
    });
    setTax(taxs.toFixed(2));
    setShipping(shippings.toFixed(2));
    setSubTotal(total.toFixed(2));
    setTotal((taxs + shippings + total).toFixed(2));
  }, [products, setProduct]);

  const deleteCartItem = (product) => {
    setProduct((products) =>
      products.filter((item, i) => item.id !== product.id)
    );
  };

  const contextValues = useMemo(
    () => ({
      updateCart,
      addToCart,
      deleteCartItem,
      clearCart,
      products,
      subTotal,
      totalAmount,
      totalTax,
      totalShipping,
    }),
    [products, subTotal, totalAmount, totalTax, totalShipping]
  );

  return <Cart.Provider value={contextValues}>{children}</Cart.Provider>;
};

export default CartContext;

export const useCart = () => useContext(Cart);
