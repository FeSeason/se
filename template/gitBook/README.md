# `gitbook` 主要用作功能文档集合

 已集成配置了如下插件


    "search",                       // 导航栏搜索 不支持中文
    "search-pro",                   // search-pro 高级搜索（支持中文）
    "autotheme",                    // 自动黑夜模式切换
    "insert-logo",                  // 插入logo在导航栏下方
    "advanced-emoji",               // emoji 表情支持
    "tbfed-pagefooter",             // 页脚配置
    "back-to-top-button",           // 回到顶部
    "chapter-fold",                 // 章节折叠
    "expandable-chapters-small",    // 可扩展导航章节
    "code",                         // 代码复制
    "todo",                         // 待办事项
    "page-toc-button",              // 悬浮目录
    "pageview-count",               // 访问统计
    "auto-scroll-table",            // 表格滚动条
    "popup",                        // 弹出大图
    "lightbox",                     // 单击查看图片
    "custom-favicon",               // 自定义站点图标
    "hide-element"                  // 通过配置 class 隐藏一些不想看到的元素


> 具体插件配置可参考 `book.json`

#### 文档使用

- `README.MD` 为默认页
- 所有文档需放置在 `docs` 文件夹中
- 菜单分类都在 `SUMMARY.MD`中

#### `SUMMARY.MD`结构

summary 会生成所有菜单，需要按照如下格式

```
# 一级

- [菜单名称](README.md)

### 菜单一

- [子菜单1](docs/xxxxxx路径.md)
- [子菜单2](docs/xxxxxx路径.md)
- [子菜单3](docs/xxxxxx路径.md)

### 菜单二

- [子菜单1](docs/xxxxxx路径.md)
...

```


#### 安装启动

```
- 安装插件
gitbook install

- 服务启动
gitbook serve

```

#### 部署

如果使用到 `gitlab-runner` 可参考 `.gitlab-ci.yml` 配置，未使用可忽略.