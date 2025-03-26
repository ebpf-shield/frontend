/**
 *     id: Optional[PydanticObjectId] = Field(alias="_id")
    saddr: Optional[IPvAnyAddress]
    daddr: Optional[IPvAnyAddress]
    sport: int = Field(ge=0, le=65535)
    dport: int = Field(ge=0, le=65535)
    protocol: Optional[str]
    action: Optional[Action] = Field(default=Action.ACCEPT)
    chain: Optional[Chain] = Field(default=Chain.INPUT)
    priority: int = Field(ge=0, le=100000)
    comment: Optional[str] = Field(max_length=255)
    created_at: datetime.datetime = Field(
        default_factory=datetime.datetime.now, alias="createdAt"
    )
    updated_at: datetime.datetime = Field(
        default_factory=datetime.datetime.now, alias="updatedAt"
    )
    process_id: PydanticObjectId
    # I'm not sure we need these field
    agent_id: PydanticObjectId
 */

import { z } from "zod";
import { customValidation, stringSchema } from "../utils/zod.util";

export const CHAIN = ["INPUT", "OUTPUT"] as const;
export type Chain = (typeof CHAIN)[number];

export const ACTION = ["ACCEPT", "DROP", "REJECT"] as const;
export type Action = (typeof ACTION)[number];

export const ruleSchema = z.object({
  _id: customValidation.ObjectId,
  saddr: stringSchema.ip().optional(),
  daddr: stringSchema.ip().optional(),
  sport: z.number().int().min(0).max(65535),
  dport: z.number().int().min(0).max(65535),
  protocol: stringSchema.optional(),
  action: z.enum(ACTION).optional(),
  chain: z.enum(CHAIN).optional(),
  priority: z.number().int().min(0).max(100000),
  comment: stringSchema.optional(),
  created_at: customValidation.dateLikeToDate.optional(),
  updated_at: customValidation.dateLikeToDate.optional(),
  process_id: customValidation.ObjectId,
  agent_id: customValidation.ObjectId,
});
