---
category: reference
heading: jquery.promises.image
---


A promise interface for loading `Image()` elements.

Loading an image
------

An array of image URLs or image DOM nodes can be passed to `jQuery.promises.image()`
as well as a success callback to `jQuery.promises.image()` as a second parameter.

    jQuery.promises.image(
      [
          "http://farm3.staticflickr.com/2188/2219660409_21ba876f98_m.jpg",
          "http://farm3.staticflickr.com/2102/2183461799_beff4bb413_m.jpg",
          "http://farm1.staticflickr.com/73/175573986_f5073bfcb0_m.jpg"
      ],

      // Success callback - called if all images load successfully
      // image elements are passed as arguments in the same order as above
      function(){
          jQuery(arguments)
              .hide()
              .appendTo($output)
              .fadeIn(1000);
      },

      // Fail callback - called if one or more images fail to load
      function(){
          alert("An image failed to load");
      }
    );
