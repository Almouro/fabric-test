# RN New Arch Performance Benchmarks

This repo aims to provide different scenarios to benchmark performance difference between the new RN architecture and the old one.

## Scenario 1: Just display 10k views

- [Code](./FabricEnabled/scenarios/thousand-views/App.tsx)
- [Results](https://rn-new-arch-perf.netlify.app/a10s/manyviews/report)

### Run performance test

1. In one terminal, run `npx appium`
2. In another run `NEW_ARCH=false npx ts-node performance/manyviews.ts`
3. Then run `NEW_ARCH=true npx ts-node performance/manyviews.ts`
4. Compare results with `npx @perf-profiler/web-reporter results_*`

More details on https://github.com/bamlab/android-performance-profiler

## Scenario 2: Just display 1k texts

- [Code](./FabricEnabled/scenarios/thousand-texts/App.tsx)
- [Results](https://rn-new-arch-perf.netlify.app/a10s/manytexts/report)

### Install APKs

```
adb install apks/fabric-many-texts.apk
adb install apks/nofabric-many-texts.apk
```

### Run performance test

1. In one terminal, run `npx appium`
2. In another run `NEW_ARCH=false npx ts-node performance/manyviews.ts`
3. Then run `NEW_ARCH=true npx ts-node performance/manyviews.ts`
4. Compare results with `npx @perf-profiler/web-reporter results_*`

More details on https://github.com/bamlab/android-performance-profiler

## Scenario 3: Just display 100 tweets

- [Code](./FabricEnabled/scenarios/tweets/App.tsx)
- [Results](https://rn-new-arch-perf.netlify.app/a10s/100-tweets/report)

### Install APKs

```
adb install apks/fabric-100-tweets.apk
adb install apks/nofabric-100-tweets.apk
```

### Run performance test

1. In one terminal, run `npx appium`
2. In another run `NEW_ARCH=false npx ts-node performance/tweets.ts`
3. Then run `NEW_ARCH=true npx ts-node performance/tweets.ts`
4. Compare results with `npx @perf-profiler/web-reporter results_*`

More details on https://github.com/bamlab/android-performance-profiler

## Scenario 4: Just display 2k SVGs

- [Code](./FabricEnabled/scenarios/svg/App.tsx)
- [Results](https://rn-new-arch-perf.netlify.app/a10s/2k-svgs/report)

### Run performance test

1. In one terminal, run `npx appium`
2. In another run `NEW_ARCH=false npx ts-node performance/svg.ts`
3. Then run `NEW_ARCH=true npx ts-node performance/svg.ts`
4. Compare results with `npx @perf-profiler/web-reporter results_*`

More details on https://github.com/bamlab/android-performance-profiler

## Scenario 5: Pokedex Flatlist

- [Code](./FabricEnabled/scenarios/pokedex/App.tsx)
- [Results low end Android](https://rn-new-arch-perf.netlify.app/j3/flatlist/report)
- [Results high end Android](https://rn-new-arch-perf.netlify.app/s10/flatlist/report)

### Install APKs

```
adb install apks/fabric-flatlist.apk
adb install apks/nofabric-flatlist.apk
```

## Scenario 6: Navigation

- [Code](./FabricEnabled/scenarios/navigation/App.tsx)
- Results low end Android
  - [App start](https://rn-new-arch-perf.netlify.app/a10s/navigation/start/report)
  - [Tab navigation](https://rn-new-arch-perf.netlify.app/a10s/navigation/tabs/report)
  - [Stack navigation](https://rn-new-arch-perf.netlify.app/a10s/navigation/stack/report)
- Results high end Android (Pixel 6 Pro)
  - [App start](https://rn-new-arch-perf.netlify.app/pixel6pro/navigation/start/report)
  - [Tab navigation](https://rn-new-arch-perf.netlify.app/pixel6pro/navigation/tabs/report)
  - [Stack navigation](https://rn-new-arch-perf.netlify.app/pixel6pro/navigation/stack/report)

### Install APKs

```
adb install apks/navigation-fabric.apk
adb install apks/navigation-nofabric.apk
```

### Run performance test

1. In one terminal, run `npx appium`
2. In another run `NEW_ARCH=false npx ts-node performance/navigation.ts`
3. Then run `NEW_ARCH=true npx ts-node performance/navigation.ts`
4. Compare results with `npx @perf-profiler/web-reporter results_*`

More details on https://github.com/bamlab/android-performance-profiler

## Build APKs

1. Change scenario import in `FabricEnabled/index.js`

- At the moment, if using `navigation` scenario, you also need to `git checkout navigation`

2. Copy code to `FabricDisabled`

```shell
# Copy code
cp -R FabricEnabled/index.js FabricDisabled
cp -R FabricEnabled/scenarios FabricDisabled
```

3. Make release builds

```shell
# Run builds
cd FabricEnabled/android && ./gradlew assembleRelease
cd FabricDisabled/android && ./gradlew assembleRelease
```
