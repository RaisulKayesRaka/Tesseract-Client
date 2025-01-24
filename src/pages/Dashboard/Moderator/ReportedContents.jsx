import { MdDelete } from "react-icons/md";
import { FaRectangleList } from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

export default function ReportedContents() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: products = [], refetch } = useQuery({
    queryKey: ["reported-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reported-products");
      return res?.data;
    },
  });

  const handleDelete = (id) => {
    const deleteProduct = async () => {
      const res = await axiosSecure.delete(`/products/${id}`);
      if (res?.data?.deletedCount > 0) {
        toast.success("Product deleted successfully");
        refetch();
      }
    };

    toast((t) => (
      <div className="flex flex-col items-center justify-center gap-4">
        <div>Are you sure you want to delete this product?</div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              deleteProduct();
              toast.dismiss(t.id);
            }}
            className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-semibold"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-semibold"
          >
            No
          </button>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Helmet>
        <title>Reported Products | Tesseract</title>
      </Helmet>
      <section>
        <div>
          <h1 className="text-xl font-semibold">Reported Products</h1>
        </div>

        {products.length === 0 ? (
          <h2 className="mt-6 text-center text-gray-600">
            No reported products.
          </h2>
        ) : (
          <div className="mt-6 rounded-lg border border-gray-800">
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-left text-sm">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="whitespace-nowrap p-4 font-semibold">
                      Product Name
                    </th>
                    <th className="p-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product?._id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="border-t px-4 py-3">
                        {product?.productName}
                      </td>

                      <td className="space-x-4 whitespace-nowrap border-t px-4 py-3">
                        <button
                          onClick={() => navigate(`/products/${product?._id}`)}
                          className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-1.5 font-medium text-white hover:bg-black"
                        >
                          View Details <FaRectangleList />
                        </button>
                        <button
                          onClick={() => handleDelete(product?._id)}
                          className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-1.5 font-medium text-white hover:bg-black"
                        >
                          Delete <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
