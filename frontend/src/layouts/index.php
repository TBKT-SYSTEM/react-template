@ -1,1696 +0,0 @@
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css">

<style>
.btn-group-sm>.btn,
.btn-sm {
    padding: 0.55rem 0.9rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 5px;
}

.btn-outline-danger {
    color: #ffffff;
    border-color: #ff4f7000;
}

.btn-outline-info {

    color: #ffffff;
    border-color: #ffffff00;
}

.btn-danger {
    color: #fff;
    background-color: #ff4f70;
    border-color: #ff4f70;
    border-radius: 5px;
}

.modal-title,
.popover,
.tooltip {
    line-height: 0.5;
}

.h4,
h4 {
    font-size: 2.125rem;
}

.bg-warning {
    background-color: #ffffff !important;
}

.modal-colored-header {
    color: #000;
    border-radius: 0;
}

.d-flex-button button {
    margin-right: 5px;
    border-radius: 5px;
}

.btn-rounded {
    border-radius: 10px !important;
}

/* .card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    height: 224px;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid #e9ecef;
    border-radius: 0.25rem;
} */

.custom-select {
    display: inline-block;
    width: 100%;
    height: calc(2em + 0.75rem + 2px);
    padding: 0.375rem 1.75rem 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #3b3b3b;
    vertical-align: middle;
    border: 1px solid #e9ecef;
    border-radius: 5px;
    appearance: none;
}

/* @media (min-width: 576px) {
    .modal-dialog {
        max-width: 85%;
        margin: 1.75rem auto;
    }
} */

.h5,
h5 {
    font-size: 1.4rem;
    color: #222222;
}

.modal .buttons button {
    display: inline-block;
    text-decoration: none;
    padding: 10px 20px;
    background: #eeeeee00;
    border: 1px solid #17b978;
    color: #17b978;
    border-radius: 6px;
    font-size: 16px;
    transition: all 0.3s;
}

/* .modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    display: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
    background: #0000004f;
} */

/* .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 5px;
    outline: 0;
} */

.button1 {
    outline: none;
    height: 32px;
    text-align: center;
    width: 45px;
    border-radius: 5px;
    background: #1d8485;
    border: 2px solid #1d8485;
    color: #fdfdfd;
    letter-spacing: 1px;
    text-shadow: 0;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.25s ease;
}

#button1:hover {
    color: white;
    background: #1f8666;
    border: 2px solid #1f8666;
}

#button1:active {
    letter-spacing: 2px;
}

#button1:after {
    content: "";
}

#button-1:hover {
    color: white !important;
    background: #2196f3;
}

#button-1:active {
    letter-spacing: 2px;
}

#button-1:after {
    content: "";
}

.card-body {
    flex: 1 1 auto;
    padding: 15px;
}

.row {
    display: flex;
    flex-wrap: wrap;
    margin-left: -15px;
    margin-right: 0px;
}

table.dataTable tbody th,
table.dataTable tbody td {
    padding: 7px 10px;
    vertical-align: revert;
    text-align: center;
    font-size: 14px;
    color: #5d5c5c;
}

