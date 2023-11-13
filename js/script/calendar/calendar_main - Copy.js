function project_calendar(){
     monthEle = document.querySelector('.month');
     yearEle = document.querySelector('.year');
     btnNext = document.querySelector('.btn-calendar-next');
     btnPrev = document.querySelector('.btn-calendar-prev');
     dateEle = document.querySelector('.date-container');
     currentMonth = new Date().getMonth();
     currentYear = new Date().getFullYear();
}
project_calendar.NAME         = "project_calendar";
project_calendar.VERSION      = "1.2";
project_calendar.DESCRIPTION  = "Class project_calendar";

project_calendar.prototype.constructor = project_calendar;
project_calendar.prototype = {
    init:function(){
        project_calendar.prototype.displayInfo();
        // Xử lý khi ấn vào nút next month
        btnNext.addEventListener('click', function () {
            if (currentMonth == 11) {
                currentMonth = 0;
                currentYear++;
            } else {
                currentMonth++;
            }
            project_calendar.prototype.displayInfo();
        });

        // Xử lý khi ấn vào nút previous month
        btnPrev.addEventListener('click', function () {
            if (currentMonth == 0) {
                currentMonth = 11;
                currentYear--;
            } else {
                currentMonth--;
            }
            project_calendar.prototype.displayInfo();
        });
    },
    displayInfo: function() {
        // Hiển thị tên tháng
        var currentMonthName = new Date(
            currentYear,
            currentMonth
        ).toLocaleString('en-us', { month: 'long' });

        monthEle.innerText = currentMonthName;
        $('#calendar-main .year_id').val(currentYear);
        $('#calendar-main .month_id').val(currentMonth);
        // Hiển thị năm
        yearEle.innerText = currentYear;
        // Hiển thị ngày trong tháng
        project_calendar.prototype.renderDate();
    },
    // Lấy số ngày của 1 tháng
    getDaysInMonth: function() {
        return new Date(currentYear, currentMonth + 1, 0).getDate();
   },
    // Lấy ngày bắt đầu của tháng
    getStartDayInMonth:function() {
    return new Date(currentYear, currentMonth, 1).getDay();
    },
    // Active current day
    activeCurrentDay: function(day) {
        var day1 = new Date().toDateString();
        var day2 = new Date(currentYear, currentMonth, day).toDateString();
        return day1 == day2 ? 'active' : '';
    },
    // Hiển thị ngày trong tháng lên trên giao diện
    renderDate:function() {
        var daysInMonth = project_calendar.prototype.getDaysInMonth();
        var startDay = project_calendar.prototype.getStartDayInMonth();

        dateEle.innerHTML = '';

        for (var i = 0; i < startDay; i++) {
            dateEle.innerHTML += '<div class="day"></div>';
        }

        for (var i = 0; i < daysInMonth; i++) {
            var j =i + 1;
            dateEle.innerHTML += '<div class="day in-day relative-cl '+project_calendar.prototype.activeCurrentDay(j)+'"><span class="day_text">'+ j +'</span>'+
                //'<i class="fa fa-plus absolute-cl position1-cl font-size-11 font-color cursor-m">' +
                //    '<span class="tooltiptext">Add driver</span>' +
               // '</i>' +
                '<i class="fa fa-eye absolute-cl position1-cl font-size-14 font-color cursor-m view-task">' +
                    '<span class="tooltiptext">View driver</span>' +
                '</i>' +
            '</div>'

        }//

        var year = $('#calendar-main .year_id').val();
        var month = $('#calendar-main .month_id').val();

        project_calendar.prototype.get_calendar_from_to_date(year,month);
    },

    get_calendar_from_to_date:function(year,month){
        var first_day = new Date(year, month, 2);
        month++;
        var last_day = new Date(year, month, 1);
        first_day = first_day.toISOString().slice(0, 10);
        last_day = last_day.toISOString().slice(0, 10);
        var contact_id = localStorage.getItemValue('userID');
        var role = localStorage.getItemValue('level');
        var _link =link._calendars;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:{token:_token,from_date:first_day,to_date:last_day,
                contact_id:contact_id,role:role},
            error : function (status,xhr,error) {
            },
            success: function (data){
                if(data.length >0){
                    $('.in-day').each(function(){
                        var task =0;
                        var day_text = $(this).find(".day_text").text();
                        var $me = $(this);
                        data.forEach(function(item){
                            if(day_text == item["date"]){
                                $me.find(".view-task").addClass('red-dart')
                                task++
                            }
                        });

                        if(task > 0){
                            var task1 = task +" task";
                            if(task >1)  task1 = task +" tasks";
                            $me.find(".tooltiptext").text(task1)
                        }
                    })
                }
            }
        });
  }
}

var prj = new project_calendar();
$(function(){
    prj.init();
});
