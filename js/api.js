function loadHtml(pageToLoad) {
	console.log("In api.js loadHtml(pageToLoad), about to GET " + pageToLoad);
	
	/*if(pageToLoad == "/tabs/rules/rules.html") {
		breakPt = "About to GET rules.html, step into ajax.  Watch for either success/failure";
	}*/
	/* breakpt can only hit in a callback of this ajax call */	
    $.ajax( {
    	      /* wait til GET html done, then replace the div in it.  
    	       * async true can try to replace the div before it exists */
    	      async: false,
		      type : "GET",
		      url : pageToLoad,
		      cache : false,
		      dataType : "html",
		      success : function(response) {
			              $("#main").html(response);
			              $("#main").trigger("create");
		                },
		      error : function(jqXHR, textStatus, errorThrown) {
                        alert("Failed to GET the page!");
		              }
	          } );
}


function callService(TYPE, url, dataParam, callback) {
	var result;
	if(TYPE == "GET") {
		$.ajax(
		    {
		    /* asynch NEEDS to be false!!! */
		    async: false,
			type: TYPE,
			url: url,
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			data: dataParam,
			success:function (response, textStatus, jqXHR) {
				result = response;
			},
			error:function (response, textStatus, jqXHR) {
				result = response;
			}
			}
		);
	}
	else if(TYPE =="POST" || TYPE == "PUT") {
		$.ajax(
		    {
		    /* asynch NEEDS to be false!!! */
		    async: false,
			type: TYPE,
			url: url,
			/* returning in this format */
			dataType: 'json',
			/* sending in this format */
			contentType: "application/json; charset=utf-8",
			/* JavaScript value(the js array of assoc arrays) 
			 * to JSON string */
		    data: JSON.stringify(dataParam),
			success:function (response, textStatus, jqXHR) {
			    result = response;
			},
			error:function (response, textStatus, jqXHR) {
				result = response;
			}
			}
		);
	}
	/* if a function is specified, call it */
	if(callback && typeof(callback) == 'function'){
		return callback(result);
	}
	/* otherwise just return the ajax response */
	else{
		return result;
	}
} // end callService