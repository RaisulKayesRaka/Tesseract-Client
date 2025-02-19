import { FaUsers } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { IoCaretUpCircle } from "react-icons/io5";

export default function Stats() {
  return (
    <section className="mx-auto my-12 w-11/12 max-w-screen-xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-center rounded-xl border p-6 dark:border-gray-700">
          <FaUsers className="text-4xl" />
          <h3 className="mt-3 text-xl font-semibold">2K+</h3>
          <p>Registered Users</p>
        </div>
        <div className="flex flex-col items-center rounded-xl border p-6 dark:border-gray-700">
          <AiFillProduct className="text-4xl" />
          <h3 className="mt-3 text-xl font-semibold">1K+</h3>
          <p>Products Listed</p>
        </div>
        <div className="flex flex-col items-center rounded-xl border p-6 dark:border-gray-700">
          <IoCaretUpCircle className="text-4xl" />
          <h3 className="mt-3 text-xl font-semibold">5K+</h3>
          <p>Total Upvotes</p>
        </div>
      </div>
    </section>
  );
}
