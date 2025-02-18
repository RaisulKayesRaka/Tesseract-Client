import banner from "../../src/assets/banner.jpg";
export default function Banner() {
  return (
    <>
      <section className="mx-auto w-11/12 max-w-screen-xl py-4">
        <div
          className="flex flex-col items-center justify-center gap-4 rounded-lg bg-cover bg-no-repeat px-8 py-16 text-black md:py-24 lg:py-32"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <h1 className="max-w-prose text-center text-4xl font-semibold">
            Discover and Share the Best Tech Products
          </h1>
          <p className="max-w-prose text-center">
            Find groundbreaking tools, innovative software, and the next big
            thing in tech. Upvote your favorites, share your ideas, and be part
            of the community shaping the future.
          </p>
        </div>
      </section>
    </>
  );
}
