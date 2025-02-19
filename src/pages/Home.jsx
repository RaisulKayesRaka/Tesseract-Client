import Banner from "../components/Banner";
import Coupons from "../components/Coupons";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingProducts from "../components/TrendingProducts";
import RecentProducts from "../components/RecentProducts";
import Newsletter from "../components/Newsletter";
import Stats from "../components/Stats";

export default function Home() {
  return (
    <>
      <Banner />
      <Stats/>
      <FeaturedProducts />
      <TrendingProducts />
      <RecentProducts />
      <Coupons />
      <Newsletter />
    </>
  );
}
