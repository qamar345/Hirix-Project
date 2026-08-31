import API, { BASE_URL } from "../../api";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { format } from "date-fns";
// const data = [
//   { name: "Nov 1, 2024", visits: 16 },
//   { name: "Nov 2, 2024", visits: 11 },
//   { name: "Nov 3, 2024", visits: 15 },
//   { name: "Nov 4, 2024", visits: 11 },
//   { name: "Nov 5, 2024", visits: 3 },
//   { name: "Nov 6, 2024", visits: 6 },
//   { name: "Nov 7, 2024", visits: 11 },
// ];

function VisitChart({ days }) {
  const token = sessionStorage.getItem("token");
  const [graph, setGraph] = useState([]);
  // const [selectedDays, setSelectedDays] = useState(7);
  const id = sessionStorage.getItem("id");
  useEffect(() => {
    const fetchDataGraph = async () => {
      try {
        const res = await API.get(
          `/EmployerGraph/${id}/${days}`,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        setGraph(res.data);
      } catch (error) {
        console.error("Failed to load visit graph:", error);
      }
    };

    fetchDataGraph();
  }, [id, days]);
  return (
    <>
      <ResponsiveContainer width={"100%"} height={400}>
        {graph.length > 0 ? (
          <LineChart data={graph} margin={{ top: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              padding={{ left: 30, right: 30 }}
              tickFormatter={(date) => format(new Date(date), "yyyy-MM-dd")}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="linear"
              dataKey="visits"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            >
              <LabelList position="top" offset={5} />
            </Line>
          </LineChart>
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No data available
          </p>
        )}
      </ResponsiveContainer>
    </>
  );
}

export default VisitChart;
