import ProductCard from "./ProductCard";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

export default function TrendingProducts() {
  const axiosPublic = useAxiosPublic();

  const {
    data: trendingProducts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["trendingProducts"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/trending-products");
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="mx-auto my-12 w-11/12 max-w-screen-xl">
      <h2 className="mb-6 text-center text-2xl font-semibold">
        Trending Products
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trendingProducts.map((product) => (
          <ProductCard key={product._id} product={product} refetch={refetch} />
        ))}
      </div>
    </section>
  );
}
