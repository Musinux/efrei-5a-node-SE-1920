const sinon = require('sinon')
sinon.test = require('sinon-test')(sinon)
const expect = require('chai').expect
const editEvent = require('../../routes/put.event.controller.js')

describe('routes/put.event.controller.js', () => {
  it('should throw an error if there is no user', sinon.test(function () {
    const req = {
      session: {}
    }

    const res = {
      json: () => {}
    }

    const next = this.spy()

    editEvent(req, res, next)

    // après l'appel de fonction, vérifier l'état de nos variables
    expect(next).to.have.property('called').equal(true)
    expect(next.firstCall.args[0]).to.be.instanceOf(Error)
    expect(next.firstCall.args[0].status).to.equal(401)
  }))

  it('should throw an error if the event was not found', sinon.test(function () {
    const req = {
      session: {
        user: {
          name: 'louis'
        }
      },
      params: {
        id: '100'
      }
    }

    const res = {
      json: () => {}
    }

    const next = this.spy()

    editEvent(req, res, next)

    // après l'appel de fonction, vérifier l'état de nos variables
    expect(next).to.have.property('called').equal(true)
    expect(next.firstCall.args[0]).to.be.instanceOf(Error)
    expect(next.firstCall.args[0].status).to.equal(404)
  }))

  it('should throw an error if the event is not owned by the user', sinon.test(function () {
    const req = {
      session: {
        user: {
          name: 'Louis'
        }
      },
      params: {
        id: '771949286'
      }
    }

    const res = {
      json: () => {}
    }

    const next = this.spy()

    editEvent(req, res, next)

    // après l'appel de fonction, vérifier l'état de nos variables
    expect(next).to.have.property('called').equal(true)
    expect(next.firstCall.args[0]).to.be.instanceOf(Error)
    expect(next.firstCall.args[0].status).to.equal(401)
  }))

  it('should return the modified event if everything is fine', sinon.test(function () {
    const req = {
      session: {
        user: {
          name: 'Thotho'
        }
      },
      params: {
        id: '771949286'
      },
      body: {
        title: 'My new title'
      }
    }

    const res = {
      json: this.spy()
    }

    const next = this.spy()

    editEvent(req, res, next)

    // après l'appel de fonction, vérifier l'état de nos variables
    expect(next).to.have.property('called').equal(false)
    expect(res.json).to.have.property('called').equal(true)
    expect(res.json.firstCall.args[0]).to.have.property('title').equal(req.body.title)
  }))
})
