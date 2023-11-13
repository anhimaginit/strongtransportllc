<?php

require_once 'inc/init.php';

$_typesearch = "rateshipping";
include('search_message.php');
?>
<section id="widget-grid" class="">
	<div class="row">
		<!-- NEW WIDGET START -->
		<article class="col-sm-12 col-md-12 col-lg-12">

			<!-- Widget ID (each widget will need unique ID)-->
			<div class="jarviswidget" data-widget-editbutton="true">
				<header>
					<h2><i class="fa fa-table"></i> Rate Shipping list </h2>
					<?php if (canAddForm('ContactForm')) { ?>
						<a href="./#ajax/rateshipping-form.php" class="btn btn-primary pull-right"><i class="fa fa-plus"></i> Create New Rate Shipping</a>
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
						<table id="table_rateshipping" class="table table-responsive table-striped table-bordered table-hover" width="100%">
							<thead>
								<tr>
									<th style="width:10%;" class="hasinput"><input type="text" class="form-control" placeholder="Filter ID"></th>
									<th class="hasinput"><input type="text" class="form-control" placeholder="Filter Company Name"></th>
									<th class="hasinput"> <input type="text" class="form-control" placeholder="Filter Depot Name"> </th>
									<th class="hasinput"> <input type="text" class="form-control" placeholder="Filter Rate Mile"> </th>
									<th class="hasinput"> <input type="text" class="form-control" placeholder="Filter Rate Cost"> </th>
								</tr>
								<tr>
									<th>Rate Shipping ID</th>
									<th class="col-md-2">Company Name</th>
									<th class="col-md-2">Depot Name</th>
									<th class="col-md-2">Rate Mile</th>
									<th class="col-md-2">Rate Cost</th>
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
<script src="<?php echo ASSETS_URL; ?>/js/script/rateshipping/rateshipping-list.js"></script>