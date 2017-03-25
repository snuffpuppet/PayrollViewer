// for every employee:
//   Total hours worked over period
//   for each day (date, dayNum)
//     Total hours worked in day
//     for each time partition
//       Total number of hours worked to 2 decimal places
//       Total break time
//

function onOpen() {
  // Add a custom menu to the spreadsheet.
  /*
  SpreadsheetApp.getUi() 
      .createMenu('Roster')
      .addItem('Weekly Hours', 'menuWeeklyHours')
      .addToUi();
      */
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [    
    {
      name : "Payroll Report",
      functionName : "menuPayrollReport"
    }


 ];
  sheet.addMenu("Payroll", entries);
}
