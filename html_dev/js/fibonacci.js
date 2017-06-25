/*

Maak een 50x50 grid. Als je klikt op een cel wordt bij alle cellen in
de rij en kolom van de cel 1 opgeteld. Was een cel leeg dan wordt die
op 1 gezet. Na elke verandering licht een cel kort geel op. Als 5
elkaar in de Fibonacci-reeks opvolgende getallen naast elkaar staan,
lichten deze cellen kort groen op en worden ze leeg gemaakt. Gebruik
de programmeertaal die je het beste vindt passen.

*/

'use strict';

window.onload = function initializeGame()
{
  var gridContainer = document.getElementById("grid-container");
  gridContainer.addEventListener('click', clickEventHandler, false);

  var resetButton = document.getElementById("header-button-reset");
  resetButton.addEventListener('click', resetGrid, false);

  var numberOfRows = 50;
  var numberOfColumns = 50;

  var rowAndCellsContainer = [];
  var fibonacciSequence = [1, 1];

  var animationSpeedOfColorToggleAndReset = 250;

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
      animationSpeedOfColorToggleAndReset);
    }

    toggleColorGreen()
    {
      let thisCell = this;
      this.divContainer.classList.add("cell-fibonacci");

      setTimeout(function removeColorGreenClass()
      {
        thisCell.divContainer.classList.remove("cell-fibonacci");
      },
      animationSpeedOfColorToggleAndReset);
    }

    resetCell()
    {
      let thisCell = this;
      this.number = 0;

      setTimeout(function resetCells()
      {
        thisCell.divContainer.innerHTML = "";
      },
      animationSpeedOfColorToggleAndReset);

    }
  }

  createGridOfRowsAndCells()

  function dynamicFibonacciGenerator(fibonacciSequence)
  {
    let lastNumber = fibonacciSequence[fibonacciSequence.length - 1];
    let secondLastNumber = fibonacciSequence[fibonacciSequence.length - 2];

    let newFibonacciNumber = lastNumber + secondLastNumber;
    fibonacciSequence.push(newFibonacciNumber);
  }

  function expandFibonacciSequence(biggestNumberInGridSequence)
  {
    while(biggestNumberInGridSequence > fibonacciSequence[fibonacciSequence.length - 1])
    {
      let lastNumber = fibonacciSequence[fibonacciSequence.length - 1];
      let secondLastNumber = fibonacciSequence[fibonacciSequence.length - 2];

      let newFibonacciNumber = lastNumber + secondLastNumber;
      fibonacciSequence.push(newFibonacciNumber);
    }
  }

  function createGridOfRowsAndCells()
  {
    gridContainer.innerHTML = "";

    for (let i = 0; i < numberOfRows; i++)
    {
      let rowArrayToHoldCells = [];
      let row = document.createElement("div");
      row.classList.add("grid-row");
      row.id = "row-" + i;

      gridContainer.appendChild(row);

      rowAndCellsContainer.push(rowArrayToHoldCells);

      for (let j = 0; j < numberOfColumns; j++)
      {
        let cell = new Cell(row, i, j)
        rowArrayToHoldCells.push(cell);
      }
    }
  }

  function clickEventHandler()
  {
    let e = window.event || event;
    let clickedCell = e.srcElement.id;

    if(clickedCell.includes("row") == true && clickedCell.includes("cell") == true)
    {
      let cellPosition = findCellPositionInGrid(clickedCell);
      addOneAndAddColorToConnectedCells(cellPosition[0], cellPosition[1]);
      findHorizontalAndVerticalSequences();
    }
  }

  function findCellPositionInGrid(cellId)
  {
    let regexFindNumbers = /\d{1,2}/g; // must change to 1,3 if rows and columns exceed 100
    let stringNumbers = cellId.match(regexFindNumbers);

    let rowPosition = parseInt(stringNumbers[0]);
    let columnPosition = parseInt(stringNumbers[1]);

    let cellPosition = [];
    cellPosition.push(rowPosition, columnPosition);

    return cellPosition;
  }

  function addOneAndAddColorToConnectedCells(rowNumber, columnNumber)
  {
    for (let i = 0; i < numberOfRows; i++)
    {
      let cell = rowAndCellsContainer[i][columnNumber];

      // skip. already done in next for loop
      if(cell == rowAndCellsContainer[rowNumber][columnNumber])
      {
        continue;
      }

      cell.toggleColorYellow();
      cell.addOneToNumber();
    }

    for (let j = 0; j < numberOfColumns; j++)
    {
      let cell = rowAndCellsContainer[rowNumber][j];

      cell.toggleColorYellow();
      cell.addOneToNumber();
    }
  }

  function findHorizontalAndVerticalSequences()
  {
    let horizontalSequence = [];
    let verticalSequence = [];

    for (let i = 0; i < numberOfRows; i++)
    {
      for (let j = 0; j < numberOfColumns; j++)
      {
        horizontalSequence.length = 0;
        verticalSequence.length = 0;

        if(j + 4 < numberOfColumns)
        {
          horizontalSequence.push(rowAndCellsContainer[i][j],
                                  rowAndCellsContainer[i][j + 1],
                                  rowAndCellsContainer[i][j + 2],
                                  rowAndCellsContainer[i][j + 3],
                                  rowAndCellsContainer[i][j + 4]);

          if(containsAFibonacciSequence(horizontalSequence) == true)
          {
            horizontalSequence.forEach(function(cell)
            {
              cell.toggleColorGreen();
              cell.resetCell();
            });
          }
        }

        if(i + 4 < numberOfRows)
        {
          verticalSequence.push(rowAndCellsContainer[i][j],
                                rowAndCellsContainer[i + 1][j],
                                rowAndCellsContainer[i + 2][j],
                                rowAndCellsContainer[i + 3][j],
                                rowAndCellsContainer[i + 4][j]);

          if(containsAFibonacciSequence(verticalSequence) == true)
          {
            verticalSequence.forEach(function(cell)
            {
              cell.toggleColorGreen();
              cell.resetCell();
            });
          }
        }
      }
    }
  }

  function containsAFibonacciSequence(gridSequence)
  {
    expandFibonacciSequence(gridSequence[4].number);

    let fibonacciCache = [];

    for (let i = 0; i < fibonacciSequence.length; i++)
    {
      fibonacciCache.length = 0;

      fibonacciCache.push(fibonacciSequence[i],
                          fibonacciSequence[i + 1],
                          fibonacciSequence[i + 2],
                          fibonacciSequence[i + 3],
                          fibonacciSequence[i + 4]);

      if(isSequenceAFibonacci(gridSequence, fibonacciCache) === true)
      {
        return true;
      }
    }
    return false;
  }

  function isSequenceAFibonacci(sequence, fibonacci)
  {
    if (sequence.length != fibonacci.length)
    {
      return false;
    }

    for (let i = 0; i < sequence.length; i++)
    {
      if(sequence[i].number != fibonacci[i])
      {
        return false;
      }
    }
    return true;
  }

  function resetGrid()
  {
    rowAndCellsContainer = [];
    createGridOfRowsAndCells();
  }
}
