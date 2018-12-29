import RegistedComponents from './registed-components';

class Airglass {
	constructor(el){
		this.el = el;
		this.projection = null;
	}
	project(component, options){
		if(!RegistedComponents.hasOwnProperty(component)) throw TypeError('unavailable Airglass component, please check the official document about airglass components.');
		return this.projection = new RegistedComponents[component](this.el, options);
	}
}
Airglass.version = '1.0.0';
Airglass.registedComponents = RegistedComponents;

export default Airglass;
