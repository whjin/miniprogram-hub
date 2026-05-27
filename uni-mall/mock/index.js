import Mock from "mockjs";

// 基础返回格式（适配 request.js 中的 success 校验）
const baseResponse = (data, success = true, message = "操作成功") => ({
  success,
  message,
  data,
});

// ====================== 视频相关接口 ======================
// 热播视频列表 /video/list
Mock.mock(/\/api\/video\/list/, "get", () => {
  return baseResponse({
    list: Mock.mock({
      "array|10-20": [
        {
          "id|+1": 1, // 自增 ID
          title: "@ctitle(8, 16)", // 视频标题
          cover: "@image(320x180, #ccc, #fff, 视频封面)", // 封面图
          playCount: "@integer(1000, 1000000)", // 播放量
          duration: '@time("mm:ss")', // 视频时长
          author: "@cname()", // 作者
          createTime: '@datetime("yyyy-MM-dd HH:mm:ss")', // 创建时间
        },
      ],
    }).array,
    total: Mock.integer(100, 500), // 总条数
  });
});

// 视频弹幕列表 /video/danmu
Mock.mock(/\/api\/video\/danmu/, "get", (options) => {
  const { videoId } = JSON.parse(options.body || "{}"); // 获取请求参数
  return baseResponse({
    list: Mock.mock({
      "array|20-50": [
        {
          "id|+1": 1,
          videoId,
          content: "@cparagraph(1, 3)", // 弹幕内容
          time: "@float(0, 120, 1, 2)", // 弹幕出现时间（秒）
          author: "@cname()",
          color: "@color()", // 弹幕颜色
        },
      ],
    }).array,
  });
});

// ====================== 用户相关接口 ======================
// 用户登录 /sys/login
Mock.mock(/\/api\/sys\/login/, "post", (options) => {
  const { username, password } = JSON.parse(options.body || "{}");
  // 模拟登录校验（仅示例）
  if (username === "admin" && password === "123456") {
    return baseResponse({
      token: Mock.guid(), // 登录令牌
      userInfo: {
        id: Mock.integer(10000, 99999),
        username: "@cname()",
        avatar: "@image(64x64, #eee, #000, 头像)",
        role: "user",
      },
    });
  } else {
    return baseResponse(null, false, "用户名或密码错误");
  }
});

// 关注用户 /user/follow
Mock.mock(/\/api\/user\/follow/, "get", (options) => {
  const { userId } = JSON.parse(options.body || "{}");
  return baseResponse({
    followStatus: true, // 关注状态
    followId: Mock.integer(1000, 9999),
    userId,
  });
});

// 发表评论 /user/article/comment
Mock.mock(/\/api\/user\/article\/comment/, "post", (options) => {
  const { articleId, content } = JSON.parse(options.body || "{}");
  return baseResponse({
    commentId: Mock.integer(10000, 99999),
    articleId,
    content,
    createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
  });
});

// 用户点赞 /user/praise
Mock.mock(/\/api\/user\/praise/, "get", (options) => {
  const { targetId, type } = JSON.parse(options.body || "{}"); // type: article/video
  return baseResponse({
    praiseStatus: true,
    targetId,
    type,
    praiseCount: Mock.integer(100, 10000), // 点赞数
  });
});

// 用户收藏 /user/collect
Mock.mock(/\/api\/user\/collect/, "get", (options) => {
  const { targetId, type } = JSON.parse(options.body || "{}");
  return baseResponse({
    collectStatus: true,
    targetId,
    type,
    collectId: Mock.integer(1000, 9999),
  });
});

// ====================== 热搜相关接口 ======================
// 热搜标签 /hot/tabs
Mock.mock(/\/api\/hot\/tabs/, "get", () => {
  return baseResponse({
    list: Mock.mock({
      "array|5-8": [
        {
          "id|+1": 1,
          name: "@ctitle(2, 4)", // 标签名
          type: "@integer(1, 10)", // 标签类型
        },
      ],
    }).array,
  });
});

// 热搜文章列表 /hot/list
Mock.mock(/\/api\/hot\/list/, "get", (options) => {
  const { type } = JSON.parse(options.body || "{}");
  return baseResponse({
    list: Mock.mock({
      "array|10-20": [
        {
          "id|+1": 1,
          title: "@ctitle(8, 20)",
          summary: "@cparagraph(1, 2)",
          cover: "@image(300x200, #ccc, #fff, 文章封面)",
          author: "@cname()",
          readCount: "@integer(100, 10000)",
          type,
          createTime: '@datetime("yyyy-MM-dd")',
        },
      ],
    }).array,
    total: Mock.integer(100, 500),
  });
});

// ====================== 文章相关接口 ======================
// 文章详情 /article/details
Mock.mock(/\/api\/article\/details/, "get", (options) => {
  const { articleId } = JSON.parse(options.body || "{}");
  return baseResponse({
    id: articleId,
    title: "@ctitle(10, 20)",
    content: "@cparagraph(10, 30)", // 文章内容
    cover: "@image(750x300, #ccc, #fff, 文章头图)",
    author: {
      id: Mock.integer(10000, 99999),
      name: "@cname()",
      avatar: "@image(64x64, #eee, #000, 作者头像)",
    },
    readCount: "@integer(1000, 100000)",
    praiseCount: "@integer(100, 10000)",
    commentCount: "@integer(10, 1000)",
    createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
  });
});

// 文章评论列表 /article/comment/list
Mock.mock(/\/api\/article\/comment\/list/, "get", (options) => {
  const { articleId, page = 1, size = 10 } = JSON.parse(options.body || "{}");
  return baseResponse({
    list: Mock.mock({
      "array|0-10": [
        {
          "id|+1": (page - 1) * size + 1,
          articleId,
          content: "@cparagraph(1, 3)",
          author: {
            id: Mock.integer(10000, 99999),
            name: "@cname()",
            avatar: "@image(64x64, #eee, #000, 评论人头像)",
          },
          createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
          replyCount: "@integer(0, 10)",
        },
      ],
    }).array,
    total: Mock.integer(50, 200),
    page,
    size,
  });
});

// ====================== 搜索相关接口 ======================
// 默认搜索内容 /search/default-text
Mock.mock(/\/api\/search\/default-text/, "get", () => {
  return baseResponse({
    text: "@ctitle(2, 6)", // 默认搜索词
  });
});

// 热搜搜索列表 /search/hot-list
Mock.mock(/\/api\/search\/hot-list/, "get", () => {
  return baseResponse({
    list: Mock.mock({
      "array|10-15": [
        {
          "rank|+1": 1, // 排名
          text: "@ctitle(2, 8)", // 热搜词
          hotValue: "@integer(10000, 1000000)", // 热度值
        },
      ],
    }).array,
  });
});

// 搜索结果 /search
Mock.mock(/\/api\/search/, "get", (options) => {
  const { keyword, page = 1, size = 10 } = JSON.parse(options.body || "{}");
  return baseResponse({
    list: Mock.mock({
      "array|0-10": [
        {
          "id|+1": (page - 1) * size + 1,
          type: "@integer(1, 2)", // 1=文章 2=视频
          title: Mock.Random.ctitle(8, 20).replace(
            new RegExp(keyword, "g"),
            `<span style="color:red">${keyword}</span>`,
          ), // 关键词标红
          summary: "@cparagraph(1, 2)",
          cover: "@image(300x200, #ccc, #fff, 封面)",
          author: "@cname()",
          createTime: '@datetime("yyyy-MM-dd")',
        },
      ],
    }).array,
    total: Mock.integer(0, 200),
    page,
    size,
    keyword,
  });
});

export default Mock;
