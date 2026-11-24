const phrases = [
    {
        words: ["port", "listen", "端口", "占用"],
        command: "lsof -nP -iTCP -sTCP:LISTEN",
        explanation: "列出正在监听的 TCP 端口。",
    },
    {
        words: ["disk", "space", "磁盘", "空间"],
        command: "df -h",
        explanation: "看各挂载点还剩多少空间。",
    },
    {
        words: ["process", "cpu", "memory", "进程", "内存"],
        command: "ps aux",
        explanation: "看当前进程的 CPU 和内存。",
    },
    {
        words: ["dns", "resolve", "解析"],
        command: "dscacheutil -q host",
        explanation: "查本机的主机名解析缓存。",
    },
];
export function suggest(input) {
    const request = input.request.toLowerCase();
    const matched = phrases.filter((phrase) => phrase.words.some((word) => request.includes(word)));
    return {
        candidates: matched.slice(0, 2).map((phrase) => ({
            command: phrase.command,
            explanation: phrase.explanation,
        })),
    };
}
export function phraseCount() {
    return {
        type: "message",
        title: `本地短语 ${phrases.length} 条`,
        body: "只按请求文本匹配，不读目录，不联网。",
    };
}
