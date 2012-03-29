/*globals ace jQuery*/
function createAceEditor(dom) {
    var elem = jQuery(dom),
        editor, session, JavaScriptMode;

    // Not sure why this has to be set on the DOM element.
    elem.css({position: 'relative'});

    editor = ace.edit(dom);
    session = editor.getSession();
    JavaScriptMode = require("ace/mode/javascript").Mode;

    editor.setTheme("ace/theme/clouds");
    editor.setHighlightActiveLine(false);
    editor.setShowPrintMargin(false);
    editor.renderer.setShowGutter(false);

    session.setTabSize(2);
    session.setUseSoftTabs(true);
    session.setMode(new JavaScriptMode());

    editor.getSession().on('change', (function onChange(event) {
        var height = editor.getSession().getDocument().getLength() *
                     editor.renderer.lineHeight +
                     editor.renderer.scrollBar.getWidth() * 1.2;

        elem.height(height);
        elem.find(":first-child").height(elem.height());
        editor.renderer.onResize(true);

        return onChange;
    })());

    editor.selection.moveCursorFileEnd();
    elem.data("editor", editor);

    return editor;
}

var index = 0;

// For each code block, create an ACE code editor
jQuery('pre').each(function () {
    var code = $(this).find('code');
    $(this).wrap('<div class="run" />');

    var editor = createAceEditor(code[0]);
    var content = editor.getSession().getValue();
    if (content.indexOf('$output') > -1 || content.indexOf('alert') > -1) {
        var id = 'output-' + (index += 1);
        var output = $('<output>Output...</output>').attr('id', id).appendTo(this.parentNode);
        var button = $('<button class="eval">Run</button>')
          .appendTo(this.parentNode)
          .data({output: output, editor: editor});
    }
});

// Attach handlers to "Run" buttons
jQuery('button.eval')
.click(function(){
  var button = jQuery(this),
      editor = button.data("editor"),
      code   = editor.getSession().getValue(),
      output = button.data('output');

  output.empty();
  setTimeout(function () {
    output.addClass('loaded');
    setTimeout(function () {
      output.removeClass('loaded');
    }, 1500);
    jQuery.globalEval('(function ($output, alert) {' + code + '})(jQuery("#' + output[0].id + '"), function (msg) { jQuery("#' + output[0].id + '").append("alert: " + msg + "</br/>"); })');
  }, 300);
});
