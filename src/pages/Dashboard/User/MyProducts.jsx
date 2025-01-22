import { MdDelete, MdEdit } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function MyProducts() {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: products = [] } = useQuery({
    queryKey: ["myProducts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?email=${user?.email}`);
      return res?.data;
    },
    enabled: !loading && !!user?.email,
  });

  return (
    <>
      <section>
        <div>
          <h1 className="text-xl font-semibold">My Products</h1>
        </div>

        <div className="mt-6 rounded-lg border border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left text-sm">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="p-4 font-semibold">Product Name</th>
                  <th className="p-4 font-semibold">Votes</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="transition hover:bg-gray-50">
                    <td className="border-t px-4 py-3">
                      {product?.productName}
                    </td>
                    <td className="border-t px-4 py-3">{product?.upvotes}</td>
                    <td className="border-t px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 font-medium ${
                          product?.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : product?.status === "Approved"
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
                          navigate(`/dashboard/update-product/${product?._id}`)
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-1.5 font-medium text-white hover:bg-black"
                      >
                        Update <MdEdit />
                      </button>
                      <button className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-1.5 font-medium text-white hover:bg-black">
                        Delete <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
