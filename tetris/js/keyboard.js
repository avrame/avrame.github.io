export default class Keyboard {
  static map = {};
  keypressInterval;

  static assignHandler(key, action) {
    Keyboard.map[key] = {
      pressed: false,
      lastPressed: Date.now(),
      action
    }
  }

  static startKeypressInterval() {
    Keyboard.keypressInterval = setInterval(() => {
      Object.keys(Keyboard.map).forEach(key => {
        if (Keyboard.map[key].pressed) {
          const current = Date.now();
          const delta = current - Keyboard.map[key].lastPressed;
          if (delta >= 150) {
            Keyboard.map[key].lastPressed = current;
            Keyboard.map[key].action();
          }
        }
      })
    }, 25); // 40 times a second
  }

  static stopKeypressInterval() {
    clearInterval(Keyboard.keypressInterval);
  }

  static setKeyDown(key) {
    if (Keyboard.map[key]) {
      Keyboard.map[key].pressed = true;
    }
  }
  
  static setKeyUp(key) {
    if (Keyboard.map[key]) {
      Keyboard.map[key].pressed = false;
    }
  }
}