.page-wrapper {
    background: #f7f7f7;
    position: relative;
    display: none;
    box-shadow: 0 3px 9px 0 rgba(162, 176, 190, .15);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.page-breadcrumb {
    padding: 30px 35px 0;
    height: 54px;
    background: white;
    border-bottom: 1px solid #1919191c;
}

.btn-primary {
    border-radius: 5px;
    color: #fff;
    background-color: #24898a;
    border-color: #24898a;
}

@media (min-width: 992px) {
    .col-lg-4 {
        flex: 0 34.33333%;
        max-width: 40.33333%;
        /* margin: 30px; */
    }

    .col-lg-7 {
        flex: 0 0 64.33333%;
        max-width: 64.33333%;
    }

    .col-lg-6 {
        flex: 0 0 66%;
        max-width: 66%;
        margin: 30px 19px 10px -25px;
    }
}

.form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 1.75rem 0.375rem 0.75rem;
    font-size: 1rem;
    /* padding: 23px 12px; */
    line-height: 1.5;
    color: #4F5467;
    background-color: #fff;
    background-clip: padding-box;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
</style>
<div class="page-wrapper">
    <div class="page-breadcrumb" style="height: 77px;">
        <div class="row">
            <div class="col-12 align-self-center">
                <h3 style="margin-top: -15px;" class="page-title text-truncate text-dark font-weight-medium mb-1">DEFECT
                    CONFIRMATION</h3>
                <div class="d-flex align-items-center">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0 p-0">
                            <li class="breadcrumb-item">Defect data from FA System</a>
                            </li>
                        </ol>
                    </nav>
                </div>

            </div>
        </div>
    </div>
    <?php if ($this->session->flashdata('msgError') != ''){ echo $this->session->flashdata('msgError'); } ?>
    <?php if ($this->session->flashdata('msgResponse') != ''){ echo $this->session->flashdata('msgResponse'); } ?>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 13px 14px 10px 31px;">
            <div class="card" style="padding: 10px;">
                <div class="card-body">
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="form-date__label" for="input-date"
                                style="font-weight: 500;">Production</label>
                            <select class="custom-select mb-3" style="width:100%;" name="str_pd" id="str_pd">
                                <!-- <option value disable selected>-- Select Menu Group --</option> -->
                                <option value="" disabled="" selected="">Select Production</option>
								<option value="" selected="">All</option>
                                <?php foreach ($dataXX as $key => $slif){ ?>
                                <option value="<?php echo $slif['sec_name'];?>"> <?php echo $slif['sec_name'];?>
                                </option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <label class="form-date__label" for="input-date" style="font-weight: 500;">Line</label>
                            <select class="custom-select mb-3" style="width:100%;" name="str_line" id="str_line">
                                <!-- <option value disable selected>-- Select Menu Group --</option> -->
                                <option value="" disabled="" selected="">Select Line</option>
                                <!-- <?php foreach ($dataZZ as $key => $slitf){ ?>
                                <option value="<?php echo $slitf['line_cd'];?>"> <?php echo $slitf['line_cd'];?>
                                </option>
                                <?php } ?> -->
                            </select>
                        </div>
                        <div class="col-sm-4">
                            <label class="form-date__label" for="input-date" style="font-weight: 500;">Type</label>
                            <select class="custom-select mb-3" style="width:100%;" name="type" id="type">
                                <option value="" disabled="" selected="">Select Type</option>
                                <option value="1">NG</option>
                                <option value="2">NC</option>
                                
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="col-lg-12" id="showtable" style="margin-top:-25px;">
        <div class="card" style="height: 98%;">
            <div class="card-body">
				<button class="btn btn-info btnConfirmDefect mb-3 px-5 py-2"><i class="fa fa-check-square" aria-hidden="true"></i>&nbsp;&nbsp;Confirm <span>(0)</span></button>

                <div class="table-responsive"
                    style="border-top-right-radius: 6px;border-top-left-radius: 6px;width: 100%;">
                    <table class="table" id="multi_col_order">
                        <thead style="background-color: #5b739b" class=" text-white">
                            <tr>
                                <th>
                                    <input type="checkbox" name="chkAll">
                                </th>
								<th style="width: 85px;text-align:center;font-weight: 500;font-size:13px;">WI</th>
                                <th style="width: 85px;text-align:center;font-weight: 500;font-size:13px;">LINE CD</th>
                                <th style="text-align:center;font-weight: 500;font-size:13px;">ITEM CD</th>
                                <th style="width: 105px;text-align:center;font-weight: 500;font-size:13px;">ITEM TYPE
                                </th>
                                <th style="width: 115px;text-align:center;font-weight: 500;font-size:13px;">DATA TYPE
                                </th>
                                <th style="text-align:center;font-weight: 500;font-size:13px;">DEFECT CD</th>
                                <th style="text-align:center;font-weight: 500;font-size:13px;">LOT NO</th>
                                <th style="text-align:center;font-weight: 500;font-size:13px;">QTY</th>
                                <th style="text-align:center;font-weight: 500;font-size:13px;">ACTUAL DATE</th>
                                <th style="text-align:center;font-weight: 500;font-size:13px;">ACTION</th>
                            </tr>
                        </thead>
                        <tbody class="border border-rgb(161, 197, 255)">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
</div>
</div>
</div><!-- /.span -->
</div><!-- /.row -->
</div>




<div id="sel_def_exp" class="modal fade show" tabindex="-1" role="dialog" aria-labelledby="sel_def_expLabel"
    aria-modal="true">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header modal-colored-header bg-primary d-flex align-items-center">
                <h5 class="modal-title text-white" id="sel_def_expLabel">Select DEF Code
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table class="table table-hover table-style no-margin-bottom no-border-top" id="table27">
                    <thead>
                        <tr>
                            <th style="text-align:center;" width="15%">Select</th>
                            <th style="text-align:center;" width="25%">DEF Code</th>
                            <th style="text-align:center;" width="30%">DEF Name EN</th>
                            <th style="text-align:center;" width="30%">DEF Name TH</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-success" onclick="selDefexp()">Submit</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog " aria-labelledby="warning-header-modalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content p-2">

            <div class="modal-header modal-colored-header">
                <h4 class="modal-title" id="warning-header-modalLabel">Edit Defect
                </h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="clearDefect()">×</button>
            </div>

            <div class="modal-body">
                <form action="SubmitEdit" id="formEditGroup">
                    <div class="row">
                        <div class="col-12">

                            <div class="row">
                                <div class="col-md-7 col-12">
                                    <div class="card h-100 border rounded">
                                        <div class="card-body">
                                            <h5 class="mb-2 me-2">Details</h5>
                                            <div class="d-flex flex-wrap gap-2 mb-4 mt-2">
                                                <div class="d-flex flex-column w-50 me-2">
                                                    <div class="text-muted text-nowrap d-block mb-2">WI</div>
                                                    <div class="mb-0 wi"></div>
                                                </div>
                                                <div class="d-flex flex-column">
                                                    <div class="text-muted text-nowrap d-block mb-2">Production Actual</div>
                                                    <div class="mb-0 actual"></div>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-wrap gap-2 mb-4 mt-2">
                                                <div class="d-flex flex-column w-50 me-2">
                                                    <div class="text-muted text-nowrap d-block mb-2">Seq Number</div>
                                                    <div class="mb-0 seq_no"></div>
                                                </div>
                                                <div class="d-flex flex-column w-50 me-2">
                                                    <div class="text-muted text-nowrap d-block mb-2">Line Code</div>
                                                    <div class="mb-0 line_code"></div>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-wrap gap-2 mb-4 mt-2">
                                                <div class="d-flex flex-column w-50 me-2">
                                                    <div class="text-muted text-nowrap d-block mb-2">Item Code</div>
                                                    <div class="mb-0 item_code"></div>
                                                </div>
                                                <div class="d-flex flex-column w-50 me-2">
                                                    <div class="text-muted text-nowrap d-block mb-2">Lot Number</div>
                                                    <div class="mb-0 lot_number"></div>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-wrap gap-2 mb-4 mt-2">
                                                <div class="d-flex flex-column w-50 me-2">
                                                    <div class="text-muted text-nowrap d-block mb-2">Type</div>
                                                    <div class="mb-0 defect_type"></div>
                                                </div>
                                                <div class="d-flex flex-column w-50 me-2">
                                                    <div class="text-muted text-nowrap d-block mb-2">Supplier</div>
                                                    <div class="mb-0 supplier"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-5 col-12">
                                    <div class="card h-100 border rounded">
                                        <div class="card-body">
                                            <h5 class="mb-2 me-2">Adjusts <span class="maximum-adjust small text-danger"></span></h5>
                                            <div class="form-group">
                                                <div class="profile-info-name">Defect Code</div>
                                                <div class="row">
                                                    <div class="col-9 col-sm-9 col-md-9">
                                                        <input type="text" name="da_code" id="da_code" class="form-control" value="" autocomplete="off" />
                                                    </div>
                                                    <div class="col-3 col-sm-3 col-md-3 px-0">
                                                        <button type="button" class="btn btn-danger waves-effect waves-light w-100" id="search_def" name="search_def" onclick="searchDEF()"><i class="fas fa-search"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="profile-info-name">NG</div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <input type="number" name="ng_id" id="ng_id" class="form-control" value="" min="0" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="profile-info-name">NC</div>
                                                <div class="row">
                                                    <div class="col-12">
                                                        <input type="number" name="nc_id" id="nc_id" class="form-control" value="" min="0" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group good_qty_wrapper">
                                                <div class="profile-info-name">GOOD</div>

                                                <input type="number" name="good_qty" id="good_qty" class="form-control" value="0" min="0" readonly />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="fg_wi">
                    <input type="hidden" name="fg_part_no">
                    <input type="hidden" name="fg_part_name">
                    <input type="hidden" name="fg_model">
                    <input type="hidden" name="fg_next_process">
                    <input type="hidden" name="fg_location">
                    <input type="hidden" name="fg_shift">
                    <input type="hidden" name="fg_pro_seq">
                    <input type="hidden" name="fg_actual_date">
                    <input type="hidden" name="fg_plant">
                    <input type="hidden" name="fg_line">
                    <input type="hidden" name="fg_plan_date">
                    <input type="hidden" name="fg_lot">
                    <input type="hidden" name="fg_qr">
                    <input type="hidden" name="da_id" />
                    <input type="hidden" name="da_wi_no" id="da_wi_no" />
                    <input type="hidden" name="da_line_cd" id="da_line_cd" />
                    <input type="hidden" name="da_item_cd" id="da_item_cd" />
                    <input type="hidden" name="da_lot_no" id="da_lot_no" />
                    <input type="hidden" name="dts_source_cd" id="dts_source_cd" />

                </form>

                <form action="SubmitEdit" id="formEditGroup2" class="d-none">
                    <div class="row">
                        <div class="col-6">

                            <div class="card">
                                <div class="card-body">

                                    <div class="form-group">
                                        <div class="profile-info-name">WI</div>

                                        <input type="text" name="da_wi_no" id="da_wi_no" class="form-control" readonly />

                                        <input type="hidden" name="da_id" class="form-control" readonly />
                                    </div>
                                    <div class="form-group">
                                        <div class="profile-info-name">Production Actual</div>

                                        <input type="text" name="pro_act" id="pro_act" class="form-control" readonly />
                                    </div>
                                    <div class="form-group">
                                        <div class="profile-info-name">Seq No.</div>

                                        <input type="text" name="pro_seq" id="pro_seq" class="form-control" readonly />
                                    </div>
                                    <div class="form-group">
                                        <div class="profile-info-name">Line CD</div>

                                        <input type="text" name="da_line_cd" id="da_line_cd" class="form-control" value="" readonly />
                                    </div>

                                    <div class="form-group">
                                        <div class="profile-info-name">Item Code</div>

                                        <input name="da_item_cd" id="da_item_cd" class="form-control" type="text" value="" readonly />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-md-6">

                            <div class="card">
                                <div class="card-body">
                                    <div class="form-group">
                                        <div class="profile-info-name">LOT No.</div>

                                        <input type="text" name="da_lot_no" id="da_lot_no" class="form-control" value="" readonly />
                                    </div>


                                    <div class="form-group">
                                        <div class="profile-info-name">Type</div>

                                        <input type="text" name="da_type" id="da_type" class="form-control" value="" readonly />
                                    </div>
                                    <div class="form-group">
                                        <div class="profile-info-name">Defect Code</div>
                                        <div class="row">
                                            <div class="col-9 col-sm-9 col-md-9">
                                                <input type="text" name="da_code" id="da_code" class="form-control" value="" />
                                            </div>
                                            <div class="col-3 col-sm-3 col-md-3 px-0">
                                                <button type="button" class="btn btn-danger waves-effect waves-light w-100" id="search_def" name="search_def" onclick="searchDEF()"><i class="fas fa-search"></i> Seach</button>
                                            </div>
                                        </div>
                                        <!-- <div class="row">
										
										</div> -->
                                    </div>

                                    <div class="form-group">
                                        <div class="profile-info-name">NG</div>

                                        <input type="number" name="ng_id" id="ng_id" class="form-control" value="" min="0" />
                                    </div>
                                    <div class="form-group">
                                        <div class="profile-info-name">NC</div>

                                        <input type="number" name="nc_id" id="nc_id" class="form-control" value="" min="0" />
                                    </div>
                                    <div class="form-group good_qty_wrapper">
                                        <div class="profile-info-name">GOOD</div>

                                        <input type="number" name="good_qty" id="good_qty" class="form-control" value="0" min="0" />
                                    </div>
                                    <input type="hidden" name="action" value="<?php echo base64_encode('SubmitEdit'); ?>">
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="fg_wi">
                    <input type="hidden" name="fg_part_no">
                    <input type="hidden" name="fg_part_name">
                    <input type="hidden" name="fg_model">
                    <input type="hidden" name="fg_next_process">
                    <input type="hidden" name="fg_location">
                    <input type="hidden" name="fg_shift">
                    <input type="hidden" name="fg_pro_seq">
                    <input type="hidden" name="fg_actual_date">
                    <input type="hidden" name="fg_plant">
                    <input type="hidden" name="fg_line">
                    <input type="hidden" name="fg_plan_date">
                    <input type="hidden" name="fg_lot">
                    <input type="hidden" name="fg_qr">
                </form>


            </div>



            <!-- Modal footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-light pull-right" data-dismiss="modal">Cancel</button>
                <button class="btn btn-sm btn-success pull-right" name="selitem" id="selitem" onclick="Submitedit22()">
                    <i class="ace-icon glyphicon glyphicon-ok"></i>
                    Confirm
                </button>
            </div>
        </div>
    </div>
</div>
<script>
    let globalData = {}

    $(document).ready(function() {

        setTimeout(() => {
            $('.loader-container').fadeOut();
        }, 1500);

        defectConfirm.init();
        list_table('', '')
        $('select[id="str_pd"]').on('change', function() {
            getLineMaster();
        });


        $('#sel_def_exp').on('hidden.bs.modal', (e) => {
            $('#myModal').modal('show');
        })

        $(document).on('click', 'input[name="chkAll"]', () => {
            let numConfirm = 0;
            $('table#multi_col_order').DataTable().rows().nodes().to$().each((i, e) => {
                const input = $(e).find('td:eq(0) input');

                if ($('input[name="chkAll"]').is(':checked')) {
                    input.prop('checked', true)
                    numConfirm++;
                } else {
                    input.prop('checked', false)
                }
            })
            $('.btnConfirmDefect span').html(`(${numConfirm})`)
        })

        $(document).on('click', '.checkConfirm', (e) => {
            var checkedCount = $('.checkConfirm:checked').length;
            $('.btnConfirmDefect span').html(`(${checkedCount})`)

        })

        $('.btnConfirmDefect').click(() => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#56c898',
                cancelButtonColor: '#dd6a6a',
                confirmButtonText: 'Yes, Confirm it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    checkConfirmDefect();
                }
            })
        })
    });

    async function checkConfirmDefect() {
        let data = [];

        $('table#multi_col_order').DataTable().rows().nodes().to$().each((i, e) => {
            const input = $(e).find('td:eq(0) input');

            if ($(input).is(':checked')) {
                let id = $(input).attr('data-id');
                let qty = $(input).attr('data-qty');
                let supplier = $(input).attr('data-supplier');
                data.push({
                    id: id,
                    qty: qty,
                    supplier: supplier ?? null,
                });
            }
        })


        if (data.length > 0) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '<?php echo base_url() ?>Defect/confirmDefectMultiple',
                data: {
                    data: data,
                },
                success: function(data) {
                    if (data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            html: 'Confirm successfully!'
                        })

                        $('#multi_col_order').DataTable().ajax.reload(null, true);
                    }
                }
            })
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Warning!',
                html: 'Please select at least 1 row'
            })
        }
    }

    function getLineMaster() {
        console.log(1);
        var dep_cd = $('#str_pd').val();
        if (dep_cd) {
            $.ajax({
                type: "POST",
                url: "<?php echo base_url(); ?>defect/line_selectd_edit",
                data: {
                    data: dep_cd
                },
                cache: false,

                success: function(data) {
                    console.log(data);
                    $('select[id="str_line"]').empty();
                    let html = '<option disabled selected>Select Insert Line</option>';
                    $.each(data, function(key, value) {
                        //alert(value);							
                        html += '<option value = "' + value.line_cd + '"> ' + value
                            .line_cd + ' </option>';
                    });
                    $('#str_line').html(html);
                }
            });
        } else {
            let html = '<option disabled selected>Select Insert Line</option>';
            $('#str_line').html(html);

            // $('select[id="str_line"]').empty();
        }
    }
