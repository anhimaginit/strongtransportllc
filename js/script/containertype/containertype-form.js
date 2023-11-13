function ContainerType() {}

ContainerType._containertype = null;
ContainerType.prototype.constructor = ContainerType;
ContainerType.prototype = {
  init: function (callback) {
    // setCompany = this.setCompanyID;
    this.setView();
    _Contact.bindEvent();

    if (callback) callback();
  },
  setView: function () {},
  bindEvent: function () {
    var _self = this;

    $("#containertype_form").validate(_self.formValidateOption);

    var fw = getUrlParameter("fw");
    if (
      window.location.href.indexOf("containertype") >= 0 &&
      !(window.opener && fw)
    ) {
      $("#btnBackContact").on("click", function () {
        window.history.back();
      });
    }
  },
  initUpdate: function (id) {
    contact_state = new State({ element: "#containertype_form" });
    var _self = this;
    $.ajax({
      url: link._container_type_id,
      type: "POST",
      data: {
        token: localStorage.getItemValue("token"),
        container_type_id: parseInt(id),
        private_key: localStorage.getItemValue("userID"),
      },
      dataType: "json",
      error: function (res) {},
      success: function (res) {
        var _containertype = res;
        if (_containertype == undefined || !_containertype.container_type_id) {
          messageForm(
            "No data found with containertype id = " +
              id +
              ", please choose another id",
            false,
            "#containertype_form #message_form"
          );
          return;
        } else {
          for (var key in _containertype) {
            $("#containertype_form input:text[name='" + key + "']").val(
              _containertype[key]
            );
            $("#containertype_form input:hidden[name='" + key + "']").val(
              _containertype[key]
            );
          }
        }
      },
    });
  },
  formValidateOption: {
    rules: {
      container_type_name: { required: true, maxlength: 100 },
    },
    messages: {
      container_type_name: {
        required: "Please enter container type name",
      },
    },
    success: function (e) {
      $(e).remove();
    },
    submitHandler: function (form) {
      var _f_data = {};
      var _data = $(form).serializeArray();
      _data.forEach(function (elem) {
        if (elem.name != "" && elem.value != "") {
          _f_data[elem.name] = elem.value;
        }
      });

      if (
        getUrlParameter("id") &&
        window.location.href.indexOf("containertype") >= 0
      ) {
        _data.forEach(function (elem) {
          if (elem.value == "") {
            _f_data[elem.name] = elem.value;
          }
        });
      }

      var _formData = {
        token: localStorage.getItemValue("token"),
        jwt: localStorage.getItemValue("jwt"),
        data_post: _f_data,
      };

      if (
        getUrlParameter("id") &&
        window.location.href.indexOf("containertype") >= 0
      ) {
        _formData.container_type_id = parseInt(getUrlParameter("id"));
      }

      $.ajax({
        async: true,
        crossDomain: true,
        url: link._container_type_new_update,
        method: "POST",
        dataType: "json",
        data: _formData,
        success: function (res) {
          if (res.Save_Update === false) {
            messageForm(
              "Error! An error occurred. " + res.ERROR,
              false,
              "#containertype_form #message_form"
            );
            return;
          } else if (res.Save_Update === true) {
            if (
              getUrlParameter("id") &&
              window.location.href.indexOf("containertype") >= 0
            ) {
              messageForm(
                "You have successfully edited the container type",
                true,
                "#containertype_form #message_form"
              );
            } else {
              messageForm(
                "You have successfully added the container type",
                true,
                "#containertype_form #message_form"
              );
              $("#containertype_form").trigger("reset");
              $("#containertype_form .error").empty();
              $(".modal").modal("hide");
            }
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
        },
      });
    },
    invalidHandler: function (event, validator) {
      // 'this' refers to the form
      messageForm(
        "Error! An error occurred. ",
        false,
        "#containertype_form #message_form"
      );
    },
  },

  /**
   *
   * @param {Function} callback
   * @purpose : Load state for sale option in Contact type Sales checked
   */
};
var _Contact = new ContainerType();
_Contact.init(function () {
  if (
    getUrlParameter("id") &&
    window.location.href.indexOf("containertype") >= 0
  ) {
    ContainerType.prototype.initUpdate(getUrlParameter("id"));
  } else {
    contact_state = new State({ element: "#containertype_form" });
  }
});
