function onEdit(e) {
  var range = e.range;
  if (range.getColumn() == 1 && range.getRow() == 2) {
    clearOldReport();
  }
}
