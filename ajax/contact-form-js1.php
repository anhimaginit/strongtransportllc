<script src="<?= ASSETS_URL; ?>/js/script/state.js"></script>
<?php if (basename($_SERVER['PHP_SELF']) == 'contact-form.php') { ?>
<script src="<?= ASSETS_URL; ?>/js/script/note.js"></script>
<?php if ($isEdit) { ?>
<script src="<?= ASSETS_URL; ?>/js/script/contact/tabs.js"></script>
<script src="<?= ASSETS_URL; ?>/js/script/document.js"></script>
<script src="<?= ASSETS_URL; ?>/js/script/contact/contact-convert.js"></script>
<script>
    contactDocument = new DocumentTable({
        table: 'table_document',
        form: 'contact_form',
        varName: 'contactDocument',
        documentID: 'contactID',
        field: 'contactdocID',
        inputFormID: 'ID'
    });
    contactDocument.init();
    contactConvert = new ContactConvert();
    new ControlPage('#contact-form-control');
</script>
<?php } ?>
<script src="<?= ASSETS_URL; ?>/js/script/contact/track-email.js"></script>
<script src="<?= ASSETS_URL; ?>/js/util/select-link.js"></script>
<script src="<?= ASSETS_URL; ?>/js/script/contact/contact-notes.js"></script>
<?php } ?>
<script src="<?= ASSETS_URL; ?>/js/script/contact/contact-phone.js"></script>
<script src="<?= ASSETS_URL; ?>/js/script/validator.plus.js"></script>
<script src="<?= ASSETS_URL; ?>/js/script/contact/contact-append.js"></script>
<script src="<?= ASSETS_URL; ?>/js/script/contact/contact-form.js"></script>