<link rel="stylesheet" type="text/css" href="<?= ASSETS_URL ?>/js/plugin/datetimepicker/jquery.datetimepicker.css">
<link rel="stylesheet" href="<?= ASSETS_URL ?>/css/payment.css">
<div class="smart-form" id="form-pay-to-drriver">
    <div id="message_form" role="alert" style="display:none"></div>
    <fieldset id="pay_acct_method" class="smart-form">
        <div class="row payment_content">
            <section class="col col-12">
                <h5>Payment Methods
                </h5>
            </section>
        </div>
    </fieldset>
    <fieldset>
        <section>
            <div class="inline-group">
                <label class="radio ">
                    <input type="radio" class="radio-pay_type" name="pay_type" value="Cash" checked="">
                    <i></i>Cash</label>
                <label class="radio">
                    <input type="radio" class="radio-pay_type" name="pay_type" value="Check">
                    <i></i>Check</label>
                <label class="radio">
                    <input type="radio" class="radio-pay_type" name="pay_type" value="COD">
                    <i></i>COD</label>
            </div>
        </section>
    </fieldset>
    <fieldset>
        <div class="row">
            <section class="col col-md-12 col-6">
                <label class="label">Pay Amount($)</label>
                <input type="text" class="form-control text-right input-currency" name="pay_amount" id="pay_amount">
            </section>
        </div>
          <!--
        <div class="row">
            <section class="col col-md-12 col-6">
                <label class="label">Payment Date</label>
                <input type="text" class="form-control datetimepicker" name="pay_date" id="pay_date_acct">
            </section>
        </div>-->
        <div class="row">
            <section class="col col-md-12 col-6">
                <label class="label">Note</label>
                <textarea type="text" class="form-control" name="pay_note" rows="4"></textarea>
            </section>
        </div>
    </fieldset>
</div>
<script src="<?php echo ASSETS_URL ?>/js/plugin/datetimepicker/build/jquery.datetimepicker.full.js"></script>
<script src="<?= ASSETS_URL ?>/js/script/pay-acct.js"></script>