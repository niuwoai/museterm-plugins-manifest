# MuseTerm 插件索引

这是 MuseTerm 读的插件目录，不是应用仓库。新插件向这里提拉请求，不要改应用仓库。

应用读两处：

- 根目录的 `index.json`：数组，每项只有 `name`、`version`、`description`。
- `plugins/<包名>/`：与 `name` 完全一致的目录。`@example/museterm-repo-daily` 就是 `plugins/@example/museterm-repo-daily/`。

每个插件是独立的 npm 包，用自己的 `package.json` 初始化。清单写在 `package.json` 的 `museterm` 字段里，规则以 `@niuwoai/museterm-plugin` `0.1.0-rc1` 为准。

## 一个插件要满足

- `engines.museterm` 覆盖应用 `1.263.0-rc1`。`>=1.263.0` 不覆盖这个 rc，因为正式版比同号 rc 新。
- 显示名、命令标题同时有 `en` 和 `zh-Hans`。
- 权限只能是 `palette`、`terminal.fill`、`ai.suggest`、`recording.observe`。声明了命令就必须有 `palette`。
- 不写 `preinstall`、`install`、`postinstall`、`prepare`。
- 依赖不用 `file:`、`link:`、`git+`、`git:`、`github:`、`gitlab:`、`bitbucket:`。
- 入口是清单里的 `entry`，目前都是 `dist/index.js`。作者用自己的 TypeScript 编译出来；编译产物不提交，安装时再编译。

## 目前的三个

| 包 | 权限 | 做什么 |
| --- | --- | --- |
| `@example/museterm-repo-daily` | `palette`、`terminal.fill` | 填入 `git status --short`、`git log -5 --oneline`、`git branch --show-current`，不按回车 |
| `@example/museterm-troubleshoot` | `ai.suggest` | 按请求文本匹配本地短语，不读工作目录，不联网 |
| `@example/museterm-recording-ledger` | `recording.observe`、`palette` | 录制保存后记下元数据，命令面板显示最近一条 |

`@example` 是占位作者。换成真正的作者范围时，改包名、目录和 `index.json` 三处，三处保持一致。
