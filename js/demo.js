// Run through dom creating ace editors out of div.code-example

jQuery('div.code-example').each(function(i, dom){
    createAceEditor(dom);
});

// Setup code evaluation for run buttons
jQuery('button.btn.run-code')
    .click(function(){
        var editor = jQuery(this).prev().data("editor"),
            code = editor.getSession().getValue();

        jQuery.globalEval(code);
    });


function createAceEditor(dom){

    var elem = jQuery(dom);

    elem.css({
        position: "relative",
        height: 300,
        width: "100%"
    });

    var editor = ace.edit(dom),
        session = editor.getSession(),
        jsMode = require("ace/mode/javascript").Mode;
        
    editor.setTheme("ace/theme/monokai");
    session.setTabSize(4);
    session.setUseSoftTabs(true);
    session.setMode(new jsMode());

    elem.data("editor", editor);
}