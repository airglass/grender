/*!
  * Airglass v1.2.0 (https://github.com/lanserdi/Airglass#readme)
  * Copyright 2018 陈帅华
  * Licensed under MIT (https://github.com/lanserdi/Airglass/blob/master/LICENSE)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Airglass = factory());
}(this, (function () { 'use strict';

	var RegistedComponents = {};

	var Airglass =
	/*#__PURE__*/
	function () {
	  function Airglass(el) {
	    this.el = el;
	    this.projection = null;
	  }

	  var _proto = Airglass.prototype;

	  _proto.project = function project(component, options) {
	    if (!RegistedComponents.hasOwnProperty(component)) throw TypeError('unavailable Airglass component, please check the official document about airglass components.');
	    return this.projection = new RegistedComponents[component](this.el, options);
	  };

	  return Airglass;
	}();

	Airglass.version = '1.0.0';
	Airglass.registedComponents = RegistedComponents;

	return Airglass;

})));
//# sourceMappingURL=airglass.js.map
