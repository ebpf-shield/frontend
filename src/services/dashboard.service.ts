import { z } from "zod";
import { authenticatedInstance } from "./index.service";
import { stringSchema } from "@/utils/zod.util";

const PREFIX = "dashboard";

export class DashboardService {
  async commonProcesses() {
    const commonProcessSchema = z.object({
      name: stringSchema,
      count: z.number().int().min(0).max(1_000_000),
    });

    try {
      const res = await authenticatedInstance.get(`${PREFIX}/common-processes`);
      const parsedData = z.array(commonProcessSchema).parse(res.data);
      return parsedData;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse common processes in agents");
    }
  }

  async processesWithMostRules() {
    const processWithMostRulesSchema = z.object({
      name: stringSchema,
      rulesCount: z.number().int().min(0).max(1_000_000),
    });

    try {
      const res = await authenticatedInstance.get(`${PREFIX}/processes-with-most-rules`);
      const parsedData = z.array(processWithMostRulesSchema).parse(res.data);
      return parsedData;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse processes with most rules");
    }
  }

  // TODO: Does this needs to be static?
  rulesByChainSchema = z.object({
    _id: stringSchema,
    count: z.number().int().min(0).max(1_000_000),
  });
  async rulesByChain() {
    try {
      const res = await authenticatedInstance.get(`${PREFIX}/rules-by-chain`);
      const parsedData = z.array(this.rulesByChainSchema).parse(res.data);
      return parsedData;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse rules by chain");
    }
  }

  totalAgentsSchema = z.object({
    total: z.number().int().min(0),
    online: z.number().int().min(0),
    offline: z.number().int().min(0),
  });

  async totalAgents() {
    try {
      const res = await authenticatedInstance.get(`${PREFIX}/total-agents`);
      const parsedData = this.totalAgentsSchema.parse(res.data);
      return parsedData;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch total agents");
    }
  }

  totalUsersSchema = z.object({
    total: z.number().int().min(0),
    active: z.number().int().min(0),
    inactive: z.number().int().min(0),
  });

  async totalUsers() {
    try {
      const res = await authenticatedInstance.get(`${PREFIX}/total-users`);
      const parsedData = this.totalUsersSchema.parse(res.data);
      return parsedData;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch total users");
    }
  }

  totalProcessesSchema = z.object({
    running: z.number().int().min(0),
    stopped: z.number().int().min(0),
  });

  async totalProcesses() {
    try {
      const res = await authenticatedInstance.get(`${PREFIX}/total-processes`);
      const parsedData = this.totalProcessesSchema.parse(res.data);
      return parsedData;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch total processes");
    }
  }

  agentsOsDistributionSchema = z.object({
    os: stringSchema,
    count: z.number().int().min(0).max(1_000_000),
  });

  async agentsOsDistribution() {
    try {
      const res = await authenticatedInstance.get(`${PREFIX}/agents-os-distribution`);
      const parsedData = z.array(this.agentsOsDistributionSchema).parse(res.data);
      return parsedData;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch agents OS distribution");
    }
  }

  async agentsTimeseries() {
    const agentsTimeseriesSchema = z.object({
      timestamp: stringSchema,
      online: z.number().int().min(0),
      offline: z.number().int().min(0),
    });

    try {
      const res = await authenticatedInstance.get(`${PREFIX}/agents-timeseries`);
      const parsedData = z.array(agentsTimeseriesSchema).parse(res.data);
      return parsedData;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch agents timeseries");
    }
  }

  async agentLocations() {
    const agentLocationSchema = z.object({
      ip: stringSchema.ip(),
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    });

    const res = await authenticatedInstance.get(`${PREFIX}/agent-locations`);
    const parsedData = z.array(agentLocationSchema).parse(res.data);
    return parsedData;
  }
}

export const dashboardService = new DashboardService();
