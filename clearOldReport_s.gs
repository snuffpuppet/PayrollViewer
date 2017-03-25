function clearOldReport() {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(2, 2, 1, 30).clear({contentsOnly: true}).setFontColor("black").setFontWeight('normal');
  sheet.getRange(3, 1, 100, 30).clear({contentsOnly: true}).setFontColor("black").setFontWeight('normal');
}
