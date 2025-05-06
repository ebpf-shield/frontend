import { dashboardService } from "@/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";
import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const chartConfig = {
  OUTPUT: {
    label: "Output",
    color: "var(--chart-1)",
  },

  INPUT: {
    label: "Input",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export const RulesByChainDashboard = () => {
  const rulesByChain = useQuery({
    queryKey: ["dashboard", "rules-by-chain"],
    queryFn: () => {
      return dashboardService.rulesByChain();
    },
    refetchInterval: 1000 * 5, // 5 seconds
  });

  if (rulesByChain.isPending) {
    return <p>Loading...</p>;
  }

  if (rulesByChain.isError) {
    return <p>Error: {rulesByChain.error.message}</p>;
  }

  const data = rulesByChain.data.map((i) => {
    return {
      ...i,
      fill: `var(--color-${i._id})`,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Number of rules by chain</CardTitle>
        <CardDescription>
          Number of rules applied to each chain across selected agents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col justify-center items-center gap-4">
          <ChartContainer className="min-h-[250px] w-[70%]" config={chartConfig}>
            <PieChart accessibilityLayer>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie nameKey="_id" dataKey="count" data={data}></Pie>
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
