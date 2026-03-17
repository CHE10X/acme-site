import { randomBytes } from "node:crypto";

export function generateInstallToken(): string {
  return randomBytes(32).toString("hex");
}
