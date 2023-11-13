<?php

require_once 'inc/init.php';

$_typesearch = "containertype";
include('search_message.php');
?>
<section id="widget-grid" class="">
    <div class="row">
        <!-- NEW WIDGET START -->
        <article class="col-sm-12 col-md-12 col-lg-12">

            <!-- Widget ID (each widget will need unique ID)-->
            <div class="jarviswidget" data-widget-editbutton="true">
                <!-- <section><a href="./contact-form.php" class="btn btn-default"><i class="fa fa-2x fa-plus text-primary"></i></a></section> -->
                <header>
                    <h2><i class="fa fa-table"></i> Container Type List </h2>
                    <?php if (canAddForm('ContactForm')) { ?>
                        <a href="./#ajax/containertype-form.php" class="btn btn-primary pull-right"><i
                                class="fa fa-plus"></i> Create New Container Type</a>
                    <?php } ?>
                </header>
                <div>
                    <!-- widget edit box -->


                    <div class="jarviswidget-editbox">
                        <!-- This area used as dropdown edit box -->
                    </div>
                    <!-- end widget edit box -->

                    <!-- widget content -->
                    <div class="widget-body">
                        <?php $event = 'search';
                        include('search-table.php'); ?>
                        <table id="table_containertype"
                            class="table table-responsive table-striped table-bordered table-hover" width="100%">
                            <thead>
                                <tr>
                                    <th style="width:20%;"></th>
                                    <th class="hasinput"><input type="text" class="form-control"
                                            placeholder="Filter Name"></th>
                                </tr>
                                <tr>
                                    <th class="col-md-1">Container Type ID</th>
                                    <th class="col-md-2">Container Type Name</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <div class="text-right">
                            <ul class="pagination"></ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end widget -->

        </article>
    </div>
</section>
<!-- PAGE RELATED PLUGIN(S) -->
<script src="<?php echo ASSETS_URL; ?>/js/script/containertype/containertype-list.js"></script>