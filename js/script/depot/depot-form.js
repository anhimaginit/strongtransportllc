function Depot() {}

Depot._depot = null;
Depot.prototype.constructor = Depot;
Depot.prototype = {
  init: function (callback) {
    // setCompany = this.setCompanyID;
    this.setView();
    _Contact.bindEvent();

    if (callback) callback();
  },
  setView: function () {},
  bindEvent: function () {
    var _self = this;

    $("#depot_form").validate(_self.formValidateOption);

    var fw = getUrlParameter("fw");
    if (window.location.href.indexOf("depot") >= 0 && !(window.opener && fw)) {
      $("#btnBackContact").on("click", function () {
        window.history.back();
      });
    }
  },
  initUpdate: function (id) {
    console.log("da vao init update: ", id);
    contact_state = new State({ element: "#depot_form" });
    var _self = this;
    $.ajax({
      url: link._depot_id,
      type: "POST",
      data: {
        token: localStorage.getItemValue("token"),
        depot_id: parseInt(id),
        private_key: localStorage.getItemValue("userID"),
      },
      dataType: "json",
      error: function (res) {
        console.log("da failed: ", res);
      },
      success: function (res) {
        console.log("da success");
        console.log(res);
        var _depot = res;
        if (_depot == undefined || !_depot.depot_id) {
          _depotPhone.createPhoneRow();
          messageForm(
            "No data found with depot id = " +
              id +
              ", please choose another id",
            false,
            "#depot_form #message_form"
          );
          return;
        } else {
          for (var key in _depot) {
            $("#depot_form input:text[name='" + key + "']").val(
              _depot[key]
            );
            $("#depot_form input:hidden[name='" + key + "']").val(
              _depot[key]
            );
          }

          contact_state.setValue2(
            "#depot_form",
            _depot.depot_city,
            _depot.depot_state,
            _depot.depot_zip,
            function () {}
          );
        }
      },
    });
  },
  formValidateOption: {
    rules: {
      depot_name: { required: true, maxlength: 100 },
      depot_address: { required: true, maxlength: 254 },
      // depot_phone: { maxlength: 25, digits: true, number: true },
      depot_latitude: { maxlength: 100, digits: false, number: true },
      depot_longitude: { maxlength: 100, digits: false, number: true },
    },
    messages: {
      depot_name: {
        required: "Please enter depot name",
      },
      depot_address: {
        required: "Please enter depot address",
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
        if (elem.name == "depot_phone" && elem.value != "") {
          
          var _phone;
          _phone = _f_data[elem.name].replaceAll('-', '');
          _f_data[elem.name] = _phone;
        }
        if (elem.name == "depot_phone" && elem.value != "") {
          
          var _phone;
          _phone = _f_data[elem.name].replaceAll('(', '');
          _f_data[elem.name] = _phone;
        }
        if (elem.name == "depot_phone" && elem.value != "") {
          
          var _phone;
          _phone = _f_data[elem.name].replaceAll(')', '');
          _f_data[elem.name] = _phone;
        }
      });

      // console.log('phone', _f_data.depot_phone);

      if (getUrlParameter("id") && window.location.href.indexOf("depot") >= 0) {
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

      console.log("data", _formData);

      if (getUrlParameter("id") && window.location.href.indexOf("depot") >= 0) {
        _formData.depot_id = parseInt(getUrlParameter("id"));
      }

      $.ajax({
        async: true,
        crossDomain: true,
        url: link._depot_new_update,
        method: "POST",
        dataType: "json",
        data: _formData,
        success: function (res) {
          console.log("response: ", res);
          if (res.Save_Update === false) {
            messageForm(
              "Error! An error occurred. " + res.ERROR,
              false,
              "#depot_form #message_form"
            );
            return;
          } else if (res.Save_Update === true) {
            if (
              getUrlParameter("id") &&
              window.location.href.indexOf("depot") >= 0
            ) {
              messageForm(
                "You have successfully edited the depot",
                true,
                "#depot_form #message_form"
              );
            } else {
              messageForm(
                "You have successfully added the depot",
                true,
                "#depot_form #message_form"
              );
              $("#depot_form").trigger("reset");
              $("#depot_form .error").empty();
              $(
                "#depot_form .postal_code, #depot_form .state, #depot_form .city"
              )
                .val(null)
                .trigger("change");
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
        "#depot_form #message_form"
      );
    },
  },

  /**
   *
   * @param {Function} callback
   * @purpose : Load state for sale option in Contact type Sales checked
   */
};
var _Contact = new Depot();
_Contact.init(function () {
  if (getUrlParameter("id") && window.location.href.indexOf("depot") >= 0) {
    Depot.prototype.initUpdate(getUrlParameter("id"));
  } else {
    contact_state = new State({ element: "#depot_form" });
  }
});
