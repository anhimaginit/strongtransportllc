function RateShipping() {}

RateShipping._rateshipping = null;
RateShipping.prototype.constructor = RateShipping;
RateShipping.prototype = {
  init: function (callback) {
    // setCompany = this.setCompanyID;
    this.setView();
    _rateShipping.bindEvent();

    if (callback) callback();
  },
  setView: function () {
    console.log('vao');
    $('#rateshipping_form [name=company_name]').select2({
      placeholder: 'Search Company',
      minimumInputLength: 1,
      language: {
         inputTooShort: function () {
            return 'Enter info';
         },
      },
      ajax: {
         url: link._companiesByName,
         type: 'post',
         dataType: 'json',
         delay: 300,
         data: function (params) {
            var _data = {
               token: localStorage.getItemValue('token'),
               jwt: localStorage.getItemValue('jwt'),
               private_key: localStorage.getItemValue('userID'),
               name: params.term
            }
            return _data;
         },
         processResults: function (data, params) {
            if (data && data.list) {
               data = data.list;
            }
            data = $.map(data, function (obj) {
               obj.id = obj.ID;
               return obj;
            });
            return { results: data }
         },
         cache: true
      },
      escapeMarkup: function (markup) { return markup; },
      templateResult: function (item) {
         var city_state = [];
         if (item.city && item.city.trim() != '') city_state.push(item.city);
         if (item.state && item.state.trim() != '') city_state.push(item.state);
         return '<div class="padding-5">' +
            '<div class="">' + item.name + '<div class="pull-right">' + city_state.join(' - ') + '</div>' +
            '</div>' +
            (item.address1 && item.address1 != '' ? '<div>' + item.address1 + '</div>' : '') +
            '</div>';
      },
      templateSelection: function (item) {
         if (!item.name)
            if (item.text) return item.text;
            else return item.id;
         return item.name;
      }
   });

   // company name

   $('#rateshipping_form [name=depot_name]').select2({
    placeholder: 'Search Depot',
    minimumInputLength: 1,
    language: {
       inputTooShort: function () {
          return 'Enter info';
       },
    },
    ajax: {
      "async": true,
      "crossDomain": true,
       url: link._depots_search,
       type: 'post',
       dataType: 'json',
       delay: 300,
       data: function (params) {
          var _data = {
             token: localStorage.getItemValue('token'),
             text_search: params.term,
            //  jwt: localStorage.getItemValue('jwt'),
            login_id: localStorage.getItemValue('userID'),
            level: localStorage.getItemValue('level')
          }
          return _data;
       },
       processResults: function (data, params) {
          if (data && data.depots) {
             data = data.depots;
          }
          data = $.map(data, function (obj) {
             obj.id = obj.depot_id;
             return obj;
          });
          return { results: data }
       },
       cache: true
    },
    escapeMarkup: function (markup) { return markup; },
    templateResult: function (item) {
       var city_state = [];
       if (item.depot_city && item.depot_city.trim() != '') city_state.push(item.depot_city);
       if (item.depot_state && item.depot_state.trim() != '') city_state.push(item.depot_state);
       return '<div class="padding-5">' +
          '<div class="">' + item.depot_name + '<div class="pull-right">' + city_state.join(' - ') + '</div>' +
          '</div>' +
          (item.depot_address && item.depot_address != '' ? '<div>' + item.depot_address + '</div>' : '') +
          '</div>';
    },
    templateSelection: function (item) {
       if (!item.depot_name)
          if (item.text) return item.text;
          else return item.depot_id;
       return item.depot_name;
    }
  });
  
  },
  bindEvent: function () {
    var _self = this;

    // $(document).unbind("change", "#contact_form #contact_tags_tag");
    // $(document).unbind("keyup", "#contact_form #contact_tags_tag");

    $("#rateshipping_form").validate(_self.formValidateOption);

    var fw = getUrlParameter("fw");
    if (window.location.href.indexOf("rateshipping") >= 0 && !(window.opener && fw)) {
      $("#btnBackContact").on("click", function () {
        window.history.back();
      });
    }
  },
  initUpdate: function (id) {
    console.log("da vao init update: ", id);

    contact_state = new State({ element: "#rateshipping_form" });
    var _self = this;
    $.ajax({
      url: link._rate_shipping_id,
      type: "POST",
      data: {
        token: localStorage.getItemValue("token"),
        rate_shipping_id: parseInt(id),
        private_key: localStorage.getItemValue("userID"),
      },
      dataType: "json",
      error: function (res) {
      },
      success: function (res) {
        var _rateshipping = res;
        console.log("res", res);
        if (_rateshipping == undefined || !_rateshipping.rate_shipping_id) {
          messageForm(
            "No data found with rate shipping id = " +
              id +
              ", please choose another id",
            false,
            "#rateshipping_form #message_form"
          );
          return;
        } else {
          for (var key in _rateshipping) {
            $("#rateshipping_form input:text[name='" + key + "']").val(
              _rateshipping[key]
            );
            $("#rateshipping_form input:hidden[name='" + key + "']").val(
              _rateshipping[key]
            );
          }

          if (_rateshipping.vendor_id && _rateshipping.company_name) {
            $('#rateshipping_form [name="company_name"]').append('<option value="' + _rateshipping.vendor_id + '" selected>' + _rateshipping.company_name + '</option>').trigger('change');
                $.cookie('companyID', _rateshipping.vendor_id, { path: '/', maxAge: 15 });

            $('#rateshipping_form [name="depot_name"]').append('<option value="' + _rateshipping.depot_id + '" selected>' + _rateshipping.depot_name + '</option>').trigger('change');
                $.cookie('depotID', _rateshipping.depot_id, { path: '/', maxAge: 15 });
                
          }
        }
      },
    });
  },
  formValidateOption: {
    rules: {
      company_name: { required: true },
      depot_name: { required: true },
      rate_mile: { maxlength: 50, digits: false, number: true },
      rate_cost: { maxlength: 50, digits: false, number: true },
    },
    messages: {
      company_name: {
        required: "Please enter company name",
      },
      depot_name: {
        required: "Please enter depot name",
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

      if (getUrlParameter("id") && window.location.href.indexOf("rateshipping") >= 0) {
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

      _f_data.vendor_id = $('#rateshipping_form [name=company_name]').val();
      _f_data.depot_id = $('#rateshipping_form [name=depot_name]').val();

      delete _f_data.company_name
      delete _f_data.depot_name

      if (getUrlParameter("id") && window.location.href.indexOf("rateshipping") >= 0) {
        _formData.rate_shipping_id = parseInt(getUrlParameter("id"));
      }
      console.log('_formData', _formData);

      $.ajax({
        async: true,
        crossDomain: true,
        url: link._rate_shipping_new_update,
        method: "POST",
        dataType: "json",
        data: _formData,
        success: function (res) {
          console.log('aa', res);
          if (res.Save_Update === false) {
            messageForm(
              "Error! An error occurred. " + res.ERROR,
              false,
              "#rateshipping_form #message_form"
            );
            return;
          } else if (res.Save_Update === true) {
            if (
              getUrlParameter("id") &&
              window.location.href.indexOf("rateshipping") >= 0
            ) {
              messageForm(
                "You have successfully edited the rate shipping",
                true,
                "#rateshipping_form #message_form"
              );
            } else {
              messageForm(
                "You have successfully added the rate shipping",
                true,
                "#rateshipping_form #message_form"
              );
              $("#rateshipping_form").trigger("reset");
              $("#rateshipping_form .error").empty();
              $(
                "#rateshipping_form .postal_code, #rateshipping_form .state, #rateshipping_form .city"
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
        "#rateshipping_form #message_form"
      );
    },
  },

  /**
   *
   * @param {Function} callback
   * @purpose : Load state for sale option in Contact type Sales checked
   */
};
var _rateShipping = new RateShipping();
_rateShipping.init(function () {
  if (getUrlParameter("id") && window.location.href.indexOf("rateshipping") >= 0) {
    RateShipping.prototype.initUpdate(getUrlParameter("id"));
  } else {
    contact_state = new State({ element: "#rateshipping_form" });
  }
});
