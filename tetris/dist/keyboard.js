let Keyboard = (() => {
    class Keyboard {
        static assignHandler(key, action, delay = 150) {
            Keyboard.map[key] = {
                pressed: false,
                lastPressed: Date.now(),
                action,
                delay,
            };
        }
        static startKeypressInterval() {
            Keyboard.keypressInterval = setInterval(() => {
                Object.keys(Keyboard.map).forEach((key) => {
                    const { pressed, lastPressed, action, delay } = Keyboard.map[key];
                    if (pressed) {
                        const current = Date.now();
                        const delta = current - lastPressed;
                        if (delta >= delay) {
                            Keyboard.map[key].lastPressed = current;
                            action();
                        }
                    }
                });
            }, 25);
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
    Keyboard.map = {};
    return Keyboard;
})();
export default Keyboard;
//# sourceMappingURL=keyboard.js.map