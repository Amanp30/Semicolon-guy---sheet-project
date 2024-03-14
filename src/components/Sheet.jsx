import React, { useEffect, useState } from 'react';
import getSheetArray from '../utils/getSheetArray';

function Sheet() {
  const [state, setState] = useState(getSheetArray(5, 9));
  const [selectedCell, setSelectedCell] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.classList.contains('SheetCell') &&
        !e.target.classList.contains('colorInput')
      ) {
        setSelectedCell(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleCellEdit = (e, rowIndex, cellIndex) => {
    e.preventDefault();

    const newValue = e.target.innerText;

    setState((prevState) => {
      const newState = prevState.map((row, i) =>
        i === rowIndex
          ? row.map((cell, j) =>
              j === cellIndex ? { ...cell, value: newValue } : cell
            )
          : row
      );

      return newState;
    });
  };

  const handleCellBgColor = (e) => {
    const bgColor = e.target.value;
    const selectedCellDiv = document.getElementById(selectedCell);
    if (selectedCellDiv) {
      selectedCellDiv.style.backgroundColor = bgColor;
    }
  };

  return (
    <>
      <input type="color" onChange={handleCellBgColor} className="colorInput" />
      <div className="SheetRow">
        <div></div> {/* Empty cell for the row index */}
        {[...Array(state[0].length).keys()].map((index) => (
          <div key={`column-${index}`} className="SheetCell-Title">
            {String.fromCharCode(65 + index)}
          </div>
        ))}
      </div>
      {state.map((row, rowIndex) => (
        <>
          <div className="SheetRow" key={`row-${rowIndex}`}>
            <div className="rowIdx">{rowIndex + 1}</div>
            {row.map((cell, cellIndex) => (
              <div
                className={`SheetCell ${
                  selectedCell === cell.key ? 'selected' : ''
                }`}
                id={cell.key}
                key={`cell-${cell.key}`}
                onDoubleClick={() => setSelectedCell(cell.key)}
                onBlur={(e) => handleCellEdit(e, rowIndex, cellIndex)}
                contentEditable={selectedCell === cell.key}
              >
                {cell.value}
              </div>
            ))}
          </div>
        </>
      ))}

      {JSON.stringify(state)}
    </>
  );
}

export default Sheet;
