import { AppiumDriver } from "@bam.tech/appium-helper";
import { measurePerformance, TestCase } from "@perf-profiler/e2e";

const FABRIC_ENABLED = process.env.NEW_ARCH === "true";
const NAME_PREFIX = FABRIC_ENABLED ? "FABRIC " : "NO_FABRIC ";

const bundleId = `com.fabric${FABRIC_ENABLED ? "enabled" : "disabled"}`;
const appActivity = `${bundleId}.MainActivity`;

const getTitle = (testCaseName: string) =>
  `Results ${NAME_PREFIX} ${testCaseName}`;

const runTweetsPerformanceTest = async () => {
  const driver = await AppiumDriver.create({
    appPackage: bundleId,
    appActivity: appActivity,
  });

  const thousandViewsTestCase: TestCase = {
    beforeTest: async () => {
      driver.stopApp();
      await driver.wait(3000);
      driver.startApp();
      await driver.findElementByText("SHOW TWEETS");
    },
    run: async () => {
      await driver.clickElementByText("SHOW TWEETS");
      await driver.findElementByText("SAVE THE DATE");
      // Alternatively, use this instead
      // await driver.findElementById("TWEET_1577283668665856001");
    },
    duration: 10000,
  };

  (await measurePerformance(bundleId, thousandViewsTestCase)).writeResults({
    title: getTitle("Showing 100 Tweets"),
  });
};

runTweetsPerformanceTest();
