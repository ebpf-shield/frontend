import { ObjectId } from "bson";
import validator from "validator";
import { TransformEffect, z, ZodErrorMap } from "zod";

export const errorMessages = {
  url: "The URL contains an invalid path",
  mongoId: "Must be a valid unique identifier",
  date: "Invalid date format",
  minNumber: "Must be greater than or equal to",
  maxNumber: "Must be up to",
  numberString: "Must be a positive/negative/whole/decimal number",
  fixedNumber: "Must be a whole number",
  phone: "Invalid phone number",
  positive: "Must be a positive number",
  idNumber: "Invalid ID number",
  required: "This field is required",
  enumOption: "You must choose a value from the list",
  alphabet: "Must contain only Hebrew or English letters",
  english: "Must contain only English letters",
  israeliID: "Invalid Israeli ID number",
  localPhone: "Invalid local phone number",
  email: "Invalid email address",
  alphanumericHebEn: "Must be text in Hebrew or English, may include numbers",
  text: "Must be valid text without special characters (@,#,%,&,$,*,^,+,=,<,>,~,`,|,',/,_)",
};
export class ValidationError extends Error {
  public name = "ValidationError";

  public inner: Array<{ path: string; message: string }> = [];

  public constructor(message: string) {
    super(message);
  }
}

export const stringSchema = z.string().trim().max(255);
export const textAreaSchema = z.string().trim().max(2000);
export const dateLike = z.union([z.number(), z.string(), z.date()]);

// Backslash does not need to be escaped in character sets.
const validRegex = /^[a-zA-Z0-9\u0590-\u05FF-.,?!:';"(){}[\]/+\\ \n\t]*/giu;

export const customValidation = {
  alphabet: stringSchema.regex(/^[a-zA-Z\u0590-\u05FF() ,.'-]*$/i, errorMessages.alphabet),

  english: stringSchema.regex(/^[a-zA-z]*$/i, errorMessages.english),

  localPhone: stringSchema.refine((str) => validator.isMobilePhone(str, ["he-IL"]), {
    message: errorMessages.localPhone,
  }),

  esriUUID: z.preprocess(
    (value) => {
      if (typeof value !== "string") {
        return value;
      }
      return value.replace("{", "").replace("}", "");
    },
    z.string({ description: "fiels is must" }).uuid()
  ),

  url: z.string().trim().url({ message: errorMessages.url }).max(1000),

  email: stringSchema.email(errorMessages.email),
  dateLikeToDate: dateLike.pipe(
    z.coerce.date({
      invalid_type_error: errorMessages.date,
      required_error: errorMessages.required,
    })
  ),

  age: z.coerce
    .number({ invalid_type_error: errorMessages.positive })
    .int()
    .min(0, `${errorMessages.minNumber} 0`)
    .max(120, `${errorMessages.maxNumber} 120`)
    .nullish(),

  alphanumericHebEn: stringSchema.refine((value: string) => {
    const isHebrew = validator.isAlphanumeric(value, "he", {
      ignore: "-, ",
    });
    const isEnglish = validator.isAlphanumeric(value, "en-US", {
      ignore: "-, ",
    });

    return isHebrew || isEnglish;
  }, errorMessages.alphanumericHebEn),

  enumOption: stringSchema.refine((value: string) => {
    const isHebrew = validator.isAlphanumeric(value, "he", {
      ignore: "'\\ /",
    });
    const isEnglish = validator.isAlphanumeric(value, "en-US", {
      ignore: "'\\ /",
    });

    return isHebrew || isEnglish;
  }, errorMessages.enumOption),

  text: stringSchema.regex(validRegex, errorMessages.text),

  longText: textAreaSchema.regex(validRegex, errorMessages.text),

  ObjectId: z.preprocess(
    (arg: unknown) => {
      if (typeof arg === "string" && arg.length === 24) {
        return new ObjectId(arg);
      } else if (arg instanceof ObjectId) {
        return arg;
      } else if (typeof arg === "number") {
        return ObjectId.createFromTime(arg);
      }
    },
    z.instanceof(ObjectId),
    { invalid_type_error: errorMessages.mongoId }
  ),

  password: stringSchema.min(8).max(255).regex(validRegex, errorMessages.text),
};

const CustomErrorMap: ZodErrorMap = (error, ctx) => {
  /*
  This is where you override the various error codes
  */
  switch (error.code) {
    case z.ZodIssueCode.invalid_date:
      return { message: errorMessages.date };
    case z.ZodIssueCode.invalid_type:
      if (error.received !== "undefined") {
        return {
          message: `Invalid type, expected ${error.expected}`,
        };
      } else {
        return { message: errorMessages.required };
      }
    case z.ZodIssueCode.invalid_enum_value:
      return { message: errorMessages.enumOption };
    case z.ZodIssueCode.too_big:
      return { message: `${errorMessages.maxNumber} ${error.maximum}` };
    case z.ZodIssueCode.too_small:
      return { message: `${errorMessages.minNumber} ${error.minimum}` };
  }

  // fall back to default message!
  return { message: ctx.defaultError };
};

z.setErrorMap(CustomErrorMap);

export const numberZeroValueToUndefined: TransformEffect<number | undefined> = {
  type: "transform",
  transform: (value) => {
    if (value === 0) {
      return undefined;
    }
    return value;
  },
};

export const stringZeroValueToUndefined: TransformEffect<string | undefined> = {
  type: "transform",
  transform: (value) => {
    if (value === "") {
      return undefined;
    }
    return value;
  },
};
