import { MdAddModerator } from "react-icons/md";
import { FaUserShield } from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res?.data;
    },
  });

  const handleMakeModerator = (id) => {
    const makeModerator = async () => {
      const res = await axiosSecure.patch(`/users/make-moderator/${id}`);
      if (res?.data?.modifiedCount > 0) {
        toast.success("User made moderator successfully");
        refetch();
      }
    };

    toast((t) => (
      <div className="flex flex-col items-center justify-center gap-4">
        <div>Are you sure you want to make this user a moderator?</div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              makeModerator();
              toast.dismiss(t.id);
            }}
            className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-semibold"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-semibold"
          >
            No
          </button>
        </div>
      </div>
    ));
  };

  const handleMakeAdmin = (id) => {
    const makeAdmin = async () => {
      const res = await axiosSecure.patch(`/users/make-admin/${id}`);
      if (res?.data?.modifiedCount > 0) {
        toast.success("User made admin successfully");
        refetch();
      }
    };

    toast((t) => (
      <div className="flex flex-col items-center justify-center gap-4">
        <div>Are you sure you want to make this user an admin?</div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              makeAdmin();
              toast.dismiss(t.id);
            }}
            className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-semibold"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-semibold"
          >
            No
          </button>
        </div>
      </div>
    ));
  };

  return (
    <>
      <section>
        <div>
          <h1 className="text-xl font-semibold">Users</h1>
        </div>

        <div className="mt-6 rounded-lg border border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left text-sm">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="whitespace-nowrap p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Role</th>
                  <th className="p-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user?._id} className="transition hover:bg-gray-50">
                    <td className="whitespace-nowrap border-t px-4 py-3">
                      {user?.name}
                    </td>
                    <td className="whitespace-nowrap border-t px-4 py-3">
                      {user?.email}
                    </td>
                    <td className="whitespace-nowrap border-t px-4 py-3">
                      {user?.role}
                    </td>

                    <td className="space-x-4 whitespace-nowrap border-t px-4 py-3">
                      <button
                        onClick={() => handleMakeModerator(user?._id)}
                        className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-1.5 font-medium text-white hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-300"
                        disabled={user?.role === "moderator"}
                      >
                        Make Moderator <MdAddModerator />
                      </button>
                      <button
                        onClick={() => handleMakeAdmin(user?._id)}
                        className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-1.5 font-medium text-white hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-300"
                        disabled={user?.role === "admin"}
                      >
                        Make Admin <FaUserShield />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
