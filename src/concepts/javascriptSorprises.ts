export default function javascriptSorprises() {
    // when pass string with ' not found search result with includes method object Array
    function checkIfRedFruitNameIsValid(fruit: string): boolean {
        // const allowedRedFruitNames = ['manzana', 'cereza', 'ciruela'];
        enum AllowedRedFruitName {MANZANA = 'manzana', CERESA = 'cereza', CIRUELA = 'ciruela'};

        // ORIGINAL CODE
        // if ( fruit === 'manzana' || fruit === 'cereza' || fruit === 'ciruela' ) {
        //     return true;
        // } else {
        //     return false;
        // }

        // MY REFACTORING CODE (2 lines)
        const allowedRedFruitNames: string[] = Object.values(AllowedRedFruitName);
        console.log("cereza1",allowedRedFruitNames.includes('cereza'))
        console.log("cereza2",allowedRedFruitNames.includes(fruit))
        return allowedRedFruitNames.includes(fruit);
    }

    checkIfRedFruitNameIsValid('ceresa') // expect FALSE (BAD)
    checkIfRedFruitNameIsValid("ceresa") // expect TRUE (OK)
}
