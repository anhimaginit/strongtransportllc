function DepotList() {}
DepotList.pageno = 1;
DepotList.pagelength = 10;
DepotList.prototype.constructor = DepotList;

DepotList.prototype = {
  init: function () {
    loadTable = this.loadTable;
    search = function () {
      DepotList.prototype.loadTable();
    };
    $(function () {
      searchType("depot");
      if ($.cookie("search_all_depot")) {
        $('input[name="search_all"]').val($.cookie("search_all_depot"));
        $('input[name="search_all"]').change();
        search();
        $("#panel_search_all").show();
      } else if (window["search_all_depot"]) {
        $('input[name="search_all"]').val(window["search_all_depot"]);
        $('input[name="search_all"]').change();
        // search();
        delete window["search_all_depot"];
        $("#panel_search_all").show();
      } else {
        $("#table_depot").ready(function () {
          DepotList.prototype.loadTable();
        });
      }
    });
  },
  displayList: function (list) {
    var tb_data = $("#table_depot").DataTable({
      sDom:
        "<'dt-toolbar'<'col-sm-12 col-xs-12'B>r>" +
        "t" +
        "<'dt-toolbar-footer'<'col-sm-6 col-xs-12'i><'col-xs-12 col-sm-6'p>>",
      buttons: [
        {
          extend: "copy",
          text: '<i class="fa fa-files-o text-danger"></i> Copy',
          title: "Depot List - " + getDateTime(),
          className: "btn btn-default",
        },
        {
          extend: "csv",
          text: '<i class="fa  fa-file-zip-o text-primary"></i> CSV',
          title: "Depot List - " + getDateTime(),
          className: "btn btn-default",
        },
        {
          extend: "excel",
          text: '<i class="fa fa-file-excel-o text-success"></i> Excel',
          title: "Depot List - " + getDateTime(),
          className: "btn btn-default",
        },
        {
          extend: "pdf",
          text: '<i class="fa fa-file-pdf-o" style="color:red"></i> PDF',
          title: "Depot List - " + getDateTime(),
          className: "btn btn-default",
          action: function (e, dt, node, config) {
            if (!isAdmin()) {
              event.preventDefault();
              messageForm(
                "You haven't permission to download Depot list",
                "warning",
                ".message_table:first"
              );
              return false;
            } else {
              $.fn.dataTable.ext.buttons.pdfHtml5.action.call(
                this,
                e,
                dt,
                node,
                config
              );
            }
          },
        },
        {
          extend: "print",
          text: '<i class="fa fa-print"></i> Print',
          title: "Depot List - " + getDateTime(),
          className: "btn btn-default",
        },
      ],
      data: list,
      destroy: true,
      // pageLength: 10,
      searching: true,
      // paging: true,
      columns: [
        // { data: 0, title: "#&nbsp;ID" },
        {
          data: function (data, type, row) {
            return data.depot_id ? data.depot_id : "";
          },
        },
        {
          data: function (data, type, row) {
            return data.depot_name ? data.depot_name : "";
          },
        },
        {
          data: function (data) {
            return data.depot_address ? data.depot_address : "";
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.depot_city ? data.depot_city : "";
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.depot_state ? data.depot_state : "";
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.depot_zip ? data.depot_zip : "";
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.depot_phone ? data.depot_phone : "";
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.depot_latitude ? data.depot_latitude : "";
          },
          searchable: true,
        },
        {
          data: function (data) {
            return data.depot_longitude ? data.depot_longitude : "";
          },
          searchable: true,
        },
      ],
      createdRow: function (row, data, dataIndex) {
        // if(!['Affiliate'].includes(department)){
        $(row).attr(
          "title",
          "Click to go to depot with id is " + data.depot_id
        );
        $(row).click(function () {
          window.open(
            host2 + "#ajax/depot-form.php?id=" + data.depot_id,
            "_self"
          );
        });
        // }
      },
      order: [[1, "asc"]],
    });
    // if((['Affiliate']).includes(department)){
    //     $("#table_contact").prepend('<caption class="alert alert-warning">You cannot edit or view contact detail</caption>')
    // }
    $("#table_depot thead th input").on("keyup change", function () {
      tb_data
        .column($(this).parent().index() + ":visible")
        .search(this.value)
        .draw();
    });
  },
  loadTable: function (_page, _pagelength) {
    var _mydata = $.extend({}, template_data);
    var _data = $("#form_search").serializeArray();
    _data.forEach(function (elem) {
      _mydata[elem.name] = elem.value;
    });

    $.ajax({
      url: link._depots_search,
      type: "POST",
      data: _mydata,
      dataType: "json",
      success: function (res) {
        DepotList.prototype.displayList(res.depots);
      },
    });
  },
};

var _contactList = new DepotList();
_contactList.init();
