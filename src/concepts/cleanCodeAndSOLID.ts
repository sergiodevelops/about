export default function cleanCodeAndSOLID () {
    // https://gist.github.com/Klerith/b82113ad05830cd2880ec3bc1d0108ca
    // strings
    // https://medium.com/@brankofuenzalida/entendiendo-las-enumeraciones-para-dejar-de-usar-constantes-globales-enum-vs-const-48c51fcfdb3
    // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String
    enum RedFruitName {MANZANA = 'manzana', FRESA = 'fresa', CEREZA = 'cereza'};
    enum YellowFruitName {PINIA = 'piña', BANANA = 'banana'};
    enum PurpleFruitName {MORA = 'mora', UVA = 'uva'};
    type FruitName = RedFruitName | YellowFruitName | PurpleFruitName;
    
    // Resolver sin la triple condicional dentro del if
    // includes? arrays?
    
    // ORIGINAL CODE
    // function isRedFruit( fruit: string ): boolean {
    
    // MY REFACTORING CODE
    function checkIfRedFruitNameIsValid(fruit: FruitName): boolean {
        // si espero FruitName y me llega un string
        // typescript no dice nada y includes me da "false"
        // const allowedRedFruitNames = ['manzana', 'cereza', 'ciruela'];

        // ORIGINAL CODE
        // if ( fruit === 'manzana' || fruit === 'cereza' || fruit === 'ciruela' ) {
        //     return true;
        // } else {
        //     return false;
        // }

        // MY REFACTORING CODE (2 lines)
        enum AllowedRedFruitName {MANZANA = 'manzana', CEREZA = 'cereza', CIRUELA = 'ciruela'};
        const allowedRedFruitNames: string[] = Object.values(AllowedRedFruitName);

        return allowedRedFruitNames.includes(fruit);
    }

    // Simplificar esta función
    // switch? Object literal? validar posibles colores
    enum AllowedFruitColorName {RED = 'red', YELLOW = 'yellow', PURPLE = 'purple', PINK = 'pink'};
    
    // ORIGINAL CODE
    // function getFruitsByColor( color: string ): string[] {
    
    // MY REFACTORING CODE
    function getFruitsByColor( color: AllowedFruitColorName ): string[] {
        
        // ORIGINAL CODE
        // if ( color === 'red' ) {
        //     return ['manzana','fresa'];
        // } else if ( color === 'yellow') {
        //     return ['piña','banana'];
        // } else if ( color === 'purple') {
        //     return ['moras','uvas']
        // } else {
        //     throw Error('the color must be: red, yellow, purple');
        // }
        
        // MY REFACTORING CODE
        switch (color) {
            case AllowedFruitColorName.RED:
                return Object.values(RedFruitName);
            case AllowedFruitColorName.YELLOW:
                return Object.values(YellowFruitName);
            case AllowedFruitColorName.PURPLE:
                return Object.values(PurpleFruitName);
            default:
                // throw new Error('The color must be: ' + Object.values(AllowedFruitColorName));
                return []
        }
    }

    // Simplificar esta función
    let isFirstStepWorking  = true;
    let isSecondStepWorking = true;
    let isThirdStepWorking  = true;
    let isFourthStepWorking = true;

    function workingSteps() {
        if(!isFirstStepWorking) return 'First step broken.'
        if(!isSecondStepWorking) return 'Second step broken.'
        if(!isThirdStepWorking) return 'Third step broken.'
        return isFourthStepWorking ? 'Working properly!' : 'Fourth step broken.'




        // if( isFirstStepWorking === true ) {
        //     if( isSecondStepWorking === true ) {
        //         if( isThirdStepWorking === true ) {
        //             if( isFourthStepWorking === true ) {
        //                 return 'Working properly!';
        //             }
        //             else {
        //                 return 'Fourth step broken.';
        //             }
                // }
                // else {
                //     return 'Third step broken.';
                // }
            // }
            // else {
            //     return 'Second step broken.';
            // }
        // }
        // else {
        //     return 'First step broken.';
        // }
    }


    // isRedFruit --> checkIfRedFruitNameIsValid
    // ORIGINAL CODE
    // console.log({ isRedFruit: checkIfRedFruitNameIsValid('ceresa'), fruit: 'ceresa' }); // true
    // console.log({ isRedFruit: checkIfRedFruitNameIsValid('piña'), fruit: 'piña'}); // true
    // MY REFACTORING CODE
    console.log({ isRedFruit: checkIfRedFruitNameIsValid(RedFruitName.CEREZA), fruit: RedFruitName.CEREZA }); // true
    console.log({ isRedFruit: checkIfRedFruitNameIsValid(YellowFruitName.PINIA), fruit: YellowFruitName.PINIA }); // false

    //getFruitsByColor
    // ORIGINAL CODE
    console.log({ redFruits: getFruitsByColor(AllowedFruitColorName.RED) }); // ['manzana', 'fresa', 'cereza']
    console.log({ yellowFruits: getFruitsByColor(AllowedFruitColorName.YELLOW) }); // ['piña', 'banana']
    console.log({ purpleFruits: getFruitsByColor(AllowedFruitColorName.PURPLE) }); // ['moras', 'uvas']
    // MY REFACTORING CODE
    console.log({ redFruits: getFruitsByColor(AllowedFruitColorName.RED) }); // ['manzana', 'fresa']
    console.log({ yellowFruits: getFruitsByColor(AllowedFruitColorName.YELLOW) }); // ['piña', 'banana']
    console.log({ purpleFruits: getFruitsByColor(AllowedFruitColorName.PURPLE) }); // ['moras', 'uvas']

    console.log({ pinkFruits: getFruitsByColor(AllowedFruitColorName.PINK) }); // Error: the color must be: red, yellow, purple

    // workingSteps
    // console.log({ workingSteps: workingSteps() }); // Cambiar los valores de la línea 31 y esperar los resultados
}
