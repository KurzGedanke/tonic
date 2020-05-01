"use strict";

var _prismCore = _interopRequireDefault(require("prismjs/components/prism-core"));

require("prismjs/components/prism-clike");

require("prismjs/components/prism-markup");

require("prismjs/components/prism-javascript");

require("prismjs/components/prism-css");

require("prismjs/plugins/line-numbers/prism-line-numbers.css");

require("prismjs/plugins/line-numbers/prism-line-numbers");

require("prismjs/themes/prism-twilight.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_prismCore["default"].highlightAll();

var headerButton = document.getElementById('header__button');

headerButton.onclick = function () {
  var header = document.getElementById('header');
  var navigation = document.getElementById('header__navigation');

  if (header.classList.contains('header__menu')) {
    header.classList.remove('header__menu');
    navigation.classList.add('hidden');
    navigation.setAttribute('aria-expanded', 'false');
  } else {
    header.classList.add('header__menu');
    navigation.setAttribute('aria-expanded', 'true');
    navigation.classList.remove('hidden');
  }
};
//# sourceMappingURL=script.js.map
