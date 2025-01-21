import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

export default function Products() {
  const axiosPublic = useAxiosPublic();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/products");
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <section className="mx-auto my-8 w-11/12 max-w-screen-xl">
        <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h2 className="text-2xl font-semibold">Products</h2>
          <input
            onChange={(e) => {
              console.log(e.target.value);
            }}
            type="text"
            name="search"
            placeholder="Search by tag..."
            className="w-full max-w-sm rounded-lg border-2 border-gray-600 px-4 py-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <section className="my-4 flex items-center justify-between border-gray-200 bg-white">
          <div className="flex flex-1 items-center justify-between">
            <div className="hidden sm:block">
              <p className="text-sm">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">10</span> of{" "}
                <span className="font-medium">97</span> results
              </p>
            </div>
            <div className="flex flex-1 justify-center gap-1 sm:justify-end">
              <nav
                aria-label="Pagination"
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <FaAngleLeft />
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="relative z-10 inline-flex items-center bg-black px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  1
                </a>

                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                  ...
                </span>

                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  10
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <FaAngleRight />
                </a>
              </nav>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
