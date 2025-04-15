import { ObjectId } from "bson";
import validator from "validator";
import { ZodErrorMap, z } from "zod";

export const errorMessages = {
  url: "כתובת ה-URL מכילה נתיב לא חוקי",
  mongoId: "צריך להיות מזהה יחודי תקין",
  date: "פורמט תאריך לא תקין",
  minNumber: "חייב להיות מעל או שווה ל",
  maxNumber: "חייב להיות עד",
  numberString: "חייב להיות מספר חיובי/שלילי/שלם/עשרוני",
  fixedNumber: "חייב להיות מספר שלם",
  phone: "מספר טלפון לא תקין",
  positive: "חייב להיות מספר חיובי",
  idNumber: "תעודת זהות לא תקינה",
  required: "חובה להזין ערך בשדה זה",
  enumOption: "יש לבחור ערך מהרשימה",
  alphabet: "צריך להיות אותיות באנגלית או בעברית בלבד",
  english: "צריך להיות אותיות באנגלית בלבד",
  israeliID: "מספר תעודת זהות אינו תקין",
  localPhone: "מספר טלפון אינו תקין",
  email: "האימייל אינו תקין",
  alphanumericHebEn: "חייב להיות טקסט בעברית או אנגלית, יכול להכיל גם מספרים",
  text: "חייב להיות טקסט תקין, ללא סימנים מיוחדים (@,#,%,&,$,*,^,+,=,<,>,~,`,|,',/,_)",
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
    z.string({ description: "חובה" }).uuid()
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
          message: `סוג הערך שגוי, הסוג הרצוי הוא ${error.expected}`,
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
