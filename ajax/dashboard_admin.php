<?php require_once 'inc/init.php';

?>
<link rel="stylesheet" href="<?= ASSETS_URL ?>/css/bootstrap-timepicker.css">
<style type="text/css">
    .smart-form .inline-group .checkbox, .smart-form .inline-group .radio {
        float: left;
        margin-right: 10px;
    }

    fieldset.fs {
        display: block;
        margin-inline-start: 2px;
        margin-inline-end: 2px;
        padding-block-start: 0.35em;
        padding-inline-start: 0.75em;
        padding-inline-end: 0.75em;
        padding-block-end: 0.625em;
        min-inline-size: min-content;
        border-width: 2px;
        border-style: groove;
        border-color: rgb(192, 192, 192);
        border-image: initial;
    }

    fieldset.fs legend {
        display: block;
        padding-inline-start: 2px;
        padding-inline-end: 2px;
        border-width: initial;
        border-style: none;
        border-color: initial;
        border-image: initial;
        padding: 2px 15px 0 15px;
        width: auto;
    }

    .smart-form fieldset+fieldset:has(legend) {
        border-top: 2px solid rgb(192, 192, 192);
        border-style: groove;
    }
</style>
<div>
    <h1>Report order</h1>
</div>
<!-- widget grid -->
<div class="modal fade" id="task-modal"  role="dialog"  aria-hidden="true">
    <div class="modal-dialog" style="min-width:60%;">
        <div class="modal-content">
            <?php
            include 'task.php'; ?>
        </div>
    </div>
</div>
<section id="order-contain" class="smart-form">
<fieldset class="fs">
    <legend>Filter status</legend>
    <section>
        <div class="row">
            <div class="col col-2 p-r">
                <label class="checkbox word-break">
                    <input type="checkbox" name="checkbox" class="no-status">
                    <i></i>NEW ORDER
                </label>
            </div>
            <div class="col col-2 p-r">
                <label class="checkbox word-break">
                    <input type="checkbox" name="checkbox" class="open-status" checked="checked">
                    <i></i>NEEDS TO BE SCHEDULED</label>
            </div>
            <div class="col col-3 p-r">
                <label class="checkbox word-break">
                    <input type="checkbox" name="checkbox" class="progress-status" checked="checked">
                    <i></i>SCHEDULED FOR DELIVERY</label>
            </div>
            <div class="col col-3 p-r">
                <label class="checkbox word-break">
                    <input type="checkbox" name="checkbox" class="pickup-status" checked="checked">
                    <i></i>PICKED UP – OUT FOR DELIVERY</label>
            </div>
            <div class="col col-1 p-r">
                <label class="checkbox">
                    <input type="checkbox" name="checkbox" class="delivery-status">
                    <i></i>DELIVERED</label>
            </div>
            <div class="col col-1 p-r">
                <label class="checkbox">
                    <input type="checkbox" name="checkbox" class="close-status">
                    <i></i>CLOSED </label>
            </div>
        </div>
    </section>
