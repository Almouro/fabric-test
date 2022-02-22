# Fabric test

Design heavily inspired by [this project](https://github.com/MatheusPires99/pokedex)

Quick POC to compare performance with and without Fabric.

On Android disable Fabric by setting `newArchEnabled=false` in `android/gradle.properties`

Weirdly, performance is worse with Fabric, the FlatList becomes non scrollable (which is symptomatic of the JS thread being clogged)... What did I miss? 🤔

Worth mentioning the thread with the highest CPU usage isn't even the JS thread, it's a thread called "pool-5-thread-1", probably used by Fabric.


| With Fabric                                                                                                     | Without Fabric                                                                                                     |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| ![fabric](https://user-images.githubusercontent.com/4534323/155100122-1c9ca8ce-adce-4c3c-afba-e19b7b2d2aa7.gif) | ![notfabric](https://user-images.githubusercontent.com/4534323/155100135-3722654a-e993-49d2-b2c3-0ee39a546542.gif) |
