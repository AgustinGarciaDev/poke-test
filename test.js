const { Builder, By, until, Key } = require("selenium-webdriver");
const assert = require("assert");

describe("Testing search bar pokemon", function () {
  this.timeout(40000);
  it("Encontrar pokemon", async () => {
    let webDriver = new Builder().forBrowser("chrome").build();
    webDriver.manage().window().maximize();
    await webDriver.get("https://pokemon-challenge-app.netlify.app/");
    await webDriver.sleep(2000);
    await webDriver
      .findElement(
        By.css("#root > main > section.containerHero > form > label > input")
      )
      .sendKeys("p", Key.RETURN);
    await webDriver.sleep(2000);
    const resultSearch = await webDriver
      .findElement(By.css("#root > main > section:nth-child(2) > h3"))
      .getText();
    await webDriver.sleep(2000);
    assert.strictEqual(resultSearch, "Resultado de la búsqueda");
    await webDriver.quit();
  });
  it("No encontrar un pokemon", async () => {
    let webDriver = new Builder().forBrowser("chrome").build();
    await webDriver.sleep(2000);
    webDriver.manage().window().maximize();
    await webDriver.sleep(2000);
    await webDriver.get("https://pokemon-challenge-app.netlify.app/");
    await webDriver.wait(until.elementLocated(By.css(".container")), 3000);
    await webDriver.sleep(2000);
    await webDriver
      .findElement(
        By.css("#root > main > section.containerHero > form > label > input")
      )
      .sendKeys("pikochu", Key.RETURN);
    await webDriver.sleep(2000);
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
    await webDriver.sleep(2000);
    await webDriver.wait(until.elementLocated(By.css(".container")), 3000);
    await webDriver
      .findElement(
        By.css("#root > main > section.containerHero > form > label > input")
      )
      .sendKeys("", Key.RETURN);
    await webDriver.sleep(2000);
    const popupError = await webDriver
      .findElement(By.css("#error > div.Toastify__toast-body"))
      .getText();
    console.log(popupError);
    assert.strictEqual(popupError, "Debe ingresar el nombre de un pokemon");
    await webDriver.sleep(2000);
    await webDriver.quit();
  });
});
