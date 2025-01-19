import { BsCaretDown, BsCaretUp } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function ProductCard() {
  return (
    <>
      <div className="group flex flex-col space-y-4 rounded-lg border p-4 bg-white">
        <div className="flex flex-1 gap-4">
          <div className="min-w-16">
            <img
              className="w-16"
              src="https://ph-files.imgix.net/6db07ae9-601e-4488-893b-13ef5b7b457a.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=56&h=56&fit=crop&frame=1&dpr=1"
            />
          </div>
          <div>
            <Link
              to="/products/123"
              className="underline-offset-2 group-hover:underline"
            >
              <h3 className="mb-1 font-semibold">Quickfill - A Figma Plugin</h3>
            </Link>
            <div className="flex flex-wrap gap-1.5 text-[12px]">
              <div className="inline-block rounded-full bg-gray-100 px-2">
                Design Tools
              </div>
              <div className="inline-block rounded-full bg-gray-100 px-2">
                Productivity
              </div>
              <div className="inline-block rounded-full bg-gray-100 px-2">
                UX Design
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex w-full justify-between gap-4">
          <button className="flex w-full items-center justify-center rounded-lg border hover:bg-gray-50">
            <div className="flex items-center justify-center border-r p-2">
              <BsCaretUp className="text-xl" />
            </div>
            <div className="w-full px-2 font-semibold">256</div>
          </button>
          <button className="flex w-full items-center justify-center rounded-lg border hover:bg-gray-50">
            <div className="flex items-center justify-center border-r p-2">
              <BsCaretDown className="text-xl" />
            </div>
            <div className="w-full px-2 font-semibold">12</div>
          </button>
        </div>
      </div>
    </>
  );
}
