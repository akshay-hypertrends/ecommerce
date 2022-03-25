import React, { useEffect, useState } from "react";
import Head from "next/head";
import Products from "@components/Products";
import Cart from "@components/Cart";
import Link from "next/link";
import { useQuery } from "react-query";
import productService from "@services/Product/productService";
import { CircularProgress } from "@mui/material";

const Index = () => {
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

  // useEffect(() => {
  //   axios.get(`${process.env.BASE_URL}/products`).then((res) => {
  //     setProduct(res.data);
  //   });
  // },[]);

  return (
    <>
      <Head>
        <title>Home | E-commerce</title>
        <meta name="description" content="E-commerce design" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden animate__animated animate__zoomIn animate__slow">
          <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
              <div className="sm:max-w-lg">
                <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                  Summer styles are finally here
                </h1>
                <p className="mt-4 text-xl text-gray-500">
                  This year, our new summer collection will shelter you from the
                  harsh elements of a world that doesn<q></q>t care if you live
                  or die.
                </p>
              </div>
              <div>
                <div className="mt-10">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
                  >
                    <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                      <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                            <img
                              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <img
                              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <img
                              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <img
                              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <img
                              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <img
                              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <img
                              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link href={"/products"}>
                    <a className="inline-block text-center bg-gray-800 border border-transparent rounded-md shadow-md py-3 px-8 font-medium text-white hover:bg-gray-900 active:shadow-2xl">
                      Shop Collection
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="animate__animated animate__fadeInLeft animate__slow max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-4xl font-semibold text-gray-700">
            Featured Products
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
                i < 8 && (
                  <Products
                    product={product}
                    toggleDrawer={() => toggleDrawer(!drawer)}
                    key={product.id}
                  />
                )
            )}
          </div>
        </div>
        <div className="animate__animated animate__fadeInRight animate__slow max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
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
      </main>
      <Cart drawer={drawer} toggleDrawer={() => toggleDrawer(false)} />
    </>
  );
};

export default Index;
