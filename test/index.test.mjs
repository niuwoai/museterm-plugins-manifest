import assert from "node:assert/strict"
import { readFileSync, readdirSync, statSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import test from "node:test"

import { checkPluginPackage } from "@niuwoai/museterm-plugin"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const appVersion = "1.263.0-rc1"
const lifecycleScripts = ["preinstall", "install", "postinstall", "prepare"]
const remoteDependency = /^(?:file:|link:|git\+|git:|github:|gitlab:|bitbucket:)/

function pluginDirectories(directory) {
  const found = []
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry)
    if (!statSync(path).isDirectory() || entry.startsWith(".")) continue
    try {
      statSync(join(path, "package.json"))
      found.push(path)
    } catch {
      found.push(...pluginDirectories(path))
    }
  }
  return found
}

test("index.json names a directory and the same version", () => {
  const index = JSON.parse(readFileSync(join(root, "index.json"), "utf8"))
  assert.ok(Array.isArray(index))
  assert.ok(index.length >= 3)
  const seen = new Set()
  for (const entry of index) {
    assert.equal(typeof entry.name, "string")
    assert.equal(typeof entry.version, "string")
    assert.equal(typeof entry.description, "string")
    assert.equal(seen.has(entry.name), false)
    seen.add(entry.name)
    const packageFile = join(root, "plugins", ...entry.name.split("/"), "package.json")
    const packageValue = JSON.parse(readFileSync(packageFile, "utf8"))
    assert.equal(packageValue.name, entry.name)
    assert.equal(packageValue.version, entry.version)
  }
})

test("every plugin package covers 1.263.0-rc1 and has no lifecycle script", () => {
  const directories = pluginDirectories(join(root, "plugins"))
  assert.equal(directories.length >= 3, true)
  for (const directory of directories) {
    const packageValue = JSON.parse(readFileSync(join(directory, "package.json"), "utf8"))
    const issues = checkPluginPackage(packageValue, { appVersion })
    assert.deepEqual(issues, [], `${packageValue.name}: ${JSON.stringify(issues)}`)
    const scripts = packageValue.scripts ?? {}
    for (const name of lifecycleScripts) {
      assert.equal(scripts[name], undefined)
    }
    for (const field of ["dependencies", "optionalDependencies"]) {
      const specs = packageValue[field] ?? {}
      for (const spec of Object.values(specs)) {
        assert.equal(remoteDependency.test(String(spec)), false)
      }
    }
    assert.equal(packageValue.museterm.entry, "dist/index.js")
    statSync(join(directory, "src", "index.ts"))
  }
})
