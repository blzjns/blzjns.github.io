/**
 * Delays function execution by given threshold.
 * @param fn {Function}
 * @param delay {Integer}
 */
 let lastTime = 0;
 function throttle(fn, delay) {
     const args = arguments;
     const now = new Date();
 
     if (now - lastTime >= delay) {
         fn(...args);
         lastTime = now;
 
         setTimeout(() => {
             lastTime = 0;
         }, delay);
     }
 }
 
 // throttle(() => console.log('mas oloquinho meuuu'), 2000);
 
 export default throttle;