</fieldset>
<div id="order-report" class="p-t15 b-ground-w">
    <div class="row m-t10 m-b25 text-center">
        <strong>Expired= Orange, Delivery= Ligh blue. Pickup= Yelow. Close= Grey</strong>
    </div>

    <fieldset class="fs m-t10 m-b25 order-content no-task" style="display:none">
        <input type="hidden" class="status-filter" value="">
        <legend>NEW ORDER</legend>
        <section>
            <div class="row m-b5">
                <div class="col col-2">From date</div>
                <div class="col col-2">To date</div>
                <div class="col col-2">Text search</div>
                <div class="col col-1">Line show</div>
                <div class="col col-1">Records</div>
            </div>
            <div class="row m-b5 search">
                <div class="col col-2">
                    <input type="date" class="datepicker form-control from-date">
                </div>
                <div class="col col-2">
                    <input type="date" class="datepicker form-control to-date">
                </div>
                <div class="col col-2">
                    <input type="text" class="form-control text-search">
                </div>
                <div class="col col-1">
                    <input type="number" class=" form-control line-nuber">
                </div>
                <div class="col col-1">
                    <input type="number" class=" form-control total-record c_blue bold text-center" value="0" disabled="true">
                </div>
                <div class="col col-1">
                    <button class="btn btn-sm btn-default btn-excel" id="exportExcel">Excel export </button>
                </div>
                <!--<div class="col col-1">
                    <button class="btn btn-sm btn-default btn-pdf">PDF export </button>
                </div>-->
                <div class="col col-2">
                    <button class="btn btn-sm btn-primary btn-search">Search </button>
                </div>

            </div>
            <div class="table-responsive-lg col-12">
                <table class="table table-bordered report m-0 t-normal" id="tbl-order">
                    <thead>
                    <tr>
                        <th>Order</th>
                        <th>Date</th>
                        <th>Delivery date</th>
                        <th>Customer</th>
                        <th>Depot</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Container</th>
                        <th>Driver</th>
                        <th>Cost</th>
                        <th>Invoice</th>
                        <th>Paid</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div class="col-12 m-t15">
                <ul id="pagination_tbl-order" class="pagination-sm"></ul>
            </div>
        </section>
    </fieldset>

    <fieldset class="fs m-t10 m-b25 order-content task-open">
        <input type="hidden" class="status-filter" value="NEEDS TO BE SCHEDULED">
        <legend>NEEDS TO BE SCHEDULED</legend>
        <div class="row m-b5">
            <div class="col col-2">From date</div>
            <div class="col col-2">To date</div>
            <div class="col col-2">Text search</div>
            <div class="col col-1">Line show</div>
            <div class="col col-1">Records</div>
        </div>
        <div class="row m-b5 search">
            <div class="col col-2">
                <input type="date" class="datepicker form-control from-date">
            </div>
            <div class="col col-2">
                <input type="date" class="datepicker form-control to-date">
            </div>
            <div class="col col-2">
                <input type="text" class="form-control text-search">
            </div>
            <div class="col col-1">
                <input type="number" class=" form-control line-nuber">
            </div>
            <div class="col col-1">
                <input type="number" class=" form-control total-record c_blue bold text-center" value="0" disabled="true">
            </div>
            <div class="col col-1">
                <button class="btn btn-sm btn-default btn-excell">Excel export </button>
            </div>
            <!--<div class="col col-1">
                <button class="btn btn-sm btn-default btn-pdf">PDF export </button>
            </div>-->
            <div class="col col-2">
                <button class="btn btn-sm btn-primary btn-search-open btn-search">Search </button>
            </div>
        </div>
        <div class="table-responsive-lg col-12">
            <table class="table table-bordered report m-0 t-normal" id="tbl-order-open">
                <thead>
                <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Delivery date</th>
                    <th>Customer</th>
                    <th>Depot</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Container</th>
                    <th>Driver</th>
                    <th>Cost</th>
                    <th>Invoice</th>
                    <th>Paid</th>
                    <th></th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div class="col-12 m-t15">
            <ul id="pagination_tbl-order-open" class="pagination-sm"></ul>
        </div>
    </fieldset>

    <fieldset class="fs m-t10 m-b25 order-content task-progress">
        <input type="hidden" class="status-filter" value="SCHEDULED FOR DELIVERY">
        <legend>SCHEDULED FOR DELIVERY</legend>
        <div class="row m-b5">
            <div class="col col-2">From date</div>
            <div class="col col-2">To date</div>
            <div class="col col-2">Text search</div>
            <div class="col col-1">Line show</div>
            <div class="col col-1">Records</div>
        </div>
        <div class="row m-b5 search">
            <div class="col col-2">
                <input type="date" class="datepicker form-control from-date">
            </div>
            <div class="col col-2">
                <input type="date" class="datepicker form-control to-date">
            </div>
            <div class="col col-2">
                <input type="text" class="form-control text-search">
            </div>
            <div class="col col-1">
                <input type="number" class=" form-control line-nuber">
            </div>
            <div class="col col-1">
                <input type="number" class=" form-control total-record c_blue bold text-center" value="0" disabled="true">
            </div>
            <div class="col col-1">
                <button class="btn btn-sm btn-default btn-excell">Excel export </button>
            </div>
            <!--<div class="col col-1">
                <button class="btn btn-sm btn-default btn-pdf">PDF export </button>
            </div>-->
            <div class="col col-2">
                <button class="btn btn-sm btn-primary btn-search-progress btn-search">Search </button>
            </div>
        </div>
        <div class="table-responsive-lg col-12">
            <table class="table table-bordered report m-0 t-normal" id="tbl-order-progress">
                <thead>
                <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Delivery date</th>
                    <th>Customer</th>
                    <th>Depot</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Container</th>
                    <th>Driver</th>
                    <th>Cost</th>
                    <th>Invoice</th>
                    <th>Paid</th>
                    <th></th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div class="col-12 m-t15">
            <ul id="pagination_tbl-order-progress" class="pagination-sm"></ul>
        </div>
    </fieldset>

    <fieldset class="fs m-t10 m-b25 order-content task-pickup">
        <input type="hidden" class="status-filter" value="PICKED UP">
        <legend>PICKED UP – OUT FOR DELIVERY</legend>
        <div class="row m-b5">
            <div class="col col-2">From date</div>
            <div class="col col-2">To date</div>
            <div class="col col-2">Text search</div>
            <div class="col col-1">Line show</div>
            <div class="col col-1">Records</div>
        </div>
        <div class="row m-b5 search">
            <div class="col col-2">
                <input type="date" class="datepicker form-control from-date">
            </div>
            <div class="col col-2">
                <input type="date" class="datepicker form-control to-date">
            </div>
            <div class="col col-2">
                <input type="text" class="form-control text-search">
            </div>
            <div class="col col-1">
                <input type="number" class=" form-control line-nuber">
            </div>
            <div class="col col-1">
                <input type="number" class=" form-control total-record c_blue bold text-center" value="0" disabled="true">
            </div>
            <div class="col col-1">
                <button class="btn btn-sm btn-default btn-excell">Excel export </button>
            </div>
            <!--<div class="col col-1">
                <button class="btn btn-sm btn-default btn-pdf">PDF export </button>
            </div>-->
            <div class="col col-2">
                <button class="btn btn-sm btn-primary btn-search-pickup btn-search">Search </button>
            </div>
        </div>
        <div class="table-responsive-lg col-12">
            <table class="table table-bordered report m-0 t-normal" id="tbl-order-pickup">
                <thead>
                <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Delivery date</th>
                    <th>Customer</th>
                    <th>Depot</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Container</th>
                    <th>Driver</th>
                    <th>Cost</th>
                    <th>Invoice</th>
                    <th>Paid</th>
                    <th></th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div class="col-12 m-t15">
            <ul id="pagination_tbl-order-pickup" class="pagination-sm"></ul>
        </div>
    </fieldset>

    <fieldset class="fs m-t10 m-b25 order-content task-delivery" style="display:none">
        <input type="hidden" class="status-filter" value="DELIVERED">
        <legend>DELIVERY</legend>
        <div class="row m-b5">
            <div class="col col-2">From date</div>
            <div class="col col-2">To date</div>
            <div class="col col-2">Text search</div>
            <div class="col col-1">Line show</div>
            <div class="col col-1">Records</div>
        </div>
        <div class="row m-b5 search">
            <div class="col col-2">
                <input type="date" class="datepicker form-control from-date">
            </div>
            <div class="col col-2">
                <input type="date" class="datepicker form-control to-date">
            </div>
            <div class="col col-2">
                <input type="text" class="form-control text-search">
            </div>
            <div class="col col-1">
                <input type="number" class=" form-control line-nuber">
            </div>
            <div class="col col-1">
                <input type="number" class=" form-control total-record c_blue bold text-center" value="0" disabled="true">
            </div>
            <div class="col col-1">
                <button class="btn btn-sm btn-default btn-excell">Excel export </button>
            </div>
            <!--<div class="col col-1">
                <button class="btn btn-sm btn-default btn-pdf">PDF export </button>
            </div>-->
            <div class="col col-2">
                <button class="btn btn-sm btn-primary btn-search-delivery btn-search">Search </button>
            </div>
        </div>
        <div class="table-responsive-lg col-12">
            <table class="table table-bordered report m-0 t-normal" id="tbl-order-delivery">
                <thead>
                <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Delivery date</th>
                    <th>Customer</th>
                    <th>Depot</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Container</th>
                    <th>Driver</th>
                    <th>Cost</th>
                    <th>Invoice</th>
                    <th>Paid</th>
                    <th></th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div class="col-12 m-t15">
            <ul id="pagination_tbl-order-delivery" class="pagination-sm"></ul>
        </div>
    </fieldset>

    <fieldset class="fs m-t10 m-b25 order-content task-close" style="display:none">
        <input type="hidden" class="status-filter" value="CLOSED">
        <legend>CLOSED</legend>
        <div class="row m-b5">
            <div class="col col-2">From date</div>
            <div class="col col-2">To date</div>
            <div class="col col-2">Text search</div>
            <div class="col col-1">Line show</div>
            <div class="col col-1">Records</div>
        </div>
        <div class="row m-b5 search">
            <div class="col col-2">
                <input type="date" class="datepicker form-control from-date">
            </div>
            <div class="col col-2">
                <input type="date" class="datepicker form-control to-date">
            </div>
            <div class="col col-2">
                <input type="text" class="form-control text-search">
            </div>
            <div class="col col-1">
                <input type="number" class=" form-control line-nuber">
            </div>
            <div class="col col-1">
                <input type="number" class=" form-control total-record c_blue bold text-center" value="0" disabled="true">
            </div>
            <div class="col col-1">
                <button class="btn btn-sm btn-default btn-excell">Excel
                    export </button>
            </div>
            <!--<div class="col col-1">
                <button class="btn btn-sm btn-default btn-pdf">PDF export </button>
            </div>-->
            <div class="col col-2">
                <button class="btn btn-sm btn-primary btn-search-close btn-search">Search </button>
            </div>
        </div>
        <div class="table-responsive-lg col-12">
            <table class="table table-bordered report m-0 t-normal" id="tbl-order-close">
                <thead>
                <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Delivery date</th>
                    <th>Customer</th>
                    <th>Depot</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Container</th>
                    <th>Driver</th>
                    <th>Cost</th>
                    <th>Invoice</th>
                    <th>Paid</th>
                    <th></th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div class="col-12 m-t15">
            <ul id="pagination_tbl-order-close" class="pagination-sm"></ul>
        </div>
    </fieldset>
</div>
	<!-- end row -->
</section>
<!-- end widget grid -->
<script src="<?= ASSETS_URL ?>/js/jquery.twbsPagination.js" type="text/javascript"></script>
<script src="<?php echo ASSETS_URL; ?>/js/script/report/order_report.js"></script>