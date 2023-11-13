<?php
require_once 'init.php';

$page_title = 'Home';
$page_css[] = "your_style.css";
$no_main_header = true;
$page_body_prop = array();
if (!isset($page_html_prop)) $page_html_prop = array();
include("inc/header_no_session.php");

?>
<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap"
      rel="stylesheet">

<link rel="stylesheet" href="<?= ASSETS_URL ?>/css/distance_matrix_style.css">

<section id="widget-grid" >
    <div class="jarviswidget">
        <div class="smart-form"  style="min-height: 700px">
            <div id="home-page">
                <div class="row text-center m-b10">
                    <label class="f_z_18"><b>ENTER YOUR ZIP CODE TO GET DELIVERED PRICES NOW</b></label>
                </div>
                <div class="row text-center m-b10">
                    <div class="col col-5"></div>
                    <div class="col col-2">
                        <input type="text" class="form-control" id="search-depot-zip" value="60402">
                    </div>
                </div>
                <div class="row text-center m-b10">
                    <label class=" ">* Purchase only one product category at a time</label>
                </div>
                <div class="row text-center m-b20">

                </div>

                <div class="row" id="depot-nearest" style="margin-left:40px; margin-right: 40px"></div>
            </div>
            <div id="your-cart" style="margin-right: 150px;margin-left: 150px; display: none">
                <input type="hidden" id="is-discount" value="0">
                <input type="hidden" id="is-discount-type" value="$">
                <div class="row text-center m-b20 m-t20">
                    <label style="font-size: 30px"><b>Your cart</b></label>
                </div>
                <div class="row">
                    <div class=" col col-12">
                        <table id="depot-tbl" class="table your-cart no-footer">
                            <thead>
                            <tr>
                                <td colspan="2" style="text-align: left">Product</td>
                                <td style="width: 150px; text-align: center">Price</td>
                                <td style="width: 150px; text-align: center">Quantity</td>
                                <td style="width: 150px; text-align: center"> Total</td>
                            </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>

                <div class="row m-t20">
                    <div class="col col-4">
                        <label>Choose container door direction for delivery</label>
                        <select class="form-control" name="order_doors" id="order_doors">
                            <option value="forward to cab of truck">Forward to cab of truck</option>
                            <option value="to rear of trailer">To rear of trailer</option>
                        </select>
                    </div>
                    <div class="col col-4"></div>
                    <div class="col col-4">
                        <label class="c-red invalid-code" style="display: none">Invalid</label>
                        <div class="row">
                            <div class="col col-8">
                                <input type="text" class="form-control" placeholder="Referral or Sale Code" id="discount_code">
                            </div>
                            <div class="col col-4">
                                <button class="btn btn-danger btn-sm" id="btn-discount-code">APPLY</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row m-t20">
                    <div class="col col-8">
                        *Our delivery team will contact you within 24 hours to confirm order and shipping details. Please make sure to add your email and phone number during checkout.
                    </div>
                    <div class="col col-4">
                        <div class="row">
                            <div class="col col-8 c-black text-center" style="font-size: 20px">Subtotal</div>
                            <div class="col col-4 c-black" id="sub-total" style="font-size: 20px"></div>
                        </div>
                    </div>
                </div>

                <div class="row m-t25">
                    <div class="col col-12 m-b20"style="font-size: 20px"> YOUR INFORMATION</div>
                    <div class="col col-3">
                        <label>Name(*)</label>
                        <input type="text" class="form-control is-focus" id="customer-name" value="testing">
                    </div>
                    <div class="col col-3">
                        <label>Email(*)</label>
                        <input type="text" class="form-control is-focus" id="customer-email">
                    </div>
                </div>
                <div class="row m-t10">
                    <div class="col col-3">
                        <label>Phone(*)</label>
                        <input type="text" class="form-control is-focus" id="customer-phone" value="1234569870">
                    </div>
                    <div class="col col-3">
                        <label>Address(*)</label>
                        <input type="text" class="form-control was-changed is-focus" id="customer-address" value="3747 East Ave">
                    </div>
                </div>
                <div class="row m-t10">
                    <div class="col col-3">
                        <label>City(*)</label>
                        <input type="text" class="form-control was-changed is-focus" id="customer-city" value="Berwyn">
                    </div>
                    <div class="col col-3">
                        <label>State(*)</label>
                        <input type="text" class="form-control was-changed is-focus" id="customer-state" value="IL">
                    </div>
                </div>
                <div class="row m-t10">
                    <div class="col col-3">
                        <label>Zipcode(*)</label>
                        <input type="text" class="form-control" id="customer-zipcode" value="60402">
                    </div>
                </div>

                <div class="row m-t20 m-b25">
                    <div class="col col-4"></div>
                    <div class="col col-2">
                        <button class="btn btn-default form-control c-red" id="continue-shopping"><b>CONTINUE SHOPPING</b></button>
                    </div>
                    <div class="col col-2">
                        <button class="btn btn-default form-control c-red" id="btn-confirm"><b>CONFIRM ORDER</b></button>
                    </div>
                    <div class="col col-4" id="btn-last"></div>
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

<script src="<?php echo ASSETS_URL; ?>/js/script/distance_matrix/depots.js"></script>
<script src="<?= ASSETS_URL; ?>/js/script/depot/quote_temp.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.3.4/jquery.inputmask.bundle.min.js"></script>

<script>
    $(document).ready(function(){
        $('#your-cart #customer-phone').inputmask('(999)-999-9999');
    });
</script>
<script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqqFUPT6qHW2hvTEfwLw6IaXs253qrlmU&v=weekly"
    defer >
</script>