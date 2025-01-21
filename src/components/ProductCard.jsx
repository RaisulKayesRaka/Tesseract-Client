import { BsCaretDown, BsCaretUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProductCard({ product }) {
  return (
    <>
      <div className="group flex flex-col space-y-4 rounded-lg border bg-white p-4">
        <div className="flex flex-1 gap-4">
          <div className="min-w-16">
            <img className="w-16 rounded-lg" src={product?.productImage} />
          </div>
          <div>
            <Link
              to={`/products/${product?._id}`}
              className="underline-offset-2 group-hover:underline"
            >
              <h3 className="mb-1 font-semibold">{product?.productName}</h3>
            </Link>
            <div className="flex flex-wrap gap-1.5 text-[12px]">
              {product?.productTags.map((tag, index) => (
                <div
                  key={index}
                  className="inline-block rounded-full bg-gray-100 px-2"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr />
        <div className="flex w-full justify-between gap-4">
          <button className="flex w-full items-center justify-center rounded-lg border hover:bg-gray-50">
            <div className="flex items-center justify-center border-r p-2">
              <BsCaretUp className="text-xl" />
            </div>
            <div className="w-full px-2 font-semibold">{product?.upvotes}</div>
          </button>
          <button className="flex w-full items-center justify-center rounded-lg border hover:bg-gray-50">
            <div className="flex items-center justify-center border-r p-2">
              <BsCaretDown className="text-xl" />
            </div>
            <div className="w-full px-2 font-semibold">
              {product?.downvotes}
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
