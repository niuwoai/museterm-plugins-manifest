const commands = {
    status: "git status --short",
    recent: "git log -5 --oneline",
    branch: "git branch --show-current",
};
function fill(commandID) {
    const command = commands[commandID];
    if (command === undefined) {
        throw new Error("unknown");
    }
    return { type: "fill", command };
}
export function showStatus(input) {
    return fill(input.commandID);
}
export function showRecent(input) {
    return fill(input.commandID);
}
export function showBranch(input) {
    return fill(input.commandID);
}
