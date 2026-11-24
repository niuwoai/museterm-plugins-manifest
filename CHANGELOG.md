# Changelog

## [0.1.0] - 2026-11-24

### Added
- 建立插件索引：`index.json` 只列包名、版本和说明，源码在 `plugins/<包名>/`。
- `@example/museterm-repo-daily`：命令面板填入工作区状态、最近提交和当前分支，不执行。
- `@example/museterm-troubleshoot`：只按请求文本匹配本地排查短语，不读目录，不联网。
- `@example/museterm-recording-ledger`：录制保存后只记白名单元数据，命令面板显示最近一条。
- 三个示例的源码仓库分别是 `niuwoai/museterm-plugin-repo-daily`、`niuwoai/museterm-plugin-troubleshoot`、`niuwoai/museterm-plugin-recording-ledger`。索引里带编译后的 `dist/index.js`，因为宿主不编译 TypeScript。
