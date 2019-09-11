import ModuleA from './ModuleA';

/**
 * Module B
 * @extends {ModuleA}
 */
class ModuleB extends ModuleA {
  name = 'ModuleB';

  /**
   * @param {String} name - module name
   */
  constructor(name) {
    super(name);
    this.name = `ModuleB: ${this.name}`;
  }

  print() {
    super.print();
  }
}

export default ModuleB;
