# sduContentionCourse

## 山东大学选课

2024.??.?? 测试可用（仅测试不会触发高频操作注销）

### 使用方法

支持必修课、选修课、限选课内能查询到的课, 辅修和重修不存在课余量限制请自行选课。

1. 在chrome进入选课系统登录后进入详细的选课页面，按F12点击 Console（控制台）；

2. 打开代码 `1.js` 前两行的两个数组表示存放抢课的课程号课序号，也是唯一一个需要修改的地方

   例如：

   ```js
   let kch = ['sd00123456', 'sd00810975', 'sd21474836'];
   let kxh = ['119', '911', '123'];
   ```

   表示需要抢 *课程号sd00123456课序号119* 的课、 *课程号sd00810975课序号911* 的课以及 *课程号sd21474836课序号123* 的课。

3. 将修改后的代码粘贴到chrome的console里面，回车执行；

4. **终止方法**：F5刷新即可。

如果发现抢的课不对，请刷新页面-退课-重新执行脚本。

由于调试时Chrome会缓存所有的请求, 会造成Chrome占用大量的内存, 解决方案是NetWork（网络）-> Ctrl+E（有个红色小按钮，点一下就灰了）

-------

update: 加入了选课请求速率限制：

```js
const REQUEST_DELAY = 5000;
const BATCH_DELAY = 10000;
```

所有请求需要延迟 `REQUEST_DELAY` 的时间（单位为毫秒），每一批次的请求会延迟 `BATCH_DELAY` 的时间（单位为毫秒），不保证其他参数下能够正确运行。