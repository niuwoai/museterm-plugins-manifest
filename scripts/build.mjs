import { readdirSync, statSync } from "node:fs"
import { spawnSync } from "node:child_process"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const plugins = join(root, "plugins")

function packages(directory) {
  const found = []
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry)
    if (!statSync(path).isDirectory()) continue
    if (entry.startsWith(".")) continue
    const packageFile = join(path, "package.json")
    try {
      statSync(packageFile)
      found.push(path)
    } catch {
      found.push(...packages(path))
    }
  }
  return found
}

const typescript = join(root, "node_modules", "typescript", "bin", "tsc")
let failed = false
for (const directory of packages(plugins)) {
  const result = spawnSync(process.execPath, [typescript, "-p", "tsconfig.json"], {
    cwd: directory,
    stdio: "inherit",
  })
  if (result.status !== 0) failed = true
}
if (failed) process.exit(1)
