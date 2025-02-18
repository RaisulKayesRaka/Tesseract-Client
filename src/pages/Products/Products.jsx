import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ProductCard from "../../components/ProductCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

export default function Products() {
  const axiosSecure = useAxiosSecure();
  // const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProductsCount = async () => {
      const res = await axiosSecure.get("/products-count");
      setCount(res?.data?.count);
    };
    fetchProductsCount();
  }, [axiosSecure]);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", currentPage, itemsPerPage, search],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/accepted-products?page=${currentPage}&size=${itemsPerPage}&search=${search}`,
      );
      return data;
    },
  });

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(count / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(0);
  };

  return (
    <>
      <Helmet>
        <title>Products | Tesseract</title>
      </Helmet>
      <section className="mx-auto my-8 w-11/12 max-w-screen-xl">
        <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h2 className="text-2xl font-semibold">Products</h2>
          <input
            onChange={handleSearch}
            type="text"
            name="search"
            placeholder="Search by tag..."
            className="w-full max-w-sm rounded-lg border-2 px-4 py-2 text-sm dark:border-gray-700 dark:bg-black"
          />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product?._id}
                product={product}
                refetch={refetch}
              />
            ))}
          </div>
        )}

        <section className="my-4 flex items-center justify-between border-gray-200">
          <div className="flex flex-1 items-center justify-between">
            <div className="hidden sm:block">
              <label htmlFor="perPage" className="sr-only">
                Current Page
              </label>
              <select
                id="currentPage"
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="rounded-md border px-3 py-2 text-sm dark:border-gray-700 dark:bg-black"
              >
                {Array.from(
                  { length: Math.ceil(count / itemsPerPage) },
                  (_, i) => (
                    <option key={i} value={i}>
                      {i + 1}
                    </option>
                  ),
                )}
              </select>
            </div>
            <div className="flex flex-1 justify-center gap-1 sm:justify-end">
              <nav
                aria-label="Pagination"
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              >
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-700 dark:hover:bg-gray-900"
                >
                  <FaAngleLeft />
                  <span className="text-sm font-semibold">Previous</span>
                </button>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === Math.ceil(count / itemsPerPage) - 1}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-200 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-700 dark:hover:bg-gray-900"
                >
                  <span className="text-sm font-semibold">Next</span>
                  <FaAngleRight />
                </button>
              </nav>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
