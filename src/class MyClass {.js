class MyClass {

    oloquinhooo = true;
    midira = false;

    constructor() {
        this.func1('babee')
        this.func2('xuuuzijj')
    }

    func1(param) {
        console.log('func1 oh yeeee', param, arguments, this);
    }
    
    func2 = (...args) => {
        console.log('func2 oh yoooo', args, this);
    }
}

new MyClass();