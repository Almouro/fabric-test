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

  const svgTestCase: TestCase = {
    beforeTest: async () => {
      driver.stopApp();
      await driver.wait(3000);
      driver.startApp();
      await driver.findElementByText("SHOW");
    },
    run: async () => {
      await driver.clickElementByText("SHOW");
    },
    duration: 5000,
  };

  (await measurePerformance(bundleId, svgTestCase)).writeResults({
    title: getTitle("2k SVG"),
  });
};

runTweetsPerformanceTest();
