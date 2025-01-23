import Banner from "../components/Banner";
import Coupons from "../components/Coupons";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingProducts from "../components/TrendingProducts";

export default function Home() {
  return (
    <>
      <Banner />
      <FeaturedProducts />
      <TrendingProducts />
      <Coupons />
    </>
  );
}
