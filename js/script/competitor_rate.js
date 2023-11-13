function competitor_rate(){}
    competitor_rate.NAME         = "competitor_rate";
    competitor_rate.VERSION      = "1.2";
    competitor_rate.DESCRIPTION  = "Class competitor_rate";

    competitor_rate.prototype.constructor = competitor_rate;
    competitor_rate.prototype = {
    init: function(){
        competitor_rate.prototype.view_competitor()

        $('#print-btn').unbind('click').bind('click',function(){
            document.getElementById('print-content').innerHTML
            competitor_rate.prototype.print_content(document.getElementById('print-content').innerHTML)
        });
    },
    /***************************************/
   view_competitor:function(){
        var _link =link._competitor_rate;
        var id = getUrlParaOnlyID('id')
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:{id:id},
            error : function (status,xhr,error) {
            },
            success: function (data){
                if(data.err !=''){
                    $('#print-content').html(data.err)
                    return
                }

                $("#print-content #order-title").html(data.order.order_title)
               $('#print-content .dirver-total').text(numeral(data.driver_info.driver_total).format('$ 0,0.00'))
               $('#print-content #driver-name').text(data.driver_info.driver_name)
               $('#print-content #date-accept').text(data.driver_info.date_accept)
                data.depot.depot_address = (data.depot.depot_address ==null)?'':data.depot.depot_address
                data.depot.depot_city = (data.depot.depot_city ==null)?'':data.depot.depot_city
                data.depot.depot_zip = (data.depot.depot_zip ==null)?'':data.depot.depot_zip
                data.depot.depot_state = (data.depot.depot_state ==null)?'':data.depot.depot_state
              var depot = '<div class="col-12 bold m-b15"><b>Strong Containers (Shipping Container Supplier, LLC)</b></div>' +
                  '<div class="col col-12">Pick up location</div>' +
                  '<div class="col col-12">'+data.depot.depot_address+'</div>' +
                  '<div class="col col-12">'+data.depot.depot_city+'</div>' +
                  '<div class="col col-12">'+data.depot.depot_state+'</div>' +
                  '<div class="col col-12">'+data.depot.depot_zip+'</div>' +
                  '<div class="col col-12">US</div>'

                if(data.driver_info.delivery_date ==null) data.driver_info.delivery_date=''
                var phone =''
                if(data.customer.shipping_phone !=null && data.customer.shipping_phone !=''){
                    phone = competitor_rate.prototype.formatPhoneNumber(data.customer.shipping_phone)
                }
                data.customer.shipping_state = (data.customer.shipping_state ==null)?'':data.customer.shipping_state
                data.customer.shipping_zip = (data.customer.shipping_zip ==null)?'':data.customer.shipping_zip
                data.customer.shipping_state = (data.customer.shipping_state ==null)?'':data.customer.shipping_state

                data.customer.email_phone = (data.customer.email_phone ==null)?'':data.customer.email_phone
                var customer = '<div class="col col-12 bold m-b15 text-right"><b>Delivery Location on '+data.driver_info.delivery_date+'</b></div>' +
                    '<div class="col col-12">'+data.customer.shipping_customer_name+'</div>' +
                    '<div class="col col-12">'+data.customer.shipping_address+'</div>' +
                    '<div class="col col-12">'+data.customer.shipping_state+'</div>' +
                    '<div class="col col-12">'+data.customer.shipping_zip+'</div>' +
                    '<div class="col col-12">'+phone+'</div>' +
                    '<div class="col col-12">'+data.customer.email_phone+'</div>'

                $('#print-content #depot').html(depot)
                $('#print-content #customer').html(customer)
            }

        })
    },
        /**********************************/
        formatPhoneNumber : function (phoneNumberString) {
            var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
            var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            if (match) {
                return '(' + match[1] + ') ' + match[2] + '-' + match[3];
            }
            return '';
    },
        /**********************************/
        print_content:function(html_content){
            var ifr = document.createElement('iframe');
            ifr.style='height: 0px; width: 0px; position: absolute'
            document.body.appendChild(ifr);
            ifr.contentDocument.body.innerHTML =html_content;

            setTimeout(function() {
                ifr.contentWindow.print();
                ifr.parentElement.removeChild(ifr);
            }, 1000);
        },
}

var comp = new competitor_rate();
$(function(){
    comp.init();
});