/*global window */

(function(jQuery, window){
    "use strict";
    
    function stop(){
		var now;
		
		if (this.state() === "pending" && this._timeoutRef){
			now = (new Date).getTime();
			
			// Update the `timeLeft`
			this._timeLeft = now - this._timeStarted;
			
			// Stop the active timeout
        	window.clearTimeout(this._timeoutRef);
			this._timeoutRef = null;
		}
		return this;
    }
    
    function start(timeLeft, callback){
		var promise;
		
		if (this.state() === "pending"){
			promise = this;
			
			// If the deferred hasn't yet been started, then set a `timeLeft`
			if (!this._timeLeft){
				this._timeLeft = timeLeft || 1000; // default: 1 second
			}
			
			// Log the start time
			this._timeStarted = (new Date).getTime();
			
			// Start the timeout
	        this._timeoutRef = window.setTimeout(function(){
	            callback(promise);
	        }, timeLeft);
		}
		return this;
    }
    
    /////
    
    function deferredTimer(time, doneCallbacks, failCallbacks){
        var deferred, promise;

        /////

        // deferred & promise
        deferred = jQuery.Deferred()
            .then(doneCallbacks, failCallbacks);
            
        promise = deferred.promise();

        /////

        // extend
        promise.start = start;
        promise.stop = stop;

        /////

        // By default, this Deferred will resolve in 1 second's time
        promise._timeoutRef = window.setTimeout(function(){
            deferred.resolveWith(promise);
        }, time || 1000);

        /////
        return promise;
    };
	
	/////
	
	if (!jQuery.promises){
		jQuery.promises = {};
	}
	jQuery.promises.timer = deferredTimer;

}(window.jQuery, window));

/*jslint white: true */