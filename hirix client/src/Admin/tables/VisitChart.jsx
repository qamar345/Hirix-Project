import axios from "axios";
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

function VisitChart({days}) {
  const [graph, setGraph] = useState([]);
  const [selectedDays, setSelectedDays] = useState(7);
  useEffect(() => {
    const fetchDataGraph = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/graph/${days}`
        );
        console.log(res.data);
        setGraph(res.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchDataGraph();
  }, [days]);
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
