export default function About() {
  return (
    <section className="mx-auto my-8 w-11/12 max-w-screen-xl">
      <h1 className="mb-8 text-center text-3xl font-semibold">About Us</h1>
      <p className="mx-auto mb-12 max-w-3xl text-center">
        Welcome to our platform, where innovation meets opportunity. We are a
        hub for discovering, sharing, and engaging with the latest tech
        products. Whether you&apos;re an entrepreneur, developer, or tech
        enthusiast, this is the place for you.
      </p>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-4 text-center dark:border-gray-700 sm:p-6 md:p-8">
          <h2 className="text-xl font-semibold">Our Mission</h2>
          <p className="mt-4">
            Our mission is to empower creators and innovators by providing a
            platform to showcase their products, gain feedback, and reach a
            global audience.
          </p>
        </div>
        <div className="rounded-lg border p-4 text-center dark:border-gray-700 sm:p-6 md:p-8">
          <h2 className="text-xl font-semibold">What We Offer</h2>
          <p className="mt-4">
            From web apps to AI tools, software, and mobile apps, our platform
            allows users to explore cutting-edge technology and engage with a
            passionate community.
          </p>
        </div>
        <div className="rounded-lg border p-4 text-center dark:border-gray-700 sm:p-6 md:p-8">
          <h2 className="text-xl font-semibold">Join Us</h2>
          <p className="mt-4">
            Be a part of our growing network. Connect with like-minded
            individuals, discover innovative solutions, and shape the future of
            technology with us.
          </p>
        </div>
      </div>
      <div className="mt-16 text-center">
        <h2 className="text-xl font-semibold">Our Values</h2>
        <p className="mx-auto mt-4 max-w-2xl">
          We believe in transparency, innovation, and collaboration. Our
          community thrives on inclusivity and the shared goal of pushing the
          boundaries of technology.
        </p>
      </div>
    </section>
  );
}
