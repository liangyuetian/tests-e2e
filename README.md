# [cypress 常用api](https://docs.cypress.io/api/api/table-of-contents.html)

### 元素的查找,值的获取
	
元素的查找

	* cy.get('.class') 寻找某个元素
	* cy.get('.class').find('.edit') 在某个元素下寻找
	* cy.get('.class').contains('标题') 寻找文字
	* cy.get('.my-slow-selector', { timeout: 10000 }) 在元素为挂载时提前查找

值的获取与断言

```js
cy.get('#num').then(($span) => {
  const num1 = parseFloat($span.text())
  cy.get('button').click().then(() => {
    const num2 = parseFloat($span.text())
    expect(num2).to.eq(num1 + 1)
  })
})
// 使用的原因const是因为$span对象是可变的。每当您有可变的对象并试图比较它们时，就需要存储它们的值。使用const是实现此目的的完美方法。
```

### 元素的事件

	* cy.get('.element').click() 点击DOM元素。
	* cy.get('.element').dblclick() 双击DOM元素。
	* cy.get('.element').rightclick() 右键单击DOM元素。
	* cy.get('.element').blur() DOM元素失去焦点。
	* cy.get('.element').focus() DOM元素获取。
	* cy.get('.element').clear() 清除输入或文本区域的值。
	* cy.get('.element').check() 选中复选框或单选按钮。
	* cy.get('.element').uncheck() 取消选中复选框。
	* cy.get('.element').select() 在中选择<option>一个<select>
	* cy.get('.element').trigger() 强制触发DOM上绑定的事件

### 表单的输入

    * cy.get('.element').type('123') 在输入框内输入 123，默认每输入一个字符间隔10ms

[元素能见度原则](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Visibility)
[元素点击坐标 <code>cy.get('button').click({ position: 'topLeft' })</code>](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Coordinates)
[强制事件发生 <code>cy.get('button').click({ force: true })</code>](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Debugging)

### debugger 
您“查看”并调试Cypress认为元素不可见的唯一方法是使用debugger语句。
```typescript
cy.get('button').debug().click()
```

### 设置别名

别名有一个很方便的好处，在虚拟dom更新时如果绑定的key改变，那么元素会被替换，
但是我们可能还需要查找这个元素，这个时候别名引用的dom为空了，这是cypress会重新运行设置别名的语句，让别名生效，相当于vue中的refs，react中的ref

普通别名
```js
// 设置别名为 rows
cy.get('table').find('tr').as('rows')

// 使用 @ 符号访问别名
cy.get('@rows').first().click()
```

路由别名，等待路由跳转完成后操作
```js
cy.server()
cy.route('POST', '/users', { id: 123 }).as('postUser')

cy.get('form').submit()
// wait 等待异步操作完成
cy.wait('@postUser').its('requestBody').should('have.property', 'name', 'Brian')

cy.contains('Successfully created user: Brian')
```

http别名，等待http请求完成后
```js
cy.request('https://jsonplaceholder.cypress.io/comments').as('comments')

cy.get('@comments').should((response) => {
  if (response.status === 200) {
      expect(response).to.have.property('duration')
    } else {
      // whatever you want to check here
    }
  })
})
```

别名可以在this上获取

```js
beforeEach(function () {
  // fixture 可以加载文件中的数据
  cy.fixture('users.json').as('users')
})

it('utilize users in some way', function () {
  const user = this.users[0]

  cy.get('header').should('contain', user.name)
})
```

播放mp3

```js
cy.fixture('audio/sound.mp3', 'base64').then((mp3) => {
  const uri = 'data:audio/mp3;base64,' + mp3
  const audio = new Audio(uri)

  audio.play()
})
```

### 条件测试

如果dom是不断变化的，比如class的改变等，当需要某一个状态存在的时候进行接下来的测试
解决方法可以使用断言
```js
cy.get('html').should('have.attr', 'data-campaign').then((campaign) => {
    return campaigns.test(campaign)
})
```

# 断言

