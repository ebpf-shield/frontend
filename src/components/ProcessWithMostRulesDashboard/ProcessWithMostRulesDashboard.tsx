import { useQuery } from "@tanstack/react-query";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { dashboardService } from "@/services/dashboard.service";
import { XAxis, Bar, BarChart } from "recharts";

const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(210, 70%, 50%)",
  },
} satisfies ChartConfig;

export const ProcessesWithMostRulesDashboard = () => {
  const processesWithMostRules = useQuery({
    queryKey: ["dashboard", "processes-with-most-rules"],
    queryFn: () => {
      return dashboardService.processesWithMostRules();
    },
    refetchInterval: 1000 * 5, // 5 seconds
  });

  if (processesWithMostRules.isPending) {
    return <p>Loading...</p>;
  }

  if (processesWithMostRules.isError) {
    return <p>Error: {processesWithMostRules.error.message}</p>;
  }

  const data = processesWithMostRules.data;

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
          <Bar dataKey="rulesCount" fill="var(--color-count)" radius={4} />
        </BarChart>
      </ChartContainer>
    </section>
  );
};
