import { PieChart, Pie, Cell, Tooltip } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function Statistics() {
  const axiosSecure = useAxiosSecure();

  const { data: statistics = [] } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/statistics`);
      return data;
    },
  });
  return (
    <>
      <section className="flex h-[calc(100vh-96px)] items-center justify-center">
        <div className="">
          <div className="overflow-x-auto">
            <PieChart width={240} height={240}>
              <Pie
                data={statistics}
                cx={115}
                cy={115}
                labelLine={false}
                label="value"
                outerRadius={80}
                fill="#000000"
                dataKey="value"
              >
                {statistics.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
          <div>
            <h1 className="mt-4 text-center text-xl font-semibold">
              Statistics
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}
