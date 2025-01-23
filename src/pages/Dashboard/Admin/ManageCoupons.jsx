import { IoClose } from "react-icons/io5";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

export default function ManageCoupons() {
  const axiosSecure = useAxiosSecure();

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
    }
    document.getElementById("add-coupon-modal").classList.add("hidden");
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
        <div className="mt-6"></div>
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
