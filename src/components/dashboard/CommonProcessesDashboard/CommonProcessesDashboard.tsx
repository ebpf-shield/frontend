import { dashboardQuery } from "@/queries/dashboard.query";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";

const chartConfig = {
  count: {
    label: "Count",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const CommonProcessesDashboard = () => {
  const commonProcesses = useQuery(dashboardQuery.commonProcessQueryOptions());

  if (commonProcesses.isPending) {
    return <p>Loading...</p>;
  }

  if (commonProcesses.isError) {
    return <p>Error: {commonProcesses.error.message}</p>;
  }

  const data = commonProcesses.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Common Processes</CardTitle>
        <CardDescription>
          Processes that appear most frequently across selected agents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col justify-center items-center gap-4">
          <ChartContainer config={chartConfig} className="min-h-[250px] w-auto">
            <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
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
      </CardContent>
    </Card>
  );
};
