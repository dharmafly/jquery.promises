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
    jsMode = require("ace/mode/javascript").Mode;
        
    editor.setTheme("ace/theme/monokai");
	editor.setHighlightActiveLine(false);
	editor.setShowPrintMargin(false);
	
    session.setTabSize(4);
    session.setUseSoftTabs(true);
    session.setMode(new jsMode());

    elem.data("editor", editor);
}

// For each code block, create an ACE code editor
jQuery('div.code-example').each(function(i, dom){
    createAceEditor(dom);
});

// Attach handlers to "Run" buttons
jQuery('button.btn.run-code')
    .click(function(){
        var editor = jQuery(this).parent().prev().data("editor"),
            code = editor.getSession().getValue();

        jQuery.globalEval(code);
    });