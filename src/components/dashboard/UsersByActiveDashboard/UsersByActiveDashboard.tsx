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
  ACTIVE: {
    label: "Active",
    color: "var(--chart-1)",
  },
  INACTIVE: {
    label: "Inactive",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const UsersByActiveDashboard = () => {
  const usersByActive = useQuery(dashboardQuery.totalUsersQueryOptions());

  if (usersByActive.isPending) {
    return <p>Loading...</p>;
  }

  if (usersByActive.isError) {
    return <p>Error: {usersByActive.error.message}</p>;
  }

  const data = [
    {
      _id: "ACTIVE",
      value: usersByActive.data.active,
      fill: chartConfig.ACTIVE.color,
    },
    {
      _id: "INACTIVE",
      value: usersByActive.data.inactive,
      fill: chartConfig.INACTIVE.color,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users by Active Status</CardTitle>
        <CardDescription>Number of users by active status</CardDescription>
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
