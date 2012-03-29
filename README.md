jQuery Promises Documentation
=============================

The documentation uses Jekyll to build the website. All API documentation can be
found in the *_posts* directory. This is then imported and rendered into
*index.html* file when published to GitHub.

The very first post in the directory will be used for the Getting Started
section of the site. Subsequent entries will be inserted in the Reference
section.

Pages
-----

All documentation pages can be found in the *_pages* directory. These must have
the format `YYYY-MM-DD-{postname}.md` (because we're using Jekyll). Now the format
we use doesn't have to be a date so we currently use
`0000-{section}-{chapter}-{postname}`, for example `0000-03-01-examples.md`.
The posts will be ordered by date when inserted.

Code Blocks
-----------

Each code block is given access to a `$output` variable this refers to an
jQuery wrapped `<output>` element inserted after the code block. If the example
uses the `$output` variable or `alert()` then a "run" button will appear next to
the code block allowing the user to run the example.

For example:

    var image = new Image()
    image.src = "my-image.png";
    image.onload = function () {
      $output.append(image);
    }

The code snippet will appear with a run button. When the image has loaded then
the element will be appended to the output.
