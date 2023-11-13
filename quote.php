<?php
require_once 'init.php';

$page_title = 'Quote';
$page_css[] = "your_style.css";
$no_main_header = true;
$page_body_prop = array();
if (!isset($page_html_prop)) $page_html_prop = array();
include("inc/header_no_session.php");

?>
<section id="widget-grid" >
    <div class="jarviswidget">
        <header>
            <h2>Quote </h2>
        </header>
        <div class="widget-body" id="quote-temp-status" style="min-height: 500px">
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" id="customer-name" value="testing">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="text" class="form-control" id="customer-phone" value="(123)222-3333">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-9">
                    <div class="form-group">
                        <label>Address</label>
                        <input type="text" class="form-control" id="customer-address" value="3747 East Ave">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>City</label>
                        <input type="text" class="form-control" id="customer-city" value="Berwyn">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label>State</label>
                        <input type="text" class="form-control" id="customer-state" value="IL">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <label>Zipcode</label>
                        <input type="text" class="form-control" id="customer-zipcode" value="60402">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <button class="btn btn-danger" id="btn-submit">Submit</button>
                </div>
            </div>
            <div class="row" id="quote-temp-row" style="display: none">
                <div class="col-md-12">
                    <div class="col-md-12 text-center">
                        <strong>Container Information</strong>
                    </div>
                    <div class="col-md-12 text-center" style="margin-top: 5px">
                        <table id="quote-temp-tbl" class="table table-responsive  table-bordered no-footer">
                            <thead>
                            <tr>
                                <td>Container type</td>
                                <td>Shipping Price</td>
                                <td style="width: 30px">Quality</td>
                                <td>Total(by zip)</td>
                            </tr>
                            </thead>
                            <tbody></tbody>
                        </table>

                    </div>

                </div>
            </div>

            <div class="row" id="quote-row" style="display: none">
                <div class="col-md-12">
                    <div class="col-md-12 text-center">
                        <strong>Final Container infor</strong>
                    </div>
                    <div class="col-md-12 text-center" style="margin-top: 5px">
                        <table id="quote-tbl" class="table table-responsive  table-bordered no-footer">
                            <thead>
                            <tr>
                                <td>Container type</td>
                                <td>Shipping Price</td>
                                <td style="width: 30px">Quality</td>
                                <td>Total(by your address)</td>
                            </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <div class="col-md-12">
                            <button class="btn btn-danger" id="btn-payment">Payment</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
<script src="<?= ASSETS_URL ?>/js/bootstrap/bootstrap.min.js"></script>
<script src="<?= ASSETS_URL ?>/js/plugin/jquery-validate/jquery.validate.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.1.62/jquery.inputmask.bundle.js"></script>

<script src="<?= ASSETS_URL ?>/js/plugin/bootstrap-timepicker/bootstrap-timepicker.min.js"></script>
<script src="<?= ASSETS_URL ?>/js/plugin/clockpicker/clockpicker.min.js"></script>
<script src="<?= ASSETS_URL ?>/js/plugin/x-editable/moment.min.js"></script>

<script src="<?= ASSETS_URL ?>/js/your_script.js"></script>
<script src="<?= ASSETS_URL ?>/js/script/validator.plus.js" type="text/javascript"></script>
<script src="<?= ASSETS_URL  ?>/js/script/call-ajax.js"></script>
<script src="<?= ASSETS_URL; ?>/js/script/validator.plus.js"></script>

<script src="<?= ASSETS_URL; ?>/js/script/depot/quote_review.js"></script>
<script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqqFUPT6qHW2hvTEfwLw6IaXs253qrlmU&v=weekly"
    defer >
</script>

