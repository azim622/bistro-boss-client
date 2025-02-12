import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import UseAxios from "../../../hooks/UseAxios";
import { FaDollarSign, FaUsers, FaUserPlus, FaBox } from "react-icons/fa";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
} from "recharts";


const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042" ,'#ff0000'];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = UseAxios();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-starts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-starts");
      return res.data;
    },
  });

  //   custom shape for the bar chat
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  //   pi chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const piChartData =chartData.map(data =>{
    return {name:data.category , value:data.revenue}
  })

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome Back,{" "}
        <span className="text-indigo-500">{user?.displayName || "Admin"}</span>
      </h2>

      <div className="lg:flex  gap-6">
        {/* Revenue Card */}
        <div className="flex items-center bg-white shadow-md rounded-lg p-4 gap-4 flex-1 min-w-[200px]">
          <div className="text-indigo-500 bg-indigo-100 rounded-full p-4">
            <FaDollarSign className="text-3xl" />
          </div>
          <div>
            <div className="text-lg font-semibold">Revenue</div>
            <div className="text-2xl font-bold text-gray-800">
              ${stats.revenue || 0}
            </div>
          </div>
        </div>

        {/* Users Card */}
        <div className="flex items-center bg-white shadow-md rounded-lg p-4 gap-4 flex-1 min-w-[200px]">
          <div className="text-green-500 bg-green-100 rounded-full p-4">
            <FaUsers className="text-3xl" />
          </div>
          <div>
            <div className="text-lg font-semibold">Total Users</div>
            <div className="text-2xl font-bold text-gray-800">
              {stats.users || 0}
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div className="flex items-center bg-white shadow-md rounded-lg p-4 gap-4 flex-1 min-w-[200px]">
          <div className="text-yellow-500 bg-yellow-100 rounded-full p-4">
            <FaBox className="text-3xl" />
          </div>
          <div>
            <div className="text-lg font-semibold">Products</div>
            <div className="text-2xl font-bold text-gray-800">
              {stats.menuItem || 0}
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="flex items-center bg-white shadow-md rounded-lg p-4 gap-4 flex-1 min-w-[200px]">
          <div className="text-blue-500 bg-blue-100 rounded-full p-4">
            <FaUserPlus className="text-3xl" />
          </div>
          <div>
            <div className="text-lg font-semibold">Orders</div>
            <div className="text-2xl font-bold text-gray-800">
              {stats.order || 0}
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="w-1/2">
        <PieChart width={400} height={400}>
          <Pie
            data={piChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {piChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
        
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
