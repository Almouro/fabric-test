import { AppiumDriver } from "@bam.tech/appium-helper";
import { measurePerformance, TestCase } from "@perf-profiler/e2e";

const FABRIC_ENABLED = process.env.NEW_ARCH === "true";
const NAME_PREFIX = FABRIC_ENABLED ? "FABRIC " : "NO_FABRIC ";

const bundleId = `com.fabric${FABRIC_ENABLED ? "enabled" : "disabled"}`;
const appActivity = `${bundleId}.MainActivity`;

const getTitle = (testCaseName: string) =>
  `Results ${NAME_PREFIX} ${testCaseName}`;

const runTest = async () => {
  const driver = await AppiumDriver.create({
    appPackage: bundleId,
    appActivity: appActivity,
  });

  const testCase: TestCase = {
    beforeTest: async () => {
      driver.restartApp();
      await driver.findElementByText("BULBASAUR");
    },
    run: async () => {
      await driver.scrollDown();
      await driver.scrollDown();
      await driver.scrollDown();
      await driver.scrollDown();
      await driver.scrollDown();
    },
    duration: 20000,
  };

  (await measurePerformance(bundleId, testCase)).writeResults({
    title: getTitle("List scrolling"),
  });
};

runTest();