</script>
<script type="text/javascript">
function alegt_edit(uid, da_type, da_item_type, qty) {
        // alert(uid)

        globalData.limitQty = 0
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: "<?php echo base_url() ?>.Defect/editconfirm/",
            data: {
                uid: uid,
                da_type: da_type,
                da_item_type: da_item_type,
                da_qty: qty,
                action: "<?php echo base64_encode('editDefectt'); ?>"
            },
            success: function(data) {
                if (data.length > 0) {
                    let val = data[0];
                    var Pro_Act = 0
                    // alert("")
                    Pro_Act = val.act_qty ?? 0
                    if (val.da_item_type == "1") {
                        Pro_Act = val.act_qty
                        $('#good_qty').val("0");
                        $('.good_qty_wrapper').show();

                        $('input[name="fg_wi"]').val(val.WI);
                        $('input[name="fg_part_no"]').val(val.ITEM_CD);
                        $('input[name="fg_part_name"]').val(val.ITEM_NAME);
                        $('input[name="fg_model"]').val(val.MODEL);
                        $('input[name="fg_next_process"]').val(val.next_proc);
                        $('input[name="fg_location"]').val(val.LOCATION_PART);
                        $('input[name="fg_shift"]').val(val.shift_prd);
                        $('input[name="fg_pro_seq"]').val(val.seq_no);
                        $('input[name="fg_actual_date"]').val(val.da_actual_date);
                        $('input[name="fg_plant"]').val(val.PLANT);
                        $('input[name="fg_line"]').val(val.LINE_CD);
                        $('input[name="fg_plan_date"]').val(val.WORK_ODR_DLV_DATE);
                        $('input[name="fg_lot"]').val(val.lot_no);
                        $('input[name="fg_qr"]').val(val.qr_detail);

                        $('#formEditGroup .wi').html(val.WI ?? '-');
                        $('#formEditGroup .seq_no').html(val.seq_no ?? '-');
                        $('#formEditGroup .line_code').html(val.LINE_CD ?? '-');
                        $('#formEditGroup .item_code').html(val.ITEM_CD ?? '-');
                        $('#formEditGroup .lot_number').html(val.lot_no ?? '-');
                        $('#formEditGroup .supplier').html(val.dts_source_cd ?? '-');
                        
                    } else {
                        console.log(val);
                        $('#good_qty').val("0");
                        $('.good_qty_wrapper').hide();
                        $('input[name="dts_source_cd"]').val(val.dts_source_cd);
                        // Pro_Act = 999

                        $('#formEditGroup .wi').html(val.da_wi_no ?? '-');
                        $('#formEditGroup .seq_no').html(val.seq_no ?? '-');
                        $('#formEditGroup .line_code').html(val.da_line_cd ?? '-');
                        $('#formEditGroup .item_code').html(val.da_item_cd ?? '-');
                        $('#formEditGroup .lot_number').html(val.lot_no ?? '-');
                        $('#formEditGroup .supplier').html(val.dts_source_cd ?? '-');

                        $('input[name="fg_wi"]').val(val.da_wi_no);
                        $('input[name="fg_part_no"]').val(val.da_item_cd);
                        $('input[name="fg_part_name"]').val(val.ITEM_NAME);
                        $('input[name="fg_model"]').val(val.MODEL);
                        $('input[name="fg_next_process"]').val(val.next_proc);
                        $('input[name="fg_location"]').val(val.LOCATION_PART);
                        $('input[name="fg_shift"]').val(val.shift_prd);
                        $('input[name="fg_pro_seq"]').val(val.seq_no);
                        $('input[name="fg_actual_date"]').val(val.da_actual_date);
                        $('input[name="fg_plant"]').val(val.PLANT);
                        $('input[name="fg_line"]').val(val.da_line_cd);
                        $('input[name="fg_plan_date"]').val(val.WORK_ODR_DLV_DATE);
                        $('input[name="fg_lot"]').val(val.lot_no);
                        $('input[name="fg_qr"]').val(val.qr_detail);

                        
                    }

                   

                    $('#pro_act').val(Pro_Act)
                    $('#formEditGroup .actual').html(Pro_Act ?? '-');

                    $('input[name=da_id]').val(uid)


                    $('input[name=da_id]').val(uid)
                    $('#pro_seq').val(val.da_seq_no ?? '-')
                    $('#da_wi_no').val(val.da_wi_no ?? '-')
                    $('#da_line_cd').val(val.da_line_cd ?? '-')
                    $('#da_item_type').val(val.da_item_type ?? '-')
                    $('#da_item_cd').val(val.da_item_cd ?? '-')
                    // $('#da_type').val(val.da_type)
                    $('#da_lot_no').val(val.da_lot_no ?? '-')
                    $('#da_code').val(val.da_code ?? '-')
                    $('#good_qty').val(0);
                    // let qty = val.da_item_type == 2 && val.da_code.startsWith("0") ? val.dts_qty : val.da_qty;
                    let qty = val.da_qty;

                    if (val.da_type == 1) {
                        $('#da_type').val('NG')
                        $('#formEditGroup .defect_type').html('NG');
                        $('#ng_id').val(qty)
                        $('#nc_id').val('0')


                    } else {
                        $('#da_type').val('NC')
                        $('#formEditGroup .defect_type').html('NC');
                        $('#nc_id').val(qty)
                        $('#ng_id').val('0')
                    }

                    globalData.limitQty = qty

                    $('.maximum-adjust').html(`(Maximum ${qty} ${qty > 1 ? 'items' : 'item'})`);

                    $('#ng_id, #nc_id').attr('max', qty)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        html: 'Data not found!',
                        timer: 1500
                    }).then(() => {
                        $('#myModal').modal('hide')
                    })
                }

            },

            error: function(data) {
                console.log(data);
                alert('Ajax failed');
            }
        });

        $('#myModal').modal('show')
    }
