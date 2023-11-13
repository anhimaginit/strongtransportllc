function Task() {
   window.complete = false;
}
Task.prototype = {
   constructor: Task,
   init: function (callback) {
       if($('select[name ="actionset"]').val() !="order"){
           $('#assign_id').closest('.row').css({"display":""});
           $('#assign_id').prop("disabled",false);
           $('#customer_id').prop("disabled",false);
           $('.order-class').css({"display":"none"});
           $('#assign_order').prop("disabled",true);
           $('#assign_driver_id').prop("disabled",true);
           $('#product_sku').prop("disabled",true);
       }else{
           $('#assign_id').closest('.row').css({"display":"none"});
           $('#assign_id').prop("disabled",true);
           $('#customer_id').prop("disabled",true);
           $('.order-class').css({"display":""});
           $('#assign_order').prop("disabled",false);
           if($('#assign_order').val() !="" && $('#assign_order').val() !=null) {
               $('#assign_driver_id').prop("disabled",false);
               $('#product_sku').prop("disabled",false);
           }
       }
      // order_select2_el('#assign_order',link._orderSearch);
      order_select2_el('#assign_order',link._orderSearch,function(){
          if($("#order-edit").data('value') !='' && $("#order-edit").data('value') !=null){
              var sku_list1 = $("#sku_list1").data('value')
              sku_list1 =(sku_list1 !="")?sku_list1+","+$("#product_sku1").data('value'):$("#product_sku1").data('value')
              $('#assign_order').append('<option value="'+$("#order-edit").data('value')+'" sku_list ="'+sku_list1+'">' +
                  '' + $('#order-edit').data('name') + '</option>').trigger('change');

              $('#product_sku option[value="'+$("#product_sku1").data('value')+'"]').attr("selected","selected")

          }
      })
      user_select2_el('#assign_driver_id',link._driverSearch,function(){
          if($("#order-edit").data('value') !='' && $("#order-edit").data('value') !=null &&
              $("#driver-edit").data('value') !='' && $("#driver-edit").data('value') !=null){
              $('#assign_driver_id').append('<option value="'+$("#driver-edit").data('value')+'">' + $('#driver-edit').data('name') + '</option>').trigger('change');
          }
      });

       $('#product_sku').change(function(){
           var order =  $('#task_form #assign_order').val();
           var product = $(this).val();
           var driver = $('#task_form #assign_driver_id').val();
           if(order !='' && product !=''){
               var data =  {
                   order_id:order,
                   prod_sku:product,
                   contact_id:driver
               }
               calculate_driver_rate(data,'#task_form #assign_driver_id')
           }
       });

      this.setView();
      this.bindEvent();
      this.loadData();
      if (callback) callback();

       jQuery.validator.addMethod("validateDeliveryDate", function() {
            return Task.prototype.invalid_delivery();
       }, "Date is invalid");

       $('#task_form #btn-send-email').unbind('click').bind('click',function(){
           Task.prototype.email_to_driver()
       })
   },
   bindEvent: function () {
      $('#task_form').validate(this.taskOptionValidate);

      $(document).on('change', '#task_form [name=assign_id]', function () {
         var id = this.value;
         if (id != '') {
            $('#task_form #assign_link').html('Go to contact information <i class="fa fa-external-link"></i>');
            $('#task_form #assign_link').unbind('click').bind('click', function () {
               window.open('./#ajax/contact-form.php?id=' + id, '_blank');
            });
         } else {
            $('#task_form #assign_link').empty();
            $('#task_form #assign_link').unbind('click');
         }
      });

      $(document).on('click', 'input, select, textarea, button', function () {
         $('#message_form').empty().hide();
      })

      $('select[name ="actionset"]').change(function(){
          if($(this).val() == "order"){
              $('#assign_id').closest('.row').css({"display":"none"});
              $('#assign_id').prop("disabled",true);
              $('#customer_id').prop("disabled",true);
              $('.order-class').css({"display":""});
              $('#assign_order').prop("disabled",false);
              if($('#assign_order').val() !="" && $('#assign_order').val() !=null) {
                  $('#assign_driver_id').prop("disabled",false);
                  $('#product_sku').prop("disabled",false);
              }
          }else{
              $('#assign_id').closest('.row').css({"display":""});
              $('#assign_id').prop("disabled",false);
              $('#customer_id').prop("disabled",false);
              $('.order-class').css({"display":"none"});
              $('#assign_order').prop("disabled",true);
              $('#assign_driver_id').prop("disabled",true);
              $('#product_sku').prop("disabled",true);
          }
      });

   },
   loadData: function () {
      $.ajax({
         url: link._employeeList,
         type: 'post',
         dataType: 'json',
         data: { token: localStorage.getItemValue('token'), jwt: localStorage.getItemValue('jwt'), private_key: localStorage.getItemValue('userID') },
         success: function (res) {
            res.list.forEach(function (item, index) {
               res.list[index].id = item.ID;
               res.list[index].text = item.first_name + ' ' + item.last_name;
            });
            $('[name=assign_id]').select2({
               placeholder: 'Select Assign',
               minimumInputLength: 0,
               language: {
                  inputTooShort: function () {
                     return 'Enter name';
                  }
               },
               allowClear: true,
               data: res.list,
               escapeMarkup: function (markup) { return markup; },
               templateResult: function (data) {
                  var add = [];
                  data.primary_state ? add.push(data.primary_state) : '';
                  data.primary_city ? add.push(data.primary_city) : '';
                  var result =
                     '<div class="select2-result-repository clearfix padding-5">' +
                     '<div class="select2-result-repository__meta">' +
                     '<div class="select2-result-repository__title">' + data.text +
                     '<div class="pull-right">' + data.primary_email + '</div>' +
                     '</div>' +
                     '<div class="">' +
                     '<div class="pull-left">' + data.primary_phone + '</div>' +
                     '<div class="pull-right">' + add.join(' - ') + '</div>' +
                     '</div>' +
                     '</div>' +
                     '</div>';
                  return result;
               },
               templateSelection: function (data) {
                  if (!data.text) return data.id;
                  return data.text;
               }
            });
            if ($('#assign').data('value') != '') {
               $('[name=assign_id]').val($('#assign').data('value')).trigger('change');
            } else {
               $('[name=assign_id]').val(null).trigger('change');
            }
         },
         error: function (e) {
            console.error(e);
         }
      })
   },
   setView: function () {
      new ControlSelect2(['[name=customer_id'], { customer_id: _linkSelect.customer }, function () {
         if ($('#customer').data('value') != '') {
            $('[name=customer_id]').append('<option value="' + $('#customer').data('value') + '">' + $('#customer').data('name') + '</option>').trigger('change');
         }
      });

      $('#task_form .datepicker').datepicker({
         dateFormat: 'yy-mm-dd',
         changeMonth: true,
         changeYear: true,
         showOtherMonths: true,
         prevText: '<i class="fa fa-chevron-left"></i>',
         nextText: '<i class="fa fa-chevron-right"></i>'
      });
       /*
      $('#task_form .timepicker').timepicker({
         timeFormat: 'HH:mm',
         interval: 15,
         minTime: '00:00',
         maxTime: '23:59',
         startTime: '00:00',
         dynamic: false,
         dropdown: true,
         scrollbar: false
      });*/
      $('#task_form [name=content]').closest('section').addClass('col col-xs-12');

      $('#task_form [name=content]').summernote({
         height: 300,
         focus: false,
         tabsize: 2,
         placeholder: 'Enter content',
         toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            // ['height', ['height']],
            // ['view', ['fullscreen', 'codeview', 'help']]
         ]
      });
      $('#task_form [name=content]').summernote('code' , $('#task_form [name=content]').val())
   },
   taskOptionValidate: {
      rules: {
         taskName: { required: true },
         assign_id: {},
         customer_id: {},
         dueDate: {},
         doneDate: {},
         time: {},
         status: {},
         actionset: {},
         content: {},
         deliverydate:{
             validateDeliveryDate:true
          },
          product_sku:{required: true}
      },
      messages: {
         taskName: { required: 'Require Task name' },
          product_sku:{required: 'Require SKU'}
      },
      submitHandler: function (form) {
          var data = new FormData();
         var $task = $(form);
         var _formData = {
            token: localStorage.getItemValue('token'),
            jwt: localStorage.getItemValue('jwt'),
            private_key: localStorage.getItemValue('userID')
         }

          data.append('token', localStorage.getItemValue('token'));
          data.append('jwt', localStorage.getItemValue('jwt'));
          data.append('private_key', localStorage.getItemValue('userID'));

         var _data = $("#task_form").serializeArray()
         _data.forEach(function (elem) {
            if (elem.name != '' && elem.value != '') {
               _formData[elem.name] = elem.value;
                data.append(elem.name,elem.value)

            }
         });

         /*_formData.time = (numeral($task.find('input.time_day').val() || 0).value() + ' ' + $task.find('input.time_hour').val()).trim();
         _formData.alert = (numeral($task.find('input.alert_day').val() || 0).value() + ' ' + $task.find('input.alert_hour').val()).trim();
         _formData.urgent = (numeral($task.find('input.urgent_day').val() || 0).value() + ' ' + $task.find('input.urgent_hour').val()).trim();

          data.append('time',_formData.time)
          data.append('alert',_formData.alert)
          data.append('urgent',_formData.urgent)*/

         var _myLink = link._taskAddNew;

         if (_formData.id && _formData.id != '') {
            _myLink = link._taskUpdate;
         } else {
            _formData.createDate = getDateTime();
            delete _formData.id;
             data.delete('id')
         }
         if (_formData.status == 'done') {
            if (!_formData.doneDate || _formData.doneDate == '') {
               _formData.doneDate = getDateTime();
                data.append('doneDate',getDateTime())
            }
         } else {
            delete _formData.doneDate;
             data.delete('doneDate')
         }

         _formData.content = $('#task_form [name=content]').summernote('code');
          data.append('content',_formData.content)
          //
          var imgData = document.getElementById('upload');
          if(imgData.files.length  > 0) {
              for (var i = 0; i < imgData.files.length; i++) {
                  data.append('upload_file[]', imgData.files[i], imgData.files[i].name);
              }
          }

          var imgData = document.getElementById('unload');
          if(imgData.files.length  > 0) {
              for (var i = 0; i < imgData.files.length; i++) {
                  data.append('unload_file[]', imgData.files[i], imgData.files[i].name);
              }
          }

          var upload_existing_file = '';
          $('#upload-attachement .exsiting-file-name').each(function(){
              upload_existing_file =(upload_existing_file=='')? $(this).text():upload_existing_file+','+$(this).text()
          })

          var unload_existing_file = '';
          $('#unload-attachement .exsiting-file-name').each(function(){
              unload_existing_file =(unload_existing_file=='')? $(this).text():unload_existing_file+','+$(this).text()
          })
          //data.append(_formData);
          data.append('unload_existing_file', unload_existing_file);
          data.append('upload_existing_file', upload_existing_file);
          //console.log(data);
          //return;

         $.ajax({
            url: _myLink,
            type: 'post',
            dataType: 'json',
            data: data,
             enctype: 'multipart/form-data',
             processData: false,
             contentType: false,
             cache: false,
            success: function (res) {
               if (res.ERROR == '' && res.SAVE == 'SUCCESS') {
                   //upload file
                   if(res.file_pickup.length >0){
                       var exsting_file_area = ''
                       res.file_pickup.forEach(function(exsiting_file){
                           var temp = exsiting_file.split('/');
                           var index = temp.length;
                           var name_file = temp[index-1];
                           exsting_file_area +='<div class="row m-t5" style="width: 100%">' +
                               '<div class="col col-9"> <a href="'+exsiting_file+'" target="_blank" class="exsiting-file-name">'+name_file+'</a></div>' +
                               '<div class="col col-3 exsiting-file-delete text-right" style="cursor: pointer"><fa class="fa fa-trash color-alert"></fa></div>' +
                               '</div>'
                       })
                       $('#upload-attachement').append(exsting_file_area);
                       process_image.prototype.clear_data()
                   }

                   $("#upload-files-area").html("");
                   ///////unload image
                   //console.log(res.file_delivery);
                   if(res.file_delivery.length >0){
                       var exsting_file_area = ''
                       res.file_delivery.forEach(function(exsiting_file){
                           var temp = exsiting_file.split('/');
                           var index = temp.length;
                           var name_file = temp[index-1];
                           exsting_file_area +='<div class="row m-t5" style="width: 100%">' +
                               '<div class="col col-9"> <a href="'+exsiting_file+'" target="_blank" class="exsiting-file-name">'+name_file+'</a></div>' +
                               '<div class="col col-3 exsiting-file-delete text-right" style="cursor: pointer"><fa class="fa fa-trash color-alert"></fa></div>' +
                               '</div>'
                       })
                       $('#unload-attachement').append(exsting_file_area);
                       process_image.prototype.clear_data()
                   }
                   $("#unload-files-area").html("");
                   ///////////////////
                  if (!_formData.id) {
                      if (document.location.href.indexOf('dashboard_admin.php') > 0){
                          order_report.prototype.delete_row();
                          return;
                      }
                      var cf ='';
                      cf = window.confirm('You have successfully create the task. Go to task?');

                     if (cf) {
                        document.location.href += '?id=' + res.id;
                     }
                  } else {
                     messageForm('You have successfully save the task', true);
                  }
               } else {
                  messageForm('Error! An error occurred. ' + res.ERROR, false);
               }
            },
            error: function (e) {

            }
         });

      }
   },
   /******************************/
    invalid_delivery:function(){
        var isTrue = true
        if(getUrlParameter('id')!= undefined && getUrlParameter('id') !=""){
            var current_date = $('#createDate').data('value')
        }else{
            var current_date = new Date().format('Y-m-d h:i');
        }

        var delivery_date = '';
        if($("input[name=deliverydate]").val() !=''){
            delivery_date = $("input[name=deliverydate]").val()
            delivery_date = ($("input[name=deliverytime]").val() =='')?delivery_date: delivery_date+" "+$("input[name=deliverytime]").val();
        }

        var is_current_date = new Date(current_date);
        var is_delivery_date =new Date(delivery_date);
        if(is_delivery_date !='Invalid Date' && delivery_date !="" &&
            is_current_date !='Invalid Date' && current_date !=''){
            if(is_delivery_date < is_current_date){
                isTrue = false
            }else{
                isTrue = true
            }
        }else{
            isTrue = true
        }

        return isTrue
    },
    /******************************/
    email_to_driver:function(){
        var id = getUrlParameter('id');
        var data = {
            token: localStorage.getItemValue('token'),
            jwt: localStorage.getItemValue('jwt'),
            private_key: localStorage.getItemValue('userID'),
            id:id
        }
        var _link =link._mail_to_driver;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:data,
            error : function (status,xhr,error) {
            },
            success: function (data1){
            }

        })
    }
}

var taskForm = new Task();
taskForm.init();