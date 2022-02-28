# Fabric test

Design heavily inspired by [this project](https://github.com/MatheusPires99/pokedex)

Quick POC to compare performance with and without Fabric.

On Android disable Fabric by setting `newArchEnabled=false` in `android/gradle.properties`

Weirdly, performance is worse with Fabric, the FlatList becomes non scrollable (which is symptomatic of the JS thread being clogged)... What did I miss? 🤔

Worth mentioning the thread with the highest CPU usage isn't even the JS thread, it's a thread called "pool-5-thread-1", probably used by Fabric.


| With Fabric                                                                                                     | Without Fabric                                                                                                     |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
|![retry-fabric](https://user-images.githubusercontent.com/4534323/156025929-44a5445d-ccd5-463f-a31a-53923b4e23ab.gif)|![retry-notfabric](https://user-images.githubusercontent.com/4534323/156025949-65ba240a-596f-42c4-99c0-6602fab4b422.gif)|
