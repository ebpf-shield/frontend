import { z } from "zod";
import { axiosInstance } from "./index.service";
import { stringSchema } from "@/utils/zod.util";

const PREFIX = "dashboard";

export class DashboardService {
  async commonProcesses() {
    const commonProcessSchema = z.object({
      name: stringSchema,
      count: z.number().int().min(0).max(1_000_000),
    });

    try {
      const res = await axiosInstance.get(`${PREFIX}/common-processes`);
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
      const res = await axiosInstance.get(`${PREFIX}/processes-with-most-rules`);
      const parsedData = z.array(processWithMostRulesSchema).parse(res.data);
      return parsedData;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to parse processes with most rules");
    }
  }
}

export const dashboardService = new DashboardService();
