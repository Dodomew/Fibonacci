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

  var gridArray = [];
  var dynamicFibonacciSequence = [1, 1];

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

  function dynamicFibonacciGenerator(array)
  {
    let lastIndex = array[array.length - 1];
    let secondLastIndex = array[array.length - 2];

    let newFibonacciNumber = lastIndex + secondLastIndex;
    array.push(newFibonacciNumber);
  }

  function expandFibonacciSequence(cellToCheck)
  {
    while(cellToCheck.number > dynamicFibonacciSequence[dynamicFibonacciSequence.length - 1])
    {
      dynamicFibonacciGenerator(dynamicFibonacciSequence);
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

  function whichCellWasClickedAndProcessIt()
  {
    let e = window.event || event;
    let clickedCell = e.srcElement.id;

    let cell = findCellPositionInArray(clickedCell);

    addOneToConnectedCells(cell[0], cell[1]);
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
    horizontalAndVerticalNumberSequences();
  }

  function horizontalAndVerticalNumberSequences()
  {
    for (let i = 0; i < numberOfRows - 5; i++)
    {
      for (let j = 0; j < numberOfColumns - 5; j++)
      {
        let gridSequenceHorizontal = [];
        let gridSequenceVertical = [];

        let firstNumberHorizontal = gridArray[i][j];
        let secondNumberHorizontal = gridArray[i][j + 1];
        let thirdNumberHorizontal = gridArray[i][j + 2];
        let fourthNumberHorizontal = gridArray[i][j + 3];
        let fifthNumberHorizontal = gridArray[i][j + 4];

        let firstNumberVertical = gridArray[i][j];
        let secondNumberVertical = gridArray[i + 1][j];
        let thirdNumberVertical = gridArray[i + 2][j];
        let fourthNumberVertical = gridArray[i + 3][j];
        let fifthNumberVertical = gridArray[i + 4][j];

        gridSequenceHorizontal.push(firstNumberHorizontal, secondNumberHorizontal, thirdNumberHorizontal, fourthNumberHorizontal, fifthNumberHorizontal);
        gridSequenceVertical.push(firstNumberVertical, secondNumberVertical, thirdNumberVertical, fourthNumberVertical, fifthNumberVertical);

        findFibonacciSequences(gridSequenceHorizontal);
        findFibonacciSequences(gridSequenceVertical);
      }
    }
  }

  function findFibonacciSequences(gridSequence)
  {
    let fibonacciCache = [];

    for (let i = 0; i < gridSequence.length; i++)
    {
      expandFibonacciSequence(gridSequence[i]);
    }

    for (let i = 0; i < dynamicFibonacciSequence.length; i++)
    {
      fibonacciCache = [];

      let firstFibonacciNumber = dynamicFibonacciSequence[i];
      let secondFibonacciNumber = dynamicFibonacciSequence[i + 1];
      let thirdFibonacciNumber = dynamicFibonacciSequence[i + 2];
      let fourthFibonacciNumber = dynamicFibonacciSequence[i + 3];
      let fifthFibonacciNumber = dynamicFibonacciSequence[i + 4];

      fibonacciCache.push(firstFibonacciNumber, secondFibonacciNumber, thirdFibonacciNumber, fourthFibonacciNumber, fifthFibonacciNumber);

      if(compareTwoArrays(gridSequence, fibonacciCache) === true)
      {
        gridSequence.forEach(function(cell)
        {
          removeFibonacciSequencesFromGrid(cell)
        });
        return;
      }
    }
  }

  function compareTwoArrays(arrayOfObjects, arrayToBeCompared)
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

  function removeFibonacciSequencesFromGrid(cell)
  {
    cell.divContainer.classList.add("cell-fibonacci");
    cell.number = 0;

    setTimeout(function ()
    {
      cell.divContainer.classList.remove("cell-fibonacci");
      cell.divContainer.innerHTML = "";
    },
    500);
  }

  function resetGrid()
  {
    gridArray = [];
    createGridOfTiles();
  }
}
