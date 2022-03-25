import React, { useEffect, useState } from "react";
import Products from "@components/Products";
import Head from "next/head";
import Link from "next/link";
import Cart from "@components/Cart";
import { useQuery } from "react-query";
import productService from "@services/Product/productService";
import { CircularProgress } from "@mui/material";


const breadcrumbs = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Products", href: "" },
];

const ProductPage = () => {
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (open) => {
    setDrawer(open);
  };

  const searchQuery = `/products`;

  const {
    data: products,
    isLoading: isLoading,
    isSuccess: isSuccess,
    refetch: refetchProduct,
  } = useQuery(
    [
      searchQuery
    ],
    productService.ProductList,
    {
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    }
  );

  return (
    <>
      <Head>
        <title>Products | E-commerce</title>
        <meta name="description" content="E-commerce design" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <Link href={breadcrumb.href}>
                    <a className="mr-2 text-sm font-medium text-gray-900">
                      {breadcrumb.name}
                    </a>
                  </Link>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-5 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="animate__animated animate__fadeInLeft animate__slow max-w-2xl mx-auto pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-4xl font-semibold text-gray-700">
            Men Clothes
          </h2>
          {
            isLoading && (
              <div className="flex justify-center p-6">
                <CircularProgress size={50} className="text-gray-700" />
              </div>
            )
          }
          <div className="grid grid-cols-1 gap-y-10 mt-8 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products && products.length > 0 && products.map(
              (product, i) =>
              product.category === "men's clothing" && (
                  <Products
                    product={product}
                    toggleDrawer={() => toggleDrawer(!drawer)}
                    key={product.id}
                  />
                )
            )}
          </div>
        </div>
        <div className="animate__animated animate__fadeInRight animate__slow max-w-2xl mx-auto px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-4xl font-semibold text-gray-700">
            Women Clothes
          </h2>
          {
            isLoading && (
              <div className="flex justify-center p-6">
                <CircularProgress size={50} className="text-gray-700" />
              </div>
            )
          }
          <div className="grid grid-cols-1 gap-y-10 mt-8 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products && products.length > 0 && products.map(
              (product, i) =>
              product.category === "women's clothing" && (
                  <Products
                    product={product}
                    toggleDrawer={() => toggleDrawer(!drawer)}
                    key={product.id}
                  />
                )
            )}
          </div>
        </div>
        <div className="animate__animated animate__fadeInLeft animate__slow max-w-2xl mx-auto pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-4xl font-semibold text-gray-700">
            Jewellery
          </h2>
          {
            isLoading && (
              <div className="flex justify-center p-6">
                <CircularProgress size={50} className="text-gray-700" />
              </div>
            )
          }
          <div className="grid grid-cols-1 gap-y-10 mt-8 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products && products.length > 0 && products.map(
              (product, i) =>
              product.category === "jewelery" && (
                  <Products
                    product={product}
                    toggleDrawer={() => toggleDrawer(!drawer)}
                    key={product.id}
                  />
                )
            )}
          </div>
        </div>
        <div className="animate__animated animate__fadeInRight animate__slow max-w-2xl mx-auto px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-4xl font-semibold text-gray-700">
            Electronics
          </h2>
          {
            isLoading && (
              <div className="flex justify-center p-6">
                <CircularProgress size={50} className="text-gray-700" />
              </div>
            )
          }
          <div className="grid grid-cols-1 gap-y-10 mt-8 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products && products.length > 0 && products.map(
              (product, i) =>
              product.category === "electronics" && (
                  <Products
                    product={product}
                    toggleDrawer={() => toggleDrawer(!drawer)}
                    key={product.id}
                  />
                )
            )}
          </div>
        </div>
      </main>
      <Cart drawer={drawer} toggleDrawer={() => toggleDrawer(false)} />
    </>
  );
};

export default ProductPage;