$('#str_pd, #str_line, #type').on('change', function() {
    $('#multi_col_order').dataTable().fnDestroy()
    let getPD = $('#str_pd').val();
    let getLine = $('#str_line').val();
    let type = $('#type').val();
    list_table(getPD, getLine, type);
});

$("ng_id").attr({
    "max": 10,
    "min": 2
});

function list_table(str_pd, str_line, type) {
    // alert(str_pd);
    var DefectConfirmTable = $('#multi_col_order').DataTable({
        // alert(str_pd);
        ajax: {
            type: 'POST',
            dataType: 'json',
            url: '<?php echo base_url() ?>Defect/list',
            data: {
                str_pd: str_pd,
                str_line: str_line,
                type: type
            }
        },
		order: [],
        columns: [{
                    className: 'text-center',
                    data: null,
                    orderable: false,
                    "render": (data, type, row) => {
                        let qty = row.da_item_type == 2 && row.da_code.startsWith('0') ? row.dts_qty : row.da_qty;
                        return `<input type="checkbox" name="chkConfirm[]" class="checkConfirm" data-id="${row.da_id}" data-qty="${qty}" data-supplier="${row.dts_source_cd ?? ''}">`
                    }
                },
				{
                className: 'text-center',
                data: 'da_wi_no'
            },
            {
                className: 'text-center',
                data: 'da_line_cd'
            },
            {
                className: 'text-center',
                data: 'da_item_cd'
            },
            {
                className: 'text-center',
                data: 'da_item_type',
                title: 'Item Type',
                "render": function(data, type, row) {
                    if (type === 'display') {
                        if (row.da_item_type == 1) {

                            disp =
                                '<span style="background: #238599;" class="btn waves-effect waves-light btn-rounded btn-outline-danger">FG</span>';
                        } else {
                            disp =
                                '<span style="background: #5f76e8;"  class="btn waves-effect waves-light btn-rounded btn-outline-info">CP</span>';
                        }

                    }
                    return disp;
                }

            },


            {
                className: 'text-center',
                data: 'da_type',
                title: 'Type',
                "render": function(data, type, row) {
                    if (type === 'display') {
                        if (row.da_item_type == 2 && row.dts_source_cd != '' && row.da_code.slice(0, 1) == '0') {
                            disp = 50;
                        } else {
                            disp = 30;
                        }
                        // if (row.da_type == 1) {
                        //     disp =
                        //         '<span style="background-color: #dd6a6a;" class="btn waves-effect waves-light btn-rounded btn-outline-danger">NG</span>';
                        // } else {
                        //     disp =
                        //         '<span style="background-color: #e7a524;" class="btn waves-effect waves-light btn-rounded btn-outline-info">NC</span>';
                        // }

                    }
                    return disp;
                }

            },
            {
                className: 'text-center',
                data: 'da_code'
            },
            {
                className: 'text-center',
                data: 'da_lot_no'
            },
            {
                className: 'text-center',
                data: null,
                    "render": function(data, type, row) {
                        // if (row.da_item_type == 2 && row.da_code.startsWith('0') &&row?.dts_source_cd != '') {
                        //     return row?.dts_qty;
                        // }
                        return row.da_qty;
                    }
            },
            {
                className: 'text-center',
                data: 'da_actual_date'
            },
            {
                className: 'text-center',
                data: 'da_id',
                "render": function(data, type, row) {
                    // let qty = row.da_item_type == 2 && row.da_code.startsWith('0') && row?.dts_source_cd != '' ? row?.dts_qty : row.da_qty;
                    let qty = row.da_qty;
                    if (type === 'display') {
                        // disp = '<button class="btn btn-success" onclick="editModal(\''+row.spg_name+'\',\''+row.spg_id+'\')">Edit</button>';
                        disp = '<div class="d-flex-button">';
                        // disp += '<button type="button" style="background-color: #e7a523;height: 45px;" title="Edit Defect" class="btn waves-effect waves-light btn-outline-light" data-original-title="Edit" onclick="EditDefect(5)"><i class="fas fa-edit "></i></button>';

                        disp +=
                                '<button type="button" style="background-color: #e7a523;height:37px;" title="Edit Defect Before Confirm" class="btn waves-effect waves-light btn-outline-light" title="Detail Defect" onclick="alegt_edit(' +
                                row.da_id + ',' + row.da_type + ',' + row.da_item_type + ',' + qty + ')"  data-original-title="Detail" value=""  >Edit</button>';
                            disp +=
                            `<button type="button" style="height:37px;" title="Comfirm Defect" onclick="alert_comfirm(${row.da_id},${qty},'${row.dts_source_cd}')"  class="btn btn-success" data-original-title="Detail" value=""  >Confirm</button>`
                        disp +=
                            '<button type="button" style="height:37px;" title="Not Defect" style="" onclick="alert_Data(' +
                            row.da_id +
                            ')" class="btn waves-effect waves-light btn-danger" data-original-title="deleteDefect" >Cancel</i></button>';
                        disp += '</div>';
                    }
                    return disp;
                }
            }

        ]
    });

}

