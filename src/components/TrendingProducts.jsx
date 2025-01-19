import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { FiArrowUpRight } from "react-icons/fi";

export default function TrendingProducts() {
  return (
    <section className="mx-auto my-12 w-11/12 max-w-screen-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Trending Products</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>
      <div className="mt-4">
        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-black focus:scale-95"
        >
          Show All Products
        <FiArrowUpRight className="text-lg"  />
        </Link>
                
      </div>
    </section>
  );
}
