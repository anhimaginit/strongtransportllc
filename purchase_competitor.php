<?php
require_once 'init.php';

$page_title = 'Competitor rate';
$page_css[] = "your_style.css";
$no_main_header = true;
$page_body_prop = array();
if (!isset($page_html_prop)) $page_html_prop = array();
include("inc/header_no_session.php");

?>

<div id="widget-grid" class="smart-form">
    <div id="print-content" class="print_content">
        <style type="text/css" media="print">
            @media print {
                @page {
                    margin-top: 0;
                    margin-bottom: 0;
                }
                .bold {font-weight: bold;}

                body {
                    padding-top: 25px;
                    padding-bottom: 25px ;
                }
                .f-l{float: left}
                .f-r{float: right}
                .m-t15{margin-top: 15px}
                .m-b15{margin-bottom: 15px}
                table{max-width: 100%; min-width: 100%}
                .text-right{text-align: right}
                .text-left{text-align: left}
                .c_blue{ color: #0000ff;}
            }
        </style>
        <h2 ><b>Load Confirmation & Rate Agreement <span class="bold" id="order-title"></span></b></h2>
        <div class="m-t15">
            <div class="row m-b15">
                <div class="col col-6 f-l" id="depot"></div>
                <div class="col col-6 text-right f-r" id="customer"></div>
            </div>
            <div style="height: 15px!important;clear: both"></div>
            <div class="row " style="clear: both">
                <div class="col col-12 bold m-b15"><b>Special Instructions:</b></div>
                <div class="col col-12 bold m-b15"><b>Call with ETA after leaving depot</b></div>
                <div class="col">
                    <div class="col col-12">
                        <ul class="list-style">
                            <li>
                                Carrier must perform WWT inspection at depot.
                                <ul class="m-l20 list-style">
                                    <li>No holes (Go inside container, shut doors and look to see if light shows through.)</li>
                                    <li>Penetrating Rust</li>
                                    <li>Doors open and shut</li>
                                    <li>Doors are lockable</li>
                                </ul>
                            </li>
                            <li>Upon delivery carrier must place the container in the first primary location chosen by the customer. If there are problems with delivering the container, please contact logistics immediately at <span class="c_blue">(855) 206-0501</span> to get the issue resolved.</li>
                            <li>
                                Carrier must have customer sign off CIR (Container Inspection Report) provided through the delivery link.
                                <ul class="m-l20 list-style">
                                    <li>If written form is obtained, then a customer signature and date is required.</li>
                                </ul>
                            </li>
                            <li>Check seals (seals must be checked all the way around with no tears or missing parts)</li>
                            <li>Doors are lockable</li>
                        </ul>
                    </div>
                </div>
                <div class="col col-12 bold m-b15"><b>Invoicing Instructions:</b></div>
                <div class="col">
                    <div class="col col-12">
                        <ul class="list-style">
                            <li>
                                Settlements paid within <span class="font-bold">1 days </span> from the date we receive your invoice.
                            </li>
                            <li>
                                All invoices must include signed, outgate ticket, and uploaded container photos including photo at pickup and photo at delivery.
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col col-12 bold m-b15">
                    <div class="table-responsive m-t15" style="clear: both;">
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th class="text-left"><b>Description</b></th>
                                <th class="text-right"><b>Total</b></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="text-left"><b>Delivery Charge</b></td>
                                <td class="text-right"><b class="dirver-total"></b></td>
                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col col-12 bold m-b15">
                    <div >
                        <h3 class="m-b15"><b>Total :</b><span class="dirver-total"> </span></h3>
                        <p class="text-justify"><b>TOTAL CHARGES INCLUDE FUEL SURCHARGES</b></p>
                    </div>
                </div>

                <div class="col col-12 m-b15">
                    <dl>
                        <dt><b>Accepted By:</b></dt>
                        <dd id="driver-name">Sara Furness </dd>
                        <dt><b>Accepted On:</b></dt>
                        <dd id="date-accept">4/19/2023 1:57:45 PM</dd>
                        <!--<dt><b>Accepted IP Address:</b></dt>
                        <dd id="ip-login">68.68.167.84 </dd>-->
                    </dl>
                </div>
                <div class="col col-12 m-b15">
                    <p class="text-justify">
                        The undersigned hereby acknowledges as correct and accepts the referenced shipment on behalf of Strong Containers. It is agreed that the charges indicated above include all costs and fees in connection with the shipment as described. A minimum of $10,000.00 cargo insurance is required unless otherwise noted. Invoicing by the CARRIER and payment by the SHIPPER, constitutes acceptance of this agreement and by signing, this creates a contract carriage shipment.
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="print_content">
        <div class="row">
            <div class="col col-12 m-b15">
                <button id="print-btn" class="btn btn-default btn-outline" type="button"> <span><i class="fa fa-print"></i> Print</span> </button>
            </div>
        </div>
    </div>

</div>

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

<script src="<?php echo ASSETS_URL; ?>/js/script/competitor_rate.js"></script>
</body>

</html>