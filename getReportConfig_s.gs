function getReportCalendar() {
  // connect to calendar specified on sheet
  var rosterCalendarField = SpreadsheetApp.getActiveSpreadsheet().getRange("A1");
  ASSERT_TRUE(rosterCalendarField != null, "Report (A1) calendar field not found in spreadsheet");
  ASSERT_TRUE(rosterCalendarField.getValues().length == 1, "Multiple report date fields found, very confusing");
  
  var rosterCalendarName = rosterCalendarField.getValues()[0];
  var rosterCalendars = CalendarApp.getCalendarsByName(rosterCalendarName);
  ASSERT_TRUE(rosterCalendars.length == 1, rosterCalendars.length + " calendars found for '" + rosterCalendarName + "'");

  return rosterCalendars[0];
} 

function getReportStartDate() {
  // grab the start date from the named field on the sheet
  var startDateField = SpreadsheetApp.getActiveSpreadsheet().getRange("A2");
  ASSERT_TRUE(startDateField != null, "Report Date (A2) field not found in spreadsheet");
  ASSERT_TRUE(startDateField.getValues().length == 1, "Multiple report date fields found, very confusing");
  
  return startDateField.getValues()[0];
} 
