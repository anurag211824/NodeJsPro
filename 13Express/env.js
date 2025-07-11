// export const PORT =  isNaN(process.env.PORT) ? 3000 : parseInt(process.env.PORT)
// import { z, ZodError } from "zod";
// const ageSchema = z.number().min(18).max(100).int();
// const userAge = 19;
// const parseUserAge = ageSchema.parse(userAge);
// console.log(parseUserAge);
// const {data,error,succes} = ageSchema.safeParse(userAge)
// console.log(data,error);

// try {
//   const parseduserAge = ageSchema.parse(userAge);
//   console.log(parseduserAge);
// } catch (error) {
//   if (error instanceof ZodError) {
//     console.log(error.issues[0].message);
//   } else {
//     console.log("UnExpected error", error);
//   }
// }

// import dotenv from "dotenv"
// dotenv.config()
// const port  = process.env.PORT
// console.log(port);

import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

// // Schema to validate and parse PORT
// const portSchema = z
//   .string()
//   .transform((val) => Number(val))
//   .refine((num) => !isNaN(num) && num >= 0 && num <= 65535, {
//     message: "PORT must be a number between 0 and 65535",
//   });

// // Validate and extract port
// const result = portSchema.safeParse(process.env.PORT);

// if (!result.success) {
//   console.error("Invalid PORT:", result.error.errors[0].message);
//   process.exit(1); // stop the server if PORT is invalid
// }

// const port = result.data;
// console.log("✅ Valid PORT:", port);

// // Export the validated port
// export default port;



const portSchemaa = z.coerce.number().min(1).max(65535).default(3000)
const PORT = portSchemaa.parse(process.env.PORT)
export default PORT