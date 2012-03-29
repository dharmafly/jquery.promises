function createAceEditor(dom){
    var elem = jQuery(dom),
		editor, session, jsMode;

    elem.css({
        position: "relative",
        height: 300,
        width: "100%"
    });

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

    editor.getSession().on('change',(function onChange(event) {
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
}

// For each code block, create an ACE code editor
jQuery('pre code').each(function(){
    createAceEditor(this);
});

// Attach handlers to "Run" buttons
jQuery('button.btn.run-code')
    .click(function(){
        var editor = jQuery(this).parent().prev().data("editor"),
            code = editor.getSession().getValue();

        jQuery.globalEval(code);
    });