function Defect_detail(def_id) {
    // alert(def_id);
    // var txt_select = document.getElementById("def_id").value;
    // document.getElementById("mbd_cp").innerHTML = "";
    // alert(def_id);
    // var def_id='';
    $.ajax({
        type: "POST",
        dataType: 'json',
        url: "<?php echo base_url()?>.Defect/select_Defect",
        data: {
            def_id: def_id,
            action: 'defectdata'
        },
        success: function(data_dfdata) {
            console.log(data_dfdata);
            $.each(data_dfdata, function(key_dfdata, val_dfdata) {

                // $('input[name=def_id]').val(def_id)
                $('#wh_cd').val(val_dfdata.def_wh_cd)
                $('#item_cd').val(val_dfdata.def_item_cd1)
                $('#item_name').val(val_dfdata.def_item_name1)
                $('#spinner1').val(val_dfdata.def_qty1)
                // $('#item2_cd').val(val_dfdata.def_item_cd2)
                // $('#item2_name').val(val_dfdata.def_item_name2)
                // $('#spinner2').val(val_dfdata.def_qty2)
                $('#id-date-picker-1').val(val_dfdata.def_result_date)
                // $('#form-field-9').val(val_dfdata.def_note1)
                // $('#form-field-10').val(val_dfdata.def_note2)
                $('#def_cd').val(val_dfdata.def_cd)
                $('#vend_cd').val('No data')
                $('#vend_name').val('No data')
                $('#line_cd').val('No data')
                $('#line_name').val('No data')

                if (val_dfdata.item2_cd !== undefined) {
                    $('#item2_cd').val(val_dfdata.def_item_cd2)
                    $('#item2_name').val(val_dfdata.def_item_name2)
                    $('#spinner2').val(val_dfdata.def_qty2)
                } else {
                    $('#item2_cd').val('No data')
                    $('#item2_name').val('No data')
                    $('#spinner2').val('No data')
                }

                if (val_dfdata.def_note1 !== undefined) {
                    $('#form-field-9').val(val_dfdata.def_note1)
                } else {
                    $('#form-field-9').val('No Data')
                }

                if (val_dfdata.def_note2 !== undefined) {
                    $('#form-field-10').val(val_dfdata.def_note2)
                } else {
                    $('#form-field-10').val('No Data')
                }


                $.ajax({
                    type: "POST",
                    dataType: 'json',
                    url: "<?php echo base_url()?>.Defect/select_Defect",
                    data: {
                        def_id: def_id,
                        action: 'defectdis'
                    },

                    success: function(data_dfdis) {
                        console.log(data_dfdis);
                        $.each(data_dfdis, function(key_dfdis, val_dfdis) {
                            $('#mbd_cd').val(val_dfdis.mbd_name)
                        })
                    }
                })

                $.ajax({
                    type: "POST",
                    dataType: 'json',
                    url: "<?php echo base_url()?>.Defect/select_Defect",
                    data: {
                        def_id: def_id,
                        action: 'defectcp'
                    },

                    success: function(data_dfcp) {
                        console.log(data_dfcp);
                        $.each(data_dfcp, function(key_dfcp, val_dfcp) {
                            $('#mcp_cp').val(val_dfcp.mcp_name)
                        })
                    }
                })

                $.ajax({
                    type: "POST",
                    dataType: 'json',
                    url: "<?php echo base_url()?>.Defect/select_Defect",
                    data: {
                        def_id: def_id,
                        action: 'defectvend'
                    },

                    success: function(data_dfvend) {
                        console.log(data_dfvend);
                        $.each(data_dfvend, function(key_dfvend, val_dfvend) {

                            $('#vend_cd').val(val_dfvend.VEND_CD)
                            $('#vend_name').val(val_dfvend.VEND_NAME)



                        })
                    }
                })

                $.ajax({
                    type: "POST",
                    dataType: 'json',
                    url: "<?php echo base_url()?>.Defect/select_Defect",
                    data: {
                        def_id: def_id,
                        action: 'defectwc'
                    },

                    success: function(data_dfwc) {
                        console.log(data_dfwc);
                        $.each(data_dfwc, function(key_dfwc, val_dfwc) {
                            $('#line_cd').val(val_dfwc.LINE_CD)
                            $('#line_name').val(val_dfwc.LINE_NAME)
                        })
                    }
                })



            })
        },
        error: function(data) {
            console.log(data);
            alert('Ajax failed');
        }
    });
    $('#cleardata').click();
    $('#myModal').modal('show')
}

