<?php
$claim_form = 'ClaimForm';
require_once 'inc/init.php';
require_once '../php/link.php';

use \SmartUI\Components\SmartForm;

?>
<link rel="stylesheet" href="<?= ASSETS_URL ?>/css/bootstrap-timepicker.css">
<link rel="stylesheet" href="<?= ASSETS_URL ?>/css/calendar_style.css">

<section id="widget-grid" class="">
   <div class="row">

      <!-- NEW WIDGET START -->
      <article class="col-sm-12 col-md-12 col-lg-12">

         <!-- Widget ID (each widget will need unique ID)-->
         <div class="jarviswidget" data-widget-colorbutton="false" data-widget-editbutton="false">
            <header>
            </header>
            <!-- widget div-->
            <div class="jarviswidget-body" style="max-width:100%">
               <div class="smart-form">
                   <!---->
                   <div class="p30-lr m-t10">
                       <div class="row m-t10 m-b25">
                           <div class="table-responsive-lg col-12">
                               <table class="table table-bordered m-0 t-normal" id="tbl-task-in_calendar1">
                                   <thead>
                                   <tr>
                                       <th>#</th>
                                       <th>Depot info</th>
                                       <th>Customer info</th>
                                       <th>Container info</th>
                                       <th>Driver</th>
                                       <th style="width: 25px"></th>
                                   </tr>
                                   </thead>
                                   <tbody></tbody>
                               </table>
                           </div>
                           <div class="col-12 m-t15">
                               <ul id="pagination_task_in_date1" class="pagination-sm"></ul>
                           </div>
                       </div>
                   </div>
                   <!---->
               </div>
            </div>
         </div>
      </article>
   </div>
</section>
<script src="<?= ASSETS_URL ?>/js/jquery.twbsPagination.js" type="text/javascript"></script>
<script src="<?= ASSETS_URL ?>/js/plugin/bootstrap-timepicker/jquery-timepicker.min.js"></script>
<script src="<?= ASSETS_URL ?>/js/util/control-select2.js"></script>
<script src="<?= ASSETS_URL ?>/js/script/date.format.min.js"></script>

<script src="<?php echo ASSETS_URL; ?>/js/script/modal/modal_calendar1.js"></script>
