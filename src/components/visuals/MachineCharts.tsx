import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MachineMetric, TrendPoint } from "../../types";
import { GlassCard } from "../common";

type MachineChartsProps = {
  metrics: MachineMetric[];
  trends: TrendPoint[];
};

export function MachineCharts({ metrics, trends }: MachineChartsProps) {
  return (
    <div className="machine-grid">
      <GlassCard className="chart-card">
        <div className="chart-card__heading">
          <h3>机械租赁与实际工时对比</h3>
          <p>帮助识别租赁时长、实际作业时长和利用率差异。</p>
        </div>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={metrics} barCategoryGap={18}>
              <CartesianGrid vertical={false} stroke="#d8e3f5" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip
                cursor={{ fill: "rgba(37, 99, 235, 0.05)" }}
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
                }}
              />
              <Bar dataKey="rentHours" fill="#93c5fd" radius={[8, 8, 0, 0]} />
              <Bar dataKey="workHours" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard className="chart-card">
        <div className="chart-card__heading">
          <h3>人员与机械投入趋势</h3>
          <p>示意多工序阶段的人员投入与机械调用变化。</p>
        </div>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trends}>
              <CartesianGrid vertical={false} stroke="#d8e3f5" />
              <XAxis dataKey="period" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
                }}
              />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#14b8a6"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="machinery"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
}
