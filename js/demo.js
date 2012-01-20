jQuery('a.btn.run-code')
    .click(function(){
        var codeElem = jQuery(this).prev("pre.example"),
            code = codeElem.text();

        jQuery.globalEval(code);
    });