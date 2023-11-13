<?php

$depot_form = 'DepotForm';

use \SmartUI\Components\SmartForm;

require_once 'inc/init.php';

$_authenticate->checkFormPermission($depot_form);


$depot_current_form = 'add';
if (hasIdParam() && basename($_SERVER['PHP_SELF']) == 'depot-form.php') {
    $depot_current_form = 'edit';
} else {
    $depot_current_form = 'add';
}

$isEdit = $depot_current_form == 'edit';

?>
<section id="widget-grid" class="">
    <div class="jarviswidget">
        <header>
            <h2>Depot Form </h2>

            <?php
            if ($isEdit) {
                echo
                    '<div class="jarviswidget-ctrls" id="depot-form-control" role="menu">
                    <a href="./#ajax/depot-form.php" class="btn-primary have-text"><i class="fa fa-plus"></i> Create new Depot</a>
                </div>';
            }
            ?>

        </header>
        <div>
            <div class="widget-body no-padding">
                <div id="message_form" role="alert" style="display:none"></div>
                <form class="smart-form" id="depot_form" method="post">
                    <div class="row padding-10" id="div_contact_info"></div>
                    <fieldset style="border-top: none; padding-top: 10px">
                        <div class="row">
                            <?= SmartForm::print_field('depot_name', SmartForm::FORM_FIELD_INPUT, array(
                                'label' => 'Depot Name',
                                'class' => '"' . (!hasPermission($depot_form, 'depot_name', $depot_current_form) ? ' readonly="true' : ''),
                            ), 6, true, hasPermission($depot_form, 'depot_name', 'show')); ?>
                            <?= SmartForm::print_field('depot_address', SmartForm::FORM_FIELD_INPUT, array(
                                'label' => 'Depot Address',
                                'class' => '"' . (!hasPermission($depot_form, 'depot_address', $depot_current_form) ? ' readonly="true' : ''),
                            ), 6, true, hasPermission($depot_form, 'depot_address', 'show')) ?>
                        </div>
                    </fieldset>

                    <?php
                    $addressField = array(
                        'form' => $depot_form,
                        'current_form' => $depot_current_form,
                        "postal_code" => "depot_zip",
                        "city" => "depot_city",
                        "state" => "depot_state",
                    );
                    $form = 'ContactForm';
                    include './address_field_depot.php';
                    unset($addressField); ?>

                    <fieldset style="border-top: none; padding-top: 10px">
                        <div class="row">
                            <?= SmartForm::print_field('depot_phone', SmartForm::FORM_FIELD_INPUT, array(
                                'label' => 'Depot phone',
                                'class' => '' . (!hasPermission($depot_form, 'depot_phone', $depot_current_form) ? '" readonly="true' : ''),
                            ), 4, true, hasPermission($depot_form, 'depot_phone', 'show')) ?>
                            <?= SmartForm::print_field('depot_latitude', SmartForm::FORM_FIELD_INPUT, array(
                                'label' => 'Depot latitude',
                                'class' => '' . (!hasPermission($depot_form, 'depot_latitude', $depot_current_form) ? '" readonly="true' : ''),
                            ), 4, true, hasPermission($depot_form, 'depot_latitude', 'show')) ?>
                            <?= SmartForm::print_field('depot_longitude', SmartForm::FORM_FIELD_INPUT, array(
                                'label' => 'Depot longitude',
                                'class' => '' . (!hasPermission($depot_form, 'depot_longitude', $depot_current_form) ? '" readonly="true' : ''),
                            ), 4, true, hasPermission($depot_form, 'depot_longitude', 'show')) ?>
                        </div>
                        <div class="row" style="padding-top: 10px">
                            <?= SmartForm::print_field('depot_driver_intruction', SmartForm::FORM_FIELD_INPUT, array(
                                'label' => 'Depot driver intruction',
                                'class' => '' . (!hasPermission($depot_form, 'depot_driver_intruction', $depot_current_form) ? '" readonly="true' : ''),
                            ), 12, true, hasPermission($depot_form, 'depot_driver_intruction', 'show')) ?>
                        </div>
                    </fieldset>

                    <footer>
                        <?php
                            if (hasPermission($depot_form, 'btnSubmitDepot', 'show')) {
                                echo '<button type="submit" id="btnSubmitContact" class="btn btn-primary">Submit</button>';
                            }
                            // button Back
                            if (hasPermission($depot_form, 'btnBackDepot', 'show')) {
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
<script src="<?= ASSETS_URL; ?>/js/script/depot/depot-form.js"></script>