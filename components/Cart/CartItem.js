import React, { useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton, MenuItem, Select } from "@mui/material";
import { useCart } from "@services/CartContext";
import Link from "next/link";
import { useRouter } from "next/router";

const CartItem = ({ product, toggleDrawer = null }) => {
  const cartContext = useCart();
  const router = useRouter();
  const [deleteAn, setDelete] = useState(false);

  const deleteItem = () => {
    setDelete(true);
    setTimeout(() => {
      cartContext?.deleteCartItem(product);
    }, 1000);
  };

  const changeQty = (e) => {
    product.qty = e.target.value;
    cartContext?.updateCart(product);
  };

  const gotoDetails = () => {
    if (toggleDrawer) toggleDrawer();
    router.push(`/products/${product.id}`);
  };

  return (
    <>
      <li
        className={`flex py-6 ${
          deleteAn
            ? "animate__animated animate__rotateOutDownRight"
            : "animate__animated animate__zoomIn"
        }`}
      >
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={product.image}
            alt={product.imageAlt}
            className="h-94 w-full object-cover object-center"
          />
        </div>
        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900 w-64">
              <h3 className="truncate">
                <a className="cursor-pointer" onClick={gotoDetails}>
                  {product.name}
                </a>
              </h3>
              <p className="ml-4">${product.price}</p>
            </div>
            <div className="flex mt-2">
              {product.size && (
                <p className="text-sm text-gray-500">
                  Color : <b>{product.color.name}</b>
                </p>
              )}
              {product.size && (
                <p className="text-sm ml-2 text-gray-500">
                  Size : <b>{product.size.name}</b>
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <div className="flex text-center">
              <p className="text-gray-500 mt-1">Qty&nbsp;</p>
              <Select
                value={product.qty}
                onChange={changeQty}
                style={{ height: "30px" }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </div>
            <div>
              <IconButton color="primary" size="small" onClick={gotoDetails}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton color="error" size="small" onClick={deleteItem}>
                <Delete fontSize="small" />
              </IconButton>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default CartItem;
