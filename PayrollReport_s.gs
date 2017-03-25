function PayrollReport(employee, startOffset, schedule) {
  this.employee = employee;
  this.startOffset = startOffset;
  this.header = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "TOTAL"];
  this.table = [];
  this.table[0] = this.header;
  
  var dummyPayrollSplit = new lib.PayrollSplit();
  for (var period = 0; period < dummyPayrollSplit.periods.length; period++) {
    var periodTotal=0;
    this.table[period+1] = [];
    for (var col = 0; col < this.header.length; col++) {
      if (this.header[col] == "TOTAL") {
        this.table[period+1][col] = periodTotal;
      }
      else {
        var workDay = schedule.employees[employee].day[startOffset+col];
        var periodHours = 0;
        if (workDay.totalHours > 0) {
          periodHours = workDay.payrollSplit.periods[period].shift;
          // If there is an unpaid break then it is taken from the lowest pay rate payroll period
          if (workDay.payrollSplit.periods[period].start == 7) {
            periodHours -= workDay.unpaid;
          }
          periodHours = Math.round(periodHours * 100)/100;
        }
        this.table[period+1][col] = periodHours;
        periodTotal += periodHours;
      }
    }
  }
}
