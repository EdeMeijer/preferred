/**
 * Lazy wrapper around a supplier function. Will call the supplier function once on first usage and reuse the supplied
 * value for later invocations.
 *
 * @param {Function} supplier
 * @param args optional arguments passed to the supplier function on initialization
 *
 * @return {Function} call this function to get the lazy value
 */
export default function lazy (supplier, ...args) {
    let value = null;
    let initialized = false;

    return () => {
        if (!initialized) {
            value = supplier(...args);
            initialized = true;
        }
        return value;
    }
}