function clearuid() {
    document.getElementById("def_id").disabled = false;

}

function alert_comfirm(da_id, qty, supplier) {
    Swal.fire({
        title: 'Do you want to confirm?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#46a79a',
        cancelButtonColor: '#d65e5e',
        confirmButtonText: 'Yes, Confirm it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: "<?php echo base_url() .'Defect/ConfirmDefect/' ;?>",
                data: {
                    uid: da_id,
                    qty: qty,
                        supplier: supplier ?? null,
                },

                success: function(result) {
                    swal.fire({
                        icon: "success",
                        title: "Success!",
                        html: "Confirmation successfully!",
                        timer: 1000
                    }).then(() => {
                        $('#myModal').modal('hide');
						$('#multi_col_order').DataTable().ajax.reload(null, true);
                    })
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    swal.fire("Error delete!", "Please try again", "error");
                }
            });
        }
    })
}

function alert_Data(da_id) {
    // alert(da_id)
    Swal.fire({
        title: 'Not a defect, right?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#46a79a',
        cancelButtonColor: '#d65e5e',
        confirmButtonText: 'Yes, Confirm it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: "<?php echo base_url() .'Defect/NotDefect/' ;?>",
                data: {
                    uid: da_id
                },

                success: function() {
					swal.fire({
                            icon: "success",
                            title: "Success!",
                            html: "Cancel successfully!",
                            timer: 1000
                        }).then(() => {
                            $('#multi_col_order').DataTable().ajax.reload(null, true);
                        })


                },
                error: function(xhr, ajaxOptions, thrownError) {
                    swal.fire("Error delete!", "Please try again", "error");
                }
            });



        }
    })
}

