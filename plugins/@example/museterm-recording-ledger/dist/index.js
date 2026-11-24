import { readFileSync, writeFileSync } from "node:fs";
const allowed = [
    "id",
    "title",
    "eventCount",
    "durationMilliseconds",
    "hasProtectedInput",
    "requiresUserAuthentication",
    "allowsAutomationPlayback",
];
function ledgerPath() {
    const home = process.env.HOME;
    if (home === undefined || home.length === 0)
        return null;
    return `${home}/museterm-recording-ledger.json`;
}
export function onRecording(event) {
    const path = ledgerPath();
    if (path === null || event.type !== "capture.finished")
        return;
    const source = { ...event.shortcut };
    const kept = {};
    for (const field of allowed) {
        kept[field] = source[field];
    }
    writeFileSync(path, `${JSON.stringify(kept)}\n`);
}
export function latestRecording() {
    const path = ledgerPath();
    if (path === null) {
        return { type: "message", title: "还没有保存过录制" };
    }
    try {
        const parsed = JSON.parse(readFileSync(path, "utf8"));
        if (typeof parsed !== "object" || parsed === null) {
            return { type: "message", title: "还没有保存过录制" };
        }
        const record = parsed;
        const title = typeof record.title === "string" && record.title.length > 0 ? record.title : "未命名录制";
        const count = typeof record.eventCount === "number" ? record.eventCount : 0;
        return { type: "message", title, body: `${count} 个事件` };
    }
    catch {
        return { type: "message", title: "还没有保存过录制" };
    }
}
