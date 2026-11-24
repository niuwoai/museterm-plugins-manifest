declare module "node:fs" {
  export function readFileSync(path: string, encoding: "utf8"): string
  export function writeFileSync(path: string, data: string): void
}

declare namespace NodeJS {
  interface ProcessEnv {
    HOME?: string
  }
}

interface Process {
  env: NodeJS.ProcessEnv
}

declare const process: Process
