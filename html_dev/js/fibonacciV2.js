/*

Maak een 50x50 grid. Als je klikt op een cel wordt bij alle cellen in
de rij en kolom van de cel 1 opgeteld. Was een cel leeg dan wordt die
op 1 gezet. Na elke verandering licht een cel kort geel op. Als 5
elkaar in de Fibonacci-reeks opvolgende getallen naast elkaar staan,
lichten deze cellen kort groen op en worden ze leeg gemaakt. Gebruik
de programmeertaal die je het beste vindt passen.

*/

//table is niet responsive
// event listener global of per cell?

'use strict';

window.onload = function()
{
  var gridContainer = document.getElementById("grid-container");
  gridContainer.addEventListener('click', whichCellWasClickedAndProcessIt, false);

  var resetButton = document.getElementById("header-button-reset");
  resetButton.addEventListener('click', resetGrid, false);

  var numberOfRows = 50;
  var numberOfColumns = 50;
  var fibonacciSequence = fibonacciGenerator(50);
  var gridArray = [];

  class Cell
  {
    constructor(row, rowNumber, columnNumber)
    {
      this.divContainer = document.createElement("div");
      this.cellClass = "grid-cell";
      this.cellId = "grid-row-" + rowNumber + "-cell-" + columnNumber;

      this.divContainer.classList.add(this.cellClass);
      this.divContainer.id = this.cellId;

      this.number = 0;

      row.appendChild(this.divContainer);
    }

    addOneToNumber()
    {
      this.number++;
      this.divContainer.innerHTML = this.number;
    }


    addYellowColor()
    {
      this.divContainer.classList.add("grid-cell-color");
    }

    removeYellowColor()
    {
      this.divContainer.classList.remove("grid-cell-color");
    }
  }

  function createGridOfTiles()
  {
    gridContainer.innerHTML = "";

    for (let i = 0; i < numberOfRows; i++)
    {
      let rowArray = [];
      let row = document.createElement("div");
      row.classList.add("grid-row");
      row.id = "row-" + i;

      gridContainer.appendChild(row);

      gridArray.push(rowArray);

      for (let j = 0; j < numberOfColumns; j++)
      {
        let cell = new Cell(row, i, j)
        rowArray.push(cell);
      }
    }
  }

  createGridOfTiles()

  function whichCellWasClickedAndProcessIt(event)
  {
    let e = window.event || event;
    let clickedCell = e.srcElement.id;

    let cell = findCellPositionInArray(clickedCell);

    addOneToConnectedCells(cell[0], cell[1]);

/*
    for (let i = 0; i < numberOfRows; i++)
    {
      for (let j = 0; j < numberOfColumns; j++)
      {
        if(clickedCell == gridArray[i][j].cellId)
        {
          addOneToConnectedCells(i, j);
        }
      }
    }
    */
  }

  function findCellPositionInArray(cellId)
  {
    let regex = /\d{1,2}/g; // can change maximum number if rows and columns exceed 100
    let stringNumbers = cellId.match(regex);

    let rowPosition = parseInt(stringNumbers[0]);
    let columnPosition = parseInt(stringNumbers[1]);

    let cell = [];
    cell.push(rowPosition, columnPosition);
    return cell;
  }

  function addOneToConnectedCells(rowNumber, columnNumber)
  {
    for (let i = 0; i < numberOfRows; i++)
    {
      let cell = gridArray[i][columnNumber];

      if(cell == gridArray[rowNumber][columnNumber])
        continue;

        cell.addYellowColor();
        cell.addOneToNumber();

        setTimeout(function toggleColorOn()
        {
          cell.removeYellowColor();
        },
        500);
    }

    for (let j = 0; j < numberOfColumns; j++)
    {
      let cell = gridArray[rowNumber][j];

      cell.addYellowColor();
      cell.addOneToNumber();

      setTimeout(function toggleColorOff()
      {
        cell.removeYellowColor();
      },
      500);
    }

    //gridSequences();
    findHorizontalFibonacci();
    findVerticalFibonacci();
  }

  function fibonacciGenerator(fibonacciNumber)
  {
    let arrayOfFibonacci = [1, 1];

    //i = 2 want arrayOfFibonacci heeft 1 en 1 al, hierdoor skipt ie het getal 0 in de reeks
    for (let i = 2; i <= fibonacciNumber; i++)
    {
      var sumOfFibonacciNumbers = arrayOfFibonacci[i - 2] + arrayOfFibonacci[i - 1];
      arrayOfFibonacci.push(sumOfFibonacciNumbers);
    }
    return arrayOfFibonacci;
  }

  function checkIfArrayIsFibonacci(arrayTocheck)
  {
    for (let i = 0; i < arrayTocheck.length; i++)
    {
      let firstNumber = arrayTocheck[i].number;
      let secondNumber = arrayTocheck[i + 1].number;
      let sum = firstNumber + secondNumber;

      if(arrayTocheck[i + 2].number === sum)
      {
        console.log("ok");
      }
    }
  }
/*
  function gridSequences()
  {
    for (let i = 0; i < numberOfRows; i++)
    {
      for (let j = 0; j < numberOfColumns - 5; j++)
      {
        let gridSequence = [];

        let firstFibonacci = gridArray[i][j];
        let secondFibonacci = gridArray[i][j + 1];
        let thirdFibonacci = gridArray[i][j + 2];
        let fourthFibonacci = gridArray[i][j + 3];
        let fifthFibonacci = gridArray[i][j + 4];

        gridSequence.push(firstFibonacci, secondFibonacci, thirdFibonacci, fourthFibonacci, fifthFibonacci);
        findFibonacciSequences(gridSequence);
      }
    }
  }
*/
  function findHorizontalFibonacci()
  {
    for (let j = 0; j < numberOfRows; j++)
    {
      let horizontalArray = [];
      for (let i = 0; i < numberOfColumns; i++)
      {
        horizontalArray.push(gridArray[i][j]);
      }
      getFiveSequentialCells(horizontalArray);
    }
  }

  function findVerticalFibonacci()
  {
    for (let i = 0; i < numberOfColumns; i++)
    {
      let verticalArray = [];
      for (let j = 0; j < numberOfRows; j++)
      {
        verticalArray.push(gridArray[j][i]);

      }
      getFiveSequentialCells(verticalArray);
    }
  }

/*
  function findSequence(array)
  {
    for (let i = 0; i < array.length; i++)
    {
      let fibonacciCache = []

      let firstArrayNumber = fibonacciSequence[i];
      let secondArrayNumber = fibonacciSequence[i + 1];
      let thirdArrayNumber = fibonacciSequence[i + 2];
      let fourthArrayNumber = fibonacciSequence[i + 3];
      let fifthArrayNumber = fibonacciSequence[i + 4];

      fibonacciCache.push(firstArrayNumber, secondArrayNumber, thirdArrayNumber, fourthArrayNumber, fifthArrayNumber);

      if(compareTwoArraysForFibonacciSequence(array, fibonacciCache) === true)
      {
        removeFibonacciSequencesFromGrid(array);
        return;
      }
    }
  }
*/
  function getFiveSequentialCells(arrayToLoopThrough)
  {
    for (let i = 0; i < arrayToLoopThrough.length - 5; i++)
    {
      let fiveCells = [];

      let firstArrayNumber = arrayToLoopThrough[i];
      let secondArrayNumber = arrayToLoopThrough[i + 1];
      let thirdArrayNumber = arrayToLoopThrough[i + 2];
      let fourthArrayNumber = arrayToLoopThrough[i + 3];
      let fifthArrayNumber = arrayToLoopThrough[i + 4];

      fiveCells.push(firstArrayNumber, secondArrayNumber, thirdArrayNumber, fourthArrayNumber, fifthArrayNumber);

      checkArrayForFibonacci(fiveCells);
    }
  }

  function checkArrayForFibonacci(arrayToCheckForFibonacci)
  {
    for (let i = 0; i < fibonacciSequence.length - 5; i++)
    {
      let fiveFibonacciNumbers = [];

      let firstArrayNumber = fibonacciSequence[i];
      let secondArrayNumber = fibonacciSequence[i + 1];
      let thirdArrayNumber = fibonacciSequence[i + 2];
      let fourthArrayNumber = fibonacciSequence[i + 3];
      let fifthArrayNumber = fibonacciSequence[i + 4];

      fiveFibonacciNumbers.push(firstArrayNumber, secondArrayNumber, thirdArrayNumber, fourthArrayNumber, fifthArrayNumber);

      if(compareTwoArraysForFibonacciSequence(arrayToCheckForFibonacci, fiveFibonacciNumbers) === true)
      {
        removeFibonacciSequencesFromGrid(arrayToCheckForFibonacci);
        return;
      }
      else
      {
        continue;
      }
    }
  }


/*
  function findFibonacciSequences(gridSequence)
  {
    for (let i = 0; i < fibonacciSequence.length; i++)
    {
      let fibonacciCache = []

      let firstFibonacciNumber = fibonacciSequence[i];
      let secondFibonacciNumber = fibonacciSequence[i + 1];
      let thirdFibonacciNumber = fibonacciSequence[i + 2];
      let fourthFibonacciNumber = fibonacciSequence[i + 3];
      let fifthFibonacciNumber = fibonacciSequence[i + 4];

      fibonacciCache.push(firstFibonacciNumber, secondFibonacciNumber, thirdFibonacciNumber, fourthFibonacciNumber, fifthFibonacciNumber);

      if(compareTwoArraysForFibonacciSequence(gridSequence, fibonacciCache) === true)
      {
        removeFibonacciSequencesFromGrid(gridSequence);
        return;
      }
    }
  }
*/
  function compareTwoArraysForFibonacciSequence(arrayOfObjects, arrayToBeCompared)
  {
    let arrayToCompareTo = [];

    for (let i = 0; i < arrayOfObjects.length; i++)
    {
      let number = arrayOfObjects[i].number;
      arrayToCompareTo.push(number);
    }

    if(arrayToCompareTo.length != arrayToBeCompared.length)
    {
      return false;
    }
    return arrayToCompareTo.join() === arrayToBeCompared.join();
  }

  function removeFibonacciSequencesFromGrid(array)
  {
    for (let i = 0; i < array.length; i++)
    {
      array[i].divContainer.classList.add("cell-fibonacci");

      setTimeout(function ()
      {
        array[i].number = 0;
        array[i].divContainer.classList.remove("cell-fibonacci");
        array[i].divContainer.innerHTML = "";
      },
      1000);
    }
  }

  function resetGrid()
  {
    gridArray = [];
    createGridOfTiles();
  }
}
