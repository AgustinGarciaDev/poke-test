const { Builder, By, until, Key } = require("selenium-webdriver");
const assert = require("assert");

describe("Testing search bar pokemon", function () {
  it("Encontrar pokemon", async () => {
    this.timeout(60000);
    let webDriver = new Builder().forBrowser("chrome").build();
    webDriver.manage().window().maximize();
    await webDriver.get("https://pokemon-challenge-app.netlify.app/");
    await webDriver.wait(until.elementLocated(By.css(".container")), 3000);
    await webDriver
      .findElement(
        By.css("#root > main > section.containerHero > form > label > input")
      )
      .sendKeys("p", Key.RETURN);
    const resultSearch = await webDriver
      .findElement(By.css(".textSearch"))
      .getText();
    assert.strictEqual(resultSearch, "Resultado de la busqueda");
    await webDriver.quit();
  });
  /* ------------------ */
  it("No encontrar un pokemon", async () => {
    let webDriver = new Builder().forBrowser("chrome").build();
    webDriver.manage().window().maximize();
    await webDriver.get("https://pokemon-challenge-app.netlify.app/");
    await webDriver.wait(until.elementLocated(By.css(".container")), 3000);
    await webDriver
      .findElement(
        By.css("#root > main > section.containerHero > form > label > input")
      )
      .sendKeys("pikochu", Key.RETURN);
    const resultSearch = await webDriver
      .findElement(By.css("#root > main > section:nth-child(2) > div > h3"))
      .getText();
    assert.strictEqual(resultSearch, "No se encontro el pokemon que buscaba");
    await webDriver.quit();
  });
  it("Enviar input vacio", async () => {
    let webDriver = new Builder().forBrowser("chrome").build();
    webDriver.manage().window().maximize();
    await webDriver.get("https://pokemon-challenge-app.netlify.app/");
    await webDriver.wait(until.elementLocated(By.css(".container")), 3000);
    await webDriver
      .findElement(
        By.css("#root > main > section.containerHero > form > label > input")
      )
      .sendKeys("", Key.RETURN);
    const popupError = await webDriver
      .findElement(By.css("#error > div.Toastify__toast-body"))
      .getText();
    console.log(popupError);
    assert.strictEqual(popupError, "");
    await webDriver.quit();
  });
});
