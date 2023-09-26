set -e

yarn

VERSION="$1"
ENABLE_NEW_ARCH=$2
SCENARIO=$3

release_name=${VERSION//./}
release_name=${release_name//-/}
release_name=$(echo "$release_name" | tr '[:lower:]' '[:upper:]')

NAME="RN$release_name"_newarch_"$ENABLE_NEW_ARCH"_"${SCENARIO//-/}"

# Create app
mkdir -p apps
rm -rf $NAME
cd apps
rm -rf $NAME
# npx react-native@latest init $NAME --version $VERSION
# Skip cocoapods install because it's too slow and we don't need it
yarn react-native init $NAME --version $VERSION
mv ../$NAME $NAME

# Enable Scenario
cp -R ../FabricEnabled/scenarios/$SCENARIO $NAME/scenario
cd $NAME
echo "export {default} from './scenario/App';" > App.tsx


# Install dependencies
yarn
yarn add jotai react-query @react-navigation/native react-native-screens react-native-safe-area-context @react-navigation/native-stack @react-navigation/bottom-tabs
yarn add react-native-vector-icons
# for some reason, need to add this for vector icons
sed -i '' '/android {/a\
    lintOptions {\
        checkReleaseBuilds false\
    }\
' android/app/build.gradle
sed -i '' $'s/apply plugin: "com.facebook.react"/apply plugin: "com.facebook.react"\\\n\\\nproject.ext.vectoricons = [\\\n    iconFontNames: [ \\\'EvilIcons.ttf\\\' ] \/\/ Name of the font files you want to copy\\\n]\\\napply from: "..\/..\/node_modules\/react-native-vector-icons\/fonts.gradle"/' android/app/build.gradle
yarn add date-fns

# Set light mode
sed -i -e "s/DayNight/Light/g" android/app/src/main/res/values/styles.xml
rm -f android/app/src/main/res/values/styles.xml-e

# Enable/disable new arch
sed -i -e "s/newArchEnabled=false/newArchEnabled=$ENABLE_NEW_ARCH/g" android/gradle.properties

# Build APK
cd android
./gradlew assembleRelease
mv app/build/outputs/apk/release/app-release.apk ../../../apks/$NAME.apk
