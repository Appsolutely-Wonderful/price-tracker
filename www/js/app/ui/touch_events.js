export class LongPress {
    constructor(element, timeout=500) {
        this.element = element;
        this.timeout = timeout;

        this.registerLongPress();
    }

    onLongPress(callback) {
        this.callback = callback;
    }

    registerLongPress() {
        let listener = this;
        let timer = null;
        
        ['mousedown', 'touchstart'].forEach((e) => {listener.element.addEventListener(e, () => {
                timer = setTimeout(() => {
                    if (this.callback) {
                        this.callback();
                    }
                }, listener.timeout);
            });
        });
        // TODO: Need a better solution, I foresee performance issues with this.
        ['mouseup', 'touchend'].forEach((e) => {document.addEventListener(e, () => {
                clearTimeout(timer);
            });
        });
    }
}
