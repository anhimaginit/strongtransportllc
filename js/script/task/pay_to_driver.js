function pay_to_driver(){}
pay_to_driver.NAME         = "pay_to_driver";
pay_to_driver.VERSION      = "1.2";
pay_to_driver.DESCRIPTION  = "Class pay_to_driver";

pay_to_driver.prototype.constructor = pay_to_driver;
pay_to_driver.prototype = {
    init:function(){
        var task_id = getUrlParaOnlyID('id')
        pay_to_driver.prototype.get_info_to_payment(task_id)
        pay_to_driver.prototype.get_payment_task(task_id)

        $("#form-pay-to-drriver #pay_amount").keypress(function (e) {
            var str1 = $(this).val();
            var ch = (str1.split(".").length - 1);
            var length = str1.length;
            if (length < 1 && e.which == 46) {
                return false;
            }
            if (ch > 0 && e.which == 46) {
                return false;
            }
            if (e.which != 8 && e.which != 0 && e.which != 46 && (e.which < 48 || e.which > 57)) {
                if (e.keyCode === 13) {

                }
                return false;
            }

        });

        $('#btn-payment').unbind('click').bind('click',function(){
           var pay_driver =  $('#task_form #assign_driver_id').val()
            pay_to_driver.prototype.new_payment_driver(task_id,pay_driver)
        });
    },
    /***********************************/
    get_info_to_payment:function(task_id){
        var data ={
            token:_token,
            task_id:task_id,
            jwt: localStorage.getItemValue('jwt'),
            private_key: localStorage.getItemValue('userID')
        }
        var _link =link._task_driver_info_id;
        $.ajax({
            "async": false,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:data,
            error : function (status,xhr,error) {
            },
            success: function (data){
                if(data.ERROR ==''){
                    var tr =
                        '<tr class="text-center">' +
                        '<td>'+data.info_payment.taskName+'</td>' +
                        '<td>'+data.info_payment.product_sku+'</td>' +
                        '<td>'+data.info_payment.prod_name+'</td>' +
                        '<td class="total-to-pay">'+numeral(data.info_payment.driver_total).format('$ 0,0.00')+'</td>' +
                        '</tr>'+
                        '<tr class="text-center">' +
                            '<td colspan="2"></td>' +
                            '<td  class="text-right">Paid total</td>' +
                            '<td class="paid-total"></td>' +
                            '</tr>'+
                            '<tr class="text-center">' +
                            '<td colspan="2"></td>' +
                            '<td  class="text-right">Payment amount</td>' +
                            '<td class="payment-amount"></td>' +
                            '</tr>'
                    $('#tb-need-pay-driver tbody').html(tr)
                    var div =''
                    if(data.info_payment.total_payment !=null){
                       var payment_amount = parseFloat(data.info_payment.driver_total) - parseFloat(data.info_payment.total_payment)
                        if(parseFloat(data.info_payment.driver_total) > (parseFloat(data.info_payment.total_payment))){
                            div = '<div class="col col-12 text-right" id="need-btn-payment">' +
                                '<div class="btn btn-primary btn-sm pay-to-driver">Payment</div>' +
                                '</div>'
                        }
                    }else{
                        div = '<div class="col col-12 text-right" id="need-btn-payment">' +
                            '<div class="btn btn-primary btn-sm pay-to-driver">Payment</div>' +
                            '</div>'
                    }

                    $('#tb-info-driver').append(div)
                    $('#tb-info-driver .pay-to-driver').unbind('click').bind('click',function(){
                        var total_pay = $('#tb-info-driver .payment-amount').text()
                        $('#form-pay-to-drriver #pay_amount').val(total_pay)
                        $('#modal-pay-to-driver').modal('show')
                    });
                }
            }
        })
    },
    /***********************************/
    new_payment_driver:function(task_id,pay_driver){
        var data ={
            token:_token,
            jwt: localStorage.getItemValue('jwt'),
            submit_by: localStorage.getItemValue('userID'),
            pay_task:task_id,
            pay_driver:pay_driver,
            pay_amount:numeral($('#form-pay-to-drriver #pay_amount').val()).value(),
            pay_type:$('#form-pay-to-drriver .radio-pay_type:checked').val(),
            pay_note:$('#form-pay-to-drriver #pay_note').val()
        }
        var _link =link._pay_driver;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:data,
            error : function (status,xhr,error) {
            },
            success: function (data){
                if(data.ERROR ==''){
                    pay_to_driver.prototype.get_payment_task(task_id)
                    $('#modal-pay-to-driver').modal('hide')
                }

            }
        })
    },
    /***********************************/
    get_payment_task:function(task_id){
        var data ={
            token:_token,
            jwt: localStorage.getItemValue('jwt'),
            submit_by: localStorage.getItemValue('userID'),
            pay_task:task_id
        }
        var _link =link._payment_task;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:data,
            error : function (status,xhr,error) {
            },
            success: function (data){
                if(data.total_payment !=null){
                    $('#assign_driver_id').prop("disabled",true)
                    $('#assign_order').prop("disabled",true)
                    $('#product_sku').prop("disabled",true)
                    $('#session-payment-driver').css({"display":""})
                    //console.log(data.list.length)
                    if(data.list.length >0){
                        var tr =''; var total_paid =0
                        data.list.forEach(function(item){
                            total_paid = total_paid + parseFloat(item.pay_amount)
                            item.pay_note = (item.pay_note==null)?'':item.pay_note
                            tr +='<tr>' +
                                '<td class="text-right">'+numeral(item.pay_amount).format('$ 0,0.00')+'</td>' +
                                '<td class="text-center">'+item.pay_type+'</td>' +
                                '<td class="text-center">'+item.create_date+'</td>' +
                                '<td>'+item.pay_note+'</td>' +
                                '</tr>'
                        });
                        $('#tb-payment-driver tbody').html(tr)
                        $('#tb-need-pay-driver .paid-total').text(numeral(total_paid).format('$ 0,0.00'))
                        var payment_amount = parseFloat(data.driver_total) - total_paid
                        $('#tb-need-pay-driver .payment-amount').text(numeral(payment_amount).format('$ 0,0.00'))
                        if(payment_amount <= 0 ){
                            $('#need-btn-payment').remove()
                        }
                    }
                }else{
                    $('#session-payment-driver').css({"display":"none"})
                    $('#tb-need-pay-driver .paid-total').text('$ 0,0.00')
                    $('#tb-need-pay-driver .payment-amount').text(numeral(data.driver_total).format('$ 0,0.00'))
                }
            }
        })
    }

 }

var py= new pay_to_driver();
$(function(){
    py.init();
});
