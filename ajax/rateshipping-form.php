<?php

$rateshipping_form = 'RateShippingForm';

use \SmartUI\Components\SmartForm;

require_once 'inc/init.php';

$_authenticate->checkFormPermission($rateshipping_form);


$rateshipping_current_form = 'add';
if (hasIdParam() && basename($_SERVER['PHP_SELF']) == 'rateshipping-form.php') {
    $rateshipping_current_form = 'edit';
} else {
    $rateshipping_current_form = 'add';
}

$isEdit = $rateshipping_current_form == 'edit';

?>
<section id="widget-grid" class="">
    <div class="jarviswidget">
        <header>
            <h2>Rate Shipping Form </h2>

            <?php
            if ($isEdit) {
                echo
                    '<div class="jarviswidget-ctrls" id="rateshipping-form-control" role="menu">
                    <a href="./#ajax/rateshipping-form.php" class="btn-primary have-text"><i class="fa fa-plus"></i> Create new Rate Shipping</a>
                </div>';
            }
            ?>

        </header>
        <div>
            <div class="widget-body no-padding">
                <div id="message_form" role="alert" style="display:none"></div>
                <form class="smart-form" id="rateshipping_form" method="post">
                    <div class="row padding-10" id="div_contact_info"></div>
                    
                    <fieldset style="border-top: none; padding-top: 10px">
                        <div class="row">
                            <?php if (hasPermission($rateshipping_form, 'vendor_id', 'show')) { ?>
                                <section class="col col-6">
                                    <label class="input">Company Name <span class="link_to" data-view="link_to" data-form="#rateshipping_form" data-control="company_name" data-name="company-form" data-param="id"></span></label>
                                    <select name="company_name" class="form-control" style="width:100%" <?php (!hasPermission($rateshipping_form, 'vendor_id', $rateshipping_current_form) ? ' disabled="disabled' : '') ?>></select>
                                </section>
                                
                            <?php } ?>
                            <?php if (hasPermission($rateshipping_form, 'depot_id', 'show')) { ?>
                                <section class="col col-6">
                                    <label class="input">Depot Name <span class="link_to" data-view="link_to" data-form="#rateshipping_form" data-control="depot_name" data-name="depot-form" data-param="id"></span></label>
                                    <select name="depot_name" id="depot_name" class="form-control" style="width:100%" <?php (!hasPermission($rateshipping_form, 'depot_id', $rateshipping_current_form) ? ' disabled="disabled' : '') ?>></select>
                                </section>
                                
                            <?php } ?>
                        </div>
                    </fieldset>

                    <fieldset style="border-top: none; padding-top: 10px">
                        <div class="row">
                            <?= SmartForm::print_field('rate_mile', SmartForm::FORM_FIELD_INPUT, array(
                                'label' => 'Rate Mile',
                                'class' => '' . (!hasPermission($rateshipping_form, 'rate_mile', $rateshipping_current_form) ? '" readonly="true' : ''),
                            ), 6, true, hasPermission($rateshipping_form, 'rate_mile', 'show')) ?>
                            <?= SmartForm::print_field('rate_cost', SmartForm::FORM_FIELD_INPUT, array(
                                'label' => 'Rate Cost',
                                'class' => '' . (!hasPermission($rateshipping_form, 'rate_cost', $rateshipping_current_form) ? '" readonly="true' : ''),
                            ), 6, true, hasPermission($rateshipping_form, 'rate_cost', 'show')) ?>
                        </div>
                    </fieldset>

                    <footer>
                        <?php
                            if (hasPermission($rateshipping_form, 'btnSubmitRateShipping', 'show')) {
                                echo '<button type="submit" id="btnSubmitContact" class="btn btn-primary">Submit</button>';
                            }
                            // button Back
                            if (hasPermission($rateshipping_form, 'btnBackRateShipping', 'show')) {
                                echo '<button type="button" id="btnBackContact" class="btn btn-default"">Back</button>';
                            }
                        ?>
                    </footer>
                </form>
            </div>
        </div>
    </div>
</section>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.googlemap/1.5/jquery.googlemap.js"></script>


<script src="<?= ASSETS_URL; ?>/js/script/state.js"></script>
<?php if (basename($_SERVER['PHP_SELF']) == 'depot-form.php') { ?>
    <script src="<?= ASSETS_URL; ?>/js/script/note.js"></script>
    <script src="<?= ASSETS_URL; ?>/js/script/contact/track-email.js"></script>
    <script src="<?= ASSETS_URL; ?>/js/util/select-link.js"></script>
    <script src="<?= ASSETS_URL; ?>/js/script/contact/contact-notes.js"></script>
<?php } ?>
<script src="<?= ASSETS_URL; ?>/js/script/contact/contact-phone.js"></script>
<script src="<?= ASSETS_URL; ?>/js/script/validator.plus.js"></script>
<script src="<?= ASSETS_URL; ?>/js/script/contact/contact-append.js"></script>
<script src="<?= ASSETS_URL; ?>/js/script/rateshipping/rateshipping-form.js"></script>