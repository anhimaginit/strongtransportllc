<?php

$taskForm = 'TaskForm';

use SmartUI\Components\SmartForm;

require_once 'inc/init.php';
require_once '../php/link.php';

$_authenticate->checkFormPermission($taskForm);
//die($link['_employeeList']);
$assign_to_list = HTTPMethod::httpPost($link['_employeeList'], array('token' => $_SESSION['token'], 'jwt' => $_SESSION['jwt'], 'private_key' => $_SESSION['userID']));
$assign_to_list = $assign_to_list->list;

$editedTask = array();
$task_current_form = 'add';
$isUpdate = false;
$delivery_date='';
$delivery_time='';

$clss_hidden ='hide-content';
$disabled=false;
$file_upload ='';
$file_unload ='';
$total =0;
$need_pay_driver ='';
if (hasIdParam()) {
   $editedTask = HTTPMethod::httpPost(
      HOST . '/_taskDetail_id.php',
      array(
         'token' => $_SESSION['token'],
         'jwt' => $_SESSION['jwt'],
         'private_key' => $_SESSION['userID'],
         'taskID' => getID()
      )
   );
    //print_r($editedTask); die();
   if (isset($editedTask->task) && isset($editedTask->task->id)) {
       $clss_hidden='';
      $task_current_form = 'edit';
      $editedTask = (object) $editedTask->task;
       $total = $editedTask->driver_total;

       if($total > 0){
           $need_pay_driver =1;
       }

      if($editedTask->status =='CLOSED') $disabled =true;
      $isUpdate = true;
       if($editedTask->delivery_date !='' && $editedTask->delivery_date){
           $temp = explode(' ',$editedTask->delivery_date);
           if(isset($temp[0])) $delivery_date = $temp[0];
           if(isset($temp[1])) $delivery_time = $temp[1];
       }

       if($editedTask->file_pickup_name !='' && $editedTask->file_pickup_name !=null){
           foreach($editedTask->file_pickup_name as $item){
                $pos = strrpos($item,'/') +1;
                $file_name = substr($item,$pos);
                $file_upload .='<div class="row padding_l15 m-t5" style="width: 100%">
                        <div class="col col-9">
                            <a href="'.$item.'" target="_blank" class="exsiting-file-name">'.$file_name.'</a>
                        </div>
                        <div class="col col-3 exsiting-file-delete text-right" style="cursor: pointer">
                            <fa class="fa fa-trash color-alert"></fa>
                        </div>
                </div>';
           }
       }
       //print_r($editedTask->file_delivery_name); die();
       if($editedTask->file_delivery_name !='' && $editedTask->file_delivery_name !=null){
           foreach($editedTask->file_delivery_name as $item){
               $pos = strrpos($item,'/') +1;
               $file_name = substr($item,$pos);
               $file_unload .='<div class="row padding_l15 m-t5" style="width: 100%">
                        <div class="col col-9">
                            <a href="'.$item.'" target="_blank" class="exsiting-file-name">'.$file_name.'</a>
                        </div>
                        <div class="col col-3 exsiting-file-delete text-right" style="cursor: pointer">
                            <fa class="fa fa-trash color-alert"></fa>
                        </div>
                </div>';
           }
       }

      // print_r($editedTask);
      // echo json_encode($editedTask);
   } else { 
      print('<script>messageForm("The task wasn\'t found in system or you couldn\'t control task '.getID().'. Please check again", false)</script>');
   }
}
$total = '$ '.number_format($total,2,".",",");
?>
<link rel="stylesheet" href="<?= ASSETS_URL ?>/css/bootstrap-timepicker.css">

