// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
    it('Visits the app root url', () => {
        // cy.visit('/')
        // cy.contains('h1', 'Welcome to Your Vue.js + TypeScript App')
        expect('Jane1').to.not.equal('Jane')
        expect({name: 'Jane'}).to.deep.equal({name: 'Jane'})

        expect({name: 1, age: 2, s: 2}).to.have.any.keys('name', 'age')

        expect({name: 1, age: 2}).to.have.all.keys('name', 'age')
        expect('test').to.be.a('string')
        expect([1, 2, 3]).to.include(2)
        expect([{}, 1, 2, 3]).to.include({})
        expect(undefined).to.not.be.ok
        expect(true).to.be.true
        expect(1).to.exist
        expect([]).to.be.empty
        expect({}).to.be.empty


        expect(42).to.equal(42)
        expect({name: 'Jane'}).to.deep.equal({name: 'Jane'})
        expect({name: 'Jane'}).to.eql({name: 'Jane'})

        // 别名
        expect(10).to.be.gt(9)
        expect(10).to.be.above(9)
        expect(10).to.be.greaterThan(9)
        // 别名
        expect(10).to.be.at.least(10)

        // 小于
        expect(10).to.be.at.lt(11)
        expect(10).to.be.at.below(11)
        expect(10).to.be.at.lessThan(11)

        expect(7).to.be.within(5, 10)

        expect({name: 1, age: 2}).to.have.property('name')
        expect(() => { throw new Erroe('抛出错误') }).to.throw(Error)
    })
})
