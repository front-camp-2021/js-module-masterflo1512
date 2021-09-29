export const debounce = (fn, delay = 0) => {
    let timeout;

    return (...rest) => {
        if (timeout !== undefined) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            fn(...rest);
        }, delay);
    };
}