### Chai BDD断言
    
    * 是否相等
    * not expect(name).to.not.equal('Jane') 断言 2个字符相等
    * deep expect(obj).to.deep.equal({ name: 'Jane' }) 断言对象的深度对比是否一样
    * nested expect({a: {b: ['x', 'y']}}).to.(have.)nested.include({'a.b[1]': 'y'}) 断言对象的某个值是否一样; have可以判断是存在
    * equal expect(42).to.equal(42) 期望是否一样
    * deep.equal(value) expect({ name: 'Jane' }).to.deep.equal({ name: 'Jane' }) 深度对比
    * eql expect({ name: 'Jane' }).to.eql({ name: 'Jane' }) 是否相等
    * lengthOf expect('test').to.have.lengthOf(3) 判断长度

    * 是否存在
    * any expect(arr).to.have.any.keys('name', 'age') 断言是否存在某个属性
    * all expect(arr).to.have.all.keys('name', 'age') 断言是否只存在这两个属性
    * exist expect(myVar).to.exist 判断是否为存在
    * include expect([1,2,3]).to.include(2) 断言数组中是否存在某个元素，如果是引用类型， 字面量一样即可 []===[] {}==={}
    * deep.property expect({name: 1, age: 2}).to.have.property('name') 断言是否存在某个属性
    * deep.property expect(deepObj).to.have.deep.property('tests[1]', 'e2e') 断言是否存在某个属性
    * expect('testing').to.have.string('test') 是否包含
    * match expect('testing').to.match(/^test/) 正则匹配

    * 真假
    * a(type) expect('test').to.be.a('string') 断言属性的类型
    * ok expect(undefined).to.not.be.ok 判断是否为真值
    * true expect(true).to.be.true 判断是否为 true，false，null，undefined，arguments 同理
    * empty expect([]).to.be.empty 判断是否为空
    
    * 比较
    * greaterThan expect(10).to.be.greaterThan(9) 前面的数要 大于 后面的
    * least expect(10).to.be.at.least(10) 前面的数要 大于等于 后面的
    * lessThan expect(5).to.be.lessThan(10) 小于
    * within expect(7).to.be.within(5,10) 区间
    * expect([1, 2, 3]).to.be.instanceOf(Array) 判断原型

    * throw expect(() => {throw new Erroe('抛出错误')}).to.throw(Error) 断言是否抛出错误

### css 断言
    
    * have.attr cy.get('.about_link').should('have.attr', 'href', [option]) 是否存在某种属性
    * have.prop cy.get('.about_link').should('have.prop', 'href') 是否存在某个属性
    * have.css cy.get('h1').should('have.css', 'color', 'rgb(255, 0, 0)') 
    * have.class cy.get('h1').should('have.class', 'h_') 
    * have.id cy.get('h1').should('have.id', 'h_') 
    * have.html 
    * have.text 
    * have.value 
    * have.visible 
    * have.hidden 
    * have.selected 
    * have.checked 
    * have.enabled 
    * have.disabled 
    * have.empty 
    * have.exist 
    * have.match 
    * have.contain 包含
    * have.descendants 子孙
    * have.length 元素有几个
    * have.visible 元素是否可见
    
    * Should 可以传入回调函数 https://docs.cypress.io/api/commands/should.html#Function


### cypress.json 可配置项

    * https://docs.cypress.io/zh-cn/guides/references/configuration.html
    * baseUrl url用作cy.visit()或cy.request()命令的url前缀
    * env 要设置为环境变量的任何值
    * ignoreTestFiles 忽略文件
    * numTestsKeptInMemory 快照和命令数据将保存在内存中的测试数量。如果在测试运行期间浏览器的内存消耗很高，请减少这个数字。
    * port 	用于托管Cypress的端口。通常这是一个随机生成的端口。
    * reporter 输出html的规范，报告生成器在cypress run时使用
    * reporterOptions 使用的报告生成器选项。所支持的选项取决于报告生成器。
    * testFiles 要加载的字符串glob模式的测试文件
    * watchForFileChanges Cypress是否会在测试文件更改时监视并重新启动测试
    * screenshotsFolder 截屏
    * trashAssetsBeforeRuns 视频
    * defaultCommandTimeout 超时时间
    * chromeWebSecurity 是否启用同源策略
    * viewportHeight 视口
    
### 最佳实践
    
[https://docs.cypress.io/zh-cn/guides/references/best-practices.html](https://docs.cypress.io/zh-cn/guides/references/best-practices.html)
