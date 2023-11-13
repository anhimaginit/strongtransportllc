<!-- Modal center Large -->
<div class="modal fade" id="calendar-modal"  tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header diaglog-modal-title ">
                <h5 class="modal-title"><strong>SHIPPING INFO</strong></h5>
                <button type="button" class="close diaglog-close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><i class="fa fa-times"></i></span>
                </button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="date-click" value="">
                <!---->
                <div class="p30-lr m-t10">
                    <div class="row m-t10 m-b10 p-r15">
                        <input class="form-control" id="text-search" type="text" placeholder="Search">
                        <div id="btn-search" class="btn_search middle-text" >
                            <i class="fa fa-search f-z20 c-orange"></i>
                        </div>
                    </div>
                    <div class="row m-t10 m-b25">
                        <div class="table-responsive-lg col-12">
                            <table class="table table-bordered m-0 t-normal" id="tbl-task-in_calendar">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Depot info</th>
                                    <th>Customer info</th>
                                    <th>Container info</th>
                                    <th>Driver</th>
                                    <th style="width: 25px"></th>
                                </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <div class="col-12 m-t15">
                            <ul id="pagination_task_in_date" class="pagination-sm"></ul>
                        </div>
                    </div>
                </div>
                <!---->
            </div>

        </div>
    </div>
</div>


