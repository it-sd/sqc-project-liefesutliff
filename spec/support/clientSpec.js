const { Builder, By } = require('selenium-webdriver')

describe('Passwords client', function () {
  const baseUrl = 'http://localhost:5163/'
  let driver

  describe("on '/'", function () {
describe('client', function () {
  describe('email', function () {
    const baseUrl = 'http://localhost:5163/compose'
    let driver

    beforeEach(async function () {
      driver = await new Builder().forBrowser('firefox').build()
      await driver.get(baseUrl)
    })

    afterEach(async function () {
      await driver.quit()
    })

    it('should set the value in the star column equal to the opposite of what it is', async function () {
      const closedDiv = await driver.findElement(By.id('closed')).getRect()
      const star = await driver.findElement(By.id('star'))
      const action = driver.actions({ async: true })

      await action.move({ x: closedDiv.x + 1, y: closedDiv.y + 1 }).click().perform()

      const oldDisplay = await star.getText()

      await action.move({ origin: star }).click().pause(1000).perform()

      await driver.actions()

      const display = await star.getText()

      if (oldDisplay === 'Star Email') {
        expect(display).toBe('Starred Email')
      } else {
        expect(display).toBe('Star Email')
      }
    it('should contain recipient', async function () {
      const details = await driver.findElement(By.id('recipient'))
      expect(details).toBeDefined()
    })

    it('should contain sender', async function () {
      const details = await driver.findElement(By.id('sender'))
      expect(details).toBeDefined()
    })

    it('should contain subject', async function () {
      const details = await driver.findElement(By.id('subject'))
      expect(details).toBeDefined()
    })

    it('should contain message', async function () {
      const details = await driver.findElement(By.id('message'))
      expect(details).toBeDefined()
    })

    it('should send email successfully', async function () {
      await driver.findElement(By.id('recipient')).sendKeys('lsutliff@student.cvtc.edu')
      await driver.findElement(By.id('sender')).sendKeys('lsutliff@student.cvtc.edu')
      await driver.findElement(By.id('subject')).sendKeys('lsutliff@student.cvtc.edu')
      await driver.findElement(By.id('message')).sendKeys('lsutliff@student.cvtc.edu')
      const details = await driver.findElement(By.id('sendEmail'))
      await details.click()
      const actions = driver.actions()
      await actions.pause(3000).perform()
      const isSent = await driver.findElement(By.id('statusMessage')).getText()
      expect(isSent).toBe('Message sent!')
    })
  })
})
