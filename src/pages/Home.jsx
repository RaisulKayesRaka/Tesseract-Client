import Banner from "../components/Banner";
import Coupons from "../components/Coupons";
import FeaturedProducts from "../components/FeaturedProducts";
import TrendingProducts from "../components/TrendingProducts";
import RecentProducts from "../components/RecentProducts";

export default function Home() {
  return (
    <>
      <Banner />
      <FeaturedProducts />
      <TrendingProducts />
      <RecentProducts />
      <Coupons />
    </>
  );
}
