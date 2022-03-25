import { Delete } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useCart } from "@services/CartContext";
import CartItem from "@components/Cart/CartItem";
import { snackActions } from "@components/Notification";
import { useRouter } from "next/router";

const breadcrumbs = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Products", href: "/products" },
  { id: 3, name: "Checkout", href: "" },
];

const Checkout = () => {
  const cartContext = useCart();
  const router = useRouter();

  const CheckoutProducts = (e) => {
    e.preventDefault();
    if(cartContext?.products.length === 0)
    {
      snackActions.error("No product available in cart.");
      return;
    }
    else
    {
      snackActions.success("Product purchase successfully!");
      cartContext?.clearCart();
      router.push('/thank-you');
    }
  };

  return (
    <>
      <Head>
        <title>Checkout | E-commerce</title>
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
      <main className="mt-2 mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-full md:col-span-1 flex-1 overflow-y-auto py-6 px-4 sm:px-6 animate__animated animate__fadeInLeft animate__slow">
            <div className="flex items-start justify-between">
              <h2
                className="text-lg font-medium text-gray-900"
                id="slide-over-title"
              >
                Order Summary
              </h2>
            </div>
            <div className="mt-8 card rounded-lg bg-white border-2 border-gray-300">
              <div className="mt-2 p-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cartContext?.products.length > 0 &&
                      cartContext?.products.map((product) => (
                        <CartItem product={product} key={product.id} />
                      ))}

                      {
                        cartContext?.products.length === 0 && (
                          <li className="flex py-6 justify-center text-center animate__animated animate__zoomIn">
                            <span className="text-xl text-gray-700">No product available in cart.</span>
                          </li>
                        )
                      }
                  </ul>
                </div>
              </div>
              <hr />
              <div className="mt-2 p-6">
                <div className="card rounded-xl bg-gray-100 border border-gray-200 p-6">
                  <div className="flex justify-between py-2">
                    <span className="text-lg font-semibold text-gray-600">
                      Subtotal
                    </span>
                    <span className="text-lg font-bold text-gray-700">
                      ${cartContext?.subTotal}
                    </span>
                  </div>
                  <hr className="border-gray-300 mt-2" />
                  <div className="flex justify-between py-2">
                    <span className="text-lg font-semibold text-gray-600">
                      Shipping
                    </span>
                    <span className="text-lg font-bold text-gray-700">
                      ${cartContext?.totalShipping}
                    </span>
                  </div>
                  <hr className="border-gray-300 mt-2" />
                  <div className="flex justify-between py-2">
                    <span className="text-lg font-semibold text-gray-600">
                      Tax
                    </span>
                    <span className="text-lg font-bold text-gray-700">
                      ${cartContext?.totalTax}
                    </span>
                  </div>
                  <hr className="border-gray-300 mt-4" />
                  <div className="flex justify-between py-2">
                    <span className="text-lg font-semibold text-gray-700">
                      Order Total
                    </span>
                    <span className="text-lg font-bold text-gray-700">
                      ${cartContext?.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full md:col-span-1 flex-1 overflow-y-auto py-6 px-4 sm:px-6 animate__animated animate__fadeInRight animate__slow">
            <div className="flex items-start justify-between">
              <h2
                className="text-lg font-medium text-gray-900"
                id="slide-over-title"
              >
                Checkout Details
              </h2>
            </div>
            <div className="mt-2 p-6">
              <form onSubmit={CheckoutProducts}>
                <div className="my-3">
                  <span className="text-md font-semibold text-gray-600">
                    Contact Information
                  </span>
                  <div className="mt-2">
                    <input
                      required
                      className="custom-input"
                      placeholder="E-mail"
                      type="email"
                    />
                  </div>
                </div>
                <div className="my-3">
                  <span className="text-md font-semibold text-gray-600">
                    Shipping Details
                  </span>
                  <div className="mt-4">
                    <input
                      required
                      className="custom-input"
                      placeholder="Name"
                      type="text"
                    />
                  </div>
                  <div className="mt-4">
                    <input
                      required
                      className="custom-input"
                      placeholder="Address"
                      type="text"
                    />
                  </div>
                  <div className="mt-4">
                    <input
                      required
                      className="custom-input"
                      placeholder="City"
                      type="text"
                    />
                  </div>
                  <div className="mt-4">
                    <input
                      required
                      className="custom-input"
                      placeholder="Phone"
                      type="number"
                      min={1}
                    />
                  </div>
                </div>
                <div className="my-3">
                  <span className="text-md font-semibold text-gray-600">
                    Payment
                  </span>
                  <div className="mt-4">
                    <input
                      required
                      className="custom-input"
                      placeholder="Card Number"
                      type="number"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="mt-4 col-span-2">
                      <input
                        required
                        className="custom-input"
                        placeholder="Expirtion date (MM/YY)"
                        type="text"
                      />
                    </div>
                    <div className="mt-4 col-span-1">
                      <input
                        required
                        className="custom-input"
                        placeholder="CVV"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <input
                      required
                      className="custom-input"
                      placeholder="Card Holder Name"
                      type="text"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button type="submit" className="btn btn-primary py-2">
                    Confirm Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Checkout;
