function quote_review(){}
quote_review.NAME         = "quote_review";
quote_review.VERSION      = "1.2";
quote_review.DESCRIPTION  = "Class quote_review";

quote_review.prototype.constructor = quote_review;
quote_review.prototype = {
    init:function(){
        var code = getUrlParaOnlyID('id')
        quote_review.prototype.get_quote_temp(code,'#quote-temp-row');
    },

    /***************************************/
    get_quote_temp:function(code,el){
        var _link =link._quote_code;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:{code:code,token:_token},
            error : function (status,xhr,error) {
            },
            success: function (data){
                if(data.quotes.length >0){
                    if(data.status =='New'){
                        quote_review.prototype.process_show(data.quotes,el)
                    }else{
                        var tr= '';
                        var total = 0;
                        data.quotes.forEach(function(item){
                            var total_line = parseFloat(item.best_price) * parseFloat(item.qty);

                            total = total + parseFloat(item.best_price) * parseFloat(item.qty);
                            tr +='<tr>' +
                                '<td>'+item.prod_name+'</td>'+
                                '<td>'+item.qty+'</td>' +
                                '<td style="text-align: right">'+numeral(total_line).format('$ 0,0.00')+'</td>' +
                            '</tr>';
                        });

                        //---------------------------------
                        var div=''
                        div +='<div class="col col-12 f_z_18" style="text-align: center"><strong>INVOICE</strong></div>' +
                            '<div class="col col-12 m-t10">Customer name: '+data.more_info.shipping_customer_name+'</div>' +
                            '<div class="col col-12">Customer address: '+data.more_info.shipping_address+'</div>' +
                            '<div class="col col-12">Customer Phone: '+data.more_info.shipping_phone+'</div>' +

                            '<div class="col col-12 m-t10"><strong>Order</strong> </div>' +
                            '<div class="col col-12">Order status: '+data.more_info.order_title+'</div>' +
                            '<div class="col col-12">Order status: '+data.more_info.order_status+'</div>' +

                        '<div class="row m-t10">' +
                            '<div class="col-md-12 text-center" style="margin-top: 5px">'+
                                '<table id="quote-tbl" class="table table-responsive  table-bordered">'+
                                    '<thead>'+
                                        '<tr>'+
                                            '<td>Container name</td>'+
                                            '<td style="width: 30px">Quality</td>'+
                                            '<td>Total line</td>'+
                                        '</tr>'+
                                    '</thead>'+
                                    '<tbody>'+tr+'</tbody>'+
                                    '<tfoot>' +
                                        '<tr style="text-align: right">' +
                                        '<td colspan="2" class="p-r20" style="text-align: right"><strong>Total</strong></td>' +
                                            '<td >'+numeral(total).format('$ 0,0.00')+'</td>' +
                                        '</tr>' +
                                    '</tfoot>'+
                                '</table>'+
                            '</div>'+
                        '</div>';

                        $('#quote-temp-status').html(div);
                    }

                }
            }
        });
    },
    /***************************************/
    process_show:function(quotes,el){
        var tr= '';
        var total = 0;
            quotes.forEach(function(item){
                total = total + parseFloat(item.best_price) * parseFloat(item.qty);
                tr += quote_review.prototype.show_quote_temp(item);
            });

            var total_txt =  total.toFixed(2);
            tr += '<tr>' +
                '<td style="margin-right: 20px" colspan="5" class="total text-right" value="'+total+'">$'+total_txt+'</td>' +
                '</tr>'

            $(el+" tbody").html(tr);
            $(el).css({"display":""});
            if(el == '#quote-temp-row'){
                $(el +"#btn-submit").css({"display":""});
             }else{
                $(el +"#btn-submit").css({"display":"none"});
            }
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
 }
var q_review = new quote_review();
$(function(){
    q_review.init();
});