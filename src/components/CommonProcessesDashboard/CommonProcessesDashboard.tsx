import { dashboardService } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(210, 70%, 50%)",
  },
} satisfies ChartConfig;

export const CommonProcessesDashboard = () => {
  const commonProcesses = useQuery({
    queryKey: ["dashboard", "common-processes"],
    queryFn: () => {
      return dashboardService.commonProcesses();
    },
    refetchInterval: 1000 * 5, // 5 seconds
  });

  if (commonProcesses.isPending) {
    return <p>Loading...</p>;
  }

  if (commonProcesses.isError) {
    return <p>Error: {commonProcesses.error.message}</p>;
  }

  const data = commonProcesses.data;

  return (
    <section className="flex flex-col justify-center items-center gap-4">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-[70%]">
        <BarChart accessibilityLayer data={data}>
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 10)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="count" fill="var(--color-count)" radius={4} />
        </BarChart>
      </ChartContainer>
    </section>
  );
};
