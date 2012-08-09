---
category: reference
heading: "jquery.promises.image"
---

A promise interface for loading `Image()` elements.

Loading an image
----------------

    jQuery.promises.image("http://farm3.staticflickr.com/2188/2219660409_21ba876f98_m.jpg")
    .then(
        function(img){
            jQuery(img).appendTo(demoElement);
        },
        function(){
            alert("Image failed to load");
        }
    );

Loading multiple images and json
--------------------------------

This example demonstrates how promises from `jQuery.promises.image()` promise can be
used in conjunction with other kinds of promises.

    jQuery.when(
          jQuery.promises.image("http://farm3.staticflickr.com/2188/2219660409_21ba876f98_m.jpg"),
          jQuery.promises.image("http://farm3.staticflickr.com/2102/2183461799_beff4bb413_m.jpg"),
          jQuery.get("example.json")
    )
    .then(
        function(img1, img2, json){
            jQuery(demoElement)
                  .append(img1)
                  .append(img2)
                  .append("<code>" + json[0].foo + "</code>");
        },
        function(){
            alert("Something failed to load");
        }
    );

Loading multiple images and fading them in
------------------------------------------

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
              .appendTo(demoElement)
              .fadeIn(1000);
      },

      // Fail callback - called if one or more images fail to load
      function(){
          alert("An image failed to load");
      }
    );
