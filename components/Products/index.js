import { ShoppingBag } from "@mui/icons-material";
import Link from "next/link";
import StarIcon from "@mui/icons-material/Star";
import { useCart } from "@services/CartContext";
import { useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Products = ({ product, toggleDrawer }) => {

  const cartContext = useCart();

  const addToCart = () => {
    cartContext?.addToCart(product);
    toggleDrawer();
  }

  useEffect(() => {
    if(product.category==="women's clothing" || product.category==="men's clothing")
    {
      product.color = [
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
      product.size = [
        {"name":"XS","inStock": false},
        {"name":"S","inStock": true},
        {"name":"M","inStock": true},
        {"name":"L","inStock": true},
        {"name":"XL","inStock": true},
        {"name":"2XL","inStock": true},
        {"name":"3XL","inStock": true}
      ]
    }
    else
    {
      product.color = false;
      product.size = false;
    }
  },[product]);
  
  return (
    <div className="card shadow-sm hover:shadow-xl transition-shadow rounded-lg bg-white p-4">
      <Link href={`/products/${product.id}`}>
        <a className="cursor-pointer">
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[250px] object-center object-cover"
            />
          </div>
          <div className="flex justify-between text-center px-3 mt-4">
            <h3 className="text-lg font-semibold text-gray-700 truncate">
              {product.title}
            </h3>
            <p className="text-lg font-medium text-gray-900">${product.price}</p>
          </div>
          <div className="px-3 mt-2 mb-2">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      product.rating.rate > rating
                        ? "text-yellow-500"
                        : "text-gray-200",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{product.rating.rate} out of 5 stars</p>
              <span className="ml-3 text-sm font-medium text-gray-600 hover:text-gray-500">
                {product.rating.count} reviews
              </span>
            </div>
          </div>
        </a>
      </Link>
      <div className="px-3 mt-2">
        <button
          className="btn-raised btn-raised-primary py-1"
          onClick={addToCart}
        >
          <ShoppingBag />
          &nbsp; Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Products;
