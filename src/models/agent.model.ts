import { z } from "zod";
import { customValidation, stringSchema } from "../utils/zod.util";
import { processSchema } from "./process.model";

export const geoLocationPropertiesSchema = z.object({
  countryName: stringSchema.min(1).max(100),
  regionName: stringSchema.min(1).max(100),
  cityName: stringSchema.min(1).max(100),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const agentSchema = z.object({
  _id: customValidation.ObjectId,
  name: stringSchema,
  createdAt: customValidation.dateLikeToDate,
  updatedAt: customValidation.dateLikeToDate,
  online: z.boolean(),
  processesToExclude: z.array(stringSchema).default([]),
  externalIp: stringSchema.ip().optional(),
  geoLocationProperties: geoLocationPropertiesSchema.optional(),
});

export type Agent = z.infer<typeof agentSchema>;

export const agentWithProcessesSchema = agentSchema.extend({
  processes: z.array(processSchema).default([]),
});

export type AgentWithProcesses = z.infer<typeof agentWithProcessesSchema>;
