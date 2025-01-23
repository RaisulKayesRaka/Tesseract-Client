import {
  BsCaretDown,
  BsCaretDownFill,
  BsCaretUp,
  BsCaretUpFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

export default function ProductCard({ product, refetch }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isUpvoted, refetch: refetchIsUpvoted } = useQuery({
    queryKey: ["isUpvoted", product?._id, user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/products/is-upvoted/${product?._id}?email=${user?.email}`,
      );
      return data;
    },
  });

  const { data: isDownvoted, refetch: refetchIsDownvoted } = useQuery({
    queryKey: ["isDownvoted", product?._id, user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/products/is-downvoted/${product?._id}?email=${user?.email}`,
      );
      return data;
    },
  });

  const handleUpvote = async () => {
    isDownvoted && handleDownvote();
    const res = await axiosSecure.put(
      `/products/upvote/${product?._id}?email=${user?.email}`,
    );
    if (res.data.modifiedCount > 0) {
      refetchIsUpvoted();
      refetch();
    }
  };

  const handleDownvote = async () => {
    isUpvoted && handleUpvote();
    const res = await axiosSecure.put(
      `/products/downvote/${product?._id}?email=${user?.email}`,
    );
    if (res.data.modifiedCount > 0) {
      refetchIsDownvoted();
      refetch();
    }
  };

  return (
    <>
      <div className="group flex flex-col space-y-4 rounded-lg border bg-white p-4">
        <div className="flex flex-1 gap-4">
          <div className="min-w-16">
            <img className="w-16 rounded-lg" src={product?.productImage} />
          </div>
          <div>
            <Link
              to={`/products/${product?._id}`}
              className="underline-offset-2 group-hover:underline"
            >
              <h3 className="mb-1 font-semibold">{product?.productName}</h3>
            </Link>
            <div className="flex flex-wrap gap-1.5 text-[12px]">
              {product?.productTags.map((tag, index) => (
                <div
                  key={index}
                  className="inline-block rounded-full bg-gray-100 px-2"
                >
                  {tag?.id}
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <div className="flex w-full justify-between gap-4">
          <button
            disabled={user?.email === product?.ownerEmail}
            onClick={handleUpvote}
            className={`${isUpvoted ? "bg-gray-100" : ""} flex w-full items-center justify-center rounded-lg border hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400`}
          >
            <div className="flex items-center justify-center border-r p-2">
              {isUpvoted ? (
                <BsCaretUpFill className="text-xl" />
              ) : (
                <BsCaretUp className="text-xl" />
              )}
            </div>
            <div className="w-full px-2 font-semibold">{product?.upvotes}</div>
          </button>
          <button
            disabled={user?.email === product?.ownerEmail}
            onClick={handleDownvote}
            className={`${isDownvoted ? "bg-gray-100" : ""} flex w-full items-center justify-center rounded-lg border hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400`}
          >
            <div className="flex items-center justify-center border-r p-2">
              {isDownvoted ? (
                <BsCaretDownFill className="text-xl" />
              ) : (
                <BsCaretDown className="text-xl" />
              )}
            </div>
            <div className="w-full px-2 font-semibold">
              {product?.downvotes}
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};
