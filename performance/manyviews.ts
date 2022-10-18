import { AppiumDriver } from "@bam.tech/appium-helper";
import { measurePerformance, TestCase } from "@perf-profiler/e2e";

const FABRIC_ENABLED = process.env.NEW_ARCH === "true";
const NAME_PREFIX = FABRIC_ENABLED ? "FABRIC " : "NO_FABRIC ";

const bundleId = `com.fabric${FABRIC_ENABLED ? "enabled" : "disabled"}`;
const appActivity = `${bundleId}.MainActivity`;

const getTitle = (testCaseName: string) =>
  `Results ${NAME_PREFIX} ${testCaseName}`;

const runThousandViewPerformanceTest = async () => {
  const driver = await AppiumDriver.create({
    appPackage: bundleId,
    appActivity: appActivity,
  });

  const thousandViewsTestCase: TestCase = {
    beforeTest: async () => {
      driver.stopApp();
      await driver.wait(3000);
    },
    run: async () => {
      driver.startApp();
      // Sadly it seems we have too many views for poor Appium to give us a TTI
      // await driver.findElementById("VIEW_9999");
    },
    duration: 20000,
  };

  (await measurePerformance(bundleId, thousandViewsTestCase, 1)).writeResults({
    title: getTitle("MANY VIEWS - Start app"),
  });
};

runThousandViewPerformanceTest();
