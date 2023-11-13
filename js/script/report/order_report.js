function order_report(){
    this.at_row =''
}
order_report.NAME         = "order_report";
order_report.VERSION      = "1.2";
order_report.DESCRIPTION  = "Class order_report";

order_report.prototype.constructor = order_report;
order_report.prototype = {
    init: function(){
        order_report.prototype.get_order('','','','','','#pagination_tbl-order','#tbl-order tbody');
        order_report.prototype.get_order('','','NEEDS TO BE SCHEDULED','','','#pagination_tbl-order-open','#tbl-order-open tbody');
        order_report.prototype.get_order('','','SCHEDULED FOR DELIVERY','','','#pagination_tbl-order-progress','#tbl-order-progress tbody');
        order_report.prototype.get_order('','','PICKED UP','','','#pagination_tbl-order-pickup','#tbl-order-pickup tbody');
        order_report.prototype.get_order('','','DELIVERED','','','#pagination_tbl-order-delivery','#tbl-order-delivery tbody');
        order_report.prototype.get_order('','','CLOSED','','','#pagination_tbl-order-close','#tbl-order-close tbody');

        $('#order-report .datepicker').datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true,
            showOtherMonths: true,
            prevText: '<i class="fa fa-chevron-left"></i>',
            nextText: '<i class="fa fa-chevron-right"></i>'
        });

        $('#order-report .btn-search').unbind('click').bind('click',function(){
            var closest = $(this).closest('.order-content')
            var from_date = closest.find('.from-date').val()
            var to_date = closest.find('.to-date').val()
            var text_search = closest.find('.text-search').val()
            var status = closest.find('.status-filter').val()
            var line_num = closest.find('.line-nuber').val()

            var paginator_el =''
            var tbl_el =''
            if(status =='NEEDS TO BE SCHEDULED'){
                paginator_el ='#pagination_tbl-order-open'
                tbl_el = '#tbl-order-open tbody'
            }else if(status =='SCHEDULED FOR DELIVERY'){
                paginator_el ='#pagination_tbl-order-progress'
                tbl_el = '#tbl-order-progress tbody'
            }else if(status =='PICKED UP'){
                paginator_el ='#pagination_tbl-order-pickup'
                tbl_el = '#tbl-order-pickup tbody'
            }else if(status =='DELIVERED'){
                paginator_el ='#pagination_tbl-order-delivery'
                tbl_el = '#tbl-order-delivery tbody'
            }else if(status =='CLOSED'){
                paginator_el ='#pagination_tbl-order-close'
                tbl_el = '#tbl-order-close tbody'
            }else{
                paginator_el ='#pagination_tbl-order'
                tbl_el = '#tbl-order tbody'
            }
            order_report.prototype.get_order(from_date,to_date,status,line_num,text_search,paginator_el,tbl_el);
        });
        /*
        $('#order-report .btn-search').unbind('click').bind('click',function(){
            var from_date = $(this).closest('.search').find('.from-date').val()
            var to_date = $(this).closest('.search').find('.to-date').val()
            var text_search = $(this).closest('.search').find('.text-search').val()
            var line_num = $(this).closest('.search').find('.line-nuber').val()
            order_report.prototype.get_order(from_date,to_date,'',line_num,text_search,'#pagination_tbl-order','#tbl-order tbody');
        });
        $('#order-report .btn-search-open').unbind('click').bind('click',function(){
            var from_date = $(this).closest('.search').find('.from-date').val()
            var to_date = $(this).closest('.search').find('.to-date').val()
            var text_search = $(this).closest('.search').find('.text-search').val()
            var line_num = $(this).closest('.search').find('.line-nuber').val()
            order_report.prototype.get_order(from_date,to_date,'NEEDS TO BE SCHEDULED',line_num,text_search,'#pagination_tbl-order-open','#tbl-order-open tbody');
        });
        $('#order-report .btn-search-progress').unbind('click').bind('click',function(){
            var from_date = $(this).closest('.search').find('.from-date').val()
            var to_date = $(this).closest('.search').find('.to-date').val()
            var text_search = $(this).closest('.search').find('.text-search').val()
            var line_num = $(this).closest('.search').find('.line-nuber').val()
            order_report.prototype.get_order(from_date,to_date,'SCHEDULED FOR DELIVERY',line_num,text_search,'#pagination_tbl-order-progress','#tbl-order-progress tbody');
        });
        $('#order-report .btn-search-pickup').unbind('click').bind('click',function(){
            var from_date = $(this).closest('.search').find('.from-date').val()
            var to_date = $(this).closest('.search').find('.to-date').val()
            var text_search = $(this).closest('.search').find('.text-search').val()
            var line_num = $(this).closest('.search').find('.line-nuber').val()
            order_report.prototype.get_order(from_date,to_date,'PICKED UP',line_num,text_search,'#pagination_tbl-order-pickup','#tbl-order-pickup tbody');
        });
        $('#order-report .btn-search-delivery').unbind('click').bind('click',function(){
            var from_date = $(this).closest('.search').find('.from-date').val()
            var to_date = $(this).closest('.search').find('.to-date').val()
            var text_search = $(this).closest('.search').find('.text-search').val()
            var line_num = $(this).closest('.search').find('.line-nuber').val()
            order_report.prototype.get_order(from_date,to_date,'DELIVERED',line_num,text_search,'#pagination_tbl-order-delivery','#tbl-order-delivery tbody');
        });
        $('#order-report .btn-search-close').unbind('click').bind('click',function(){
            var from_date = $(this).closest('.search').find('.from-date').val()
            var to_date = $(this).closest('.search').find('.to-date').val()
            var text_search = $(this).closest('.search').find('.text-search').val()
            var line_num = $(this).closest('.search').find('.line-nuber').val()
            order_report.prototype.get_order(from_date,to_date,'CLOSED',line_num,text_search,'#pagination_tbl-order-close','#tbl-order-close tbody');
        });
        */
        $('#order-contain').on('click','.no-status',function(){
            var $me = $(this)
            if($(this).is(":checked")){
                order_report.prototype.get_order('','','','','','#pagination_tbl-order','#tbl-order tbody');
                $('#order-contain .no-task').css({"display":""})
            }else{
                $('#order-contain .no-task').css({"display":"none"})
            }
        });
        $('#order-contain').on('click','.open-status',function(){
            var $me = $(this)
            if($(this).is(":checked")){
                $('#order-contain .task-open').css({"display":""})
                order_report.prototype.get_order('','','NEEDS TO BE SCHEDULED','','','#pagination_tbl-order-open','#tbl-order-open tbody');
             }else{
                $('#order-contain .task-open').css({"display":"none"})
            }
        });
        $('#order-contain').on('click','.progress-status',function(){
            var $me = $(this)
            if($(this).is(":checked")){
                $('#order-contain .task-progress').css({"display":""})
                order_report.prototype.get_order('','','SCHEDULED FOR DELIVERY','','','#pagination_tbl-order-progress','#tbl-order-progress tbody');
            }else{
                $('#order-contain .task-progress').css({"display":"none"})
            }
        });
        $('#order-contain').on('click','.pickup-status',function(){
            var $me = $(this)
            if($(this).is(":checked")){
                $('#order-contain .task-pickup').css({"display":""})
                order_report.prototype.get_order('','','PICKED UP','','','#pagination_tbl-order-pickup','#tbl-order-pickup tbody');
            }else{
                $('#order-contain .task-pickup').css({"display":"none"})
            }
        });
        $('#order-contain').on('click','.delivery-status',function(){
            var $me = $(this)
            if($(this).is(":checked")){
                $('#order-contain .task-delivery').css({"display":""})
                order_report.prototype.get_order('','','DELIVERED','','','#pagination_tbl-order-delivery','#tbl-order-delivery tbody');
            }else{
                $('#order-contain .task-delivery').css({"display":"none"})
            }
        });
        $('#order-contain').on('click','.close-status',function(){
            var $me = $(this)
            if($(this).is(":checked")){
                $('#order-contain .task-close').css({"display":""})
                order_report.prototype.get_order('','','CLOSED','','','#pagination_tbl-order-close','#tbl-order-close tbody');
            }else{
                $('#order-contain .task-close').css({"display":"none"})
            }
        });

        $('#order-contain').on('click','.btn-move',function(){
           var $me = $(this);
           var status = $(this).closest('tr').find('select.status').val()
           var task_ids =[]
           $me.closest('table').find('.clss-row').each(function(){
                if($(this).find('.input-checked').is(":checked")){
                   var task_id =  $(this).find('.task_id').val();
                    task_ids.push({id:task_id,status:status})
                    $(this).remove();
                }
            });

            if(task_ids.length >0){
                order_report.prototype.update_status_task(task_ids,status)
            }
        });

        $('#order-contain').on('click','.add-task',function(){
            //var $me = $(this);
            order_report.prototype.at_row = $(this);
            order_report.prototype.reset_task();
           $('#task-modal').modal("show")
        });

        $('#close-modal-task').unbind('click').bind('click',function(){
            $('.modal').modal('hide');
            $('#TaskForm').trigger('reset');
        });

        $('#order-report .btn-excell').unbind('click').bind('click',function(){
            var closest = $(this).closest('.order-content')
            var from_date = closest.find('.from-date').val()
            var to_date = closest.find('.to-date').val()
            var text_search = closest.find('.text-search').val()
            var status = closest.find('.status-filter').val()
            order_report.prototype.down_load_report(from_date,to_date,text_search,status);
        });

    },
    /***********************************/
    get_order:function(from_date,to_date,status,line_num,text_search,pagination_el,tbl_el){
        $(tbl_el).html('');
        var total_records =0
        if(tbl_el =='#tbl-order-open tbody'){
            $('.task-open .total-record').val(total_records)
        }else if(tbl_el =='#tbl-order-progress tbody'){
            $('.task-progress .total-record').val(total_records)
        }else if(tbl_el =='#tbl-order-pickup tbody'){
            $('.task-pickup .total-record').val(total_records)
        }else if(tbl_el =='#tbl-order-delivery tbody'){
            $('.task-delivery .total-record').val(total_records)
        }else if(tbl_el =='#tbl-order-close tbody'){
            $('.task-close .total-record').val(total_records)
        }else{
            $('.no-task .total-record').val(total_records)
        }

        var _link =link._order_report;
        var _data ={token:_token,from_date:from_date,
            to_date:to_date,
            status:status,
            text_search:text_search,
            limit:1,cursor:0
        }
        if(line_num =='') line_num =10

        if($(pagination_el).data("twbs-pagination")) $(pagination_el).twbsPagination('destroy');
        var $pagination = $(pagination_el);
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
                total_records = totalRecords;
                var remaining = 0
                if(totalRecords%line_num >0) remaining=1;

                var totalPages = remaining + (totalRecords -totalRecords%line_num)/line_num;

                var currentPage = $pagination.twbsPagination('getCurrentPage');
                $pagination.twbsPagination('destroy');
                $pagination.twbsPagination($.extend({}, defaultOpts, {
                    startPage: currentPage,
                    totalPages: totalPages,
                    visiblePages: 10,
                    onPageClick:function (event, page) {
                        //fetch content and render here
                        var cursor = (page-1)*line_num
                        var _data ={token:_token,from_date:from_date,
                            to_date:to_date,
                            status:status,
                            text_search:text_search,
                            limit:line_num,cursor:cursor
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
                                if(res.list.length > 0){
                                  var tr =  order_report.prototype.show_order(res.list,pagination_el)
                                    $(tbl_el).html(tr)

                                    if(tbl_el =='#tbl-order-open tbody'){
                                        $(tbl_el+ ' select.status option[value="NEEDS TO BE SCHEDULED"]').prop("selected", "selected");
                                        $('.task-open .total-record').val(total_records)
                                    }else if(tbl_el =='#tbl-order-progress tbody'){
                                        $(tbl_el+ ' select.status option[value="SCHEDULED FOR DELIVERY"]').prop("selected", "selected");
                                        $('.task-progress .total-record').val(total_records)
                                    }else if(tbl_el =='#tbl-order-pickup tbody'){
                                        $(tbl_el+ ' select.status option[value="PICKED UP"]').prop("selected", "selected");
                                        $('.task-pickup .total-record').val(total_records)
                                    }else if(tbl_el =='#tbl-order-delivery tbody'){
                                        $(tbl_el+ ' select.status option[value="DELIVERED"]').prop("selected", "selected");
                                        $('.task-delivery .total-record').val(total_records)
                                    }else if(tbl_el =='#tbl-order-close tbody'){
                                        $(tbl_el+ ' select.status option[value="CLOSED"]').prop("selected", "selected");
                                        $('.task-close .total-record').val(total_records)
                                    }else{
                                        $('.no-task .total-record').val(total_records)
                                    }
                                }
                            }
                        });//end ajax get appointment at current page
                    } //end onPageClick
                }));
                //
            }
        });

    },
    /***********************************/
    show_order:function(data,el){
        var tr ='';
        data.forEach(function(item){
            var close =''
            var color =''
            if(item.assign_task_status == 'CLOSED'){
                close ='b-ligh-grey'
                color ='c_black'
            }else if( item.assign_task_status =='DELIVERED'){
                close ='b-delivery'
                color ='c_black'
            }else if(item.assign_task_status == 'PICKED UP'){
                close ='b-yellow'
                color ='c_black'
            }
            var task =''; var task_id =''
            if(item.assign_task_id !='' && item.assign_task_id !=null){
                task  ='<a class="'+color+'" target="_blank" href="#ajax/task.php?id='+item.assign_task_id+'">'+item.assign_task_taskName+'</a>'
                task_id = item.assign_task_id
            }else{
                task  ='<div class="add-task c-red" style="cursor: pointer; min-height: 20px;min-width: 20px">Add task</div>'
            }

            if(item.assign_task_delivery_date !='' && item.assign_task_delivery_date !=null){
                var is_current_date = new Date();
                var  delivery_date =item.assign_task_delivery_date
                var is_delivery_date =new Date(delivery_date);
                if(is_delivery_date !='Invalid Date' && delivery_date !="" ){
                    if(is_delivery_date < is_current_date && item.assign_task_status != 'close' &&
                         item.assign_task_status != 'DELIVERED'){
                        close ='b-orange'
                        color ='c-white'
                    }
                }
                task  ='<a class="c-red" target="_blank" href="#ajax/task.php?id='+item.assign_task_id+'">'+item.assign_task_delivery_date+'</a>'
            }

            var order_title_link ='<a class="'+color+'" target="_blank" href="#ajax/order-form.php?id='+item.order_id+'">'+item.order_title+'</a>'
            var createTime = item.createTime.split(" ")[0]
            var b_name  ='<a class="'+color+'" target="_blank" href="#ajax/contact-form.php?id='+item.b_ID+'">'+item.b_name+'</a>'
            var b_address  ='<a class="'+color+'" target="_blank" href="#ajax/contact-form.php?id='+item.b_ID+'">'+item.b_address1+'</a>'
            var depot ='<a class="'+color+'" target="_blank" href="#ajax/depot-form.php?id='+item.quote_temp_depot_id+'">'+item.quote_temp_depot_name+'</a>'
            var depot_addr ='<a class="'+color+'" target="_blank" href="#ajax/depot-form.php?id='+item.quote_temp_depot_id+'">'+item.quote_temp_depot_address+'</a>'


            var prod ='<a class="'+color+'" target="_blank" href="#ajax/product-form.php?id='+item.quote_temp_prod_id+'">' +
                '<div>'+item.quote_temp_container_type_name+'</div>' +
                '<div>'+item.quote_temp_prod_name+'' +
                '<span class="c-red">('+item.quote_temp_prod_SKU+')</span></div>' +
                '</a>'
            var driver =''; var assign_task_driver_total =''
            var driver_total_payment ='$ 0,0.00';
            if(item.assign_task_driver_id){
                assign_task_driver_total = numeral(item.assign_task_driver_total).format('$ 0,0.00')
                if(item.driver_total_payment !=undefined){
                    driver_total_payment = numeral(item.driver_total_payment).format('$ 0,0.00')
                }

                var driver ='<a class="'+color+'" target="_blank" href="#ajax/profile.php?id='+item.assign_task_driver_id+'">' +
                    '<div>'+item.assign_task_driver_name+'</div>' +
                    '<div>'+assign_task_driver_total+'</div>' +
                    '<div class="c-red">'+driver_total_payment+'</div>' +
                    '</a>'
            }

           // var cost = parseFloat(item.container_cost) * parseFloat(item.rate_cost)
            var cost = parseFloat(item.container_cost)
            cost = numeral(cost).format('$ 0,0.00')
            var total = numeral(item.total).format('$ 0,0.00')
             total ='<a class="'+color+'" target="_blank" href="#ajax/invoice-form.php?id='+item.inv_id+'">'+total+'</a>'
            var payment = numeral(item.payment).format('$ 0,0.00')
             payment ='<a class="'+color+'" target="_blank" href="#ajax/invoice-form.php?id='+item.inv_id+'">'+payment+'</a>'

            tr +='<tr class="clss-row '+close+' '+color+'">' +
                        '<input type="hidden" class="task_id" value="'+task_id+'">' +
                    '<td>'+order_title_link+'</td>' +
                    '<td>'+createTime+'</td>' +
                    '<td>'+task+'</td>' +
                    '<td>'+b_name+'</td>' +
                    '<td>'+depot+'</td>' +
                    '<td>'+depot_addr+'</td>' +
                    '<td>'+b_address+'</td>' +
                    '<td>'+prod+'</td>' +
                    '<td>'+driver+'</td>' +
                    '<td>'+cost+'</td>' +
                    '<td>'+total+'</td>' +
                    '<td>'+payment+'</td>' +
                    '<td>' +
                        '<div class="inline-group">'+
                            '<label class="checkbox">' +
                                '<input type="checkbox" class="input-checked">' +
                                '<i></i>' +
                            '</label>' +
                        '</div>' +
                    '</td>' +
                '</tr>';
        });

        var option = '<option value="NEEDS TO BE SCHEDULED">NEEDS TO BE SCHEDULED</option> ' +
            '<option value="SCHEDULED FOR DELIVERY">SCHEDULED FOR DELIVERY</option> ' +
            '<option value="PICKED UP">PICKED UP – OUT FOR DELIVERY</option> ' +
            '<option value="DELIVERED">DELIVERED</option> ' +
            '<option value="CLOSED">CLOSED</option> '

        if(el !='#pagination_tbl-order'){
            var is_disabled =''
            if(el =='#pagination_tbl-order-close'){
                is_disabled ='disabled ="disabled"'
            }else if(el =='#pagination_tbl-order-delivery'){
                option = '<option value="DELIVERED">DELIVERED</option> ' +
                         '<option value="CLOSED">CLOSED</option> '
            }
            tr += '<tr>' +
                '<td colspan ="13">' +
                    '<div style="float: right!important;">' +
                        '<button class="btn btn-sm btn-primary btn-move">Move</button>' +
                    '</div>' +
                    '<div class="m-r20" style="float: right!important;">' +
                        '<select class="form-control status" '+is_disabled+'>' +
                                    option +
                        '</select>' +
                    '</div>' +

                '</td>' +
                '</tr>'
        }
        return tr
    },
    /***********************************/
    update_status_task:function(tasks,$status){
        var _formData = {
            token: localStorage.getItemValue('token'),
            jwt: localStorage.getItemValue('jwt'),
            private_key: localStorage.getItemValue('userID'),
            data_post:tasks
        }
        var _link =link._task_update_report;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:_formData,
            error : function (status,xhr,error) {
            },
            success: function (data){
                if($status =='NEEDS TO BE SCHEDULED'){
                   order_report.prototype.get_order('','','NEEDS TO BE SCHEDULED','','','#pagination_tbl-order-open','#tbl-order-open tbody');

                   $('#order-contain .task-open').find('.from-date').val("")
                   $('#order-contain .task-open').find('.to-date').val("")
                   $('#order-contain .task-open').find('.to-date').val("10")
                }else if($status =='SCHEDULED FOR DELIVERY'){
                    order_report.prototype.get_order('','','SCHEDULED FOR DELIVERY','','','#pagination_tbl-order-progress','#tbl-order-progress tbody');

                    $('#order-contain .task-progress').find('.from-date').val("")
                    $('#order-contain .task-progress').find('.to-date').val("")
                    $('#order-contain .task-progress').find('.line-nuber').val("10")
                }else if($status =='PICKED UP'){
                    order_report.prototype.get_order('','','PICKED UP','','','#pagination_tbl-order-pickup','#tbl-order-pickup tbody');

                    $('#order-contain .task-pickup').find('.from-date').val("")
                    $('#order-contain .task-pickup').find('.to-date').val("")
                    $('#order-contain .task-pickup').find('.line-nuber').val("10")
                }else if($status =='DELIVERED'){
                    order_report.prototype.get_order('','','DELIVERED','','','#pagination_tbl-order-delivery','#tbl-order-delivery tbody');

                    $('#order-contain .task-delivery').find('.from-date').val("")
                    $('#order-contain .task-delivery').find('.to-date').val("")
                    $('#order-contain .task-delivery').find('.line-nuber').val("10")
                }else if($status =='CLOSED'){
                    order_report.prototype.get_order('','','CLOSED','','','#pagination_tbl-order-close','#tbl-order-close tbody');

                    $('#order-contain .task-close').find('.from-date').val("")
                    $('#order-contain .task-close').find('.to-date').val("")
                    $('#order-contain .task-close').find('.line-nuber').val("10")
                }
            }
        });
    },
    /**********************************/
    down_load_report:function(from_date,to_date,text_search,status){
        $.ajax({
            async: false,
            url: link.order_report,
            type: 'post',
            data: {token:_token,from_date:from_date,to_date:to_date,
                text_search:text_search,status:status},
            dataType: 'json',
            success: function (res) {
                var url_link = document.createElement('a');
                url_link.href = res.url_download_file;
                url_link.download = res.filename;
                //a.dispatchEvent(new MouseEvent('click'));
                document.body.appendChild(url_link);
                url_link.click();
                url_link.parentNode.removeChild(url_link);

                //remove
                 $.ajax({
                    url: link.delete_file,
                    type: 'post',
                    data: {filename:res.filename},
                    success: function (res1) {

                    }
                });
                /////
            }
        });

    },
    /***********************************/
    delete_row:function(){
        if(order_report.prototype.at_row !=''){
            order_report.prototype.at_row.closest('tr').remove();
            order_report.prototype.at_row='';

            order_report.prototype.get_order('','','NEEDS TO BE SCHEDULED','','','#pagination_tbl-order-open','#tbl-order-open tbody');
            $('#task-modal').modal("hide")
            $('#task_form').trigger('reset');
            $('#order-contain .task-open').find('.from-date').val("")
            $('#order-contain .task-open').find('.to-date').val("")
            $('#order-contain .task-open').find('.to-date').val("10")
        }
    },
    /***********************************/
    reset_task:function(){
        $("input[name=deliverydate]").val('')
        $("input[name=deliverytime]").val('')
        $("input[name=actionset]").val('order')
        $("input[name=status]").val('NEEDS TO BE SCHEDULED')
        $('#assign_order').val('').trigger("change");
        $('#assign_driver_id').val('').trigger("change");
    }
    /***********************************/
}
var o_report = new order_report();
$(function(){
    o_report.init();
});