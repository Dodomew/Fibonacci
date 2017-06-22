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
  var numberOfRows = 20;
  var numberOfColumns = 50;
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

      this.positionInArray = [rowNumber][columnNumber];

      row.appendChild(this.divContainer);
    }
  }

  function createGridOfTiles()
  {
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
  }

  function addOneToConnectedCells(rowNumber, columnNumber)
  {
    for (let i = 0; i < numberOfRows; i++)
    {
      let cell = gridArray[i][columnNumber];
      cell.divContainer.classList.add("grid-cell-color");
    }

    for (let j = 0; j < numberOfColumns; j++)
    {
      let cell = gridArray[rowNumber][j];
      cell.divContainer.classList.add("grid-cell-color");
    }
  }
}
