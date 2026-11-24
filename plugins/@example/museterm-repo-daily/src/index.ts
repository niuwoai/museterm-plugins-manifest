/** A palette command sees only the tab id, the target kind, and the environment. */
interface CommandInput {
  commandID: string
  preferences: Record<string, string | boolean>
  tab: {
    id: string
    targetKind: "local" | "ssh"
    environment: string
  }
}

interface FillResult {
  type: "fill"
  command: string
}

const commands: Record<string, string> = {
  status: "git status --short",
  recent: "git log -5 --oneline",
  branch: "git branch --show-current",
}

function fill(commandID: string): FillResult {
  const command = commands[commandID]
  if (command === undefined) {
    throw new Error("unknown")
  }
  return { type: "fill", command }
}

export function showStatus(input: CommandInput): FillResult {
  return fill(input.commandID)
}

export function showRecent(input: CommandInput): FillResult {
  return fill(input.commandID)
}

export function showBranch(input: CommandInput): FillResult {
  return fill(input.commandID)
}
