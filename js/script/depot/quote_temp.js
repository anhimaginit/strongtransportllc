function quoteTemp(){}
quoteTemp.NAME         = "quoteTemp";
quoteTemp.VERSION      = "1.2";
quoteTemp.DESCRIPTION  = "Class quoteTemp";

quoteTemp.prototype.constructor = quoteTemp;
quoteTemp.prototype = {
    init:function(){
        /***********************event*********/
         $("#your-cart #btn-confirm").unbind('click').bind('click',function(){
             quoteTemp.prototype.calculate_distance('#depot-tbl');
         });

        $('#your-cart #btn-discount-code').unbind('click').bind('click',function(){
            var discount_code = $('#your-cart #discount_code').val()
            quoteTemp.prototype.verify_discount_code(discount_code)
        });

        $('#your-cart #discount_code').change(function(){
            $('#your-cart .invalid-code').css({"display":"none"})
        })
    },

    /***************************************/
    calculate_distance:function(el){

        var cus_name = $("#customer-name").val();
        var cus_address = ''
        if($("#customer-address").val() !=''){
            cus_address = $("#customer-address").val().trim();
        }
        if($("#customer-city").val() !=''){
            cus_address =(cus_address !='')?cus_address+', '+$("#customer-city").val().trim(): $("#customer-city").val().trim()
        }
        if($("#customer-state").val() !=''){
            cus_address =(cus_address !='')?cus_address+', '+$("#customer-state").val().trim(): $("#customer-state").val().trim()
        }
        var cus_phone = $("#customer-phone").val();

       // var code = getUrlParaOnlyID('id')
        ///////////////////////////
        var pattern = /^\(\d{3}\)\s\d{3}-\d{4}$/; //(xxx) xxx-xxxx
        if(!pattern.test(cus_phone)){
            cus_phone = cus_phone.replace(/\D/g,'');
            var regex = /^\d{10}$/;
            var is_valid = regex.test(cus_phone);
            if(!is_valid){
                cus_phone ='';
            }else{
                cus_phone = cus_phone.slice(0,3) + cus_phone.slice(3,6)+cus_phone.slice(6,10);
            }
        }
        ///////////////////////////
        var list ={};
        var rowCount = $('#depot-tbl tbody tr.depot_item').length;

        if(rowCount > 0){
            var list = [];
            var origin = [];
            $('#depot-tbl tbody tr.depot_item').each(function(){
                var origin1 = $(this).find('.depot_address').val();
                var object = {
                    depot_id : $(this).find('.depot_id').val(),
                    depot_name : $(this).find('.depot_name').val(),
                    depot_address : $(this).find('.depot_address').val(),
                    vendor_id : $(this).find('.vendor_id').val(),
                    rate_mile : $(this).find('.rate_mile').val(),
                    best_price : $(this).find('.best_price').val(),
                    container_type_id:$(this).find('.container_type_id').val(),
                    container_rate : $(this).find('.container_rate').val(),
                    container_type_name : $(this).find('.container_type_name').val(),
                    qty : $(this).find('.qty').val(),
                    prod_id : $(this).find('.prod_id').val(),
                    prod_name : $(this).find('.prod_name').val(),
                    prod_SKU : $(this).find('.prod_SKU').val(),
                    prod_photo : $(this).find('.prod_photo').val()
                }

                list.push(object);
                if(!origin.includes(origin1)) origin.push(origin1);

            });
            var service = new google.maps.DistanceMatrixService()

            service.getDistanceMatrix({
                origins: origin,
                destinations: [cus_address],
                travelMode: google.maps.TravelMode.DRIVING ,
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                avoidHighways: false,
                avoidTolls: false
            }, function(response, status) {
                if (status == google.maps.DistanceMatrixStatus.OK) {
                    var i=0;  var distance_arr =[]
                    response.rows.forEach(function(item1){
                        var item = item1.elements[0]
                        if(item.status =="OK"){
                            var distace =item.distance.text.split(" ")[0];
                            var add_el = {address : origin[i],distance:distace}
                            distance_arr.push(add_el)
                        }

                        i++;
                    });

                    var depots_temp =[]
                    var tr='';
                    distance_arr.forEach(function(item1){
                        list.forEach(function(item2){
                            // if(item1.address.localeCompare(item2.depot_address) ==0){
                            if(item1.address == item2.depot_address){
                                var best_price = parseFloat(item2.rate_mile) * parseFloat(item1.distance) + parseFloat(item2.container_rate);
                                var temp = {
                                    distance: item1.distance,
                                    depot_id:item2.depot_id,
                                    depot_name:item2.depot_name,
                                    depot_address:item2.depot_address,
                                    vendor_id:item2.vendor_id,
                                    best_price:best_price,
                                    rate_mile:item2.rate_mile,
                                    container_type_id:item2.container_type_id,
                                    container_type_name:item2.container_type_name,
                                    container_rate:item2.container_rate,
                                    qty:item2.qty,
                                    prod_SKU:item2.prod_SKU,
                                    prod_id:item2.prod_id,
                                    prod_name:item2.prod_name,
                                    prod_photo : item2.prod_photo

                                }
                                depots_temp.push(temp);
                                console.log(temp);
                            }
                        })
                    });

                    //console.log(el)
                    quoteTemp.prototype.process_show(depots_temp,el);
                    depots.prototype.sub_total()
                    ////////////////
                }
            });//end getDistanceMatrix
        } //
    },

    /***************************************/
    process_show:function(quotes,el){
        var tr= '';
        var total = 0;
            quotes.forEach(function(item){
                //total = total + parseFloat(item.best_price) * parseFloat(item.qty);
                tr +=  depots.prototype.add_to_cart('',item)
            });

            /*if($('#your-cart #is-discount').val() !='0'){
                if($('#your-cart #is-discount-type').val() =='$'){
                    total = total - parseFloat($('#your-cart #is-discount').val());
                }else{
                    total = total - (parseFloat($('#your-cart #is-discount').val()) * total) /100
                }
            }*/
            //var total_txt =  numeral(total).format('$ 0,0.00')
            //$('#your-cart #sub-total').text(total_txt);
           $(el+" tbody").html(tr);
           $('#your-cart #attach-payment').remove()

        var div ='<div class="col col-2" id="attach-payment">' +
            '<button class="btn btn-default form-control c-red" id="btn-payment"><b>PAY BY CHECK</b></button>' +
            '</div>'
            $(div).insertBefore($('#your-cart #btn-last'))

        $("#your-cart #btn-payment").unbind('click').bind('click',function(){
            quoteTemp.prototype.save_customer_info();
        });
           //
    },
    /***************************************/
    show_quote_temp:function(quote){
        var total_line =  parseFloat(quote.best_price) * parseFloat(quote.qty)
        var best_price_txt = parseFloat(quote.best_price).toFixed(2);
        var total_line_txt = total_line.toFixed(2);
        var  tr ='<tr class="depot_item">' +
            '<input type="hidden" class="distance" value="'+quote.distance+'">' +
            '<input type="hidden" class="depot_id" value="'+quote.depot_id+'">' +
            '<input type="hidden" class="depot_name" value="'+quote.depot_name+'">' +
            '<input type="hidden" class="best_price" value="'+quote.best_price+'">' +
            '<input type="hidden" class="container_type_id" value="'+quote.container_type_id+'">' +
            '<input type="hidden" class="container_rate" value="'+quote.container_rate+'">' +
            '<input type="hidden" class="container_type_name" value="'+quote.container_type_name+'">' +
            '<input type="hidden" class="depot_address" value="'+quote.depot_address+'">' +
            '<input type="hidden" class="rate_mile" value="'+quote.rate_mile+'">' +
            '<input type="hidden" class="qty" value="'+quote.qty+'">' +
            '<input type="hidden" class="total_line" value="'+total_line+'">' +
            '<input type="hidden" class="prod_id" value="'+quote.prod_id+'">' +
            '<input type="hidden" class="prod_name" value="'+quote.prod_name+'">' +
            '<input type="hidden" class="prod_SKU" value="'+quote.prod_SKU+'">' +
            '<input type="hidden" class="vendor_id" value="'+quote.vendor_id+'">' +
            '<td>'+quote.container_type_name+'</td>' +
            '<td>$'+best_price_txt+'</td>'+
            '<td>'+quote.qty+'</td>' +
            '<td>$'+total_line_txt+'</td>' +
            '</tr>';

        return tr;
    },

    /***************************************/
    verify_discount_code:function(discount_code){
        var _formData = {
            token: localStorage.getItemValue('token'),
            discount_code:discount_code
        }
        var _link =link._discount_code_check;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:_formData,
            error : function (status,xhr,error) {
            },
            success: function (res){
                if(res.ERROR==''){
                    var discount = parseFloat(res.item.discount)
                    if(discount >0){
                        $('#your-cart #is-discount').val(discount)
                        $('#your-cart #is-discount-type').val(res.item.discount_type)
                        //quoteTemp.prototype.calculate_sub(discount, res.item.discount_type)
                        depots.prototype.sub_total()
                    }else{
                        $('#your-cart .invalid-code').css({"display":""})
                        $('#your-cart #is-discount').val(0)
                        $('#your-cart #is-discount-type').val('$')
                        depots.prototype.sub_total()
                    }
                }
            }
        })
    },
    /***************************************/
    calculate_sub:function(discount, discount_type){
        if($('#depot-tbl tbody tr.depot_item').length > 0){
            var sub_total = 0
            $('#depot-tbl tbody tr.depot_item').each(function(){
               var best_price = parseFloat($(this).find('.best_price').val())
               var qty = parseFloat($(this).find('.qty').val())
                var temp = best_price * qty;
                sub_total = (sub_total==0)?temp:temp+sub_total
            });
            if(discount_type =='$'){
                sub_total = sub_total - parseFloat(discount);
            }else{
                sub_total = sub_total - (parseFloat(discount) * sub_total) /100
            }

            var total_txt =  numeral(sub_total).format('$ 0,0.00')
            $('#your-cart #sub-total').text(total_txt);
        }
        ////////
    },
    /***************************************/
    save_customer_info:function(){
        var cus_name = $("#your-cart #customer-name").val();
        var cus_city = $("#your-cart #customer-city").val();
        var cus_state = $("#your-cart #customer-state").val();
        var cus_zipcode = $("#your-cart #customer-zipcode").val();
        var cus_phone = $("#your-cart #customer-phone").val();
        var email_phone = $("#your-cart #customer-email").val();
        if(cus_name ==''){
            $('#your-cart #customer-name').focus();
            return;
        }
        if(email_phone !=''){
            if(!validate_email(email_phone)){
                $('#your-cart #customer-email').focus();
                return;
            }
        }else {
            $('#your-cart #customer-email').focus();
            return;
        }
        if(cus_phone ==''){
            $('#your-cart #customer-phone').focus();
            return;
        }
        if(cus_city ==''){
            $('#your-cart #customer-city').focus();
            return;
        }
        if(cus_state ==''){
            $('#your-cart #customer-state').focus();
            return;
        }

        var cus_address = ''
        if($("#your-cart #customer-address").val() !=''){
            cus_address = $("#your-cart #customer-address").val().trim();
        }
        if($("#your-cart #customer-city").val() !=''){
            cus_address =(cus_address !='')?cus_address+', '+$("#your-cart #customer-city").val().trim(): $("#your-cart #customer-city").val().trim()
        }
        if($("#your-cart #customer-state").val() !=''){
            cus_address =(cus_address !='')?cus_address+', '+$("#your-cart #customer-state").val().trim(): $("#your-cart #customer-state").val().trim()
        }

        var discount_code = $("#your-cart #discount_code").val()
        ///////////////////////////
        var pattern = /^\(\d{3}\)\s\d{3}-\d{4}$/; //(xxx) xxx-xxxx
        if(!pattern.test(cus_phone)){
            cus_phone = cus_phone.replace(/\D/g,'');
            var regex = /^\d{10}$/;
            var is_valid = regex.test(cus_phone);
            if(!is_valid){
                cus_phone ='';
            }else{
                cus_phone = cus_phone.slice(0,3) + cus_phone.slice(3,6)+cus_phone.slice(6,10);
            }
        }

        var data_quote =[]
        if($('#depot-tbl tbody tr.depot_item').length <1) return;
        $('#depot-tbl tbody tr.depot_item').each(function(){
            var object = {
                distance : $(this).find('.distance').val(),
                depot_id : $(this).find('.depot_id').val(),
                depot_name : $(this).find('.depot_name').val(),
                depot_address : $(this).find('.depot_address').val(),
                vendor_id : $(this).find('.vendor_id').val(),
                best_price : $(this).find('.best_price').val(),
                rate_mile : $(this).find('.rate_mile').val(),
                container_type_name : $(this).find('.container_type_name').val(),
                container_type_id:$(this).find('.container_type_id').val(),
                container_rate : $(this).find('.container_rate').val(),
                qty : $(this).find('.qty').val(),
                prod_id : $(this).find('.prod_id').val(),
                prod_name : $(this).find('.prod_name').val(),
                prod_SKU : $(this).find('.prod_SKU').val()
            }

            data_quote.push(object);
        });
        //console.log(cus_phone)
        //return
        //cal api
        var data ={
            token:_token,
            cus_name:cus_name,
            cus_address:cus_address,
            cus_city:cus_city,
            cus_state:cus_state,
            cus_zipcode:cus_zipcode,
            cus_phone:cus_phone,
            email_phone:email_phone,
            discount_code:discount_code,
            data_post:data_quote,
            tran_id:'',
            payment_type:"Credit Card",
            amount:""
        }
        //console.log(data); return
        quoteTemp.prototype.update_quote_temp_data_customer(data);

    },
    /*******************************************/
    update_quote_temp_data_customer:function(data){
        var _link =link._quote_add_customer;
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
                if(data.code !=undefined){
                    //console.log(data.code)
                    if(data.code !=''){
                        document.location.href =host2 +'quote.php?id='+data.code
                        //alert("Review your order in your email")
                        //$('#your-cart #depot-tbl tbody').html('')
                       // $('#your-cart #attach-payment').remove()
                       // $('#home-page').css({"display":""})
                       // $('#your-cart').css({"display":"none"})
                        //var code = getUrlParaOnlyID('id')
                    }
                }
            }
        });
    },
    /***************************************/

 }
var q_temp = new quoteTemp();
$(function(){
    q_temp.init();
});