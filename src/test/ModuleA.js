/**
 * Modle A
 */
class ModuleA {
  name = 'ModuleA';

  /**
   * @param  {String} name - class name
   */
  constructor(name) {
    this.name = name;
  }

  /**
   * print name
   */
  print() {
    console.log(`name: ${this.name}`);
  }
}

export default ModuleA;
