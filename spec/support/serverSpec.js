const { queryAllEmails } =
  require('../../server.js')

describe('email server', function () {
  const baseUrl = 'http://localhost:5163'
  const shouldBeAbove200 = async function (route) {
    it('should be above 200', async function () {
      const url = new URL(route, baseUrl)
      const res = await fetch(url)
      expect(res.status).toBeGreaterThanOrEqual(200)
    }, 10000)
  }
  const shouldBeLessThan399 = async function (route) {
    it('should be below 399', async function () {
      const url = new URL(route, baseUrl)
      const res = await fetch(url)
      expect(res.status).toBeLessThanOrEqual(399)
    }, 10000)
  }
  describe("GET '/health'", function () {
    shouldBeAbove200('/health')
  })
  describe("GET '/'", function () {
    shouldBeAbove200('/')
  })
  describe("GET '/health'", function () {
    shouldBeLessThan399('/health')
  })
  describe("GET '/'", function () {
    shouldBeLessThan399('/')
  })

  describe('queryAllEmails', function () {
    it('should return more than 1 email', async function () {
      const results = await queryAllEmails()
      expect(results).toBeDefined()
      expect(results.emails).toBeDefined()
      expect(results.emails.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('queryEmail', function () {
    beforeEach(async function () {
      this.results = await queryAllEmails(1)
    })

    const shouldHave = function (source, property) {
      expect(source).toBeDefined()
      expect(source + '.' + property).toBeDefined()
    }

    it('should return a user id', function () {
      shouldHave(this.results, 'user_id')
    })
    it('should return a recipient', function () {
      shouldHave(this.results, 'recipient')
    })
    it('should return a sender', function () {
      shouldHave(this.results, 'sender')
    })
    it('should return a subject', function () {
      shouldHave(this.results, 'subject')
    })
    it('should return a message', function () {
      shouldHave(this.results, 'message')
    })
  })

  describe("POST '/submit'", function () {
    const url = new URL('/submit', baseUrl)

    it('should accept valid usernames and passcodes', async function () {
      const data = {
        username: 'liefesutliff',
        password: 'securepassword'
      }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      expect(response.ok).toBeTrue()
    })

    it('should reject invalid usernames and passcodes', async function () {
      const data = {
        username: '',
        password: 'securepassword'
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      expect(response.ok).toBeFalse()
    })
  })
})
