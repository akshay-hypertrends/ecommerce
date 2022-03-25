import React from "react";
import { Drawer, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useCart } from "@services/CartContext";
import CartItem from "./CartItem";

const Index = ({ drawer, toggleDrawer }) => {
  const router = useRouter();
  const cartContext = useCart();

  const Checkout = () => {
    toggleDrawer();
    router.push("/checkout");
  }

  return (
    <Drawer anchor="right" open={drawer} onClose={toggleDrawer}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md">
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2
                    className="text-lg font-medium text-gray-900"
                    id="slide-over-title"
                  >
                    Shopping cart
                  </h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                      onClick={toggleDrawer}
                    >
                      <span className="sr-only">Close panel</span>
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {
                        cartContext?.products.length > 0 && (
                          cartContext?.products.map((product) => (
                          <CartItem product={product} key={product.id} toggleDrawer={toggleDrawer} />
                        )))
                      }
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
              </div>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${cartContext?.subTotal}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <button
                    onClick={Checkout}
                    className="btn btn-primary py-2"
                  >
                    Checkout
                  </button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <button
                      type="button"
                      className="font-medium text-gray-600 hover:text-gray-500"
                      onClick={toggleDrawer}
                    >
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default Index;
