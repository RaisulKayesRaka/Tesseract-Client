import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// import "./styles.css";
import { Autoplay, Mousewheel, Pagination } from "swiper/modules";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function Coupons() {
  const axiosSecure = useAxiosSecure();

  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/coupons`);
      return data;
    },
  });

  return (
    <section className="mx-auto my-12 w-11/12 max-w-screen-sm">
      <Swiper
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        loop={true}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Mousewheel, Pagination]}
        className="mySwiper"
      >
        {coupons.map((coupon) => (
          <SwiperSlide key={coupon._id} className="mb-8">
            <div className="space-y-3 rounded-lg border p-4">
              <h2 className="text-center text-3xl font-bold text-gray-800">
                {coupon?.couponCode}
              </h2>
              <div className="text-center">
                <span className="rounded-full border border-gray-600 bg-gray-50 px-3 py-1 font-semibold">
                  {coupon?.discountAmount}%
                </span>
              </div>
              <div className="text-center">
                <span className="font-semibold">Expiry Date: </span>
                <span className="font-semibold">
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(coupon?.expiryDate))}
                </span>
              </div>
              <p className="text-center text-sm">{coupon?.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
