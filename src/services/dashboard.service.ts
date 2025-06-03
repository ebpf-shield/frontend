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

  // ───────────────────────────────────────────────────────────────────────────────
  // New “Top-KPIs” methods
  // ───────────────────────────────────────────────────────────────────────────────

  async totalAgents(): Promise<{ total: number; online: number; offline: number }> {
    try {
      const res = await authenticatedInstance.get(`${PREFIX}/total-agents`);
      return res.data; // expects { total, online, offline }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch total agents");
    }
  }

  async totalUsers(): Promise<{ total: number; active: number; inactive: number }> {
    try {
      const res = await authenticatedInstance.get(`${PREFIX}/total-users`);
      return res.data; // expects { total, active, inactive }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch total users");
    }
  }

  async totalProcesses(): Promise<{ running: number; stopped: number }> {
    try {
      const res = await authenticatedInstance.get(`${PREFIX}/total-processes`);
      return res.data; // expects { running, stopped }
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

  // ───────────────────────────────────────────────────────────────────────────────
  // New “Agent-Overview” methods
  // ───────────────────────────────────────────────────────────────────────────────

  async agentsOsDistribution(): Promise<{ os: string; count: number }[]> {
    try {
      const res = await authenticatedInstance.get(`${PREFIX}/agents-os-distribution`);
      return res.data; // expects [{ os, count }, …]
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch agents OS distribution");
    }
  }

  async agentsTimeseries(): Promise<{ timestamp: string; online: number; offline: number }[]> {
    try {
      const res = await authenticatedInstance.get(`${PREFIX}/agents-timeseries`);
      return res.data; // expects [{ timestamp, online, offline }, …]
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch agents timeseries");
    }
  }
}

export const dashboardService = new DashboardService();
