import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// import "./styles.css";
import { Autoplay, Mousewheel } from "swiper/modules";

export default function FeaturedProducts() {
  return (
    <section className="mx-auto my-12 w-11/12 max-w-screen-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Featured Products</h2>
      </div>
      {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(4)].map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div> */}

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        mousewheel={true}
        loop={true}
        autoplay={{
          delay: 2000,
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
        {[...Array(6)].map((_, index) => (
          <SwiperSlide key={index}>
            <ProductCard />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
