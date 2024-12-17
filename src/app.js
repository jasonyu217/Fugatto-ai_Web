const express = require('express');
const app = express();
const speechCallbackRouter = require('./services/speechCallback');

// 添加回调路由
app.use('/api', speechCallbackRouter);

// ... 其他导入

// ... 现有代码

app.listen(3000, () => {
  console.log('Server is running on port 3000');
}); 