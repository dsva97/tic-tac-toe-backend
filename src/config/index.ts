import dotenv from "dotenv";

dotenv.config();

export const PORT = Number(process.env.PORT) || 3030;
export const FRONTEND_PATH = process.env.FRONTEND_PATH as string;
