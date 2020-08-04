const solve = puzzlestring => {

    const rowIndex = n => {
        let r = n % 9;
        return (n - r) / 9;
    }

    const columnIndex = n => {
            return n % 9;
        }

    const squareIndex = n => {
            let restRow = rowIndex(n) % 3;
            let squareRowIndex = (rowIndex(n) - restRow) / 3;
            let restColumn = columnIndex(n) % 3;
            let squareColumnIndex = (columnIndex(n) - restColumn) / 3;
            return squareRowIndex * 3 + squareColumnIndex;
        }

    const ifSingleBachelor = obj => {
            if (obj.candidates !== null && obj.candidates.length === 1) {
                obj.value = obj.candidates[0];
                obj.candidates = null;
            }  
        }

    const modifyCandidates = (objArray, indexArray, value) => {
        indexArray.forEach(index => {
            if (objArray[index].candidates !== null) objArray[index].candidates = objArray[index].candidates.filter(item => item !== value);
            ifSingleBachelor(objArray[index]);
        });
    }

    const nakedBachelorStrategy = array => {
            let count;
            do {
                count = array.filter(obj => obj.value !== null).length;
                array.forEach((obj, i) => {
                   if (obj.value !== null) {
                       let val = obj.value;
                       let line = rowsIndexArray[rowIndex(i)];
                       let column = columnsIndexArray[columnIndex(i)];
                       let square = squaresIndexArray[squareIndex(i)];
                       let combinedIndex = [...line, ...column, ...square].filter((item, index, arr) => arr.indexOf(item) === index).filter(item => item !== i);
                       modifyCandidates(array, combinedIndex, val);
                   } 
                });
            } while (count < array.filter(obj => obj.value !== null).length);
            return array;
        }

    const rowsIndexArray = [[0, 1, 2, 3, 4,5, 6, 7, 8], [9, 10, 11, 12, 13,14, 15, 16, 17], [18, 19, 20, 21, 22,23, 24, 25, 26], [27, 28, 29, 30, 31,32, 33, 34, 35], [36, 37, 38, 39, 40,41, 42, 43, 44], [45, 46, 47, 48, 49,50, 51, 52, 53], [54, 55, 56, 57, 58,59, 60, 61, 62], [63, 64, 65, 66, 67,68, 69, 70, 71], [72, 73, 74, 75, 76,77, 78, 79, 80]];

    const columnsIndexArray = [[0,  9, 18, 27, 36, 45, 54, 63, 72], [1, 10, 19, 28, 37, 46, 55, 64, 73], [2, 11, 20, 29, 38, 47, 56, 65, 74], [3, 12, 21, 30, 39, 48, 57, 66, 75], [4, 13, 22, 31, 40, 49, 58, 67, 76], [5, 14, 23, 32, 41, 50, 59, 68, 77],[6, 15, 24, 33, 42, 51, 60, 69, 78], [7, 16, 25, 34, 43, 52, 61, 70, 79], [8, 17, 26, 35, 44, 53, 62, 71, 80]];

    const squaresIndexArray = [[0,  1,  2,  9, 10, 11, 18, 19, 20], [3,  4,  5, 12, 13, 14, 21, 22, 23], [6,  7,  8, 15, 16, 17, 24, 25, 26], [27, 28, 29, 36, 37, 38, 45, 46, 47], [30, 31, 32, 39, 40, 41, 48, 49, 50], [33, 34, 35, 42, 43, 44, 51, 52, 53], [54, 55, 56, 63, 64, 65, 72, 73, 74], [57, 58, 59, 66, 67, 68, 75, 76, 77], [60, 61, 62, 69, 70, 71, 78, 79, 80]];

    let puzzleArray = puzzlestring.split('').map(x => {
            if (x === ".") return null;
            else return parseInt(x);        
        }).map((x,i) => {
            let candidates = x === null ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : null;
            return {index: i, value: x, candidates: candidates};
        });    

    puzzleArray = nakedBachelorStrategy(puzzleArray);

    let puzzleArraySolution = puzzleArray.map(obj => {
            if (obj.value === null) return null;
            else return obj.value;
        });

    return puzzleArraySolution;
    
}

exports.solve = solve;