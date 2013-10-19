setTimeout(
	function() {
		var d = document;
		var t = 'script';
        var g = d.createElement(t),
            s = d.getElementsByTagName(t)[0];
        g.src = '//hnbutton.appspot.com/static/hn.min.js';
        s.parentNode.insertBefore(g, s);
}, 300);
