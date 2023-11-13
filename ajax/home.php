<?php //require_once 'inc/init.php'; ?>
<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
<script src="<?php echo ASSETS_URL; ?>/js/script/distance_matrix/depots.js"></script>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap"
      rel="stylesheet">

<link rel="stylesheet" href="<?= ASSETS_URL ?>/css/distance_matrix_style.css">

<section id="widget-grid" >
    <div class="jarviswidget">
        <header>
            <h2>Home </h2>
        </header>
        <div class="widget-body" id="customer-order" style="min-height: 500px">
            <div class="row">
                <div class="col-md-3">
                    <div class="form-group">
                        <label>Zip code</label>
                        <input type="text" class="form-control" id="search-depot-zip">
                    </div>

                    <div class="form-group">
                        <label>Customer Email</label>
                        <input type="text" class="form-control" id="customer-email">
                    </div>

                </div>
                <div class="col-md-9">
                    <div class="col-md-12 text-center">
                        <strong>Container Information</strong>
                    </div>
                    <div class="col-md-12 text-center" style="margin-top: 5px">
                        <table id="depot-tbl" class="table table-responsive  table-bordered no-footer">
                            <thead>
                                <tr>
                                    <td>Container type</td>
                                    <td>Shipping Price</td>
                                    <td style="width: 30px">Quality</td>
                                    <td>Total</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <div class="col-md-12">
                            <button class="btn btn-danger" id="btn-quote">Quote</button>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <!--
                        <div id="container">
                            <div id="map"></div>
                            <div id="sidebar">
                                <h3 style="flex-grow: 0">Request</h3>
                                <pre style="flex-grow: 1" id="request"></pre>
                                <h3 style="flex-grow: 0">Response</h3>
                                <pre style="flex-grow: 1" id="response"></pre>
                            </div>
                        </div>


                          The `defer` attribute causes the callback to execute after the full HTML
                          document has been parsed. For non-blocking uses, avoiding race conditions,
                          and consistent behavior across browsers, consider loading using Promises.
                          See https://developers.google.com/maps/documentation/javascript/load-maps-js-api
                          for more information.
                          <div id="map"></div>
                          -->

                        <script
                            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqqFUPT6qHW2hvTEfwLw6IaXs253qrlmU&v=weekly"
                            defer >
                        </script>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>

