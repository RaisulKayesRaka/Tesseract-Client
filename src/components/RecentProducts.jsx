import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { FiArrowUpRight } from "react-icons/fi";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

export default function RecentProducts() {
  const axiosPublic = useAxiosPublic();

  const {
    data: trendingProducts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        "/accepted-products?page=0&size=6&search=&sort=newest",
      );
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="mx-auto my-12 w-11/12 max-w-screen-xl">
      <h2 className="mb-6 text-center text-2xl font-semibold">
        Recent Products
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trendingProducts.map((product) => (
          <ProductCard key={product._id} product={product} refetch={refetch} />
        ))}
      </div>
      <div className="mt-4">
        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 focus:scale-95 dark:bg-white dark:text-black dark:hover:bg-gray-100"
        >
          Show All Products
          <FiArrowUpRight className="text-lg" />
        </Link>
      </div>
    </section>
  );
}