function searchDEF() {


    txt_select = 'PCSYSTEM_TEAM';

    if (defectConfirm.data.defData != null) {
        defectConfirm.component.createTableItem(defectConfirm.data.defData);
    } else {
        defectConfirm.ajax.loadItemExp(txt_select, true);
    }

}

function selDefexp() {

    var radios = document.getElementsByName('rad_def');
    let isChecked = false;

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            document.getElementById("da_code").value = radios[i].value;

            $('#sel_def_exp').modal('hide')
            isChecked = true;
            break;
        }
    }

    if (!isChecked) {
        Swal.fire({
            title: "Warning!",
            icon: "warning",
            html: "Please select at least 1 item!"
        })
    }
}

function clearselDefexp() {
    document.getElementById("da_code").disabled = false;
}

function clearDefect() {
    var container = document.getElementById(formEditGroup);
    // var content = container.innerHTML;
    // container.innerHTML= content;

    // var img1 = tag_img+'1';
    // var img2 = tag_img+'2';
    // var pdf1 = pdf_img+'1';
    // var pdf2 = pdf_img+'2';
    var nc_ig = document.getElementsByName('nc_ig');
    var ng_ig = document.getElementsByName('ng_ig');
    // $(ng_id).attr("src", "")
    // $(nc_id).attr("src", "")
    document.getElementById("nc_id").value = "";
    document.getElementById("ng_id").value = "";
    // $(ng_id).html("");
    // $(nc_id).html("");
}

function Submitedit22(da_id) {

    var total_defect = parseInt($("#ng_id").val()) + parseInt($("#nc_id").val()) + parseInt($('#good_qty').val());
    if (total_defect > globalData.limitQty) {
        Swal.fire({
            icon: 'warning',
            title: 'Please check qty',
            html: 'Quantity not over than ' + globalData.limitQty,
        })
    } else if ($('#da_code').val() == '') {
        Swal.fire({
            icon: 'warning',
            title: 'Please fill defect code',
            html: '<center>Defect code can\'t empty</center>',
        })
    } else {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "<?php echo base_url()?>/Defect/Submitedit22",
            data: $('#formEditGroup').serialize(),
            success: function(data) {
                if (data) {
                    swal.fire({
                        icon: "success",
                        title: "Success!",
                        html: "Confirmation successfully!",
                        timer: 1000
                    }).then(() => {
                        $('#myModal').modal('hide');
						$('#multi_col_order').DataTable().ajax.reload(null, true);
                    })
                } else {
                    swal.fire({
                        icon: "error",
                        title: "Error!",
                        html: "Confirmation failed."
                    })
                }
                
            },
            error: function(err) {
                console.log(err);
            }
        })
    }
}

