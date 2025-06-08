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

  async rulesByChain() {
    const rulesByChainSchema = z.object({
      _id: stringSchema,
      count: z.number().int().min(0).max(1_000_000),
    });

    try {
      const res = await authenticatedInstance.get(`${PREFIX}/rules-by-chain`);
      const parsedData = z.array(rulesByChainSchema).parse(res.data);
      return parsedData;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse rules by chain");
    }
  }

  async totalAgents() {
    const totalAgentsSchema = z.object({
      total: z.number().int().min(0),
      online: z.number().int().min(0),
      offline: z.number().int().min(0),
    });

    try {
      const res = await authenticatedInstance.get(`${PREFIX}/total-agents`);
      const parsedData = totalAgentsSchema.parse(res.data);
      return parsedData;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch total agents");
    }
  }

  async totalUsers() {
    const totalUsersSchema = z.object({
      total: z.number().int().min(0),
      active: z.number().int().min(0),
      inactive: z.number().int().min(0),
    });

    try {
      const res = await authenticatedInstance.get(`${PREFIX}/total-users`);
      const parsedData = totalUsersSchema.parse(res.data);
      return parsedData;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch total users");
    }
  }

  async totalProcesses() {
    const totalProcessesSchema = z.object({
      running: z.number().int().min(0),
      stopped: z.number().int().min(0),
    });

    try {
      const res = await authenticatedInstance.get(`${PREFIX}/total-processes`);
      const parsedData = totalProcessesSchema.parse(res.data);
      return parsedData;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch total processes");
    }
  }

  async totalRules(): Promise<{ drop: number; allow: number }> {
    try {
      const res = await authenticatedInstance.get(`${PREFIX}/total-rules`);
      return res.data; // expects { drop, allow }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch total rules");
    }
  }

  async agentsOsDistribution() {
    const agentsOsDistributionSchema = z.object({
      os: stringSchema,
      count: z.number().int().min(0).max(1_000_000),
    });

    try {
      const res = await authenticatedInstance.get(`${PREFIX}/agents-os-distribution`);
      const parsedData = z.array(agentsOsDistributionSchema).parse(res.data);
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

  // New: fetch a list of all agent remote IPs
  async agentRemoteIps() {
    const res = await authenticatedInstance.get(`${PREFIX}/agent-ips`);
    const parsedData = z.array(stringSchema).parse(res.data);
    return parsedData;
  }
}

export const dashboardService = new DashboardService();
