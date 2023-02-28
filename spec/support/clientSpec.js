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
      const closedDiv = await driver.findElement(By.id('closed'))
      const star = await driver.findElement(By.id('star'))
      const action = driver.actions({ async: true })

      await action.move({ origin: closedDiv }).click().perform()


      const display = await star.getText()
      console.log("Star's innerHTML: " + display)

      console.log("Star is displayed: " + await star.isDisplayed())
      await action.move({ origin: star }).click().perform()
      
      

      const newDisplay = await star.getText()

      if (display === 'Star Email') {
        expect(newDisplay).toBe('Starred Email')
      } else {
        expect(newDisplay).toBe('Star Email')
      }
    })
  })
})