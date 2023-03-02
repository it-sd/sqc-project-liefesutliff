const { Builder, By } = require('selenium-webdriver')

describe('Passwords client', function () {
  const baseUrl = 'http://localhost:5163/'
  let driver

  describe("on '/'", function () {
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
    })
  })
})
