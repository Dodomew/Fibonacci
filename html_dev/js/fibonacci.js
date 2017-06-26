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

  var animationSpeed = 300;

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

    addColorYellow()
    {
      this.divContainer.classList.add("grid-cell-yellow");
    }

    removeColorYellow()
    {
      this.divContainer.classList.remove("grid-cell-yellow");
    }

    addColorGreen()
    {
      this.divContainer.classList.add("grid-cell-green");
    }

    removeColorGreen()
    {
      this.divContainer.classList.remove("grid-cell-green");
    }

    resetCell()
    {
      this.number = 0;
      this.divContainer.innerHTML = "";
    }
  }

  createGridOfRowsAndCells()

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

  function clickEventHandler(event)
  {
    let e = window.event || event;
    let clickedCell = event.target.id || event.srcElement.id;

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
    let connectedCells = [];

    for (let i = 0; i < numberOfRows; i++)
    {
      let cell = rowAndCellsContainer[i][columnNumber];

      // skip. already done in next for loop
      if(cell == rowAndCellsContainer[rowNumber][columnNumber])
      {
        continue;
      }

      cell.addOneToNumber();
      cell.addColorYellow();
      connectedCells.push(cell);
    }

    for (let j = 0; j < numberOfColumns; j++)
    {
      let cell = rowAndCellsContainer[rowNumber][j];

      cell.addOneToNumber();
      cell.addColorYellow();
      connectedCells.push(cell);
    }

    setTimeout(function colorConnectedCells()
    {
      for (let i = 0; i < connectedCells.length; i++)
      {
        connectedCells[i].removeColorYellow();
      }
    }, animationSpeed);

  }

  function findHorizontalAndVerticalSequences()
  {
    let horizontalSequence = [];
    let verticalSequence = [];
    let sequenceOfAffectedCells = [];

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
            sequenceOfAffectedCells.push.apply(sequenceOfAffectedCells, horizontalSequence);

            horizontalSequence.forEach(function(cell)
            {
              cell.addColorGreen();
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
            // https://stackoverflow.com/questions/4156101/javascript-push-array-values-into-another-array
            sequenceOfAffectedCells.push.apply(sequenceOfAffectedCells, verticalSequence);

            verticalSequence.forEach(function(cell)
            {
              cell.addColorGreen();
            });
          }
        }
      }
    }

    if(sequenceOfAffectedCells.length > 0)
    {
      setTimeout(function removeGreenFromCells()
      {
        for (let a = 0; a < sequenceOfAffectedCells.length; a++)
        {
          sequenceOfAffectedCells[a].removeColorGreen();
          sequenceOfAffectedCells[a].resetCell();
        }
      }, animationSpeed);
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
