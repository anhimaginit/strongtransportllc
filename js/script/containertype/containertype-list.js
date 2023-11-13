function ContainerTypeList() {}
ContainerTypeList.pageno = 1;
ContainerTypeList.pagelength = 10;
ContainerTypeList.prototype.constructor = ContainerTypeList;

ContainerTypeList.prototype = {
  init: function () {
    loadTable = this.loadTable;
    search = function () {
      ContainerTypeList.prototype.loadTable();
    };
    $(function () {
      searchType("containertype");
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
        $("#table_containertype").ready(function () {
          ContainerTypeList.prototype.loadTable();
        });
      }
    });
  },
  displayList: function (list) {
    var tb_data = $("#table_containertype").DataTable({
      sDom:
        "<'dt-toolbar'<'col-sm-12 col-xs-12'B>r>" +
        "t" +
        "<'dt-toolbar-footer'<'col-sm-6 col-xs-12'i><'col-xs-12 col-sm-6'p>>",
      buttons: [
        {
          extend: "copy",
          text: '<i class="fa fa-files-o text-danger"></i> Copy',
          title: "Container Type List - " + getDateTime(),
          className: "btn btn-default",
        },
        {
          extend: "csv",
          text: '<i class="fa  fa-file-zip-o text-primary"></i> CSV',
          title: "Container Type List - " + getDateTime(),
          className: "btn btn-default",
        },
        {
          extend: "excel",
          text: '<i class="fa fa-file-excel-o text-success"></i> Excel',
          title: "Container Type List - " + getDateTime(),
          className: "btn btn-default",
        },
        {
          extend: "pdf",
          text: '<i class="fa fa-file-pdf-o" style="color:red"></i> PDF',
          title: "Container Type List - " + getDateTime(),
          className: "btn btn-default",
          action: function (e, dt, node, config) {
            if (!isAdmin()) {
              event.preventDefault();
              messageForm(
                "You haven't permission to download Container Type list",
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
          title: "Container Type List - " + getDateTime(),
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
            return data.container_type_id ? data.container_type_id : "";
          },
        },
        {
          data: function (data, type, row) {
            return data.container_type_name ? data.container_type_name : "";
          },
        },
      ],
      createdRow: function (row, data, dataIndex) {
        // if(!['Affiliate'].includes(department)){
        $(row).attr(
          "title",
          "Click to go to container type with id is " + data.container_type_id
        );
        $(row).click(function () {
          window.open(
            host2 + "#ajax/containertype-form.php?id=" + data.container_type_id,
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
    $("#table_containertype thead th input").on("keyup change", function () {
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

    console.log("ré", _data);

    $.ajax({
      url: link._container_type_search,
      type: "POST",
      data: _mydata,
      dataType: "json",
      success: function (res) {
        console.log("rés", res);
        ContainerTypeList.prototype.displayList(res.container_types);
      },
    });
  },
};

var _contactList = new ContainerTypeList();
_contactList.init();
