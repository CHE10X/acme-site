import { appendFile, mkdir, readFile } from "node:fs/promises"
import path from "node:path"

type IdempotencyRecord = {
  event_id: string
  processed_at: string
  outcome: string
}

function getStorePath(): string {
  return process.env.LICENSE_IDEMPOTENCY_STORE_PATH
    ? path.resolve(process.env.LICENSE_IDEMPOTENCY_STORE_PATH)
    : path.join(process.cwd(), ".data", "acme_license_idempotency.ndjson")
}

async function ensureDir(filePath: string): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true })
}

async function readAllRecords(): Promise<IdempotencyRecord[]> {
  const storePath = getStorePath()
  try {
    const raw = await readFile(storePath, "utf8")
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as IdempotencyRecord
        } catch {
          return null
        }
      })
      .filter((r): r is IdempotencyRecord => r !== null)
  } catch {
    return []
  }
}

export async function hasProcessedLicenseEvent(eventId: string): Promise<boolean> {
  const records = await readAllRecords()
  return records.some((r) => r.event_id === eventId)
}

export async function markLicenseEventProcessed(
  eventId: string,
  outcome: string
): Promise<void> {
  const storePath = getStorePath()
  await ensureDir(storePath)
  const record: IdempotencyRecord = {
    event_id: eventId,
    processed_at: new Date().toISOString(),
    outcome,
  }
  await appendFile(storePath, `${JSON.stringify(record)}\n`, "utf8")
}
