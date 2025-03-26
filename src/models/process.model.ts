/**
 *     id: Optional[PydanticObjectId] = Field(alias="_id")
    command: str = Field(max_length=255)
    agent_id: PydanticObjectId = Field(alias="agentId")
    pid: int = Field(ge=0)

 */

import { z } from "zod";
import { customValidation, stringSchema } from "../utils/zod.util";

export const processSchema = z.object({
  _id: customValidation.ObjectId,
  command: stringSchema.max(1000),
  agentId: customValidation.ObjectId,
  pid: z.number().int().min(0).max(65535),
});

export type Process = z.infer<typeof processSchema>;
