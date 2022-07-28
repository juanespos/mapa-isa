import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

  const data = [
    {
      name: "Torre 1",
      asnm: 56
    },
    {
      name: "",
      asnm: 80
    },
    {
      name: "",
      asnm: 85
    },
    {
      name: "",
      asnm: 60
    },
    {
      name: "",
      asnm: 65
    },
    {
      name: "",
      asnm: 90
    },
    {
      name: "",
      asnm: 95
    },
    {
      name: "",
      asnm: 85
    },
    {
      name: "",
      asnm: 70
    },
    {
      name: "",
      asnm: 75
    },
    {
      name: "",
      asnm: 76
    },
    {
      name: "",
      asnm: 78
    },
    {
      name: "",
      asnm: 70
    },
    {
      name: "",
      asnm: 100
    },
    {
      name: "",
      asnm: 105
    },
    {
      name: "",
      asnm: 90
    },
    {
      name: "",
      asnm: 83
    },
    {
      name: "",
      asnm: 90
    },
    {
      name: "",
      asnm: 70
    },
    {
      name: "",
      asnm: 80
    },
    {
      name: "",
      asnm: 85
    },
    {
      name: "",
      asnm: 95
    },
    {
      name: "Torre 2",
      asnm: 90
    }
  ];

const TerrainProfile = () => {
  return (
    <AreaChart
      width={500}
      height={350}
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" padding={{ left: 0, right: 0 }} />
      <YAxis type="number" dataKey="asnm" unit="m" name="asnm" domain={[0, 'dataMax + 10']} />
      <Tooltip />
      <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
      <Area dataKey="asnm" stroke="#000000" fill="#62a378" activeDot={{ r: 8 }} />
    </AreaChart>
  )
}

export {TerrainProfile}