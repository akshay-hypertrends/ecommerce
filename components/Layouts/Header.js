import { ShoppingBag } from "@mui/icons-material";
import { Badge, Box, Drawer, IconButton } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cart from "@components/Cart";
import { useRouter } from "next/router";
import { useCart } from "@services/CartContext";

function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const cartContext = useCart();
  const router = useRouter();
  const mobileMenuOpen = () => {
    setMobileMenu(!mobileMenu);
  };

  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (open) => {
    setDrawer(open);
  };

  return (
    <>
      <div className="min-h-full">
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href={"/"}>
                    <a>
                      <span className="text-white text-2xl font-bold hidden sm:block">
                        E-Commerce
                      </span>
                      <span className="text-white text-2xl font-bold sm:hidden">
                        E-comm
                      </span>
                    </a>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link href="/">
                      <a
                        className={`${
                          router.pathname == "/"
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        } px-3 py-2 rounded-md text-sm font-medium`}
                      >
                        Home
                      </a>
                    </Link>

                    <Link href="/products">
                      <a
                        className={`${
                          router.pathname == "/products"
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        } px-3 py-2 rounded-md text-sm font-medium`}
                      >
                        Products
                      </a>
                    </Link>

                    <Link href="/orders">
                      <a
                        className={`${
                          router.pathname == "/orders"
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        } px-3 py-2 rounded-md text-sm font-medium`}
                      >
                        Orders
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <IconButton
                    onClick={() => toggleDrawer(true)}
                    color="default"
                    className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mr-3"
                    size="small"
                  >
                    <Badge
                      color="error"
                      badgeContent={cartContext?.products.length}
                      showZero
                    >
                      <ShoppingBag className="text-gray-300 hover:text-gray-200" />
                    </Badge>
                  </IconButton>

                  <div className="ml-3 relative">
                    <div>
                      <button
                        type="button"
                        className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  type="button"
                  className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  onClick={mobileMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>

                  <svg
                    className="block h-6 w-6"
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>

                  <svg
                    className="hidden h-6 w-6"
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
          </div>

          <div
            className={mobileMenu == true ? "md:hidden" : "hidden"}
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/">
                <a
                  className={`${
                    router.pathname == "/"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } block px-3 py-2 rounded-md text-base font-medium`}
                >
                  Home
                </a>
              </Link>

              <Link href="/products">
                <a
                  className={`${
                    router.pathname == "/products"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } block px-3 py-2 rounded-md text-base font-medium`}
                >
                  Products
                </a>
              </Link>

              <Link href="/orders">
                <a
                  className={`${
                    router.pathname == "/orders"
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } block px-3 py-2 rounded-md text-base font-medium`}
                >
                  Orders
                </a>
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    Tom Cook
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    tom@example.com
                  </div>
                </div>
                <IconButton
                  onClick={() => toggleDrawer(true)}
                  color="default"
                  className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  size="small"
                >
                  <Badge
                    color="error"
                    badgeContent={cartContext?.products.length}
                    showZero
                  >
                    <ShoppingBag className="text-gray-300 hover:text-gray-200" />
                  </Badge>
                </IconButton>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <Cart drawer={drawer} toggleDrawer={() => toggleDrawer(false)} />
    </>
  );
}

export default Header;
