// 匹配规则:"匹配路径（同时匹配data上面的数据）"
// eg ：/project 外面请求的路径
// /project_comments 对应是 db.js 上面要返回的数据
module.exports = {
  "/project": "/project_comments",
  "/comment/add.action": "/push_comment",
};
