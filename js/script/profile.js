
function profile(){
    this.fileName=''
    this.was_changed =0
}
profile.NAME         = "profile";
profile.VERSION      = "1.2";
profile.DESCRIPTION  = "Class profile";

profile.prototype.constructor = profile;
profile.prototype = {
    init: function(){
        profile.prototype.get_profile();

        $(".num").keypress(function (e) {
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

        $("#profile_form .was-changed").change(function(){
            profile.prototype.was_changed =1
        });

        $('#profile_form  .num').change(function(){
            var num = numeral($(this).val()).format('$ 0,0.00')
            $(this).val(num)
        })

        $("#btn-profile").unbind('click').bind('click',function(){
            var contact_id = localStorage.getItemValue('userID')
            var contact_id1 = getUrlParaOnlyID('id')

            if(contact_id1 !=''&& contact_id1 !=undefined){
                contact_id = contact_id1
            }
            if($("#avatar-input").val() == ''){
                var data1 = {token:_token,
                    jwt: localStorage.getItemValue('jwt'),
                    private_key: localStorage.getItemValue('userID'),
                    contact_id:contact_id,
                    driver_rate:numeral($('#driver_rate').val()).value(),
                    driver_min_rate:numeral($('#driver_min_rate').val()).value(),
                    driver_description:$("#profile_form #driver_description").val()
                }
                profile.prototype.update_profile(data1)
            }else{
                var reader = new FileReader();
                reader.onload = function(){
                    var data1 = {token:_token,
                        jwt: localStorage.getItemValue('jwt'),
                        private_key: localStorage.getItemValue('userID'),
                        contact_id:contact_id,
                        driver_rate:numeral($('#driver_rate').val()).value(),
                        driver_min_rate:numeral($('#driver_min_rate').val()).value(),
                        driver_description:$("#profile_form #driver_description").val(),
                        avatar_image:prof.fileName,
                        avatar_data: reader.result
                    }

                    profile.prototype.update_profile(data1)
                };
                reader.readAsDataURL($("#avatar-input").get(0).files[0]);
            }
        });


    },

    /********************************/
    previewFile: function(event){
        var reader = new FileReader();
        reader.onload = function(){
            var output = document.getElementById('avatar-img');
            output.src = reader.result;
        };
        prof.fileName = event.target.files[0].name;
        reader.readAsDataURL(event.target.files[0]);
        console.log(prof.fileName);
    },
    /******************************************/
    update_profile:function(data){
        var link3 =link._profile_add_update;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": link3,
            "method": "POST",
            dataType: 'json',
            data:data,
            //contentType: 'application/json',
            error : function (status,xhr,error) {
            },
            success: function (res) {
                if(res.ERROR==''){
                    profile.prototype.was_changed =0
                    $('#modal-success').modal("show")
                    setTimeout(function(){
                        $('#modal-success').modal("hide")
                    },2000);

                    var datasection = {
                        driver_rate:data.driver_rate,
                        driver_avatar: res.path_file_return
                    }

                    updatesection(datasection)
                }else{
                    $('#modal-error #err-message').text(data.ERROR)
                    $('#modal-error').modal("show")
                    setTimeout(function(){
                        $('#modal-error').modal("hide")
                    },2000)
                }
            }
        });
    },
    /******************************************/
    get_profile:function(){
        var contact_id = localStorage.getItemValue('userID')
        var contact_id1 = getUrlParaOnlyID('id')

        if(contact_id1 !=''&& contact_id1 !=undefined){
            contact_id = contact_id1
        }
        var link3 =link._profile;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": link3,
            "method": "POST",
            dataType: 'json',
            data:{token:_token,contact_id:contact_id},
            //contentType: 'application/json',
            error : function (status,xhr,error) {
            },
            success: function (res) {
                if(res.driver_id != undefined){
                    if(res.driver_avatar !=null && res.driver_avatar !=""){
                        $("#profile_form #avatar-img").attr('src',res.driver_avatar)
                    }else{
                        $("#profile_form #avatar-img").attr('src',"//s3.amazonaws.com/appforest_uf/f1584376106762x402033725538128100/avatar.png")
                    }

                    var phone = res.driver_phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

                    $("#profile_form #profile-name").val(res.driver_name)
                    $("#profile_form #profile-email").val(res.driver_email)
                    $("#profile_form #profile-phone").val(phone)
                    $("#profile_form #profile-addr").val(res.driver_addr)
                    $("#profile_form #driver_rate").val(numeral(res.driver_rate).format('$ 0,0.00'))
                    $("#profile_form #driver_min_rate").val(numeral(res.driver_min_rate).format('$ 0,0.00'))
                    $("#profile_form #driver_description").val(res.driver_description)

                    var contact_id1 = getUrlParaOnlyID('id')

                    if(contact_id1 !=''&& contact_id1 !=undefined){
                        $('input').prop('disabled',true)
                        $('textarea').prop('disabled',true)
                        $('#profile_form #btn-profile-show').remove()
                    }
                    var tr =''
                    if(res.pay_list.length >0){
                        var prv ={}; var paid =0
                        res.pay_list.forEach(function(item){
                            item.pay_note = (item.pay_note ==null)?"":item.pay_note
                            if(prv.pay_task !=undefined){
                                if(item.pay_task != prv.pay_task){
                                    tr +='<tr>' +
                                        '<td colspan="3"></td>' +
                                        '<td><div class="col col-12 c-red text-right">Driver Total</div>' +
                                            '<div class="col col-12 c-orange text-right">Paid Total</div></td>' +
                                        '<td><div class="col col-12 c-red p-l">'+numeral(prv.driver_total).format('$ 0,0.00')+'</div>' +
                                        '<div class="col col-12 c-orange p-l">'+numeral(paid).format('$ 0,0.00')+'</div>' +
                                        '</td>' +
                                        '</tr>'
                                    paid =parseFloat(item.pay_amount)
                                }

                                tr +='<tr>' +
                                    '<td>'+item.taskName+'</td>' +
                                    '<td>'+item.pay_type+'</td>' +
                                    '<td>'+item.create_date+'</td>' +
                                    '<td>'+item.pay_note+'</td>' +
                                    '<td>'+numeral(item.pay_amount).format('$ 0,0.00')+'</td>' +
                                    '</tr>'

                            }else{
                                tr ='<tr>' +
                                    '<td>'+item.taskName+'</td>' +
                                    '<td>'+item.pay_type+'</td>' +
                                    '<td>'+item.create_date+'</td>' +
                                    '<td>'+item.pay_note+'</td>' +
                                    '<td>'+numeral(item.pay_amount).format('$ 0,0.00')+'</td>' +
                                    '</tr>'
                            }
                            prv = item
                            paid = paid + parseFloat(item.pay_amount)
                        });
                        tr +='<tr>' +
                            '<td colspan="3"></td>' +
                            '<td><div class="col col-12 c-red text-right">Driver Total</div>' +
                            '<div class="col col-12 c-orange text-right">Paid Total</div></td>' +
                            '<td><div class="col col-12 c-red p-l">'+numeral(prv.driver_total).format('$ 0,0.00')+'</div>' +
                            '<div class="col col-12 c-orange p-l">'+numeral(paid).format('$ 0,0.00')+'</div>' +
                            '</td>' +
                            '</tr>'
                        $('#tb-payment-driver tbody').html(tr)
                    }
                }
            }
        });
    },
}
var prof = new profile();
$(function(){
    prof.init();
});