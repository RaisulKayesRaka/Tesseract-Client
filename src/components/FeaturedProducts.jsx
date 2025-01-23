import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// import "./styles.css";
import { Autoplay, Mousewheel } from "swiper/modules";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";

export default function FeaturedProducts() {
  const axiosPublic = useAxiosPublic();

  const { data: featuredProducts, isLoading, refetch } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/featured-products");
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="mx-auto my-12 w-11/12 max-w-screen-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Featured Products</h2>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        mousewheel={true}
        loop={true}
        autoplay={{
          delay: 1000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
        }}
        modules={[Autoplay, Mousewheel]}
        className="mySwiper"
      >
        {featuredProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} refetch={refetch} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
