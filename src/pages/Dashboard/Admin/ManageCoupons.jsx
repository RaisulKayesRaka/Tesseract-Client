import { IoClose } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export default function ManageCoupons() {
  const axiosSecure = useAxiosSecure();

  const { data: coupons = [], refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/coupons`);
      return data;
    },
  });

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    const form = e.target;
    const couponCode = form.couponCode.value;
    const discountAmount = form.discountAmount.value;
    const expiryDate = form.expiryDate.value;
    const description = form.description.value;

    const newCoupon = {
      couponCode,
      discountAmount: parseInt(discountAmount),
      expiryDate: new Date(expiryDate).toISOString(),
      description,
    };

    console.log(newCoupon);

    const { data } = await axiosSecure.post("/coupons", newCoupon);
    if (data?.insertedId) {
      toast.success("Coupon added successfully");
      form.reset();
      refetch();
    }
    document.getElementById("add-coupon-modal").classList.add("hidden");
  };

  const handleUpdateCoupon = async (e, id) => {
    e.preventDefault();
    const form = e.target;
    const couponCode = form.couponCode.value;
    const discountAmount = form.discountAmount.value;
    const expiryDate = form.expiryDate.value;
    const description = form.description.value;

    const newCoupon = {
      couponCode,
      discountAmount: parseInt(discountAmount),
      expiryDate: new Date(expiryDate).toISOString(),
      description,
    };

    console.log(newCoupon);

    const { data } = await axiosSecure.put(`/coupons/${id}`, newCoupon);
    if (data?.modifiedCount) {
      toast.success("Coupon updated successfully");
      form.reset();
      refetch();
    }
    document
      .getElementById(`update-coupon-modal-${id}`)
      .classList.add("hidden");
  };

  return (
    <>
      <section>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Coupons</h1>
          <button
            onClick={() =>
              document
                .getElementById("add-coupon-modal")
                .classList.remove("hidden")
            }
            className="rounded-lg bg-gray-800 px-3 py-1.5 text-sm font-semibold text-white"
          >
            Add Coupon
          </button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {/* coupon card  */}
          {coupons.map((coupon) => (
            <>
              <section
                key={coupon._id}
                className="flex flex-col rounded-lg border border-gray-800 p-5"
              >
                <div className="flex-1 space-y-2">
                  <h2 className="text-xl font-bold text-gray-800">
                    {coupon?.couponCode}
                  </h2>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Discount Amount:</span>
                    <span className="font-semibold">
                      {coupon?.discountAmount}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Expiry Date:</span>
                    <span className="font-semibold">
                      {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(coupon?.expiryDate))}
                    </span>
                  </div>
                  <p className="mt-2 text-justify text-sm">
                    {coupon?.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-end gap-4">
                  <button
                    onClick={() =>
                      document
                        .getElementById(`update-coupon-modal-${coupon._id}`)
                        .classList.remove("hidden")
                    }
                    className="inline-block rounded-lg bg-gray-800 p-2 text-white hover:bg-black focus:scale-95"
                  >
                    <MdEdit />
                  </button>
                  <button className="inline-block rounded-lg bg-gray-800 p-2 text-white hover:bg-black focus:scale-95">
                    <MdDelete />
                  </button>
                </div>
              </section>
              <section
                id={`update-coupon-modal-${coupon._id}`}
                className="fixed inset-0 z-50 hidden h-screen w-full bg-black/50 transition-all duration-300"
              >
                <div className="flex h-full items-center justify-center">
                  <div className="relative m-4 w-full max-w-md rounded-lg bg-white p-4">
                    <button
                      onClick={() =>
                        document
                          .getElementById(`update-coupon-modal-${coupon._id}`)
                          .classList.add("hidden")
                      }
                      className="absolute right-4 top-4 rounded-full bg-gray-800 p-1.5 font-semibold text-white hover:bg-black focus:scale-95"
                    >
                      <IoClose />
                    </button>
                    <form
                      onSubmit={(e) => handleUpdateCoupon(e, coupon._id)}
                      className="mt-4 space-y-3"
                    >
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Coupon Code
                        </label>
                        <input
                          type="text"
                          name="couponCode"
                          id="couponCode"
                          defaultValue={coupon?.couponCode}
                          className="block w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                          placeholder="Enter coupon code"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Discount Amount
                        </label>
                        <input
                          type="number"
                          name="discountAmount"
                          id="discountAmount"
                          defaultValue={coupon?.discountAmount}
                          className="block w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                          placeholder="Enter discount amount"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Expiry Date
                        </label>
                        <input
                          type="date"
                          name="expiryDate"
                          id="expiryDate"
                          defaultValue={
                            new Date(coupon?.expiryDate)
                              .toISOString()
                              .split("T")[0]
                          }
                          min={new Date().toISOString().split("T")[0]}
                          className="block w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold">
                          Description
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          defaultValue={coupon?.description}
                          placeholder="Enter coupon description"
                          className="block w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                          required
                        ></textarea>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-black focus:scale-95"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </>
          ))}
        </div>
      </section>
      <section
        id="add-coupon-modal"
        className="fixed inset-0 z-50 hidden h-screen w-full bg-black/50 transition-all duration-300"
      >
        <div className="flex h-full items-center justify-center">
          <div className="relative m-4 w-full max-w-md rounded-lg bg-white p-4">
            <button
              onClick={() =>
                document
                  .getElementById("add-coupon-modal")
                  .classList.add("hidden")
              }
              className="absolute right-4 top-4 rounded-full bg-gray-800 p-1.5 font-semibold text-white hover:bg-black focus:scale-95"
            >
              <IoClose />
            </button>
            <form onSubmit={handleAddCoupon} className="mt-4 space-y-3">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Coupon Code
                </label>
                <input
                  type="text"
                  name="couponCode"
                  id="couponCode"
                  className="block w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                  placeholder="Enter coupon code"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Discount Amount
                </label>
                <input
                  type="number"
                  name="discountAmount"
                  id="discountAmount"
                  className="block w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                  placeholder="Enter discount amount"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  id="expiryDate"
                  min={new Date().toISOString().split("T")[0]}
                  className="block w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Enter coupon description"
                  className="block w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-black focus:scale-95"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
