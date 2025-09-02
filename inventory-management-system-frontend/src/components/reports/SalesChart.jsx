import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function SalesChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip 
          formatter={(value) => [`$${value}`, 'Total Sales']}
          labelFormatter={(label) => `Period: ${label}`}
        />
        <Legend />
        <Bar dataKey="totalSales" fill="#4caf50" name="Total Sales" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SalesChart;