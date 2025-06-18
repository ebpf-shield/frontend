import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { dashboardQuery } from "@/queries/dashboard.query";
import { useQuery } from "@tanstack/react-query";
import { Pie, PieChart } from "recharts";

const chartConfig = {
  RUNNING: {
    label: "Running",
    color: "var(--chart-1)",
  },
  STOPPED: {
    label: "Stopped",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const ProcessesByStatusDashboard = () => {
  const processesByStatus = useQuery(dashboardQuery.totalProcessesQueryOptions());

  if (processesByStatus.isPending) {
    return <p>Loading...</p>;
  }

  if (processesByStatus.isError) {
    return <p>Error: {processesByStatus.error.message}</p>;
  }

  const data = [
    {
      _id: "RUNNING",
      value: processesByStatus.data.running,
      fill: chartConfig.RUNNING.color,
    },
    {
      _id: "STOPPED",
      value: processesByStatus.data.stopped,
      fill: chartConfig.STOPPED.color,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processes by Status</CardTitle>
        <CardDescription>Number of processes by status</CardDescription>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col justify-center items-center gap-4">
          <ChartContainer className="min-h-[250px]" config={chartConfig}>
            <PieChart accessibilityLayer>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie nameKey="_id" dataKey="value" data={data} />
              <ChartLegend
                content={<ChartLegendContent nameKey="_id" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </section>
      </CardContent>
    </Card>
  );
};
