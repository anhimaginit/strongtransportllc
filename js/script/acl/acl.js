function acl(){
}
acl.NAME         = "acl";
acl.VERSION      = "1.2";
acl.DESCRIPTION  = "Class acl";

acl.prototype.constructor = acl;
acl.prototype = {
    init: function(){
        common_f.prototype.roles("#role_form #unit","#role_form #levels")
        //////////
        $("#role_form #levels").change(function(){
            var unit = $("#role_form #unit").val()
            var role = $(this).val();
            common_f.prototype.acl_lists("#role_form #group",unit,role)
        })

        $("#role_form #unit").change(function(){
            var role = $("#role_form #levels").val()
            var unit = $(this).val();
            common_f.prototype.acl_lists("#role_form #group",unit,role)
        })

        $("#role_form #group").change(function(){
            var group_id = $(this).val();
            $('#role_form #g-id').val(group_id)
            acl.prototype.getACL_gID(group_id)
        })
        $('#role_form').on('click','.view-all',function(){
            if($(this).is(":checked")){
                $(this).closest('table').find('tbody .view').prop("checked",true);
            }else{
                $(this).closest('table').find('tbody .view').prop("checked",false);
            }
        })

        $('#role_form').on('click','.view',function(){
            var that = $(this)
            if(that.is(":checked")){
                var view_all = true;
                that.closest('table').find('tbody .view').each(function(){
                    if(!$(this).is(":checked")){
                        view_all = false;
                        return false;
                    }
                })
                that.closest('table').find('.view-all').prop("checked",view_all)
            }else{
                that.closest('table').find('.view-all').prop("checked",false)
            }
        })

        $('#role_form').on('click','.add-all',function(){
            if($(this).is(":checked")){
                $(this).closest('table').find('tbody .add').prop("checked",true);
            }else{
                $(this).closest('table').find('tbody .add').prop("checked",false);
            }
        })

        $('#role_form').on('click','.add',function(){
            var that = $(this)
            if(that.is(":checked")){
                var add_all = true;
                that.closest('table').find('tbody .add').each(function(){
                    if(!$(this).is(":checked")){
                        add_all = false;
                        return false;
                    }
                })
                that.closest('table').find('.add-all').prop("checked",add_all)
            }else{
                that.closest('table').find('.add-all').prop("checked",false)
            }
        })

        $('#role_form').on('click','.edit-all',function(){
            if($(this).is(":checked")){
                $(this).closest('table').find('tbody .edit').prop("checked",true);
            }else{
                $(this).closest('table').find('tbody .edit').prop("checked",false);
            }
        })

        $('#role_form').on('click','.edit',function(){
            var that = $(this)
            if(that.is(":checked")){
                var edit_all = true;
                that.closest('table').find('tbody .edit').each(function(){
                    if(!$(this).is(":checked")){
                        edit_all = false;
                        return false;
                    }
                })
                that.closest('table').find('.edit-all').prop("checked",edit_all)
            }else{
                that.closest('table').find('.edit-all').prop("checked",false)
            }
        });

        $('#role_form').on('click','#btn-update-acl',function(){
            acl.prototype.update_acl()
        })
    },
    /*********************************/
    getACL_gID:function(g_id){
        $('#role_form #ul-acl').html("")
        $('#role_form #body-acl').html("")
        var _link =link._group_by_id;
        var _data ={token:_token,group_id:g_id}
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:_data,
            //contentType: 'application/json',
            error : function (status,xhr,error) {
            },
            success: function (res) {
                var data = res.acl;
                for (let key in data) {
                    acl.prototype.processACLFields(key,data[key]);
                }

                //btn check all
                $("#role_form table.table-acl").each(function(){
                    var this_table = $(this);
                    var view_all = true;
                    var add_all = true;
                    var edit_all = true;
                    this_table.find('.view').each(function(){
                        if(!$(this).is(":checked")){
                            view_all = false;
                            return false;
                        }
                    });
                    this_table.find('.add').each(function(){
                        if(!$(this).is(":checked")){
                            add_all = false;
                            return false;
                        }
                    });
                    this_table.find('.edit').each(function(){
                        if(!$(this).is(":checked")){
                            edit_all = false;
                            return false;
                        }
                    });

                    this_table.find('.view-all').prop("checked",view_all)
                    this_table.find('.add-all').prop("checked",add_all)
                    this_table.find('.edit-all').prop("checked",edit_all)
                });

                var btn='';
                if(is_addedit =='true'){
                    btn='<footer>' +
                        '<button class="btn btn-danger  f-r btn-sm" id="btn-update-acl">Update</button> ' +
                        '</footer>'
                }

                $('#anchor_btn').html(btn)
            }
        });
    },
    /************************************/
    processACLFields:function(key,obj){
        var li='';
        var div ='';
        var tr="";
        var tbody="";
        var tab='';
        var active ="";
        var active_in ="";
        var isdisable ='';
        switch(key){
            case "PermissionForm":
                active = "active";
                active_in ="active in";
                isdisable ='disabled = "disabled"';
                for(let k_field in obj){
                    var view = obj[k_field]["show"];
                    var add = obj[k_field]["add"];
                    var edit = obj[k_field]["edit"];
                    tr +='<tr class="tr_acl">' +
                        '<td >Form '+k_field+'<input class="key" type="hidden" value="'+k_field+'"></td>'+
                        acl.prototype.td_acl(view,add,edit)+
                        '</tr>';
                }
                break;
            case "Navigation":
                tr = acl.prototype.create_obj_nav(obj)
                break;
            default:
                for(let k_field in obj){
                    var key_name = k_field
                    if(k_field.indexOf("-")){
                        key_name =''
                        var k_field_t = k_field.split("_")
                        k_field_t.forEach(function(item){
                            if(item =="id") item =""
                            key_name = (key_name=='')?item: key_name+" "+item;
                        })

                    }

                    var view = obj[k_field]["show"];
                    var add = obj[k_field]["add"];
                    var edit = obj[k_field]["edit"];

                    tr +='<tr class="tr_acl">' +
                        '<td class="capitalize-first">'+key_name+'<input class="key" type="hidden" value="'+k_field+'"></td>'+
                        acl.prototype.td_acl(view,add,edit)+
                        '</tr>';
                }
                break;

        }

        li +='<li class="nav-item '+active+'">'+
                '<a class="nav-link f_uppercase" data-toggle="tab" href="#'+key+'" role="tab">'+key+'</a>'+
            '</li>'

        tab ='<div class="tab-pane fade acl '+active_in+'" id="'+key+'" role="tabpanel">' +
            '<div class="table-responsive-lg col-12">' +
                '<table class="table table-bordered m-0 t-normal-l table-acl '+key+'">' +
                    '<thead>'+
                        '<tr>'+
                            '<th style="max-width: 300px; vertical-align: middle;font-size: 15px!important" rowspan="2">Filed Name</th>'+
                            '<th style="font-size: 15px!important">Permission</th>'+
                        '</tr>'+
                        '<tr>'+
                            '<th>' +
                                '<div class="inline-group">'+
                                    '<label class="checkbox">' +
                                        '<input type="checkbox" name="checkbox-inline" class="view-all">' +
                                        '<i></i>All&nbsp;&nbsp;&nbsp;&nbsp;' +
                                    '</label>' +
                                    '<label class="checkbox">' +
                                        '<input type="checkbox" name="checkbox-inline" class="add-all">' +
                                        '<i></i>All&nbsp;&nbsp;&nbsp;&nbsp;' +
                                    '</label>' +
                                        '<label class="checkbox">' +
                                        '<input type="checkbox" name="checkbox-inline" class="edit-all">' +
                                        '<i></i>All' +
                                    '</label>' +
                                '</div>' +
                            '</th>'+
                        '</tr>'+
                    '</thead>'+
            '<tbody>'+
            tr +
            '</tbody>' +
            '</table>'

        $('#role_form #ul-acl').append(li)
        $('#role_form #body-acl').append(tab)

    },
    /*******************************************/
    td_acl:function(view,add,edit){
        var view_v =(view)?'checked="checked"':'';
        var add_v =(add)?'checked="checked"':'';
        var edit_v =(edit)?'checked="checked"':'';
        var add_div = '<label class="checkbox">' +
            '<input type="checkbox" name="checkbox-inline" class="add" '+add_v+' >' +
            '<i></i>Add</label>'
            '</div>'
        if(add ==undefined){
            var add_div = '<label class="checkbox c-disabled">' +
                '<i></i>Add</label>'
        }
        var view_div = '<label class="checkbox">' +
            '<input type="checkbox" name="checkbox-inline" class="view" '+view_v+' >' +
            '<i></i>Show</label>'
        '</div>'
        if(view ==undefined){
            var view_div = '<label class="checkbox c-disabled">' +
                '<i></i>Show</label>'
        }

        var td =
            '<td class="v-key">' +
                '<div class="inline-group">'+
                    view_div +
                    add_div +
                    '<label class="checkbox">' +
                        '<input type="checkbox" name="checkbox-inline" class="edit" '+edit_v+' >' +
                        '<i></i>Edit' +
                    '</label>' +
                '</div>' +
                '</td>'
        return td;
    },
    /*******************************************/
    td_acl_navigation:function(view,add,edit){
        var view_v =(view)?'checked="checked"':'';
        var add_v =(add)?'checked="checked"':'';
        var edit_v =(edit)?'checked="checked"':'';

        var add_div = '<label class="checkbox">' +
            '<input type="checkbox" name="checkbox-inline" class="add" '+add_v+' >' +
            '<i></i>Only View</label>'
        '</div>'
        if(add ==undefined){
            var add_div = '<label class="checkbox c-disabled">' +
                '<i></i>Only View</label>'
        }

        var view_div = '<label class="checkbox">' +
            '<input type="checkbox" name="checkbox-inline" class="view" '+view_v+' >' +
            '<i></i>Show</label>'
        '</div>'
        if(view ==undefined){
            var view_div = '<label class="checkbox c-disabled">' +
                '<i></i>Show</label>'
        }

        var edit_div = '<label class="checkbox">' +
            '<input type="checkbox" name="checkbox-inline" class="view" '+edit_v+' >' +
            '<i></i>Show</label>'
        '</div>'
        if(edit ==undefined){
            var edit_div = '<label class="checkbox c-disabled">' +
                '<i></i>Edit</label>'
        }

        var td =
            '<td class="v-key">' +
                '<div class="inline-group">'+
                    view_div +
                   // add_div +
                    //edit_div +
                 '</div>' +
            '</td>'
        return td;
    },
    /*******************************************/
    create_obj_nav:function(nav){
        var obj ={}
        obj.administrator={}
        obj.administrator.sub={}
        obj.administrator.sub.container_type={}
        obj.administrator.sub.container_type.sub={}
        obj.administrator.sub.depot={}
        obj.administrator.sub.depot.sub={}
        obj.administrator.sub.group={}
        obj.administrator.sub.group.sub={}
        obj.administrator.sub.discount={}
        obj.administrator.sub.discount.sub={}
        obj.administrator.sub.rate_shipping={}
        obj.administrator.sub.rate_shipping.sub={}
        obj.administrator.sub.rate_container={}
        obj.administrator.sub.rate_container.sub={}
        obj.contact={}
        obj.contact.sub={}
        obj.company={}
        obj.company.sub={}
        obj.product={}
        obj.product.sub={}
        obj.order={}
        obj.order.sub={}
        //obj.warranty={}
        //obj.warranty.sub={}
        obj.invoice={}
        obj.invoice.sub={}
        //obj.claim={}
        //obj.claim.sub={}
        obj.import={}
        obj.import.sub={}
        obj.task={}
        obj.task.sub={}
        obj.help={}
        obj.help.sub={}
        obj.mail={}
        obj.mail.sub={}
        for(let k_field in nav){
            var show = nav[k_field]["show"];
            var onlyview = nav[k_field]["onlyview"];
            var edit = nav[k_field]["edit"];
           if(k_field=='dashboard' || k_field== 'home' ||
               k_field== 'profile' || k_field== 'calendar' ){
               obj[k_field] ={show:show,onlyview:onlyview,edit:edit}
           }

            //admin addcontainertype
            if(k_field=='administrator'){
                obj.administrator.administrator={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='roles'){
                obj.administrator.sub.roles={show:show,onlyview:onlyview,edit:edit}
                //if(obj.administrator.sub.roles==undefined) {}
                //Object.assign(obj.administrator.sub.roles,{show:show,onlyview:onlyview,edit:edit})
            }
            if(k_field=='state_manage'){
                obj.administrator.sub.state_manage={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='group'){
                obj.administrator.sub.group.group ={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='addgroup'){
                obj.administrator.sub.group.sub.addgroup={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='listgroup'){
                obj.administrator.sub.group.sub.listgroup={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='billing'){
                obj.administrator.sub.billing={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='discount'){
                obj.administrator.sub.discount.discount={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='adddiscount'){
                obj.administrator.sub.discount.sub.adddiscount={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='discountlist'){
                obj.administrator.sub.discount.sub.discountlist={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='discountreport'){
                obj.administrator.sub.discount.sub.discountreport={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='merge'){
                obj.administrator.sub.merge={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='setting'){
                obj.administrator.sub.setting={show:show,onlyview:onlyview,edit:edit}
            }

            if(k_field=='addcontainertype'){
                obj.administrator.sub.container_type.sub.addcontainertype={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='containertypelist'){
                obj.administrator.sub.container_type.sub.containertypelist={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='adddepot'){
                obj.administrator.sub.depot.sub.adddepot={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='adddepot'){
                obj.administrator.sub.depot.sub.depotlist={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='addrateshipping'){
                obj.administrator.sub.rate_shipping.sub.addrateshipping={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='rateshippinglist'){
                obj.administrator.sub.rate_shipping.sub.rateshippinglist={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='ratecontainerlist'){
                obj.administrator.sub.rate_container.sub.ratecontainerlist={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='addratecontainer'){
                obj.administrator.sub.rate_container.sub.addratecontainer={show:show,onlyview:onlyview,edit:edit}
            }
            //contact
            if(k_field=='contact'){
                obj.contact.contact={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='addcontact'){
                obj.contact.sub.addcontact={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='listcontact'){
                obj.contact.sub.listcontact={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='reportcontact'){
                obj.contact.sub.reportcontact={show:show,onlyview:onlyview,edit:edit}
            }
            //com
            if(k_field=='company'){
                obj.company.company={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='addcompany'){
                obj.company.sub.addcompany={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='listcompany'){
                obj.company.sub.listcompany={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='reportcompany'){
                obj.company.sub.reportcompany={show:show,onlyview:onlyview,edit:edit}
            }
            //product
            if(k_field=='product'){
                obj.product.product={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='addproduct'){
                obj.product.sub.addproduct={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='listproduct'){
                obj.product.sub.listproduct={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='reportproducts'){
                obj.product.sub.reportproducts={show:show,onlyview:onlyview,edit:edit}
            }
            //order
            if(k_field=='order'){
                obj.order.order={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='addorder'){
                obj.order.sub.addorder={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='listorder'){
                obj.order.sub.listorder={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='reportorder'){
                obj.order.sub.reportorder={show:show,onlyview:onlyview,edit:edit}
            }
            //invoice
            if(k_field=='invoice'){
                obj.invoice.invoice={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='addinvoice'){
                obj.invoice.sub.addinvoice={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='listinvoice'){
                obj.invoice.sub.listinvoice={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='reportinvoice'){
                obj.invoice.sub.reportinvoice={show:show,onlyview:onlyview,edit:edit}
            }
            //help
           if(k_field=='help'){
               obj.help.help ={show:show,onlyview:onlyview,edit:edit}
           }
            //import
            if(k_field=='import'){
                obj.import.import={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='importproduct'){
                obj.import.sub.importproduct={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='importcontact'){
                obj.import.sub.importcontact={show:show,onlyview:onlyview,edit:edit}
            }
            //task
            if(k_field=='task'){
                obj.task.task={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='addtask'){
                obj.task.sub.addtask={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='tasklist'){
                obj.task.sub.tasklist={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='tasktemplate'){
                obj.task.sub.tasktemplate={show:show,onlyview:onlyview,edit:edit}
            }
            //help
            if(k_field=='help'){
                obj.help.help={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='help_page'){
                obj.help.sub.help_page={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='helpfiles'){
                obj.help.sub.helpfiles={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='helpcreatecontent'){
                obj.help.sub.helpcreatecontent={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='issueticket'){
                obj.help.sub.issueticket={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='ticketlist'){
                obj.help.sub.ticketlist={show:show,onlyview:onlyview,edit:edit}
            }
            //email
            if(k_field=='mail'){
                obj.mail.mail={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='drafts'){
                obj.mail.sub.drafts={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='compose'){
                obj.mail.sub.compose={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='inbox'){
                obj.mail.sub.inbox={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='sent'){
                obj.mail.sub.sent={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='sms_compose'){
                obj.mail.sub.sms_compose={show:show,onlyview:onlyview,edit:edit}
            }
            //warranty
            /*if(k_field=='warranty'){
                obj.warranty.task={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='addwarranty'){
                obj.warranty.sub.addwarranty={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='editwarranty'){
                obj.warranty.sub.editwarranty={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='listwarranty'){
                obj.warranty.sub.listwarranty={show:show,onlyview:onlyview,edit:edit}
            }
            if(k_field=='reportwarranty'){
                obj.warranty.sub.reportwarranty={show:show,onlyview:onlyview,edit:edit}
            }
            //claim
             if(k_field=='claim'){
             obj.claim.task={show:show,onlyview:onlyview,edit:edit}
             }
             if(k_field=='addclaim'){
             obj.claim.sub.addclaim={show:show,onlyview:onlyview,edit:edit}
             }
             if(k_field=='claimlimit'){
             obj.claim.sub.claimlimit={show:show,onlyview:onlyview,edit:edit}
             }
             if(k_field=='claimlist'){
             obj.claim.sub.claimlist={show:show,onlyview:onlyview,edit:edit}
             }
             if(k_field=='reportclaim'){
             obj.claim.sub.reportclaim={show:show,onlyview:onlyview,edit:edit}
             }
            */
            //
        }
        //console.log(obj);
        var tr =''
        for(let key in obj){
            if("show" in obj[key]){
                var show = obj[key]["show"];
                var onlyview = obj[key]["onlyview"];
                var edit = obj[key]["edit"];
                var key_name = key
                if(key.indexOf("-")){
                    key_name =''
                    var k_field_t = key.split("_")
                    k_field_t.forEach(function(item){
                        if(item =="id") item =""
                        key_name = (key_name=='')?item: key_name+" "+item;
                    })

                }
                tr +='<tr class="tr_acl">' +
                    '<td class="capitalize-first bold">'+key_name+'<input class="key" type="hidden" value="'+key+'"></td>'+
                    acl.prototype.td_acl_navigation(show,onlyview,edit)+
                '</tr>';
            }else{
                if(key !='administrator'){
                    tr +=  acl.prototype.process_td_navigation(key,obj[key],'bold','','p-l25')
                }else{
                    tr +=  acl.prototype.process_td_navigation2(key,obj[key],'bold','','p-l25')
                }
            }
        }
        return tr;
    },
    /*******************************************/
    process_td_navigation:function(key,obj,class_name,p1,p2){
        var tr ='';
        var tr1 =''
        var tr2 =''
        for(let key_field in obj){
            if(key_field !='sub'){
                var show = obj[key_field]["show"];
                var onlyview = obj[key_field]["onlyview"];
                var edit = obj[key_field]["edit"];
                var key_name = key_field
                if(key_field.indexOf("-")){
                    key_name =''
                    var k_field_t = key_field.split("_")
                    k_field_t.forEach(function(item){
                        if(item =="id") item =""
                        key_name = (key_name=='')?item: key_name+" "+item;
                    })

                }
                tr1 +='<tr class="tr_acl">' +
                    '<td class="capitalize-first '+class_name+' '+p1+'">'+key_name+'<input class="key" type="hidden" value="'+key_field+'"></td>'+
                    acl.prototype.td_acl_navigation(show,onlyview,edit)+
                    '</tr>';
            }else{
                var obj_sub = obj['sub']
                for(let key_field in obj_sub){
                    var show = obj_sub[key_field]["show"];
                    var onlyview = obj_sub[key_field]["onlyview"];
                    var edit = obj_sub[key_field]["edit"];
                    var key_name = key_field
                    if(key_field.indexOf("-")){
                        key_name =''
                        var k_field_t = key_field.split("_")
                        k_field_t.forEach(function(item){
                            if(item =="id") item =""
                            key_name = (key_name=='')?item: key_name+" "+item;
                        })

                    }
                    tr2 +='<tr class="tr_acl">' +
                        '<td class="capitalize-first '+p2+'">'+key_name+'<input class="key" type="hidden" value="'+key_field+'"></td>'+
                        acl.prototype.td_acl_navigation(show,onlyview,edit)+
                        '</tr>';

                }
            }
        }

        return tr1 + tr2
    },
    /*******************************************/
    process_td_navigation2:function(key,obj,class_name,p1,p2){
        var tr ='';
        var tr1 =''
        var tr2 =''
        var tr3 =''
        var tr4 =''
        for(let key_field in obj){
            if(key_field !='sub'){
                var show = obj[key_field]["show"];
                var onlyview = obj[key_field]["onlyview"];
                var edit = obj[key_field]["edit"];
                var key_name = key_field
                if(key_field.indexOf("-")){
                    key_name =''
                    var k_field_t = key_field.split("_")
                    k_field_t.forEach(function(item){
                        if(item =="id") item =""
                        key_name = (key_name=='')?item: key_name+" "+item;
                    })

                }
                tr1 +='<tr class="tr_acl">' +
                    '<td class="capitalize-first '+class_name+' '+p1+'">'+key_name+'<input class="key" type="hidden" value="'+key_field+'"></td>'+
                    acl.prototype.td_acl_navigation(show,onlyview,edit)+
                    '</tr>';
            }else{
                var obj_sub = obj['sub']
                for(let key_field in obj_sub){
                    var obj_sub1 = obj_sub[key_field]
                    if (key_field in obj_sub1){
                        for(let key_field1 in obj_sub1){
                            if ("onlyview" in obj_sub1[key_field1]){
                                tr3 +=  acl.prototype.process_td_nav_sub1(key_field1,obj_sub1[key_field1],'p-l25','')
                            }else{
                                tr4 +=  acl.prototype.process_td_nav_sub2(obj_sub1[key_field1],'p-l50','')
                            }
                        }
                        tr += tr3+tr4
                        tr3 =''; tr4=''
                    }else{
                        if ("onlyview" in obj_sub1){
                            tr2 +=  acl.prototype.process_td_nav_sub1(key_field,obj_sub1,'p-l25','')
                        }else{
                            tr2 +=acl.prototype.process_td_nav_title(key_field,'p-l25','')
                            tr2 +=acl.prototype.process_td_nav_sub2(obj_sub1["sub"],'p-l50','')
                        }
                    }
                }
            }
        }

        return tr1 + tr2 +tr
    },
    /*****************************************/
    process_td_nav_sub1:function(key_field,obj,class_name1,class_name2){
        var show = obj["show"];
        var onlyview = obj["onlyview"];
        var edit = obj["edit"];
        var key_name = key_field
        if(key_field.indexOf("-")){
            key_name =''
            var k_field_t = key_field.split("_")
            k_field_t.forEach(function(item){
                if(item =="id") item =""
                key_name = (key_name=='')?item: key_name+" "+item;
            })

        }
        return '<tr class="tr_acl">' +
            '<td class="capitalize-first '+class_name1+' '+class_name2+'">'+key_name+'<input class="key" type="hidden" value="'+key_field+'"></td>'+
            acl.prototype.td_acl_navigation(show,onlyview,edit)+
            '</tr>';
    },
    /*****************************************/
    process_td_nav_sub2:function(obj,class_name1,class_name2){
        var tr2=''
        for(let key_field in obj){
            var show = obj[key_field]["show"];
            var onlyview = obj[key_field]["onlyview"];
            var edit = obj[key_field]["edit"];
            var key_name = key_field
            if(key_field.indexOf("-")){
                key_name =''
                var k_field_t = key_field.split("_")
                k_field_t.forEach(function(item){
                    if(item =="id") item =""
                    key_name = (key_name=='')?item: key_name+" "+item;
                })

            }
            tr2 +='<tr class="tr_acl">' +
                '<td class="capitalize-first '+class_name1+' '+class_name2+'">'+key_name+'<input class="key" type="hidden" value="'+key_field+'"></td>'+
                    acl.prototype.td_acl_navigation(show,onlyview,edit)+
                '</tr>';
        }
        return tr2;
    },
    /*****************************************/
    process_td_nav_title:function(key_field,class_name1,class_name2){
        var key_name = key_field
        if(key_field.indexOf("-")){
            key_name =''
            var k_field_t = key_field.split("_")
            k_field_t.forEach(function(item){
                if(item =="id") item =""
                key_name = (key_name=='')?item: key_name+" "+item;
            })

        }
        return '<tr class="tr_acl">' +
            '<td class="capitalize-first '+class_name1+' '+class_name2+'">'+key_name+'</td>'+
             '<td></td>'+
            '</tr>';
    },
    /************************************************/
    update_acl:function(){
        var acl = {};
        var acl_form ={};
        $("#role_form table.table-acl").each(function(){
            acl_form ={}
            var key = $(this).closest('.tab-pane').attr("id")
            var $me = $(this)
            $me.find('tbody tr').each(function(){
                var key_field = $(this).find('.key').val();
                if(key_field !=undefined){
                    var view =$(this).find('.view').is(":checked");
                    var add =$(this).find('.add').is(":checked");
                    var edit =$(this).find('.edit').is(":checked");
                    if(key=="PermissionForm"){
                        acl_form[key_field] = {edit:edit}
                    }else if(key=="Navigation"){
                        acl_form[key_field] = {show:view,onlyview:false}
                    }else{
                        acl_form[key_field] = {show:view,add:add,edit:edit}
                    }
                }
            });

            acl[key] =acl_form;
        })
        //console.log(acl["TaskForm"])
        //return
        var _link =link._acl_update;
        var _data ={token: localStorage.getItemValue('token'),
            jwt: localStorage.getItemValue('jwt'),
            private_key: localStorage.getItemValue('userID'),
            acl:acl,
            g_id:$('#role_form #g-id').val(),
        }

        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:_data,
            //contentType: 'application/json',
            error : function (status,xhr,error) {
            },
            success: function (res) {
                if(res.Update ==true){
                    $("#modal-success").modal("show")
                    setTimeout(function(){
                        $("#modal-success").modal("hide")
                    },2000)
                }else{
                    $("#modal-error #err-message").text(res.ERROR)
                    $("#modal-error").modal("show")
                    setTimeout(function(){
                        $("#modal-error").modal("hide")
                    },2000)
                }
            }
        });
    }

}

var acl1 = new acl();
$(function(){
    acl1.init();
});