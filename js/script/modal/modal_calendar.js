function modal_calendar(){

}
modal_calendar.NAME         = "modal_inv";
modal_calendar.VERSION      = "1.2";
modal_calendar.DESCRIPTION  = "Class modal_calendar";

modal_calendar.prototype.constructor = modal_calendar;
modal_calendar.prototype = {
    init: function(){
        modal_calendar.prototype.task_select2_el("#assign-task-modal #task-id",'#task-id','#assign-task-modal');
        modal_calendar.prototype.driver_select2_el("#assign-task-modal #driver-id",'#driver-id','#assign-task-modal')
        $('#assign-task-modal .datepicker').datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true,
            showOtherMonths: true,
            prevText: '<i class="fa fa-chevron-left"></i>',
            nextText: '<i class="fa fa-chevron-right"></i>'
        });

        /*$('#assign-task-modal .timepicker').timepicker({
            timeFormat: 'HH:mm',
            interval: 15,
            minTime: '00:00',
            maxTime: '23:59',
            startTime: '00:00',
            dynamic: false,
            dropdown: true,
            scrollbar: false
        });*/

        /***********************/
        var contact_id = localStorage.getItemValue('userID');
        var role = localStorage.getItemValue('level');
        $("#calendar-id").on("click",'.view-task',function(){
            var month = $('#calendar-main .month_id').val();
            var day = $(this).closest('.in-day').find('.day_text').text();
            month = parseInt(month) +1
            if(month <10) month = "0"+month;
            day = parseInt(day)
            if(day <10) day = "0"+day;

            var current_date =$('#calendar-main .year_id').val() +"-"+month+"-"+day ;
            $("#calendar-modal #date-click").val(current_date)
            modal_calendar.prototype.get_calendar_date(current_date,contact_id,role)
        });

        $('#btn-search').unbind('click').bind('click',function(){
            var current_date = $("#calendar-modal #date-click").val()
            modal_calendar.prototype.get_calendar_date(current_date,contact_id,role)
        })

        $('#text-search').keydown(function(e){
            if(e.keyCode==13){
                var current_date = $("#calendar-modal #date-click").val()
                modal_calendar.prototype.get_calendar_date(current_date,contact_id,role)
            }
        })

        $('#calendar-id').on('click','.add-task',function(){
            modal_calendar.prototype.reset_modal_assign_task()
            $('#assign-task-modal').modal('show');
            var day = $(this).closest('.in-day').find('.day_text').text();
            var month = $(this).closest('.calendar').find('.month_id').val();
            month =parseInt(month) +1;
            var year = $(this).closest('.calendar').find('.year_id').val();
            var date =year+'/'+month+'/'+day;
            $('#assign-task-modal #selected-date').val(date);
            var current_date = new Date(date).format('Y-m-d');
            $("#assign-task-modal #delivery-date").val(current_date)
            $("#assign-task-modal #delivery-date").prop("readonly",true);
        })


        $('#assign-task-modal #delivery-date').change(function(){
            $('#assign-task-modal #delivery-date-err').css({"display":"none"})
            $('#assign-task-modal #delivery-date-err').text("Delivery date is required")
        })

        $('#assign-task-modal #btn-submit').unbind('click').bind('click',function(){
            modal_calendar.prototype.cal_save('#assign-task-modal')
        })
    }, //
    /***********************************/
    get_calendar_date:function(date,contact_id,role){
        var text_search =$("#calendar-modal #text-search").val()
        //console.log(date);
        var _link =link._calendar_date;
        var _data ={token:_token,current_date:date,
            contact_id:contact_id,role:role,text_search:text_search,
            limit:1,cursor:0
        }
        var $pagination = $('#pagination_task_in_date');
        var defaultOpts = {
            totalPages: 20
        };
        $pagination.twbsPagination(defaultOpts);

        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            data:_data,
            dataType: 'json',
            error : function (status,xhr,error) {
            },
            success: function (data) {
                var totalRecords = parseInt(data.row_cnt);
                if(totalRecords == 0) return;

                var remaining = 0
                if(totalRecords%3 >0) remaining=1;

                var totalPages = remaining + (totalRecords -totalRecords%3)/3;

                var currentPage = $pagination.twbsPagination('getCurrentPage');
                $pagination.twbsPagination('destroy');
                $pagination.twbsPagination($.extend({}, defaultOpts, {
                    startPage: currentPage,
                    totalPages: totalPages,
                    visiblePages: 10,
                    onPageClick:function (event, page) {
                        //fetch content and render here
                        var cursor = (page-1)*3
                        _data ={token:_token,current_date:date,
                            contact_id:contact_id,role:role,text_search:text_search,
                            limit:3,cursor:cursor
                        }

                        $.ajax({
                            "async": true,
                            "crossDomain": true,
                            "url": _link,
                            data:_data,
                            "method": "POST",
                            dataType: 'json',

                            error : function (status,xhr,error) {
                            },
                            success: function (res) {
                                if(res.list==undefined) return
                                modal_calendar.prototype.view_task_in_calendar(res.list)
                            }
                        });//end ajax get appointment at current page
                    } //end onPageClick
                }));
                //
            }
        });

    },
    /***********************************/
    get_calendar_date_bk:function(date,contact_id,role){
        var _link =link._calendar_date;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:{token:_token,current_date:date,
                contact_id:contact_id,role:role},
            error : function (status,xhr,error) {
            },
            success: function (data){
                modal_calendar.prototype.view_task_in_calendar(data.list)
            }
        });
    },
    /***********************************/
    view_task_in_calendar:function(data){
        var tr ='';
        if(data.length >0){
            data.forEach(function(item,index){
                var class1 = "in-active"
                var close1 ='status-close'
                var fa_edit =""
                var fa_save=""
                var fa_cancel=""
                if(item.status !='close') {
                    class1 =""
                    close1 = "color-ligh-blue"
                    fa_edit ='<i class="btn-edit fa fa-edit f_z_12 c_blue is_hide p-t10"></i>';
                    fa_save ='<i class="btn-save c_err fa fa-save is_show f_z_12 c_blue hide-content p-t10"></i>'
                    fa_cancel ='<i class="c_blue btn-cancel fa fa-times is_show f_z_12 hide-content p-t10" aria-hidden="true"></i>'
                }

                index++
                if(item.product_sku.depot_phone ==null) item.product_sku.depot_phone =''

                var pickup_file ='';
                if(item.file_pickup_name !=null && item.file_pickup_name !=""){
                    if(item.file_pickup_name.length >0){
                        pickup_file ='<div class="c-orange"> Files pickup: </div>'

                        item.file_pickup_name.forEach(function(exsiting_file){
                            var temp = exsiting_file.split('/');
                            var index = temp.length;
                            var name_file = temp[index-1];
                            pickup_file +='<div> <a href="'+exsiting_file+'" target="_blank" class="exsiting-file-name">'+name_file+'</a></div>'
                        })
                    }
                }

                var delivery_file ='';
                if(item.file_delivery_name !=null && item.file_delivery_name !=''){
                    if(item.file_delivery_name.length >0){
                        delivery_file ='<div class="c-orange"> Files delivery: </div>'

                        item.file_delivery_name.forEach(function(exsiting_file){
                            var temp = exsiting_file.split('/');
                            var index = temp.length;
                            var name_file = temp[index-1];
                            delivery_file +='<div> <a href="'+exsiting_file+'" target="_blank" class="exsiting-file-name">'+name_file+'</a></div>'
                        })
                    }
                }

                var driver_total = numeral(item.driver_total).format('$ 0,0.00')

              tr +='<tr class="'+class1+'">' +
                  '<td><span>'+index+'</span>' +
                  '<input type="hidden" class="calendar_id" value="'+item.calendar_id+'">' +
                  '<input type="hidden" class="task_id" value="'+item.task_id+'">' +
                  '<input type="hidden" class="task_in_day" value="'+item.task_in_day+'">' +
                  '<input type="hidden" class="driver_id" value="'+item.driver_id+'">' +
                  '<input type="hidden" class="task_create_date" value="'+item.task_create_date+'">' +
                  '<input type="hidden" class="driver_total" value="'+driver_total+'">' +
                  '</td>' +
                  '<td>' +
                      '<div>'+item.product_sku.depot_name+'</div>' +
                      '<div>'+item.product_sku.depot_address+'</div>' +
                      '<div>'+item.product_sku.depot_phone+'</div>' +
                  '</td>' +
                  '<td>' +
                      '<div>'+item.shipping_customer_name+'</div>' +
                      '<div>'+item.shipping_address+'</div>' +
                      '<div>'+item.shipping_email+'</div>' +
                      '<div>'+item.shipping_phone+'</div>' +
                  '</td>' +
                  '<td><span class="is_hide">' +
                      '<div>'+item.order_title+'</div>' +
                      '<div>'+item.product_sku.prod_name+
                           '('+item.product_sku.SKU+')</div>' +
                      '<div class="color-ligh-blue day-delivery">'+item.task_in_day+'</div>' +
                      '<div class="color-ligh-blue">'+item.product_sku.distance+' miles</div>' +
                        '<div class="color-ligh-blue">'+numeral(item.total).format('$ 0,0.00')+'</div>' +
                        '<div class="'+close1+'">'+item.status+'</div>' +pickup_file+delivery_file+

                    '</span>' +
                    '<span class="is_show hide-content">' +
                        '<div class="col col-12">'+
                            '<div class=" col-12 padding_rl">Delivery date(*)  <span class="error delivery-date-error" style="display: none">Delivery date is required</span></div>' +
                            '<div class=" col-12 padding_rl m-t3">' +
                                '<input type="date" class="datepicker form-control delivery-date" >' +
                            '</div>' +
                        '</div>' +
                        '<div class="col col-12 m-t5">' +
                            '<div class=" col-12 padding_rl">Time</div>' +
                            '<div class=" col-12 padding_rl m-t3">' +
                                '<input type="time" class="timepicker form-control delivery-time">' +
                            '</div>' +
                        '</div>' +
                        '<div class="col col-12 m-b10 m-t5">' +
                            '<div class="col-12 padding_rl">Assign driver(*)<a class="pointer driver_link"></a> <span class="error driver-err" style="display: none">Driver is required</span></div>' +
                            '<div class="col-12 padding_rl m-t3">' +
                                '<select class="form-control driver-id-v"></select>' +
                            '</div>' +
                        '</div>'+
                    '</span>' +
                  '</td>' +
                  '<td><span class="is_hide">' +
                      '<div class="driver-name">'+item.driver_name+'</div>' +
                      '<div class="driver-phone">'+item.driver_phone+'</div>' +
                      '<div class="driver-email">'+item.driver_email+'</div>' +
                      '<div class="driver-total-id color-alert">'+driver_total+'</div>' +
                      '</span>' +
                       '<span class="is_show hide-content"></span>' +
                  '</td>' +
                  '<td>' +fa_edit+fa_save+fa_cancel+
                  '</td>' +
              '</tr>'
            })
        }

        $('#tbl-task-in_calendar tbody').html(tr);
        $('#calendar-modal').modal("show")
        //bind event
        modal_calendar.prototype.calendar_event();
    },
    /***********************************/
    calendar_event:function(){
        $('#tbl-task-in_calendar .btn-edit').unbind('click').bind('click',function(){
            var $me =$(this)
            //$me.closest('tr').find('.delivery-date').val('')
            //$me.closest('tr').find('.delivery-time').val('')
            $me.closest('tr').find('.driver-id-v').change(function(){
                $(this).closest('tr').find('.delivery-date-err').css({"display":"none"})
                $(this).closest('tr').find('.delivery-date-err').text("Delivery date is required")
            })
            //set date
            var day_delivery = $me.closest('tr').find('.day-delivery').text()
            day_delivery = day_delivery.split(" ");
            var date = new Date(day_delivery[0]).format('Y-m-d');
            var time = day_delivery[1];
            $me.closest('tr').find('.delivery-date').val(date)
            $me.closest('tr').find('.delivery-time').val(time)

            $me.closest('tr').find('.is_hide').removeClass('show-content')
            $me.closest('tr').find('.is_hide').addClass('hide-content')

            $me.closest('tr').find('.is_show').removeClass('hide-content')
            $me.closest('tr').find('.is_show').addClass('show-content')
            //set driver
            var is_admin = localStorage.getItemValue('level');
            if(is_admin !="Admin"){
                var driver_id = localStorage.getItemValue('userID');
                var driver_name = localStorage.getItemValue('user_name');
                var driver_email = localStorage.getItemValue('login_email');
                if(driver_email ==null) driver_email =''
                var driver_phone = localStorage.getItemValue('login_phone');
                if(driver_phone ==null) driver_phone =''
                modal_calendar.prototype.driver_select2_el("#calendar-modal .driver-id-v",'.driver-id-v','#calendar-modal',function(){
                    var option ='<option value="'+driver_id+'" driver_email ="'+driver_email+'" driver_phone ="'+driver_phone+'">'+driver_name+'</option>';
                    $me.closest('tr').find('.driver-id-v').append(option).trigger('change')
                });
            }else{
                var driver_id = $me.closest('tr').find('.driver_id').val();
                var driver_name = $me.closest('tr').find('.driver-name').text();
                var driver_email = $me.closest('tr').find('.driver-email').text();
                var driver_phone = $me.closest('tr').find('.driver-phone').text();

                modal_calendar.prototype.driver_select2_el("#calendar-modal .driver-id-v",'.driver-id-v','#calendar-modal',function(){
                    var option ='<option value="'+driver_id+'" driver_email ="'+driver_email+'" driver_phone ="'+driver_phone+'">'+driver_name+'</option>';
                    $me.closest('tr').find('.driver-id-v').append(option).trigger('change')
                });
               // modal_calendar.prototype.driver_select2_el("#calendar-modal .driver-id-v",'.driver-id-v','#calendar-modal')
            }
        });

        $('#tbl-task-in_calendar .btn-cancel').unbind('click').bind('click',function(){
            $(this).closest('tr').find('.is_hide').removeClass('hide-content')
            $(this).closest('tr').find('.is_hide').addClass('show-content')

            $(this).closest('tr').find('.is_show').removeClass('show-content')
            $(this).closest('tr').find('.is_show').addClass('hide-content')
        })

        $('#tbl-task-in_calendar .btn-save').unbind('click').bind('click',function(){
            var $me = $(this)
            modal_calendar.prototype.cal_update('#calendar-modal',$me)
        })

        $('#tbl-task-in_calendar .datepicker').each(function(){
            $(this).datepicker({
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true,
                showOtherMonths: true,
                prevText: '<i class="fa fa-chevron-left"></i>',
                nextText: '<i class="fa fa-chevron-right"></i>'
            });
        });

        /*$('.timepicker').timepicker({
            timeFormat: 'HH:mm',
            interval: 15,
            minTime: '00:00',
            maxTime: '23:59',
            startTime: '00:00',
            dynamic: false,
            dropdown: true,
            scrollbar: false
        });*/
    },
    /***********************************/
    convert_str_number:function(str){
       return  parseFloat(str.replaceAll('.', ''))
    },
    /****************************/
    task_select2_el: function(element,defined_el,modal_id,callback){
        var level =localStorage.getItemValue('level');
        var login_id = localStorage.getItemValue('userID')
        $(element).select2({
            dropdownParent: $(modal_id),
            placeholder: 'Search Task',
            minimumInputLength: 1,
            language: {
                inputTooShort: function () {
                    return 'Search Task';
                }
            },
            ajax: {
                "async": true,
                "crossDomain": true,
                url: link._taskSearch,
                type: 'post',
                dataType: 'json',
                delay: 300,
                data: function (params) {
                    var _data = {token:_token,text_search:params.term,level:level,login_id:login_id}
                    return _data;
                },
                processResults: function (data, params) {
                    data1 = $.map(data, function (obj) {
                        return {
                            text:obj.taskName,
                            id:obj.id,
                            createDate:obj.createDate,
                            assign_id:obj.assign_id,
                            assign_name:obj.assign_name,
                            delivery_date:obj.delivery_date,
                            product_sku:obj.product_sku,
                            shipping_customer_name:obj.bill_to_name,
                            order_title:obj.order_title,
                            order_date:obj.order_date,
                            shipping_email:obj.shipping_email,
                            shipping_phone:obj.shipping_phone,
                            shipping_address:obj.shipping_address,
                            calendar_id:obj.calendar_id
                        };
                    });
                    //console.log(data1);
                    return { results: data1 }

                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: function (data) {

                var phone =data.shipping_phone ? data.shipping_phone:""
                var email =data.shipping_email ? data.shipping_email:""
                email = phone ? email:email +", " +phone

                var driver =data.assign_id ? data.assign_name:""
                var delivery_date =data.delivery_date ? data.delivery_date:""
                var div1 =''
                if(driver !=''){
                    div1 =  '<div class="select2-result-repository__title"><strong>Driver name: '+driver+'</strong></div>'
                }else if(delivery_date !=''){
                    div1 =  '<div class="select2-result-repository__title"><strong>Delivery date: '+delivery_date+'</strong></div>'
                }

                var calendar_id = data.calendar_id?data.calendar_id:""
                var calendar_div =''
                if(calendar_id !=''){
                    calendar_div = '<div class="select2-result-repository__title"><strong class="c_err">Existing calendar</strong></div>'
                }

                return '<div class="padding-5">' +
                    '<div class="select2-result-repository__title text-left">' + data.order_title +
                        '<div class="pull-right">' + data.shipping_customer_name +'</div>' +
                    '</div>' +
                    '<div class="select2-result-repository__title text-left">' + data.product_sku +
                        '<div class="pull-right">' + data.shipping_address +'</div>' +
                    '</div>' +
                    '<div class="select2-result-repository__title text-left">' + data.order_date +
                        '<div class="pull-right">' + email +'</div>' +
                    '</div>' +
                    '<div class="select2-result-repository__title text-left">' + div1 +'</div>' +
                    '<div class="select2-result-repository__title text-left">' + calendar_div +'</div>' +
                    '</div>';

            },
            templateSelection: function (data) {
                if(data.assign_id !=null && data.assign_id !=undefined && data.assign_id !=''){
                    $(element).find('option:selected').attr('driver_id', data.assign_id);
                    $(element).find('option:selected').attr('driver_name', data.assign_name);
                }else{
                    $(element).find('option:selected').attr('driver_id', '');
                    $(element).find('option:selected').attr('driver_name', '');
                }
                if(data.delivery_date !=null && data.delivery_date !=undefined && data.delivery_date !=''){
                    $(element).find('option:selected').attr('delivery_date', data.delivery_date);
                }else{
                    $(element).find('option:selected').attr('delivery_date', '');
                }
                if(data.createDate !=null && data.createDate !=undefined && data.createDate !=''){
                    $(element).find('option:selected').attr('task_create_date', data.createDate);
                }else{
                    $(element).find('option:selected').attr('task_create_date', '');
                }

                if (!data.text) return data.id;
                else return data.text;
            }
        }).change(function(){
                $(modal_id +' #task-err').css({"display":"none"})
                var selected_date = $(modal_id +' #selected-date').val();
                var selected_date = new Date(selected_date).format('Y-m-d');
                $(modal_id +' #delivery-date').val(selected_date)

                if(defined_el =='#task-id'){
                    var driver_id = $(this).find(":selected").attr('driver_id')
                    if(driver_id !='' && driver_id !=undefined){
                        var driver_name = $(this).find(":selected").attr('driver_name')
                        var option ='<option value="'+driver_id+'">'+driver_name+'</option>';
                        $(modal_id +' #driver-id').append(option).trigger('change')
                    }

                    var delivery_date = $(this).find(":selected").attr('delivery_date')
                    if(delivery_date !='' && delivery_date != undefined){
                        var day = $(modal_id +' #delivery-date').val()
                        var current_date = new Date(day).format('Y-m-d');

                        $('#modal-is-accept #existing-date').text(delivery_date+". ");
                        $('#modal-is-accept #date-change-by').text(current_date);
                        $('#modal-is-accept').modal('show')
                        $('#modal-is-accept #btn-accept-no').unbind('click').bind('click',function(){
                             var temp =delivery_date.split(" ");
                              $(modal_id +' #delivery-date').val(temp[0])
                              $(modal_id +' #delivery-time').val(temp[1])
                              $('#modal-is-accept').modal('hide')
                            //
                        })
                    }
                }
            });
        if(callback) callback();
    },
    /****************************/
    driver_select2_el:function(element,defined_el,modal_id,callback){
        var level =localStorage.getItemValue('level');
        var login_id = localStorage.getItemValue('userID')
        $(element).select2({
            dropdownParent: $(modal_id),
            placeholder: 'Search Driver',
            minimumInputLength: 1,
            language: {
                inputTooShort: function () {
                    return 'Search Driver';
                }
            },
            ajax: {
                "async": true,
                "crossDomain": true,
                url: link._driverSearch,
                type: 'post',
                dataType: 'json',
                delay: 300,
                data: function (params) {
                    var _data = {token:_token,text_search:params.term,level:level,login_id:login_id}
                    return _data;
                },
                processResults: function (data, params) {
                    data1 = $.map(data, function (obj) {
                        if(obj.driver_rate ==null || obj.undefined) obj.driver_rate =0
                        obj.driver_rate = numeral(obj.driver_rate).format('$ 0,0.00')
                        obj.driver_min_rate = numeral(obj.driver_min_rate).format('$ 0,0.00')

                        return {
                            text:obj.text ,
                            id:obj.id,
                            primary_street_address1:obj.primary_street_address1,
                            primary_email:obj.primary_email,
                            primary_phone:obj.primary_phone,
                            driver_rate: obj.driver_rate,
                            driver_min_rate:obj.driver_min_rate
                        };
                    });
                    //console.log(data1);
                    return { results: data1 }
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: function (data) {
                return '<div class="padding-5">' +
                    '<div class="select2-result-repository__title text-left">' + data.text +'</div>' +
                    '<div class="select2-result-repository__title text-left">' + data.primary_street_address1 +'</div>' +
                    '<div class="select2-result-repository__title text-left">' + data.primary_phone +'</div>' +
                    '<div class="select2-result-repository__title text-left">' + data.primary_email +'</div>' +
                    '<div class="select2-result-repository__title text-left">' + data.driver_rate +'/mile</div>' +
                    '<div class="select2-result-repository__title text-left">Min: ' + data.driver_min_rate +'</div>' +
                    '</div>';

            },
            templateSelection: function (data) {
                $(element).find('option:selected').attr('driver_email', data.primary_email);
                $(element).find('option:selected').attr('driver_phone', data.primary_phone);

                if (!data.text) return data.id;
                else return data.text;
            }
        }).change(function(){
                $(modal_id +' #driver-err').css({"display":"none"})
            });

        if(callback) callback();
    },
    /****************************/
    cal_save:function(modal_id,$me){
        var task_id = $(modal_id +' #task-id').val();
        var driver_id = $(modal_id +' #driver-id').val();
        var delivery_date = $(modal_id +' #delivery-date').val();
        var delivery_time = $(modal_id +' #delivery-time').val();

        if(task_id ==''){
            $(modal_id +' #task-err').css({"display":""})
            return
        }
        if(driver_id ==''){
            $(modal_id +' #driver-err').css({"display":""})
            return
        }
        if(delivery_date ==''){
            $(modal_id +' #delivery-date-err').css({"display":""})
            return
        }

        var _formData = {
            token: _token,
            jwt: localStorage.getItemValue('jwt'),
            task_id: task_id,
            driver_id:driver_id
        }

        var create_date = $(modal_id +' #task-id option:selected').attr('task_create_date')
        var is_create_date =new Date(create_date);

        delivery_date = delivery_date +' '+delivery_time;
        var is_delivery_date =new Date(delivery_date);
        if(is_delivery_date !='Invalid Date' && delivery_date !="" &&
            is_create_date !='Invalid Date' && is_create_date !=""){
            _formData.delivery_date = delivery_date
            if(is_delivery_date <= is_create_date) {
                $(modal_id +' #delivery-date-err').css({"display":""})
                $(modal_id +' #delivery-date-err').text("Delivery date must be larger than "+create_date);
                return;
            }

        }
        //console.log(_formData); console.log(modal_id);
        modal_calendar.prototype.save_calendar(_formData,modal_id,$me)
    },
    /****************************/
    cal_update:function(modal_id,$me){
        var calendar_id = $me.closest('tr').find('.calendar_id').val()
        var task_id = $me.closest('tr').find('.task_id').val()
        var driver_id =$me.closest('tr').find('.driver-id-v option:selected').val()
        var delivery_date = $me.closest('tr').find('.delivery-date').val()
        var delivery_time = $me.closest('tr').find('.delivery-time').val()

        if(driver_id ==''){
            $me.closest('tr').find('.driver-err').css({"display":""})
            return
        }
        if(delivery_date ==''){
            $me.closest('tr').find('.delivery-date-err').css({"display":""})
            return
        }

        var _formData = {
            token: _token,
            jwt: localStorage.getItemValue('jwt'),
            task_id: task_id,
            driver_id:driver_id
        }

        var delivery_date_only = new Date(delivery_date)
        var delivery_date_existing_only = $me.closest('tr').find('.day-delivery').text()
        delivery_date_existing_only = delivery_date_existing_only.split(" ")
        var delivery_date_existing = new Date(delivery_date_existing_only[0])

        var is_remove =0;
        if(delivery_date_only !='Invalid Date' && delivery_date_only !="" &&
            delivery_date_existing !='Invalid Date' && delivery_date_existing !=""){

            if(delivery_date.trim() != delivery_date_existing_only[0].trim()) {
                is_remove =1;
            }
        }

        _formData.is_remove = is_remove;

        delivery_date = delivery_date +' '+delivery_time;

        var is_delivery_date =new Date(delivery_date);
        var task_create_date = $me.closest('tr').find('.task_create_date').val()
        var is_create_date =new Date(task_create_date);

        if(is_delivery_date !='Invalid Date' && delivery_date !="" &&
            is_create_date !='Invalid Date' && is_create_date !=""){
            _formData.delivery_date = delivery_date
            if(is_delivery_date < is_create_date) {
                $me.closest('tr').find('.delivery-date-error').css({"display":""})
                $me.closest('tr').find('.delivery-date-error').text("Delivery date must be larger than "+task_create_date);
                 return;
            }
        }

        modal_calendar.prototype.save_calendar(_formData,modal_id,$me)
    },
    /****************************/
    save_calendar:function(data_post,modal_id,$me){
        var _link =link._calendar_create;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:data_post,
            error : function (status,xhr,error) {
            },
            success: function (data){
                if(data.ERROR !=''){
                    $('#modal-error #err-message').text(data.ERROR)
                    $('#modal-error').modal("show")
                    setTimeout(function(){
                        $('#modal-error').modal("hide")
                    },2000)
                }else if(data.ERROR =='' && data.calendar_id !=''){
                    $('#modal-success').modal("show")
                    setTimeout(function(){
                        $('#modal-success').modal("hide")
                    },2000)

                    if(modal_id=='#calendar-modal'){
                        $me.closest('tr').find('.is_hide').removeClass('hide-content')
                        $me.closest('tr').find('.is_hide').addClass('show-content')
                        $me.closest('tr').find('.is_show').removeClass('show-content')
                        $me.closest('tr').find('.is_show').addClass('hide-content')
                        var delivery_date = ''
                        if(data_post.delivery_date !=undefined) delivery_date = data_post.delivery_date
                        //console.log("delivery_date="+delivery_date)
                        $me.closest('tr').find('.day-delivery').text(delivery_date)
                        $me.closest('tr').find('.task_in_day').val(delivery_date)
                        var driver_id = $me.closest('tr').find('.driver-id-v option:selected').val();
                        var driver_name = $me.closest('tr').find('.driver-id-v option:selected').text();
                        var driver_email = $me.closest('tr').find('.driver-id-v option:selected').attr('driver_email');
                        var driver_phone = $me.closest('tr').find('.driver-id-v option:selected').attr('driver_phone');
                        $me.closest('tr').find('.driver_id').val(driver_id)
                        $me.closest('tr').find('.driver-email').text(driver_email)
                        $me.closest('tr').find('.driver-name').text(driver_name)
                        $me.closest('tr').find('.driver-phone').text(driver_name)

                        if(data.driver_total !=undefined){
                            $me.closest('tr').find('.driver_total').val(numeral(data.driver_total).format('$ 0,0.00'))
                            $me.closest('tr').find('.driver-total-id').text(numeral(data.driver_total).format('$ 0,0.00'))
                        }
                        //remove line
                        if(data_post.is_remove ==1) $me.closest('tr').remove()
                    }else{
                        $(modal_id).modal("hide")
                    }
                }
            }
        })
    },
    /****************************/
    reset_modal_assign_task:function(){
        $('#assign-task-modal #task-id').val('').trigger("change")
        $('#assign-task-modal #driver-id').val('').trigger("change")
        $('#assign-task-modal #delivery-date').val('')
        $('#assign-task-modal #delivery-time').val('')
        $('#assign-task-modal #task-err').css({"display":"none"})
        $('#assign-task-modal #driver-err').css({"display":"none"})
        $('#assign-task-modal #delivery-date-err').css({"display":"none"})
    }
}
var md_calendar = new modal_calendar();
$(function(){
    md_calendar.init();
});