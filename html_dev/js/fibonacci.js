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

    toggleColorYellow()
    {
      let thisCell = this;
      this.divContainer.classList.add("grid-cell-color");

      setTimeout(function removeColorYellowClass()
      {
        thisCell.divContainer.classList.remove("grid-cell-color");
      },
      300);
    }

    toggleColorGreen()
    {
      let thisCell = this;
      this.divContainer.classList.add("cell-fibonacci");

      setTimeout(function removeColorGreenClass()
      {
        thisCell.divContainer.classList.remove("cell-fibonacci");
      },
      300);
    }

    resetCell()
    {
      let thisCell = this;

      setTimeout(function resetCells()
      {
        thisCell.number = 0;
        thisCell.divContainer.innerHTML = "";
      },
      300);

    }
  }

  function dynamicFibonacciGenerator(array)
  {
    let lastIndex = array[array.length - 1];
    let secondLastIndex = array[array.length - 2];

    let newFibonacciNumber = lastIndex + secondLastIndex;
    array.push(newFibonacciNumber);
  }

  function expandFibonacciSequence(biggestNumberInArray)
  {
    while(biggestNumberInArray > dynamicFibonacciSequence[dynamicFibonacciSequence.length - 1])
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

    if(clickedCell.includes("row") == true && clickedCell.includes("cell") == true)
    {
      let cell = findCellPositionInArray(clickedCell);
      addOneToConnectedCells(cell[0], cell[1]);
    }
  }

  function findCellPositionInArray(cellId)
  {
    let regexFindNumbers = /\d{1,2}/g; // must change to 1,3 if rows and columns exceed 100
    let stringNumbers = cellId.match(regexFindNumbers);

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

      // skip. already done in next for loop
      if(cell == gridArray[rowNumber][columnNumber])
      {
        continue;
      }

      cell.toggleColorYellow();
      cell.addOneToNumber();
    }

    for (let j = 0; j < numberOfColumns; j++)
    {
      let cell = gridArray[rowNumber][j];

      cell.toggleColorYellow();
      cell.addOneToNumber();
    }
    horizontalAndVerticalNumberSequences();
  }

  function horizontalAndVerticalNumberSequences()
  {
    let gridSequenceHorizontal = [];
    let gridSequenceVertical = [];

    for (let i = 0; i < numberOfRows; i++)
    {
      for (let j = 0; j < numberOfColumns; j++)
      {
        gridSequenceHorizontal.length = 0;
        gridSequenceVertical.length = 0;

        if(j + 4 < numberOfColumns)
        {
          let firstNumberHorizontal = gridArray[i][j];
          let secondNumberHorizontal = gridArray[i][j + 1];
          let thirdNumberHorizontal = gridArray[i][j + 2];
          let fourthNumberHorizontal = gridArray[i][j + 3];
          let fifthNumberHorizontal = gridArray[i][j + 4];

          gridSequenceHorizontal.push(firstNumberHorizontal,
                                      secondNumberHorizontal,
                                      thirdNumberHorizontal,
                                      fourthNumberHorizontal,
                                      fifthNumberHorizontal);

          findFibonacciSequences(gridSequenceHorizontal);
        }

        if(i + 4 < numberOfRows)
        {
          let firstNumberVertical = gridArray[i][j];
          let secondNumberVertical = gridArray[i + 1][j];
          let thirdNumberVertical = gridArray[i + 2][j];
          let fourthNumberVertical = gridArray[i + 3][j];
          let fifthNumberVertical = gridArray[i + 4][j];

          gridSequenceVertical.push(firstNumberVertical,
                                    secondNumberVertical,
                                    thirdNumberVertical,
                                    fourthNumberVertical,
                                    fifthNumberVertical);

          findFibonacciSequences(gridSequenceVertical);
        }
      }
    }
  }

  function findFibonacciSequences(gridSequence)
  {
    expandFibonacciSequence(gridSequence[4].number);

    let fibonacciCache = [];

    for (let i = 0; i < dynamicFibonacciSequence.length; i++)
    {
      fibonacciCache.length = 0;

      fibonacciCache.push(dynamicFibonacciSequence[i],
                          dynamicFibonacciSequence[i + 1],
                          dynamicFibonacciSequence[i + 2],
                          dynamicFibonacciSequence[i + 3],
                          dynamicFibonacciSequence[i + 4]);

      if(compareTwoArrays(gridSequence, fibonacciCache) === true)
      {
        gridSequence.forEach(function(cell)
        {
          cell.toggleColorGreen(cell);
          cell.resetCell(cell);
        });

        break;
      }
    }
  }

  function compareTwoArrays(arrayToCompareTo, arrayToBeCompared)
  {
    for (let i = 0; i < arrayToCompareTo.length; i++)
    {
      if(arrayToCompareTo[i].number != arrayToBeCompared[i])
      {
        return false;
      }
    }
    return true;
  }

  function resetGrid()
  {
    gridArray = [];
    createGridOfTiles();
  }
}
