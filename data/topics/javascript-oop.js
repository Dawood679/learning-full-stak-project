export const javascriptOopContent = {
  slug: "javascript-oop",
  briefDescription: [
    "Object-Oriented Programming (OOP) in JavaScript is built on prototypes. Every object has an internal prototype chain — when you access a property, JS first checks the object itself, then its prototype, then the prototype's prototype, up to Object.prototype. The class syntax (introduced in ES6) is syntactic sugar over this prototype system. You define a class with class keyword, a constructor() to initialize instances, and methods. Create instances with new ClassName(). The instanceof operator checks if an object is an instance of a class.",
    "Inheritance lets one class extend another using the extends keyword. The child class calls super() in its constructor to invoke the parent's constructor before adding its own properties. Methods in the child class override methods in the parent. Static methods (static methodName()) belong to the class itself, not to instances — you call them as ClassName.method() not instance.method(). Getters (get propName()) and setters (set propName(value)) let you define computed properties or validate values when getting/setting a property.",
    "Encapsulation means hiding internal details. JavaScript class fields with a # prefix are private — they can only be accessed inside the class body. Public fields (declared directly in the class body without #) are instance properties set before the constructor runs. The 4 pillars of OOP are: Encapsulation (bundling data + methods, hiding internals), Inheritance (child classes reuse parent code), Polymorphism (different classes implement the same interface differently), and Abstraction (hiding complexity behind simple interfaces). JavaScript also supports mixins as a pattern for sharing behavior between classes that don't share an inheritance hierarchy.",
  ],
  keyConcepts: [
    "class MyClass { constructor() { } method() { } } — ES6 class syntax",
    "new MyClass() — creates an instance, calls constructor",
    "extends: class Dog extends Animal { } — inheritance",
    "super(): call parent constructor from child's constructor (required before using 'this')",
    "super.method(): call parent method from child override",
    "static methodName() { } — belongs to class itself, not instances",
    "Getter: get fullName() { return this.first + ' ' + this.last }",
    "Setter: set fullName(value) { [this.first, this.last] = value.split(' ') }",
    "#privateField — private class field, inaccessible outside the class",
    "instanceof: obj instanceof MyClass — check if obj is an instance of MyClass",
    "Prototype chain: obj → Class.prototype → Object.prototype → null",
    "4 pillars: Encapsulation, Inheritance, Polymorphism, Abstraction",
  ],
  codeExample: {
    language: "javascript",
    title: "Classes, Inheritance, Getters/Setters, Private Fields, Polymorphism",
    code: `// ── Base class ──
class Animal {
  #sound  // private field

  constructor(name, sound) {
    this.name = name   // public property
    this.#sound = sound
  }

  speak() {
    return \`\${this.name} says \${this.#sound}\`
  }

  // Getter
  get info() {
    return \`Animal: \${this.name}\`
  }

  // Static method — call as Animal.create(), not instance.create()
  static create(name, sound) {
    return new Animal(name, sound)
  }
}

const cat = new Animal('Cat', 'Meow')
console.log(cat.speak())       // "Cat says Meow"
console.log(cat.info)          // "Animal: Cat" (getter)
// console.log(cat.#sound)     // SyntaxError — private!

const dog = Animal.create('Dog', 'Woof')  // static method

// ── Inheritance ──
class Dog extends Animal {
  #breed

  constructor(name, breed) {
    super(name, 'Woof')  // must call super before 'this'
    this.#breed = breed
  }

  // Override parent method (polymorphism)
  speak() {
    return \`\${super.speak()} (and wags tail)\`  // call parent + add more
  }

  // New method in child
  fetch(item) {
    return \`\${this.name} fetches the \${item}!\`
  }

  get info() {
    return \`\${super.info} — Breed: \${this.#breed}\`
  }
}

const rex = new Dog('Rex', 'German Shepherd')
console.log(rex.speak())        // "Rex says Woof (and wags tail)"
console.log(rex.fetch('ball'))  // "Rex fetches the ball!"
console.log(rex.info)           // "Animal: Rex — Breed: German Shepherd"
console.log(rex instanceof Dog)     // true
console.log(rex instanceof Animal)  // true (inheritance chain)

// ── Setter + Getter for validation ──
class Temperature {
  #celsius

  constructor(celsius) {
    this.celsius = celsius  // uses setter for validation
  }

  get celsius() { return this.#celsius }
  set celsius(value) {
    if (value < -273.15) throw new Error('Below absolute zero!')
    this.#celsius = value
  }

  get fahrenheit() { return this.#celsius * 9/5 + 32 }
  set fahrenheit(f) { this.celsius = (f - 32) * 5/9 }
}

const temp = new Temperature(25)
console.log(temp.fahrenheit)     // 77
temp.fahrenheit = 32             // uses setter → converts to 0°C
console.log(temp.celsius)        // 0

// ── Polymorphism ──
class Shape {
  area() { return 0 }
  toString() { return \`Shape with area: \${this.area()}\` }
}

class Circle extends Shape {
  constructor(r) { super(); this.r = r }
  area() { return Math.PI * this.r ** 2 }
}

class Rectangle extends Shape {
  constructor(w, h) { super(); this.w = w; this.h = h }
  area() { return this.w * this.h }
}

const shapes = [new Circle(5), new Rectangle(4, 6)]
shapes.forEach(s => console.log(s.toString()))
// Each calls its own .area() — polymorphism!`,
  },
}
