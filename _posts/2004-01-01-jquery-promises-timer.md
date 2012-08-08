---
category: reference
heading: jquery.promises.timer
---


This is a promise wrapper around the `setTimeout()` function.

Alerting based on time passed
-----

    var flag = window.flagBg;

    jQuery.promises.timer(

        // milliseconds
        500,

        // Success callback
        function(){
            // Toggle body background-colour from yellow to green
            $output.css({
                backgroundColor: flag ?
                    "#fff9a6" : "#aaffaa"
            });

            window.flagBg = !flag;
        },

        // Fail callback
        function(){
            alert("Error");
        }
    );

Simple slideshow
----

This example demonstrates two different promise objects unified to make a simple
photo slideshow.

    var images = [
              "http://farm3.staticflickr.com/2188/2219660409_21ba876f98_m.jpg",
              "http://farm3.staticflickr.com/2102/2183461799_beff4bb413_m.jpg",
              "http://farm1.staticflickr.com/73/175573986_f5073bfcb0_m.jpg"
          ],
          current = 0, stopped;

    function loadAndDisplay(src){
        if (stopped) {
            return;
        }

        jQuery.when(
            jQuery.promises.image(src),
            jQuery.promises.timer(1000)
        )
        .then(
            function(img){
                jQuery(img)
                    // Hide image and then display it
                    .hide()
                    .fadeIn(500, function(){

                        // Once faded in, load next image
                        current ++;

                        // Reset loop to first image
                        if (current >= images.length){
                            current = 0;
                        }

                        // Load and display the next image
                        loadAndDisplay(images[current]);
                    });

                $output.html(img);
            },

            function(){
                alert("Error");
            }
        );
    }

    // Click an image to stop the slideshow.
    $output.on('click', 'img', function () { stopped = true; });

    loadAndDisplay(images[current]);
