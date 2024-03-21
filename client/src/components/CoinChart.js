import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const CoinChart = ({ historicalData }) => (
  <LineChart
    width={600}
    height={300}
    data={historicalData}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray="3 3" stroke="#C5C5C5" />
    <XAxis dataKey="date" stroke="#8884d8" />
    <YAxis
      type="number"
      stroke="#8884d8"
      domain={[
        0,
        Number(
          Math.max(...historicalData.map((e) => Number(e.priceUsd))).toFixed(0)
        ),
      ]}
    />
    <Tooltip />
    <Line type="monotone" dataKey="priceUsd" stroke="#82ca9d" dot={false} activeDot={{ r: 8 }} />
  </LineChart>
);

export default CoinChart;