var fizzBuzz = function* () {
    let i = 0;
    while (++i) {
        const is_buzz = i % 5 === 0;
        const is_fizz = i % 3 === 0;
        
        yield (is_fizz ? 
                    (is_buzz ? 'FizzBuz' : 'Fizz')
                :(is_buzz ? 'Buzz' : '' + i ) );
        
        
     /*   if (is_buzz&&is_fizz) {
            yield 'FizzBuz';
                            
            }else if(is_fizz){
                yield 'Fizz';
            }else if(is_buzz){
                yield 'Buzz';           
        } else {
            yield '' + i;
        }*/
    }
};


var generator = fizzBuzz();
for (let i = 0; i < 100; i++) {
    console.log(generator.next().value);
}