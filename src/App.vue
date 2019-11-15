<template>
  <div id="app">
    <transition name="transitionRouter" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="less">
html,
body,
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  &::selection {
    background: none !important;
  }
  &::-webkit-scrollbar {
    width: 2px;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.4);
    background: #061b34;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background: rgba(0, 0, 0, 0);
  }
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #2c3e50;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
.transitionRouter-enter-active,
.transitionRouter-leave-active {
  transition: all 0.4s;
}
.transitionRouter-enter {
  transform: translate3d(100%, 0, 0);
}

.transitionRouter-leave {
  transform: translateX(-100%);
}
</style>
