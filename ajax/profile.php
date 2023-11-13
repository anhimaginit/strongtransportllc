<?php

$profileForm = 'Profile';

use SmartUI\Components\SmartForm;

require_once 'inc/init.php';
require_once '../php/link.php';

$_authenticate->checkFormPermission("ContactForm");

?>
<link rel="stylesheet" href="<?= ASSETS_URL ?>/css/bootstrap-timepicker.css">

<section id="widget-grid" class="">
   <div class="row">

      <!-- NEW WIDGET START -->
      <article class="col-sm-12 col-md-12 col-lg-12">
         <!-- Widget ID (each widget will need unique ID)-->
         <div class="jarviswidget" data-widget-colorbutton="false" data-widget-editbutton="false">
            <header role="heading">
               <h2 style="width:auto">Profile</h2>
            </header>
            <div>
               <div class="jarviswidget-editbox"></div>
               <?php include_once 'modal/modal_success.php'; ?>
               <fieldset class="smart-form" id="profile_form">
                   <div class="row">
                       <div class="col col-6 middle-text h300">
                           <div class="image-upload">
                               <label for="avatar-input">
                                   <img id="avatar-img" src="" style="width: 200px; height: 200px;" alt="Profile" class="rounded-circle shadow-2 img-thumbnail fs-xl" />
                               </label>

                               <input class="was-changed" id="avatar-input" accept="image/*" type="file" onchange="profile.prototype.previewFile(event);" style="display: none;" />
                           </div>
                       </div>
                       <div class="col col-6">
                           <div class="col col-12 m-b10">
                               <label class="input">Driver name</label>
                               <input type="text" class="form-control" id="profile-name" readonly="true" value="">
                           </div>
                           <div class="col col-12 m-b10">
                               <label class="input">Driver email</label>
                               <input type="text" class="form-control" id="profile-email" readonly="true" value="">
                           </div>
                           <div class="col col-12 m-b10">
                               <label class="input">Driver Phone</label>
                               <input type="text" class="form-control" id="profile-phone" readonly="true" value="">
                           </div>
                           <div class="col col-12 m-b10">
                               <label class="input">Driver Address</label>
                               <input type="text" class="form-control" id="profile-addr" readonly="true" value="">
                           </div>
                           <div class="col col-12 m-b10">
                               <label class="input">Rate/mile</label>
                               <input type="text" class="form-control num" id="driver_rate" value="">
                           </div>

                           <div class="col col-12 m-b20">
                               <label class="input">Min rate</label>
                               <input type="text" class="form-control num" id="driver_min_rate" value="">
                           </div>
                       </div>
                   </div>
                   <div class="row">
                       <div class="col col-12 m-b20">
                           <label class="input">Description</label>
                           <textarea class="form-control col" rows="5" id="driver_description"></textarea>
                       </div>
                       <div class="col col-12 m-b20  right-text" id="btn-profile-show">
                           <button class="btn btn-primary btn-lg" id="btn-profile">Save</button>
                       </div>
                   </div>
                   <fieldset class="fs fs-property m-t10 m-b25" id="session-payment-driver">
                       <legend>Payment</legend>
                       <table id="tb-payment-driver" class="table table-tripped table-bordered" style="margin-bottom:15px;">
                           <thead>
                           <tr>
                               <th class="text-center">Task</th>
                               <th class="text-center">Payment type</th>
                               <th class="text-center">Payment date</th>
                               <th class="text-center">Payment note</th>
                               <th class="text-center">Payment amount</th>
                           </tr>
                           </thead>
                           <tbody></tbody>
                       </table>
                   </fieldset>
               </fieldset>
            </div>
         </div>
      </article>
   </div>
</section>

<script src="<?= ASSETS_URL ?>/js/script/profile.js"></script>
