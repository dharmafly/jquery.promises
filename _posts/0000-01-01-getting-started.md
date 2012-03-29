Asynchronous code in JavaScript is often handled with nested callback functions.
This works fine, but can easily lead to messy and tightly-coupled code. Promises are a useful design pattern that allow flexible flow control without deeply nested callbacks.

Promise objects have multiple states that range from unfulfilled to either
fulfilled or failed.

As of jQuery v1.5, all of jQuery's AJAX methods, such as jQuery.get, return a
promise object that can be hooked up with various asynchronous functions that will
fire when the promise is fulfilled or fails.

jQuery.Deferred can be used to create custom promises and "deferred" objects that
control the state of the promises. A promise's then method allows success or
failure callback functions to be applied to the promise:

    jQuery.get('foo.txt')
      .then(success, failure);

jQuery.promises
---------------

jQuery.promises is a collection of tiny scripts that provide a promise interface
for common tasks. Currently, there are only two scripts: jQuery.promises.image,
which wraps image elements that may or may not have been loaded by the browser
and jQuery.promises.timer, which wraps `setTimeout()` delayed functions.

Take a look at slides for the Promises, Promises talk given by the jQuery.promises
authors at Async, in Brighton, UK.

Code contributions and feedback is welcome.
