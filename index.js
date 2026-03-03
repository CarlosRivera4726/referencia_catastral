const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const path = require("path");

(async function referencia_catastral() {
  let options = new chrome.Options();

  const downloadPath = path.resolve(__dirname, "descargas");
  options.setUserPreferences({
    "plugins.always_open_pdf_externally": true,
    "download.default_directory": downloadPath,
    "savefile.default_directory": downloadPath,
    "printing.print_preview_sticky_settings.appState": JSON.stringify({
      recentDestinations: [{ id: "Save as PDF", origin: "local", account: "" }],
      selectedDestinationId: "Save as PDF",
      version: 2,
    }),
  });

  options.addArguments("--kiosk-printing");

  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  try {
    await driver.get(process.env.URL);

    const title = await driver.getTitle();

    if (title === "Consulta de Contribuyente") {
      let input = await driver.wait(
        until.elementLocated(By.name("W0034vBPRDREF")),
        10000,
      );
      await input.sendKeys(process.env.REF_CATRASTAL, Key.RETURN);

      let resultado = await driver.wait(
        until.elementLocated(
          By.xpath(`//*[contains(text(), '${process.env.REF_CATRASTAL}')]`),
        ),
        15000,
      );

      await driver.sleep(1000);
      await driver.executeScript("arguments[0].click();", resultado);

      let buttonPrint = await driver.wait(
        until.elementLocated(By.id("W0184BTNBTNIMPRIMIRDOC")),
        15000,
      );

      await driver.wait(until.elementIsVisible(buttonPrint), 10000);
      await buttonPrint.click();

      console.log("Impresión disparada, esperando descarga...");

      await driver.sleep(80000);
      console.log("Proceso terminado con éxito.");
    }
  } catch (error) {
    console.error("Algo falló:", error.message);
  } finally {
    await driver.quit();
  }
})();
