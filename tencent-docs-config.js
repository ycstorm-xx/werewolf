// ─── Tencent Docs API 配置 ───────────────────────────────────────
//  修改此文件即可更新腾讯文档同步相关的设置，
//  无需改动主程序文件。
//
//  字段说明：
//    fileId   - 腾讯文档表格的文件 ID
//    auth     - API 鉴权信息（Access-Token / Client-Id / Open-Id）
//    apiBase  - API 基础地址（file:// 直接打开时使用）
// ──────────────────────────────────────────────────────────────────

window.TENCENT_DOCS_CONFIG = {
  fileId: 'DTWhqemtzWWljQnhX',

  auth: {
    'Access-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbHQiOiIyMDVmZDM2MTQzNDI0MTRiOWM2Zjk3OThkNWI5NzI3NyIsInR5cCI6MSwiZXhwIjoxNzkwNjcyNzA4LjE0OTE2MywiaWF0IjoxNzg4MDgwNzA4LjE0OTE2Mywic3ViIjoiNzU0NGIyNmM1MzJmNGRkM2EzYTk3MWQzNzg4OWIzNTcifQ.QQuqLlCSqRk45nVe4i6o6zadyMmkr058Pj_qJmwWoHQ',
    'Client-Id': '205fd3614342414b9c6f9798d5b97277',
    'Open-Id': '7544b26c532f4dd3a3a971d37889b357'
  },

  // file:// 协议直接打开时使用的 API 地址
  apiBase: 'https://docs.qq.com/openapi/spreadsheet/v3/files'
};
