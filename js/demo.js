// Run through dom creating ace editors out of div.code-example

jQuery('.row div.code-example').each(function(i, dom){
	createAceEditor(dom);
});

// Setup code evaluation for run buttons
jQuery('a.btn.')
    .click(function(){
        var editor = jQuery(this).prev().data("editor"),
            code = editor.getSession().getValue();

        jQuery.globalEval(code);
    });


function createAceEditor(dom){
	jQuery(dom).css({
		"position" : "relative",
		"width"    : "500px",
		"height"   : "200px"
	});

	var editor = ace.edit(dom),
		session = editor.getSession(),
		jsMode = require("ace/mode/javascript").Mode;

	session.setTabSize(4);
	session.setUseSoftTabs(true);
	session.setMode(new jsMode());

	// Set up accessible references for the code evaluation buttons
	jQuery(dom).data("editor", editor);
}