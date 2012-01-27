// Run through dom creating ace editors out of div.code-example

jQuery('.row div.code-example').each(function(i, dom){
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
        height: 200,
        width: 460
    });

    var editor = ace.edit(dom),
        session = editor.getSession(),
        jsMode = require("ace/mode/javascript").Mode;

    session.setTabSize(4);
    session.setUseSoftTabs(true);
    session.setMode(new jsMode());

    elem.data("editor", editor);
}