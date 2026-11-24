# MuseTerm 插件索引

这是 MuseTerm 读的插件目录，不是应用仓库。新插件向这里提拉请求，不要改应用仓库。

仓库：<https://github.com/niuwoai/museterm-plugins-manifest>

应用读两处：

- 根目录的 `index.json`：数组。每项有 `name`、`version`、`description`，以及 `repository`（`owner/repo`）。应用安装时只用前三项。
- `plugins/<包名>/`：与 `name` 完全一致的目录，里面是已经编译好的插件。`@example/museterm-repo-daily` 就是 `plugins/@example/museterm-repo-daily/`。宿主不编译 TypeScript，所以 `dist/index.js` 要随索引一起提交。

每个示例另外有自己的源码仓库。改插件先改那个仓库，再把编译结果同步回这里。

| 包 | 源码仓库 | 权限 | 做什么 |
| --- | --- | --- | --- |
| `@example/museterm-repo-daily` | [niuwoai/museterm-plugin-repo-daily](https://github.com/niuwoai/museterm-plugin-repo-daily) | `palette`、`terminal.fill` | 填入 `git status --short`、`git log -5 --oneline`、`git branch --show-current`，不按回车 |
| `@example/museterm-troubleshoot` | [niuwoai/museterm-plugin-troubleshoot](https://github.com/niuwoai/museterm-plugin-troubleshoot) | `palette`、`ai.suggest` | 按请求文本匹配本地短语，不读工作目录，不联网 |
| `@example/museterm-recording-ledger` | [niuwoai/museterm-plugin-recording-ledger](https://github.com/niuwoai/museterm-plugin-recording-ledger) | `recording.observe`、`palette` | 录制保存后记下元数据，命令面板显示最近一条 |

清单规则以 `@niuwoai/museterm-plugin` `0.1.0-rc1` 为准。

## 一个插件要满足

- `engines.museterm` 覆盖应用 `1.263.0-rc1`。`>=1.263.0` 不覆盖这个 rc，因为正式版比同号 rc 新。
- 显示名、命令标题同时有 `en` 和 `zh-Hans`。
- 权限只能是 `palette`、`terminal.fill`、`ai.suggest`、`recording.observe`。声明了命令就必须有 `palette`。
- 不写 `preinstall`、`install`、`postinstall`、`prepare`。
- 依赖不用 `file:`、`link:`、`git+`、`git:`、`github:`、`gitlab:`、`bitbucket:`。
- 入口是清单里的 `entry`，目前都是 `dist/index.js`。

`@example` 是占位作者。换成真正的作者范围时，改包名、目录、`index.json` 和源码仓库四处，四处保持一致。
