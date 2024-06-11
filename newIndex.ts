const insertIntoArray = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index)
]

const getMatrixIndex = (axisY:number, axisX:number, matrix:number[][]): number => {
	if (axisY < 0 && axisX < 0) 
		return 0;
	
    if (axisY < 0) 
		return axisX + 1;
	
    if (axisX < 0) 
		return axisY + 1;
	
    return matrix[axisY][axisX];
};

const minimalDistance = (resultWord: string, wordToConvert: string) => {
    const resultWordLength: number = resultWord.length;
    const wordToConvertLength: number = wordToConvert.length;

	/*
	Define an index matrix that will be used to modify the word.
	The length of the result word determines the size of the Y axis.
	The length of the word to convert determines the size of the X axis.
	E.g: resultWord = "zyxwv", wordToConvert = "abc"
	[	
		[ 1, 2, 3],
		[ 2, 2, 3],
		[ 3, 3, 3],
		[ 4, 4, 4],
		[ 5, 5, 5]
	]
	*/
    const matrix:number[][] = Array<Array<number>>(resultWordLength);
    for (let axisY = 0; axisY < resultWordLength; axisY++) {		
        matrix[axisY] = Array(wordToConvertLength);		
        for (let axisX = 0; axisX < wordToConvertLength; axisX++) {
			// Compare diagonal index characters.
			if(axisY === axisX && resultWord[axisY] === wordToConvert[axisX]){
				// if all previous diagonal index characters were equal, set to 0
				if(axisY === 0 || matrix[axisY-1][axisX-1] === 0){
					matrix[axisY][axisX] = 0;
				}
				// if any previous diagonal index characters were not equal, set the previous diagonal index
				else{
					matrix[axisY][axisX] = matrix[axisY - 1][axisX - 1];
				}				
				continue;
			}			
			
			/*
			If non diagonal index characters are equal and if the index is sufficient, 
			an extra point must be taken into account.
			E.g: resultWord = "add[l]ehead", wordToConvert = "anag[l]yphic" 
			*/
            matrix[axisY][axisX] = Math.min(
				getMatrixIndex(axisY - 1, axisX, matrix) + 1, 
				getMatrixIndex(axisY, axisX - 1, matrix) + 1,
				getMatrixIndex(axisY - 1, axisX - 1, matrix) + (resultWord[axisY] === wordToConvert[axisX] ? 0 : 1));
        }
    }	
	
    let distance = getMatrixIndex(resultWordLength - 1, wordToConvertLength - 1, matrix);
    console.log(distance);
    let curAxisY = resultWordLength - 1;
    let curAxisX = wordToConvertLength - 1;
    let curWord = Array.from(wordToConvert);

    console.log(curWord.join(''));
    while (distance > 0) {
        const del = getMatrixIndex(curAxisY, curAxisX - 1, matrix);
        const insert = getMatrixIndex(curAxisY - 1, curAxisX, matrix);
        const replace = getMatrixIndex(curAxisY - 1, curAxisX - 1, matrix);
        if (replace < distance) {
            curWord[curAxisX] = resultWord[curAxisY];
            curAxisY -= 1;
            curAxisX -= 1;
            distance = replace;
            console.log(curWord.join(''));
        } else if (del < distance) {
            curWord[curAxisX] = '';
            curAxisX -= 1;
            distance = del;
            console.log(curWord.join(''));
        } else if (insert < distance) {
            curWord = insertIntoArray(curWord, curAxisX + 1, resultWord[curAxisY]);
            curAxisY -= 1;
            distance = insert;
            console.log(curWord.join(''));
        } else {
            curAxisY -= 1;
            curAxisX -= 1;
        }
    }
};

(() => {
    minimalDistance(process.argv[2], process.argv[3]);
})();


