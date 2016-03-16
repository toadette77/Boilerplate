
(function(elements) {

	var _PREVIEW = null;


	if (elements.length > 0) {

		for (var e = 0, el = elements.length; e < el; e++) {

			var element = elements[e];
			var parent  = elements[e].parentNode.parentNode;
			var code    = elements[e].innerText;
			var button  = document.createElement('button');

			button.innerHTML = 'Code Preview';
			parent.insertBefore(button, element.parentNode.nextSibling);


			(function(button, code) {

				code = code.split('\n').filter(function(line) {

					var tmp = line.trim();
					if (tmp.match(/html|DOCTYPE/g)) {
						return false;
					}

					return true;

				}).join('\n');


				button.onclick = function() {

					if (_PREVIEW === null) {
						_PREVIEW = window.open('/source/preview.html', 'Code Preview', '');
					} else if (_PREVIEW.closed === true) {
						_PREVIEW = window.open('/source/preview.html', 'Code Preview', '');
					}


					_PREVIEW.document.head.innerHTML = '';
					_PREVIEW.document.body.innerHTML = '';
					_PREVIEW.document.write(code);

				};

			})(button, code);

		}

	}

})([].slice.call(document.querySelectorAll('pre code')));

