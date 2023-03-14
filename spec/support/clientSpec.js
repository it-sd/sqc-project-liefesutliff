const { Builder, By } = require('selenium-webdriver')

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
