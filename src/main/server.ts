// 启动 Express 服务器
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs').promises // 用于文件操作
// let server;
export default function () {
  const app = express()
  const port = 3000
  // 允许跨域（开发环境用）
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
    // console.log(req)
  })

  // 或者自定义配置 CORS
  const corsOptions = {
    origin: '*', // 允许访问的来源
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
  }

  app.use(cors(corsOptions))

  // 静态文件服务（可选）
  app.use(express.static(path.join(__dirname, '../../resources')))

  // 示例接口：读取本地文件
  app.get('/api/setting', async (req, res) => {
    try {
      const data = await fs.readFile(
        path.join(__dirname, '../../resources/config/setting.json'),
        'utf8'
      )
      res.json({ content: data })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: '读取文件失败' })
    }
  })

  app.listen(port, 'localhost', () => {
    console.log(`本地服务运行在 http://localhost:${port}`)
  })
}
