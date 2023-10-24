set -e

VERSION="$1"
ENABLE_NEW_ARCH=$2
SCENARIO=$3

release_name=${VERSION//./}
release_name=${release_name//-/}
release_name=$(echo "$release_name" | tr '[:lower:]' '[:upper:]')

NAME="RN$release_name"
APP_FOLDER="$NAME"_"$ENABLE_NEW_ARCH"

mkdir -p apps
cd apps
npx react-native@latest init $APP_FOLDER --version $VERSION

cp -R ../FabricEnabled/scenarios/$SCENARIO $APP_FOLDER/scenario
cd $APP_FOLDER
echo "export {default} from './scenario/App';" > App.tsx
yarn

sed -i -e "s/newArchEnabled=false/newArchEnabled=$ENABLE_NEW_ARCH/g" android/gradle.properties

cd android
./gradlew assembleRelease
mv app/build/outputs/apk/release/app-release.apk ../../../apks/$NAME-newarch_$ENABLE_NEW_ARCH-$SCENARIO.apk
