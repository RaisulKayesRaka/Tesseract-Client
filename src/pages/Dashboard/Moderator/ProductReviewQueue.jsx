import { MdCancel, MdFeaturedVideo } from "react-icons/md";
import { FaRectangleList } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

export default function ProductReviewQueue() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { data: products = [], refetch } = useQuery({
    queryKey: ["queued-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/queued-products");
      return res?.data;
    },
  });

  const handleMakeFeatured = (id) => {
    const makeFeatured = async () => {
      const res = await axiosSecure.patch(`/products/make-featured/${id}`);
      if (res?.data?.modifiedCount > 0) {
        toast.success("Product made featured successfully");
        refetch();
      }
    };

    toast((t) => (
      <div className="flex flex-col items-center justify-center gap-4">
        <div>Are you sure you want to make this product featured?</div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              makeFeatured();
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

  const handleMakeAccepted = (id) => {
    const makeAccepted = async () => {
      const res = await axiosSecure.patch(`/products/make-accepted/${id}`);
      if (res?.data?.modifiedCount > 0) {
        toast.success("Product accepted successfully");
        refetch();
      }
    };

    toast((t) => (
      <div className="flex flex-col items-center justify-center gap-4">
        <div>Are you sure you want to accept this product?</div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              makeAccepted();
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

  const handleMakeRejected = (id) => {
    const makeRejected = async () => {
      const res = await axiosSecure.patch(`/products/make-rejected/${id}`);
      if (res?.data?.modifiedCount > 0) {
        toast.success("Product rejected successfully");
        refetch();
      }
    };

    toast((t) => (
      <div className="flex flex-col items-center justify-center gap-4">
        <div>Are you sure you want to reject this product?</div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              makeRejected();
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
        <title>Product Review Queue | Tesseract</title>
      </Helmet>
      <section>
        <div>
          <h1 className="text-xl font-semibold">Product Review Queue</h1>
        </div>

        {products.length === 0 ? (
          <h2 className="mt-6 text-center text-gray-600">
            No products to review.{" "}
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
                          onClick={() => handleMakeFeatured(product?._id)}
                          className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-1.5 font-medium text-white hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-300"
                          disabled={product?.type === "Featured"}
                        >
                          Make Featured <MdFeaturedVideo />
                        </button>
                        <button
                          onClick={() => handleMakeAccepted(product?._id)}
                          className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-1.5 font-medium text-white hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-300"
                          disabled={product?.status === "Accepted"}
                        >
                          Accept <IoMdCheckmarkCircle />
                        </button>
                        <button
                          onClick={() => handleMakeRejected(product?._id)}
                          className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-1.5 font-medium text-white hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-300"
                          disabled={product?.status === "Rejected"}
                        >
                          Reject <MdCancel />
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
