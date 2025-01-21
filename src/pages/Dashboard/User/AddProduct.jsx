import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { imageUpload } from "../../../apis/utils";
import Loading from "../../../components/Loading";
export default function AddProduct() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const onTagUpdate = (index, newTag) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1, newTag);
    setTags(updatedTags);
  };

  const handleAddition = (tag) => {
    setTags((prevTags) => {
      return [...prevTags, tag];
    });
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const onClearAll = () => {
    setTags([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const productName = form.productName.value;
    const productImage = form.productImage.files[0];
    const productDescription = form.productDescription.value;
    const externalLink = form.externalLink.value;
    const ownerName = user?.displayName;
    const ownerImage = user?.photoURL;
    const ownerEmail = user?.email;
    const type = "normal";
    const status = "pending";
    const productImageUrl = await imageUpload(productImage);
    const productData = {
      productName,
      productImage: productImageUrl,
      productDescription,
      productTags: tags.map((item) => item.id),
      externalLink,
      ownerName,
      ownerImage,
      ownerEmail,
      type,
      status,
      date: new Date(),
    };

    try {
      await axiosSecure.post("/products", productData);
      toast.success("Product added successfully");
      form.reset();
      setTags([]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section>
          <h1 className="text-xl font-semibold">Add Product</h1>
          <div>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  className="block w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                  placeholder="Product name"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Product Image
                </label>
                <input
                  type="file"
                  name="productImage"
                  id="productImage"
                  className="block w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                  accept="image/*"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Description
                </label>
                <textarea
                  name="productDescription"
                  id="productDescription"
                  placeholder="Product description"
                  className="block w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                  required
                ></textarea>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  External Link
                </label>
                <input
                  type="url"
                  name="externalLink"
                  id="externalLink"
                  className="block w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                  placeholder="Website link or landing page link of the product"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Owner Name
                </label>
                <input
                  type="text"
                  name="ownerName"
                  id="ownerName"
                  className="block w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                  defaultValue={user?.displayName}
                  required
                  readOnly
                  disabled
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Owner Image
                </label>
                <input
                  type="url"
                  name="ownerImage"
                  id="ownerImage"
                  className="block w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                  defaultValue={user?.photoURL}
                  required
                  readOnly
                  disabled
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Owner Email
                </label>
                <input
                  type="email"
                  name="ownerEmail"
                  id="ownerEmail"
                  className="block w-full rounded-lg border border-gray-300 px-2.5 py-2 text-sm"
                  defaultValue={user?.email}
                  required
                  readOnly
                  disabled
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Tags</label>
                <ReactTags
                  tags={tags}
                  inputFieldPosition="top"
                  // suggestions={suggestions}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  handleDrag={handleDrag}
                  handleTagClick={handleTagClick}
                  onTagUpdate={onTagUpdate}
                  editable
                  clearAll
                  onClearAll={onClearAll}
                  maxTags={7}
                  allowAdditionFromPaste
                  classNames={{
                    tagInput: "flex item-center justify-center gap-4",
                    tagInputField:
                      "w-full flex-1 rounded-lg border border-gray-300 px-2.5 py-2 placeholder:text-sm text-sm",
                    clearAll:
                      "bg-black text-white text-sm px-2.5 py-2 rounded-lg",
                    selected: "mt-3 flex items-center gap-3 flex-wrap",
                    tag: "bg-gray-800 text-white text-sm px-3 py-1 rounded-full cursor-pointer",
                    remove: "ml-2",
                  }}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
