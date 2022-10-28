import { AppiumDriver } from "@bam.tech/appium-helper";
import { measurePerformance, TestCase } from "@perf-profiler/e2e";
import { createStartAppTestCase } from "@perf-profiler/appium-test-cases";

const FABRIC_ENABLED = process.env.NEW_ARCH === "true";
const NAME_PREFIX = FABRIC_ENABLED ? "FABRIC " : "NO_FABRIC ";

const bundleId = `com.fabric${FABRIC_ENABLED ? "enabled" : "disabled"}`;
const appActivity = `${bundleId}.MainActivity`;

const getTitle = (testCaseName: string) =>
  `${testCaseName} - New Arch ${FABRIC_ENABLED ? "ENABLED ✅" : "DISABLED ❌"}`;

const runNavigationPerformanceTest = async () => {
  const driver = await AppiumDriver.create({
    appPackage: bundleId,
    appActivity: appActivity,
  });

  const startAppTestCase = createStartAppTestCase({
    driver,
    waitForAppStart: () => driver.findElementByText("Dernier rappel"),
  });

  (await measurePerformance(bundleId, startAppTestCase)).writeResults({
    title: getTitle("Start app"),
  });

  const tabNavigationTestCase: TestCase = {
    beforeTest: async () => {
      await startAppTestCase.beforeTest?.();
      await startAppTestCase.run();
    },
    run: async () => {
      // Navigate through tabs 3 times for funsies
      for (let index = 0; index < 3; index++) {
        await driver.clickElementByText("Likes");
        await driver.findElementByText("Réservez-vos places");

        await driver.clickElementByText("Media");
        await driver.findElementByText("Conclusion de");

        await driver.clickElementByText("Replies");
        await driver.findElementByText("talking about Reactotron");

        await driver.clickElementByText("Tweets");
        await driver.findElementByText("Dernier rappel");
      }
    },
    duration: 30000,
  };

  (await measurePerformance(bundleId, tabNavigationTestCase)).writeResults({
    title: getTitle("Tab navigation"),
  });

  const stackNavigationTestCase: TestCase = {
    beforeTest: async () => {
      await startAppTestCase.beforeTest?.();
      await startAppTestCase.run();
    },
    run: async () => {
      // Navigate through tabs twice
      await driver.clickElementByText("SAVE THE DATE");
      await driver.findElementByText("means nothing to you");
      await driver.clickElementByText("means nothing to you");
      await driver.findElementByText("Wish to concretely fix");
      await driver.clickElementByText("Wish to concretely fix");
      await driver.findElementByText("Notre méthode de Conception");
      await driver.clickElementByText("Notre méthode de Conception");
      await driver.findElementByText("Thrilled to be part");
      await driver.clickElementByText("Thrilled to be part");
      await driver.findElementByText("Deep dive into");
      await driver.clickElementByText("Deep dive into");
      await driver.findElementByText("It is OOOOOoooon");
      await driver.clickElementByText("It is OOOOOoooon");
      await driver.findElementByText("NEW ARTICLES");
      await driver.clickElementByText("NEW ARTICLES");
      await driver.findElementByText("Nouvel article BAM");
      await driver.clickElementByText("Nouvel article BAM");
      await driver.findElementByText("Proud to announce that");
      await driver.clickElementByText("Proud to announce that");
      await driver.findElementByText("Le Lean engineering");

      await driver.client.back();
      await driver.client.back();
      await driver.client.back();
      await driver.client.back();
      await driver.client.back();
      await driver.client.back();
      await driver.client.back();
      await driver.client.back();
      await driver.client.back();
      await driver.client.back();

      await driver.findElementByText("Dernier rappel");
    },
    duration: 45000,
  };

  (await measurePerformance(bundleId, stackNavigationTestCase)).writeResults({
    title: getTitle("Stack navigation"),
  });
};

runNavigationPerformanceTest();
