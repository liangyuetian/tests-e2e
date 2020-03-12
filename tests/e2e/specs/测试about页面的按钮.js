describe('测试about页面的按钮', () => {
    it('要有一个链接', () => {
        cy.visit('/')
        cy.get('#img').should('have.length', 1);
    });

    it('点击about按钮，进入到about页面', () => {
        cy.get('.about_link').click()
        cy.wait(200)
    })
    //
    // it('输入123', () => {
    //     cy.get('.about_input').type(123, {
    //         delay: 100
    //     })
    // })
    //
    // it('输入框里的文字是123', () => {
    //     cy.get('.about_input').should('have.value', '123')
    // })
    //
    // it('about按钮是否存在', () => {
    //     cy.get('.about_link').should('be.visible')
    //     cy.get('.about_link').should('exist') // 存在； not.exit不存在
    // })
    //
    // it('标题是否包含 page ', () => {
    //     cy.get('h1').should('contain', 'page')
    //     cy.get('h1').contains('page')
    //     cy.contains('This is an about page')
    // })
    //
    // it('标题是否不包含 page ', () => { // 其实包含，断言失败
    //     cy.get('h1').should('not.contain', 'page')
    // })
    //
    // it('截图', () => { // 其实包含，断言失败
    //     cy.screenshot('整个页面')
    //     cy.get('h1').screenshot('h1标签')
    // })
    it('attr', () => { // 其实包含，断言失败
        // expect(cy.get('.about_link')).to.have.prop('href', '#/about')
        // expect(cy.get('.about_link')).to.have.css('color', 'red')
        cy.get('.about_link').should('have.attr', 'href', '#/about')
        cy.get('.about_link').should('have.prop', 'href')
        cy.get('h1').should('have.css', 'color')
        cy.get('h1').should('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get('h1').should('have.class', 'h_')
    })
})
