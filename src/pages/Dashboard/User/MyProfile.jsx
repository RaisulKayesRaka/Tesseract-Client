import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { HiShieldCheck } from "react-icons/hi";
export default function MyProfile() {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: isVerified = false } = useQuery({
    queryKey: ["isVerified", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user?.email}`);
      return data?.isVerified;
    },
  });
  return (
    <>
      <section className="flex h-[calc(100vh-96px)] items-center justify-center">
        <div className="flex w-full flex-col items-center">
          <div className="mb-4">
            <img
              className="h-32 w-32 rounded-full border"
              src={user?.photoURL}
              alt=""
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="text-2xl font-semibold">{user?.displayName}</h3>
          <p className="text-sm text-gray-800">{user?.email}</p>

          <div className="mt-4 text-center">
            <span className="inline-flex items-center justify-center gap-2 rounded-full border border-green-500 bg-green-50 px-3 py-1 text-sm font-semibold text-green-500">
              Verified <HiShieldCheck />
            </span>
          </div>

          <div className="mt-4 flex w-full max-w-96 flex-col items-center justify-center gap-2 rounded-lg border border-gray-800 bg-gray-50 p-4">
            <h3>Subcribe for membership</h3>
            <button className="rounded-lg bg-gray-800 px-4 py-2 font-semibold text-white">
              Subscribe $9.99
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
