import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BsCaretDown, BsCaretUp, BsStar, BsStarFill } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { GoReport } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import Rating from "react-rating";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [rating, setRating] = useState(0);
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/products/${id}`);
      return data;
    },
  });

  const {
    data: reviews,
    isLoading: isLoadingReviews,
    refetch,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews/${id}`);
      return data;
    },
  });

  if (isLoading || isLoadingReviews) {
    return <Loading />;
  }

  const handleAddReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    const reviewerEmail = user?.email;
    const reviewerName = user?.displayName;
    const reviewerImage = user?.photoURL;
    const rating = form.rating.value;
    const review = form.review.value;

    const newReview = {
      productId: id,
      reviewerEmail,
      reviewerName,
      reviewerImage,
      rating,
      review,
      reviewDate: new Date().toISOString(),
    };
    console.log(newReview);

    const { data } = await axiosSecure.post("/reviews", newReview);
    if (data?.insertedId) {
      toast.success("Review added successfully");
      form.reset();
      refetch();
    }
    document.getElementById("add-review-modal").classList.add("hidden");
  };

  return (
    <>
      <section className="mx-auto my-8 w-11/12 max-w-screen-xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div className="flex flex-wrap gap-4">
            <div className="min-w-16">
              <img className="w-16" src={product?.productImage} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{product?.productName}</h2>
              <div className="flex flex-wrap gap-1.5 text-[12px]">
                {product?.productTags.map((tag, index) => (
                  <div
                    key={index}
                    className="inline-block rounded-full bg-gray-100 px-2"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-x-4">
            <a
              href={product?.externalLink}
              target="_blank"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-black focus:scale-95"
            >
              Go
              <FiArrowUpRight className="text-lg" />
            </a>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-800 px-4 py-2 text-sm font-semibold focus:scale-95">
              Report
              <GoReport className="text-lg" />
            </button>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-justify">{product?.productDescription}</p>
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full max-w-sm justify-between gap-4">
            <button className="flex w-full items-center justify-center rounded-lg border hover:bg-gray-50">
              <div className="flex items-center justify-center border-r p-2">
                <BsCaretUp className="text-xl" />
              </div>
              <div className="w-full px-2 font-semibold">
                {product?.upvotes}
              </div>
            </button>
            <button className="flex w-full items-center justify-center rounded-lg border hover:bg-gray-50">
              <div className="flex items-center justify-center border-r p-2">
                <BsCaretDown className="text-xl" />
              </div>
              <div className="w-full px-2 font-semibold">
                {product?.downvotes}
              </div>
            </button>
          </div>
          <div>
            <button
              onClick={() =>
                document
                  .getElementById("add-review-modal")
                  .classList.remove("hidden")
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-black focus:scale-95"
            >
              Add review <FaPen />
            </button>
          </div>
        </div>
        <div>
          <h3 className="mt-4 text-lg font-semibold">Reviews</h3>
          <hr />
          <div className="mt-2 divide-y">
            {reviews.length === 0 && (
              <h2 className="mt-4 text-center font-semibold text-gray-600">
                No reviews yet
              </h2>
            )}
            {reviews.map((review) => (
              <div key={review._id} className="space-y-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="mt-2 flex items-center gap-2">
                    <img
                      src={review?.reviewerImage}
                      className="h-8 w-8 rounded-full"
                      alt=""
                    />
                    <div>
                      <p className="font-semibold">{review?.reviewerName}</p>
                    </div>
                  </div>
                  <Rating
                    key={review._id}
                    initialRating={review?.rating}
                    readonly
                    emptySymbol={
                      <BsStar className="mr-2 text-sm text-yellow-500" />
                    }
                    fullSymbol={
                      <BsStarFill className="mr-2 text-sm text-yellow-500" />
                    }
                  />
                </div>
                <p className="pb-2 text-justify text-sm">{review?.review}</p>
              </div>
            ))}
          </div>
        </div>

        <section
          id="add-review-modal"
          className="fixed inset-0 z-50 hidden h-screen w-full bg-black/50 transition-all duration-300"
        >
          <div className="flex h-full items-center justify-center">
            <div className="relative m-4 w-full max-w-md rounded-lg bg-white p-4">
              <button
                onClick={() =>
                  document
                    .getElementById("add-review-modal")
                    .classList.add("hidden")
                }
                className="absolute right-4 top-4 rounded-full bg-gray-800 p-1.5 font-semibold text-white hover:bg-black focus:scale-95"
              >
                <IoClose />
              </button>
              <form onSubmit={handleAddReview} className="mt-4 space-y-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Reviewer Name
                  </label>
                  <input
                    type="text"
                    name="reviewerName"
                    id="reviewerName"
                    className="block w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                    defaultValue={user?.displayName}
                    required
                    readOnly
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Reviewer Image
                  </label>
                  <input
                    type="url"
                    name="reviewerImage"
                    id="reviewerImage"
                    className="block w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                    defaultValue={user?.photoURL}
                    required
                    readOnly
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Rating
                  </label>
                  <Rating
                    initialRating={rating}
                    onChange={(rate) => setRating(rate)}
                    emptySymbol={<BsStar className="mr-3 text-yellow-500" />}
                    fullSymbol={<BsStarFill className="mr-3 text-yellow-500" />}
                  />
                  <input
                    type="number"
                    name="rating"
                    id="rating"
                    className="hidden w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                    value={rating}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Review
                  </label>
                  <textarea
                    name="review"
                    id="review"
                    placeholder="Write your review here..."
                    className="block w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-black focus:scale-95"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
