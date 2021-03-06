import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { RadioGroup } from "@headlessui/react";
import { ShoppingBag } from "@mui/icons-material";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCart } from "@services/CartContext";
import Cart from "@components/Cart";
import productService from "@services/Product/productService";
import { CircularProgress } from "@mui/material";

const breadcrumbs = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Products", href: "/products" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const color = [
  {
    "name": "White",
    "class": "bg-white"
  },
  {
    "name": "Charcol Gary",
    "class": "bg-gray-200"
  },
  {
    "name": "Black",
    "class": "bg-gray-900"
  }
];

const size = [
  {"name":"XS","inStock": false},
  {"name":"S","inStock": true},
  {"name":"M","inStock": true},
  {"name":"L","inStock": true},
  {"name":"XL","inStock": true},
  {"name":"2XL","inStock": true},
  {"name":"3XL","inStock": true}
];

const highlights = [
  "Hand cut and sewn locally",
  "Dyed with our proprietary colors",
  "Pre-washed & pre-shrunk",
  "Ultra-soft 100% cotton"
];

function Details() {

  const router = useRouter();
  const productId = router.query.id;

  const cartContext = useCart();
  const [drawer, setDrawer] = useState(false);
  const [product, setProduct] = useState(null);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(async () => {
    if(productId)
    {
      const productData = await productService.getProduct(productId);
      if(productData)
      {
        if(productData.category==="women's clothing" || productData.category==="men's clothing")
        {
          productData.highlights = highlights;
          setSelectedColor(color[1]);
          setSelectedSize(size[2]);
        }
        setProduct(productData);
      }
    }
  }, [productId]);

  const toggleDrawer = (open) => {
    setDrawer(open);
  };

  const addToCart = () => {
    cartContext?.addToCart(product,selectedColor,selectedSize);
    toggleDrawer(true);
  }

  return (
    <>
      <Head>
        <title>Product | E-commerce</title>
        <meta name="description" content="E-commerce design" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white">
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
              <li className="text-sm">
                <a
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product?.title || ""}
                </a>
              </li>
            </ol>
          </nav>
          {
            !product && (
              <div className="flex justify-center">
                <CircularProgress size={48} className="text-gray-700" />
              </div>
            )
          }
          {product && (
            <>
              {/* Image gallery */}
              <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8 animate__animated animate__zoomIn animate__slow">
                <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                    alt={product?.title}
                    className="w-full h-[516px] object-center object-cover"
                  />
                </div>
                <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                  <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg"
                      alt={product?.title}
                      className="w-full h-[242px] object-center object-cover"
                    />
                  </div>
                  <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                    <img
                      src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg"
                      alt={product?.title}
                      className="w-full h-[242px] object-center object-cover"
                    />
                  </div>
                </div>
                <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                  <img
                    src={product?.image}
                    alt={product?.title}
                    className="w-full h-[516px] object-center object-cover"
                  />
                </div>
              </div>

              {/* Product info */}
              <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 animate__animated animate__fadeInLeft animate__slow">
                  <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    {product?.title}
                  </h1>
                </div>

                {/* Options */}
                <div className="mt-4 lg:mt-0 lg:row-span-3 animate__animated animate__fadeInRight animate__slow">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl text-gray-900">${product?.price}</p>

                  {/* Reviews */}
                  <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              product?.rating?.rate > rating
                                ? "text-yellow-500"
                                : "text-gray-200",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">
                        {product?.rating?.rate} out of 5 stars
                      </p>
                      <span className="ml-3 text-sm font-medium text-gray-600 hover:text-gray-500">
                        {product?.rating?.count} reviews
                      </span>
                    </div>
                  </div>

                  <div className="mt-10">
                    {/* Colors */}
                    {selectedColor && (
                      <div>
                        <h3 className="text-sm text-gray-900 font-medium">
                          Color
                        </h3>

                        <RadioGroup
                          value={selectedColor}
                          onChange={setSelectedColor}
                          className="mt-4"
                        >
                          <RadioGroup.Label className="sr-only">
                            Choose a color
                          </RadioGroup.Label>
                          <div className="flex items-center space-x-3">
                            {color?.map((color) => (
                              <RadioGroup.Option
                                key={color?.name}
                                value={color}
                                className={({ active, checked }) =>
                                  classNames(
                                    `${color?.class}`,
                                    active && checked
                                      ? "ring ring-offset-1 ring-gray-500"
                                      : "",
                                    !active && checked
                                      ? "ring-2 ring-offset-2 ring-gray-800"
                                      : "",
                                    "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                                  )
                                }
                              >
                                <RadioGroup.Label as="p" className="sr-only">
                                  {color?.name}
                                </RadioGroup.Label>
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                    `${color?.class}`,
                                    "h-8 w-8 border border-gray-500 border-opacity-50 rounded-full"
                                  )}
                                />
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    )}
                    {selectedSize && (
                      <div className="mt-10">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm text-gray-900 font-medium">
                            Size
                          </h3>
                          {/* <a
                      href="#"
                      className="text-sm font-medium text-gray-600 hover:text-gray-500"
                    >
                      Size guide
                    </a> */}
                        </div>

                        <RadioGroup
                          value={selectedSize}
                          onChange={setSelectedSize}
                          className="mt-4"
                        >
                          <RadioGroup.Label className="sr-only">
                            Choose a size
                          </RadioGroup.Label>
                          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                            {size.map((size) => (
                              <RadioGroup.Option
                                key={size?.name}
                                value={size}
                                disabled={!size?.inStock}
                                className={({ active }) =>
                                  classNames(
                                    size?.inStock
                                      ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                                      : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                    active ? "ring-2 ring-gray-500" : "",
                                    "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                  )
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <RadioGroup.Label as="p">
                                      {size?.name}
                                    </RadioGroup.Label>
                                    {size?.inStock ? (
                                      <div
                                        className={classNames(
                                          active ? "border" : "border-2",
                                          checked
                                            ? "border-gray-500"
                                            : "border-transparent",
                                          "absolute -inset-px rounded-md pointer-events-none"
                                        )}
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <div
                                        aria-hidden="true"
                                        className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                                      >
                                        <svg
                                          className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                          viewBox="0 0 100 100"
                                          preserveAspectRatio="none"
                                          stroke="currentColor"
                                        >
                                          <line
                                            x1={0}
                                            y1={100}
                                            x2={100}
                                            y2={0}
                                            vectorEffect="non-scaling-stroke"
                                          />
                                        </svg>
                                      </div>
                                    )}
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    <button className="btn btn-primary py-2 mt-8" onClick={addToCart}>
                      <ShoppingBag />
                      &nbsp; Add to Cart
                    </button>
                  </div>
                </div>

                <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 animate__animated animate__fadeInLeft animate__slow">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <div className="space-y-6">
                      <p className="text-base text-gray-900">
                        {product?.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10">
                    {
                      product?.highlights && (
                        <>
                          <h3 className="text-sm font-medium text-gray-900">
                            Highlights
                          </h3>
                          <div className="mt-4">
                            <ul
                              role="list"
                              className="pl-4 list-disc text-sm space-y-2"
                            >
                              {product?.highlights.map((highlight) => (
                                <li key={highlight} className="text-gray-400">
                                  <span className="text-gray-600">{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )
                    }
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Cart drawer={drawer} toggleDrawer={() => toggleDrawer(false)} />
    </>
  );
}

export default Details;
