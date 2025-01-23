import { MdDelete, MdEdit } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function MyProducts() {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: products = [], refetch } = useQuery({
    queryKey: ["myProducts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-products?email=${user?.email}`);
      return res?.data;
    },
    enabled: !loading && !!user?.email,
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
        <div>Are you sure you want to delete?</div>
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
      <section>
        <div>
          <h1 className="text-xl font-semibold">My Products</h1>
        </div>

        {products.length === 0 ? (
          <h2 className="mt-6 text-center text-gray-600">No products added yet.</h2>
        ) : (
          <div className="mt-6 rounded-lg border border-gray-800">
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-left text-sm">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="whitespace-nowrap p-4 font-semibold">
                      Product Name
                    </th>
                    <th className="p-4 font-semibold">Votes</th>
                    <th className="p-4 font-semibold">Status</th>
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
                      <td className="border-t px-4 py-3">{product?.upvotes}</td>
                      <td className="border-t px-4 py-3">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 font-medium ${
                            product?.status === "Pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : product?.status === "Accepted"
                                ? "bg-green-100 text-green-600"
                                : "bg-red-100 text-red-600"
                          }`}
                        >
                          {product?.status}
                        </span>
                      </td>
                      <td className="space-x-4 whitespace-nowrap border-t px-4 py-3">
                        <button
                          onClick={() =>
                            navigate(
                              `/dashboard/update-product/${product?._id}`,
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-1.5 font-medium text-white hover:bg-black"
                        >
                          Update <MdEdit />
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