<section id="widget-grid" class="">
   <div class="row">

      <!-- NEW WIDGET START -->
      <article class="col-sm-12 col-md-12 col-lg-12">
         <!-- Widget ID (each widget will need unique ID)-->
         <div class="jarviswidget" data-widget-colorbutton="false" data-widget-editbutton="false">
            <header role="heading">
               <h2 style="width:auto">Task Form <?= $isUpdate ? 'ID: ' . $editedTask->id : '' ?> </h2>
               <?php
               // $help_form = 'warranty';
               // include 'btn-help.php';
               // unset($help_form);
               ?>
               <?php if ($isUpdate) { ?>
                  <div class="jarviswidget-ctrls" id="task-form-control" role="menu">
                     <a href="./#ajax/task.php" class="jarviswidget-toggle-btn btn-primary have-text pl-5 pr-5"><i class="fa fa-plus"></i> Create new task</a>
                  </div>
               <?php } ?>
            </header>
            <div>
               <?php
               if ($isUpdate && isset($editedTask->claimID) && $editedTask->claimID != '') {
                  echo '<div>This task is used for claim: ' . $editedTask->claimID . '. <a href="./#ajax/claim-form.php?id=' . $editedTask->claimID . '"> Click here to go to claim <i class="fa fa-external-link"></i></a></div>';
               }
               ?>
               <div class="jarviswidget-editbox"></div>
               <div id="message_form" role="alert" style="display:none"></div>
               <form class="smart-form" id="task_form" method="post">
                  <input type="hidden" name="id" value="<?= ($isUpdate ? $editedTask->id : '') ?>">
                  <?php if ($isUpdate) { ?>
                     <input type="hidden" id="assign" data-name="<?= $editedTask->assign_name ?>" data-value="<?= $editedTask->assign_id ?>">
                     <input type="hidden" id="customer" data-name="<?= $editedTask->cus_name ?>" data-value="<?= $editedTask->customer_id ?>">
                     <input type="hidden" id="createDate" data-name="<?= $editedTask->createDate ?>" data-value="<?= $editedTask->createDate ?>">
                      <input type="hidden" id="sku_list1" data-name="<?= $editedTask->sku_list ?>" data-value="<?= $editedTask->sku_list ?>">
                      <input type="hidden" id="product_sku1" data-name="<?= $editedTask->product_sku ?>" data-value="<?= $editedTask->product_sku ?>">
                      <input type="hidden" id="order-edit" data-value="<?= $editedTask->assign_order ?>" data-name="<?= $editedTask->order_title ?>">
                      <input type="hidden" id="driver-edit" data-value="<?= $editedTask->assign_id ?>" data-name="<?= $editedTask->assign_name ?>">

                  <?php } ?>
                  <input type="hidden" name="createDate" value="<?= ($isUpdate ? $editedTask->createDate : '') ?>">
                  <fieldset>
                     <div class="row">
                        <?php
                        SmartForm::print_field('taskName', SmartForm::FORM_FIELD_INPUT, array(
                           'label' => 'Task Name(*)',
                           'disabled' => !hasPermission($taskForm, 'taskName', $task_current_form),
                           'value' => ($isUpdate ? $editedTask->taskName : '')
                        ), 6, false, hasPermission($taskForm, 'taskName', 'show'));

                        SmartForm::print_field('actionset', SmartForm::FORM_FIELD_SELECT, array(
                            'label' => 'Action Set',
                            'data' => array(
                                array('label' => 'Order', 'value' => 'order'),
                                array('label' => 'General', 'value' => 'general'),
                                array('label' => 'Warranty', 'value' => 'warranty'),
                                array('label' => 'Claim', 'value' => 'claim'),

                            ),
                            'disabled' => !hasPermission($taskForm, 'actionset', $task_current_form),
                            'value' => 'value',
                            'selected' => ($isUpdate ? $editedTask->actionset : 'order')
                        ), 6, false, hasPermission($taskForm, 'actionset', 'show'));
                        ?>

                     </div>
                     <div class="row order-class">
                         <section class="col col-6">
                             <label class="input">Order</label>
                             <select name="assign_order" id="assign_order" style="width:100%"></select>
                         </section>
                         <section class="col col-6">
                             <label class="label">SKU(*)</label>
                             <label class="select ">
                                 <select name="product_sku" id="product_sku" aria-invalid="false" class="valid" disabled="">
                                 </select><i></i>
                             </label>
                         </section>
                     </div>

                      <div class="row order-class">
                          <section class="col col-6 driver-rate">
                              <label class="input">Assign driver<span class="driver-rate-total color-alert">(Total: <?=$total;?>)</span>
                              <span class="<?=$clss_hidden;?>" style="float: right">
                                  <span class="btn btn-sm btn-primary" id="btn-send-email">Send email to driver</span></span>
                              </label>
                              <select name="assign_driver_id" id="assign_driver_id" style="width:100%" disabled="true"></select>
                          </section>
                          <?php
                          SmartForm::print_field('deliverydate', SmartForm::FORM_FIELD_INPUT, array(
                              'label' => 'Delivery Date',
                              'type' => 'date',
                              'class' => 'datepicker',
                              'value' =>$delivery_date
                          ), 4, false,true);

                          SmartForm::print_field('deliverytime', SmartForm::FORM_FIELD_INPUT, array(
                              'label' => 'Delivery Time',
                              'type' => 'time',
                              'class' => 'timepicker',
                              'value' =>$delivery_time
                          ), 2, false,true);
                          ?>
                      </div>

                     <div class="row" style="display: none">
                         <?php
                         if (hasPermission($taskForm, 'assign_id', 'show')) {
                             ?>
                             <section class="col col-6" id="is_show_assign_id" >
                                 <label class="input">Assign To <a id="assign_link" class="pointer"></a></label>
                                 <select name="assign_id" id="assign_id" style="width:100%" class="form-control" <?= hasPermission($taskForm, 'assign_id', $task_current_form) ? '' : 'disabled="disabled"' ?>></select>
                             </section>
                         <?php } ?>
                         <?php
                         if ($isUpdate && hasPermission($taskForm, 'customer_id', 'show')) { ?>
                             <section class="col col-6">
                                 <label class="input">Customer <span class="link_to" data-view="link_to" data-form="#task_form" data-control="customer_id" data-name="contact-form" data-param="id"></span></label>
                                 <select name="customer_id" id="customer_id" style="width:100%" class="form-control" <?= hasPermission($taskForm, 'customer_id', $task_current_form) ? '' : 'disabled="disabled"' ?>></select>
                             </section>
                         <?php } ?>
                     </div>
                     <div class="row">
                        <?php
                        /*
                        SmartForm::print_field('dueDate', SmartForm::FORM_FIELD_INPUT, array(
                           'label' => 'Due Date',
                           'type' => 'date',
                           'class' => 'datepicker',
                           'disabled' => !hasPermission($taskForm, 'dueDate', $task_current_form),
                           'value' => ($isUpdate ? explode(' ', $editedTask->dueDate)[0] : '')
                        ), 6, false, hasPermission($taskForm, 'dueDate', 'show'));

                        SmartForm::print_field('doneDate', SmartForm::FORM_FIELD_INPUT, array(
                           'label' => 'Done Date',
                           'class' => 'datepicker',
                           'type' => 'date',
                           'disabled' => true,
                           'value' => ($isUpdate && $editedTask->doneDate ? explode(' ', $editedTask->doneDate)[0] : ''),
                           'attr' => array(
                              'title="Done date will be automatically updated when status is done"'
                           )
                        ), 6, false, hasPermission($taskForm, 'doneDate', 'show'));

                        if (hasPermission($taskForm, 'time', 'show')) {
                           echo '
                           <section class="col col-md-3 col-sm-6 col-xs-12">
                              <label class="input">Time</label>
                              <div class="input-group" style="display:flex">
                                 <input type="number" class="form-control time_day no-border-right" value="' . ($isUpdate && isset($editedTask->time) ? explode(' ', $editedTask->time)[0] : '')
                              . '" style="width:50%" placeholder="Days"' . (hasPermission($taskForm, 'time', $task_current_form) ? '' : ' readonly') . '>
                                 <input type="text" class="form-control timepicker time_hour no-border-left" value="' . ($isUpdate && isset($editedTask->time) && $editedTask->time != '' && strpos(' ', $editedTask->time) > 0 ? explode(' ', $editedTask->time)[1] : '') . '" style="width:50%" placeholder="hh:mm"' . (hasPermission($taskForm, 'time', $task_current_form) ? '' : ' readonly') . '>
                              </div>
                           </section>
                           ';
                        }

                        if (hasPermission($taskForm, 'time', 'show')) {
                           echo '
                           <section class="col col-md-3 col-sm-6 col-xs-12">
                              <label class="input">Alert</label>
                              <div class="input-group" style="display:flex">
                                 <input type="number" class="form-control alert_day no-border-right" value="' . ($isUpdate && isset($editedTask->alert) ? explode(' ', $editedTask->alert)[0] : '')
                              . '" style="width:50%" placeholder="Days"' . (hasPermission($taskForm, 'time', $task_current_form) ? '' : ' readonly') . '>
                                 <input type="text" class="form-control timepicker alert_hour no-border-left" value="' . ($isUpdate && isset($editedTask->alert) && $editedTask->alert != '' && strpos(' ', $editedTask->alert) > 0 ? explode(' ', $editedTask->alert)[1] : '') . '" style="width:50%" placeholder="hh:mm"' . (hasPermission($taskForm, 'time', $task_current_form) ? '' : ' readonly') . '>
                              </div>
                           </section>
                           ';
                        }

                        if (hasPermission($taskForm, 'time', 'show')) {
                           echo '
                           <section class="col col-md-3 col-sm-6 col-xs-12">
                              <label class="input">Urgent</label>
                              <div class="input-group" style="display:flex">
                                 <input type="number" class="form-control urgent_day no-border-right" value="' . ($isUpdate && isset($editedTask->urgent) ? explode(' ', $editedTask->urgent)[0] : '')
                              . '" style="width:50%" placeholder="Days"' . (hasPermission($taskForm, 'time', $task_current_form) ? '' : ' readonly') . '>
                                 <input type="text" class="form-control timepicker urgent_hour no-border-left" value="' . ($isUpdate && isset($editedTask->urgent) && $editedTask->urgent && strpos(' ', $editedTask->urgent) > 0 ? explode(' ', $editedTask->urgent)[1] : '') . '" style="width:50%" placeholder="hh:mm"' . (hasPermission($taskForm, 'time', $task_current_form) ? '' : ' readonly') . '>
                              </div>
                           </section>
                           ';
                        }
                        */
                        SmartForm::print_field('status', SmartForm::FORM_FIELD_SELECT, array(
                           'label' => 'Status',
                           'data' => array(
                               array('label' => 'NEEDS TO BE SCHEDULED', 'value' => 'NEEDS TO BE SCHEDULED'),
                               array('label' => 'SCHEDULED FOR DELIVERY', 'value' => 'SCHEDULED FOR DELIVERY'),
                               array('label' => 'PICKED UP – OUT FOR DELIVERY', 'value' => 'PICKED UP'),
                               array('label' => 'DELIVERED', 'value' => 'DELIVERED'),
                               array('label' => 'CLOSED', 'value' => 'CLOSED'),
                           ),
                           'disabled' => !hasPermission($taskForm, 'status', $task_current_form),
                           'value' => 'value',
                           'selected' => ($isUpdate ? $editedTask->status : 'open')
                        ), 3, false, hasPermission($taskForm, 'status', 'show'));
                        ?>
                     </div>
                     <div class="row">
                         <div class="col col-6 m-b10 m-t10">
                             <div class="form-group">
                                 <label  for="upload-attachement">UPLOAD PICTURE OF CONTAINER AT PICKUP</label>

                                 <div class="col col-12 b-gray51" style="min-height: 130px">
                                     <div class="col col-12" id="upload-attachement"><?=$file_upload;?></div>
                                     <div class="col col-12" id="upload-files-area">

                                     </div>
                                     <div class="col-12 file_upload text-center m-t10">
                                         <label for="upload">
                                             <a class="btn btn-primary text-light " role="button" aria-disabled="false">Click here to upload file</a>
                                         </label>
                                         <input type="file" name="upload_file[]" accept=".pdf,image/*" id="upload" style="visibility: hidden; position: absolute;" multiple/>
                                     </div>

                                 </div>

                             </div>
                         </div>

                         <div class="col col-6 m-b10 m-t10">
                             <div class="form-group">
                                 <label  for="unload-attachement">UPLOAD PICTURE OF CONTAINER DELIVERED</label>

                                 <div class="col col-12 b-gray51" style="min-height: 130px">
                                     <div class="col col-12" id="unload-attachement"><?=$file_unload?></div>
                                     <div class="col col-12" id="unload-files-area">

                                     </div>
                                     <div class="col-12 file_upload m-t10 text-center">
                                         <label for="unload">
                                             <a class="btn btn-primary text-light" role="button" aria-disabled="false">Click here to upload file</a>
                                         </label>
                                         <input type="file" name="unload_file[]" accept=".pdf,image/*" id="unload" style="visibility: hidden; position: absolute;" multiple/>
                                     </div>

                                 </div>

                             </div>
                         </div>
                     </div>
                     <div class="row">
                         <?php
                        SmartForm::print_field('content', SmartForm::FORM_FIELD_TEXTAREA, array(
                            'label' => 'Content',
                            'class' => 'form-control" rows="4',
                            'disabled' => !hasPermission($taskForm, 'content', $task_current_form),
                            'value' => ($isUpdate ? $editedTask->content : ''),
                            'attr' => array()
                        ), 12, false, hasPermission($taskForm, 'content', 'show'));
                        ?>
                     </div>

                     <?php
                     if($need_pay_driver ==1){ ?>
                     <fieldset class="fs fs-property m-t10 m-b25" id="tb-info-driver">
                         <legend>Driver Info</legend>
                         <?php
                         include('pay-to-driver-table.php');
                         ?>
                         <div class="modal fade animated fadeInDown" style="display:none; margin:auto;" id="modal-pay-to-driver">
                             <div class="modal-dialog modal-lg modal-dialog-centered">
                                 <div class="modal-content">
                                     <div class="modal-body" style="margin:auto">
                                         <?php
                                         include 'pay-to-driver.php';
                                         ?>
                                         <div class="row m-t20 m-b20 text-center m-rl">
                                             <div class="col col-12 border-groove p-t20">
                                                 <span class="m-r20">
                                                 <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                                            </span>
                                             <span>
                                                 <button type="button" class="btn btn-primary btn-sm" id="btn-payment" >Submit</button>
                                             </span>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </fieldset>
                     <fieldset class="fs fs-property m-t10 m-b25" id="session-payment-driver" style="display: none">
                         <legend>Payment</legend>
                         <table id="tb-payment-driver" class="table table-tripped table-bordered" style="margin-bottom:15px;">
                             <thead>
                             <tr>
                                 <th class="text-center">Payment amount</th>
                                 <th class="text-center">Payment type</th>
                                 <th class="text-center">Payment date</th>
                                 <th class="text-center">Payment note</th>
                             </tr>
                             </thead>
                             <tbody></tbody>
                         </table>
                     </fieldset>
                    <?php  }
                     ?>

                  </fieldset>
                  <?php
                  if(!$disabled){ ?>
                      <footer>
                          <button type="button" id="close-modal-task" class="btn btn-sm btn-default">Cancel</button>
                          <button type="reset" class="btn btn-sm btn-primary">Reset</button>
                          <button type="submit" class="btn btn-sm btn-primary" >Submit</button>
                      </footer>
                 <?php }
                  ?>

               </form>
            </div>
         </div>
      </article>
   </div>
</section>
<script src="<?= ASSETS_URL ?>/js/plugin/bootstrap-timepicker/jquery-timepicker.min.js"></script>
<script src="<?= ASSETS_URL ?>/js/util/control-select2.js"></script>
<script src="<?= ASSETS_URL ?>/js/util/select-link.js"></script>
<script src="<?= ASSETS_URL ?>/js/script/date.format.min.js"></script>
<script src="<?= ASSETS_URL ?>/js/script/task/task.js"></script>
<script src="<?= ASSETS_URL ?>/js/script/process_image.js"></script>
    <script src="<?= ASSETS_URL ?>/js/script/task/pay_to_driver.js"></script>
<?php if ($isUpdate) { ?>
   <script>
      new ControlPage('#task-form-control');
   </script>
    <script type="text/javascript">
        var is_disabled='<?php echo $disabled;?>';

    </script>

<?php } ?>