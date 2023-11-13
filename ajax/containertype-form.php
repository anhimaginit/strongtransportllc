<?php

$containertype_form = 'ContainerTypeForm';

use \SmartUI\Components\SmartForm;

require_once 'inc/init.php';

$_authenticate->checkFormPermission($containertype_form);


$containertype_current_form = 'add';
if (hasIdParam() && basename($_SERVER['PHP_SELF']) == 'containertype-form.php') {
    $containertype_current_form = 'edit';
} else {
    $containertype_current_form = 'add';
}

$isEdit = $containertype_current_form == 'edit';

?>
<section id="widget-grid" class="">
    <div class="jarviswidget">
        <header>
            <h2>Container Type Form </h2>

            <?php
            if ($isEdit) {
                echo
                    '<div class="jarviswidget-ctrls" id="containertype-form-control" role="menu">
                    <a href="./#ajax/containertype-form.php" class="btn-primary have-text"><i class="fa fa-plus"></i> Create new Container Type</a>
                </div>';
            }
            ?>

        </header>
        <div>
            <div class="widget-body no-padding">
                <div id="message_form" role="alert" style="display:none"></div>
                <form class="smart-form" id="containertype_form" method="post">
                    <div class="row padding-10" id="div_contact_info"></div>
                    <fieldset style="border-top: none; padding-top: 10px">
                        <div class="row">
                            <?= SmartForm::print_field('container_type_name', SmartForm::FORM_FIELD_INPUT, array(
                                'label' => 'Container Type Name',
                                'class' => '"' . (!hasPermission($containertype_form, 'container_type_name', $containertype_current_form) ? ' readonly="true' : ''),
                            ), 12, true, hasPermission($containertype_form, 'container_type_name', 'show')); ?>
                        </div>
                    </fieldset>
                    <footer>
                        <?php
                            if (hasPermission($containertype_form, 'btnSubmitContainerType', 'show')) {
                                echo '<button type="submit" id="btnSubmitContact" class="btn btn-primary">Submit</button>';
                            }
                            // button Back
                            if (hasPermission($containertype_form, 'btnBackContainerType', 'show')) {
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
<script src="<?= ASSETS_URL; ?>/js/script/containertype/containertype-form.js"></script>