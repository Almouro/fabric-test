# Fabric test

Design heavily inspired by [this project](https://github.com/MatheusPires99/pokedex)

Quick POC to compare performance with and without Fabric.

On Android disable Fabric by setting `newArchEnabled=false` in `android/gradle.properties`

Weirdly, performance is worse with Fabric, the FlatList becomes non scrollable (which is symptomatic of the JS thread being clogged)... What did I miss? 🤔

Worth mentioning the thread with the highest CPU usage isn't even the JS thread, it's a thread called "pool-5-thread-1", probably used by Fabric.


| With Fabric                                                                                                     | Without Fabric                                                                                                     |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
|![retry-fabric](https://user-images.githubusercontent.com/4534323/156025605-a0ee0ecd-afbf-4121-a312-860d924cca31.gif)|![retry-notfabric](https://user-images.githubusercontent.com/4534323/156025627-1a303f6e-b854-4b42-897a-4ab08d09d899.gif)|
