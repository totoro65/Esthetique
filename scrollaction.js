//
// scrollAction for websites v1.0.0 (Michał Reszka)
// http://www.mreszka.eu/
//
// Licensed under the terms of the MIT license.
//
// You may use it in your theme if you credit me. 
// It is also free to use on any individual website.
//

(function () {

	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	window.addEventListener("resize", function(){
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
	});

	Function.prototype.debounce = function(threshold){
		var callback = this;
		var timeout;
		return function() {
			var context = this, params = arguments;
			window.clearTimeout(timeout);
			timeout = window.setTimeout(function() {
				callback.apply(context, params);
			}, threshold);
		};
	};
	
	var scrlElemArr = [];
	function mapScrlAction() {
			
		var listArr = $(".scrollAction").map(function(){
			var tempAttr = $(this).attr("scroll-action");
			return tempAttr;
			}).get();
		for (r = 0;r < listArr.length; r++) {
			listArr[r] = listArr[r].split(" ").join("");
		}
		var idArr = $(".scrollAction").map(function(){
			var tempId = $(this).attr("id");
			return tempId;
			}).get();
		for (i = 0;i < listArr.length; i++) {
			var string = listArr[i]; 
			var pass = string.split(",").join(":");
			var arr = pass.split(':');
			var empty = {};
			arr.forEach(function(el,i){
				var b = i + 1, c = b/2, e = c.toString();
					if(e.indexOf('.') != -1 ) {
					empty[el] = arr[i+1];
					} 
			}); 
			scrlElemArr.push(empty);
		}
		
		for (x = 0;x < idArr.length; x++) {
			scrlElemArr[x].id = idArr[x];
			scrlElemArr[x].isVisible = "false";
			scrlElemArr[x].wasVisible = "false";
		}
	}

	mapScrlAction();

	var scrlAction;
	scrlAction = detectScrollItems.debounce(80);
	$(window).on('scroll', scrlAction);

	function detectScrollItems() {
		var pageBottom = $(this).scrollTop()+windowHeight;
		var pageTop = $(this).scrollTop();
		
		for (i = 0;i < scrlElemArr.length; i++) {
					
			var tag = "#" + scrlElemArr[i].id;
			var tempFunc = scrlElemArr[i].funcName;
			var tempClass = scrlElemArr[i].cssClass;
			var tempCSSElem = scrlElemArr[i].cssElem;
			if ((pageBottom-10)>=$(tag).offset().top&&pageTop<=$(tag).offset().top) {
				if (scrlElemArr[i].isVisible == "false") {
					if (scrlElemArr[i].onlyOnce == "true"&&scrlElemArr[i].wasVisible == "false") {
						scrlElemArr[i].wasVisible = "true";
						scrlElemArr[i].isVisible = "true";
						if (tempFunc != "none") {window[tempFunc]()};
						if (tempClass != "none") {$(tempCSSElem).addClass(tempClass)};
					} else {
						if (scrlElemArr[i].onlyOnce == "false") {
							scrlElemArr[i].isVisible = "true";
							if (tempFunc != "none") {window[tempFunc]()};
							if (tempClass != "none") {$(tempCSSElem).addClass(tempClass)};
						}
					}
				}
			} else {
				scrlElemArr[i].isVisible = "false";
				if (scrlElemArr[i].onlyOnce == "false") {$(tempCSSElem).removeClass(tempClass)};
			}	
		}	
	}   

})();
