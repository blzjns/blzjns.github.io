/**
 * Delays function execution by given threshold.
 * @param fn {Function}
 * @param delay {Integer}
 */

const debounce = (fn, delay) => {
    let debounceInterval;

    return function () {
        const context = this;
        const args = arguments;

        clearTimeout(debounceInterval);

        debounceInterval = setTimeout(
            () => fn.apply(context, args),
            delay
        );
    }
}

export default debounce;
