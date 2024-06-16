import Grender from './Grender';
import Renderable from './Renderable';
import Effect from './Effect';
import AlterProgress from './AlterProgress';
import Progress from './Progress';

import LinkLine from "./components/LinkLine"
import GasValue from "./components/GasValue"
import FixWood from './components/FixWood'
import GasJar from "./components/GasJar"
import FenXiYi from './components/FenXiYi';

function extend(extendedGlass, prototype) {
  let Glass = function (params) {
    extendedGlass.call(this, params);
    prototype._constructor && prototype._constructor.call(this, params);
  };
  function foo() { }
  foo.prototype = extendedGlass.prototype;
  Glass.prototype = new foo();
  Glass.prototype.constructor = Glass;
  for (var i in prototype) Glass.prototype[i] = prototype[i];
  return Glass;
}

function create(opts) {
  return new Grender(opts);
}

export {
  create,
  Progress,
  AlterProgress,
  Effect,
  Renderable,
  extend,
  LinkLine,
  GasValue,
  FixWood,
  GasJar,
  FenXiYi
}