const defectConfirm = {
    data: {
        defData: null,
    },
    component: {
        createTableItem: (data) => {
            var trHTML = '';

            $('#table27').dataTable().fnDestroy();

            for (i = 0; i < data.length; i++) {

                trHTML += `<tr data-def-cd="${data[i]?.DEF_CD}">
                                    <td style="text-align:center;"><input type="radio" name="rad_def" id="rad_def" value="${data[i].DEF_CD}" class="ace" /><span class="lbl"></span></td>
                                    <td>${data[i].DEF_CD}</td>
                                    <td>${data[i].DEF_NAME_EN}</td>
                                    <td>${data[i].DEF_NAME_TH ?? '-'}</td>
                                </tr>`
            }

            $('#table27 tbody').html(trHTML);
            $('#table27').DataTable();
            $('#myModal').modal('hide');
            $('#sel_def_exp').modal('show');
        },
    },
    ajax: {
        loadItemExp: (txt, isModal = false) => {
            $.ajax({
                type: "POST",
                url: "<?php echo base_url() . 'Defect/searchDefEXP'  ;?> ",
                data: {
                    temp: txt
                },
                success: function(data) {
                    defectConfirm.data.defData = data;

                    $('#da_code').typeahead({
                        source: data,
                        displayField: 'DEF_CD',
                    });

                    if (isModal) defectConfirm.component.createTableItem(data);
                },
                error: function(data) {
                    console.log(data);
                    alert('Ajax failed');
                }
            });
        },
    },
    init() {
        this.ajax.loadItemExp('PCSYSTEM_TEAM');

        $('#nc_id, #ng_id').keyup((e) => {
            let nc_qty = parseFloat($('#nc_id').val());
            let ng_qty = parseFloat($('#ng_id').val());
            let remain = globalData.limitQty - (ng_qty + nc_qty);
            if (remain < 0) {
                $(e.target).val(0)
                $('#good_qty').val(0);
            } else {
                $('#good_qty').val(remain);
            }

        })
    }
}
</script>

<!-- <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css"> -->
<style>
/* .card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    height: auto;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid #e9ecef;
    border-radius: 0.25rem;
} */

.custom-select {
    display: inline-block;
    width: 100%;
    height: calc(2em + 0.75rem + 2px);
    padding: 0.375rem 1.75rem 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #3b3b3b;
    vertical-align: middle;
    border: 1px solid #e9ecef;
    border-radius: 5px;
    appearance: none;
}

/* @media (min-width: 576px) {
    .modal-dialog {
        max-width: 85%;
        margin: 1.75rem auto;
    }
} */

.h5,
h5 {
    font-size: 1.4rem;
    color: #222222;
}

.modal .buttons button {
    display: inline-block;
    text-decoration: none;
    padding: 10px 20px;
    background: #eeeeee00;
    border: 1px solid #17b978;
    color: #17b978;
    border-radius: 6px;
    font-size: 16px;
    transition: all 0.3s;
}

/* .modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    display: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
    background: #0000004f;
} */

/* .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 5px;
    outline: 0;
} */

.button1 {
    outline: none;
    height: 32px;
    text-align: center;
    width: 45px;
    border-radius: 5px;
    background: #1d8485;
    border: 2px solid #1d8485;
    color: #fdfdfd;
    letter-spacing: 1px;
    text-shadow: 0;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.25s ease;
}

#button1:hover {
    color: white;
    background: #1f8666;
    border: 2px solid #1f8666;
}

#button1:active {
    letter-spacing: 2px;
}

#button1:after {
    content: "";
}

#button-1:hover {
    color: white !important;
    background: #2196f3;
}

#button-1:active {
    letter-spacing: 2px;
}

#button-1:after {
    content: "";
}

.card-body {
    flex: 1 1 auto;
    padding: 15px;
}

.row {
    display: flex;
    flex-wrap: wrap;
    margin-left: -15px;
    margin-right: 0px;
}

table.dataTable tbody th,
table.dataTable tbody td {
    padding: 7px 10px;
    vertical-align: revert;
    text-align: center;
    font-size: 14px;
    color: #5d5c5c;
}

.page-wrapper {
    background: #f7f7f7;
    position: relative;
    display: none;
    box-shadow: 0 3px 9px 0 rgba(162, 176, 190, .15);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.page-breadcrumb {
    padding: 30px 35px 0;
    height: 54px;
    background: white;
    border-bottom: 1px solid #1919191c;
}

.btn-primary {
    border-radius: 5px;
    color: #fff;
    background-color: #24898a;
    border-color: #24898a;
}

@media (min-width: 992px) {
    .col-lg-4 {
        flex: 0 34.33333%;
        max-width: 40.33333%;
        /* margin: 30px; */
    }

    .col-lg-7 {
        flex: 0 0 64.33333%;
        max-width: 64.33333%;
    }

    .col-lg-6 {
        flex: 0 0 66%;
        max-width: 66%;
        margin: 30px 19px 10px -25px;
    }
}

.form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 1.75rem 0.375rem 0.75rem;
    font-size: 1rem;
    /* padding: 23px 12px; */
    line-height: 1.5;
    color: #4F5467;
    background-color: #fff;
    background-clip: padding-box;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
</style>
