function getSheetArray(rw = 4, columns = 4) {
  let arr = [];
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';
  for (let row = 0; row < rw; row++) {
    arr.push([]);
    for (let col = 0; col < columns; col++) {
      let colKey = alphabet[col];
      let rowKey = row + 1;
      arr[row].push({ key: colKey + rowKey, value: '' });
    }
  }
  return arr;
}

export default getSheetArray;
