<!-- Modal success -->
<div class="modal fade" z-index=1000 id="modal-success" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Save success</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><i class="fa fa-times"></i></span>
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Modal error -->
<div class="modal fade" id="modal-error" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" style="padding-left: 10px" id="err-message"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><i class="fa fa-times"></i></span>
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Modal accept -->
<div class="modal fade" z-index=1000 id="modal-is-accept" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
        <div class="modal-content">

            <div class="modal-body" style="min-height: 120px">
                <div class="col col-12 padding_rl m-t10 m-b10">
                    <span class="color-blue">Container delivery date is
                        <span id="existing-date"></span>Do you want change to
                    </span>
                    <span id="date-change-by" class="c_err"> </span> ?
                </div>
                <div class="row m-t15 m-b10">
                    <div class="col col-12 display-content-center">
                        <button class="btn btn-primary" style="width: 50px; margin-right: 10px" data-dismiss="modal">Yes</button>
                        <button class="btn btn-sm btn-default" id="btn-accept-no" style="width: 50px" >No</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
