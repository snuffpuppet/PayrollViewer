function menuPayrollReport()
{
  var reportWeeks = 2;
  var startTime = new Date(getReportStartDate());
  var endTime = new Date(startTime.getTime() + reportWeeks * 7 * 24 * 60 * 60 * 1000);
  
  var events = getReportCalendar().getEvents(startTime, endTime);
  ASSERT_TRUE(events != null, "Problem retrieving shifts from " + startTime.getDate() + "/" + startTime.getMonth() + " to " + endTime.getDate() + "/" + endTime.getMonth());
  ASSERT_TRUE(events.length > 0, "No shifts found from " + startTime.getDate() + "/" + startTime.getMonth() + " to " + endTime.getDate() + "/" + endTime.getMonth());
  
  var schedule = new lib.ShiftSchedule(startTime, endTime, events);
  var scheduleIndex = new lib.ShiftScheduleIndex(schedule);
  
  // clear out any old stuff
  clearOldReport();  

  var sheet = SpreadsheetApp.getActiveSheet();
  
  // First set up the headers dates
  for (var day=0; day < reportWeeks*7; day++) {
    var date = new Date(startTime.getTime() + day * 24 * 60 * 60 * 1000);
    sheet.getRange(2, 2 + day + Math.floor(day/7)*2).setValue(date.getDate() + "/" + (date.getMonth()+1)).setFontColor("black");
  }
  
  //
  // Now print out the schedule
  // For every employee in the schedule:
  //   Display Employee name
  //   For each week of the report duration
  //     Display report header
  //     For each payroll split period
  //       For each day in this week of the report
  //         Display payroll split for this period on this day and employee
  //       Display summary of payroll splits for this payroll period on this day for this employee
  //

  var reportRowOffset=3;

  for (var ei=0; ei < scheduleIndex.employees.length; ei++) {
    var employee = scheduleIndex.employees[ei];

    // Display employee name & payroll splits
    sheet.getRange(reportRowOffset+ei*5, 1).setValue(employee).setFontColor("black").setFontWeight('bold');
    var dummyPayrollSplit = new lib.PayrollSplit();
    for (var period = 0; period < dummyPayrollSplit.periods.length; period++) {
      var periodStart = dummyPayrollSplit.periods[period].start;
      var periodEnd = dummyPayrollSplit.periods[period].end;
      var displayPeriod = periodStart%12 + (periodStart < 12 ? "am -> " : "pm -> ")
                          + periodEnd%12 + (periodEnd < 12 ? "am" : "pm");
      sheet.getRange(reportRowOffset+ei*5+period+1, 1).setValue(displayPeriod).setFontColor("black").setFontWeight('normal');
    }
    
    // Iterate over number of weeks in report and display them horizontally
    for (var weekNum = 0; weekNum < reportWeeks; weekNum++) {
      var report = new PayrollReport(employee, weekNum*7, schedule);      
      for (var i=0; i<report.table.length; i++) {
        for (var j=0; j<report.table[0].length; j++) {
          sheet.getRange(reportRowOffset + ei*5 + i, 2+j+weekNum*9).setValue(report.table[i][j]).setFontColor("black");
        }
      }
    }
  }
  
  // Now print out warnings
  for (var w = 0; w < schedule.warnings.length; w++) {
    sheet.getRange(reportRowOffset+scheduleIndex.employees.length*5+1+w, 1).setValue(schedule.warnings[w]).setFontColor("red");
  }

  SpreadsheetApp.flush();
}
