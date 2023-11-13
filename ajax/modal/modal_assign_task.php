<!-- Modal center Large -->
<div class="modal fade" id="assign-task-modal"  tabindex="-1" role="dialog"  aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header diaglog-modal-title">
                <h5 class="modal-title"><strong>Assign task to driver</strong></h5>
                <button type="button" class="close diaglog-close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><i class="fa fa-times"></i></span>
                </button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="selected-date">
                <!---->
                <div class="p-lr m-t10">
                    <div class="row m-b10">
                        <div class="col col-12 padding_rl">Assign task(*) <span id="task-err" class="error" style="display: none">Task is required</span></div>
                        <div class="col col-12 padding_rl m-t3 width100">
                            <select class="form-control"  id="task-id"></select>
                        </div>
                    </div>
                </div>
                 <div class="p-lr">
                    <div class="row m-b10">
                        <div class="col col-12 padding_rl">Assign driver(*)<a id="driver_link" class="pointer"></a> <span id="driver-err" class="error" style="display: none">Driver is required</span></div>
                        <div class="col col-12 padding_rl m-t3">
                            <select class="form-control" id="driver-id"></select>
                        </div>
                    </div>
                </div>
                <div class="p-lr">
                   <div class="row m-b10">
                       <div class="col col-6">
                           <div class=" col-12 padding_rl">Delivery date(*)  <span id="delivery-date-err" class="error" style="display: none">Delivery date is required</span></div>
                           <div class=" col-12 padding_rl m-t3">
                               <input type="date" class="datepicker form-control" id="delivery-date">
                           </div>
                       </div>
                       <div class="col col-6">
                           <div class=" col-12 padding_rl">Time</div>
                           <div class=" col-12 padding_rl m-t3">
                               <input type="time" class="timepicker form-control" id="delivery-time">
                           </div>
                       </div>
                   </div>
               </div>
                <footer class="m-t15">
                    <button class="btn btn-sm btn-primary" id="btn-submit">Submit</button>
                    <button class="btn btn-sm btn-default" data-dismiss="modal">Close</button>
                </footer>
                <!---->
            </div>

        </div>
    </div>
</div>


