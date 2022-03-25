import { ArrowForward } from "@mui/icons-material";
import Link from "next/link";
import React from "react";

const ThankYou = () => {
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 p-14">
        <div className="flex flex-col justify-center text-center gap-4">
          <h1 className="text-9xl text-gray-800 font-semibold">Thank You</h1>
          <span className="text-gray-600">Your Order has been confirmed, thank you for the shopping. </span>
          <span className="flex justify-center mt-10">
            <Link href={'/'}>
              <a>
                <button className="mt-10 btn btn-primary w-64 py-2">Continue Shopping&nbsp; <ArrowForward /> </button>
              </a>
            </Link>
          </span>
        </div>
      </main>
    </>
  );
};

export default ThankYou;
