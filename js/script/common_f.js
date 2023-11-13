
function common_f(){}
common_f.NAME         = "common_f";
common_f.VERSION      = "1.2";
common_f.DESCRIPTION  = "Class common_f";

common_f.prototype.constructor = common_f;
common_f.prototype = {
    roles:function(el1,el2){
        var link3 = link._roles;
        //console.log(link3)
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": link3,
            "method": "POST",
            dataType: 'json',
            data:{
                token:_token,
                jwt:localStorage.getItemValue('jwt'),
                private_key:localStorage.getItemValue('userID')
            },
            //contentType: 'application/json',//use when post a form
            error : function (status,xhr,error) {
            },
            success: function (res) {
                //console.log(res);
                var option='';
                if(res.roles.length>0){
                    res.roles.forEach(function(item){
                        option +='<option value="'+item+'">'+item+'</option> ';
                    })
                }
                $(el2).append(option)
                var option ='';
                if(res.units.length>0){
                    res.units.forEach(function(item){
                        option +='<option value="'+item+'">'+item+'</option> ';
                    })
                }

                $(el1).append(option)
            }
        });
    },
    acl_lists:function(el1,unit,role){
        var link3 = link._group_role_unit;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": link3,
            "method": "POST",
            dataType: 'json',
            data:{
                token:_token,
                jwt:localStorage.getItemValue('jwt'),
                private_key:localStorage.getItemValue('userID'),
                role:role ,
                department:unit
            },
            //contentType: 'application/json',//use when post a form
            error : function (status,xhr,error) {
            },
            success: function (res) {
                //console.log(res);
                var option='<option value=""></option>';
                if(res.list.length>0){
                    res.list.forEach(function(item){
                        option +='<option value="'+item.ID+'">'+item.group_name+'</option> ';
                    })
                }
                $(el1).html(option)
            }
        });
    },
    /**********************************************/
    validate_email:function(email){
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(email);
    }
}

