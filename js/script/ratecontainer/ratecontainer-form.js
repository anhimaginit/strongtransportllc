function RateContainer() {}

RateContainer._rateContainer = null;
RateContainer.prototype.constructor = RateContainer;
RateContainer.prototype = {
  init: function (callback) {
    // setCompany = this.setCompanyID;
    this.setView();
    _RateContainer.bindEvent();

    if (callback) callback();
  },
  setView: function () {
    $('#ratecontainer_form [name=company_name]').select2({
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

   $('#ratecontainer_form [name=depot_name]').select2({
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

  // container type name

  $('#ratecontainer_form [name=container_type_name]').select2({
    placeholder: 'Search Container Type',
    minimumInputLength: 1,
    language: {
       inputTooShort: function () {
          return 'Enter info';
       },
    },
    ajax: {
      "async": true,
      "crossDomain": true,
       url: link._container_type_search,
       type: 'post',
       dataType: 'json',
       delay: 300,
       data: function (params) {
          var _data = {
             token: localStorage.getItemValue('token'),
             text_search: params.term,
            login_id: localStorage.getItemValue('userID'),
            level: localStorage.getItemValue('level')
          }
          return _data;
       },
       processResults: function (data, params) {
          if (data && data.container_types) {
             data = data.container_types;
          }
          data = $.map(data, function (obj) {
             obj.id = obj.container_type_id;
             return obj;
          });
          return { results: data }
       },
       cache: true
    },
    escapeMarkup: function (markup) { return markup; },
    templateResult: function (item) {
       return '<div class="padding-5">' +
          '<div class="">' + item.container_type_name + '<div class="pull-right">' + '</div>' +
          '</div>';
    },
    templateSelection: function (item) {
       if (!item.container_type_name)
          if (item.text) return item.text;
          else return item.container_type_id;
       return item.container_type_name;
    }
  });
  
  },
  bindEvent: function () {
    var _self = this;

    // $(document).unbind("change", "#contact_form #contact_tags_tag");
    // $(document).unbind("keyup", "#contact_form #contact_tags_tag");

    $("#ratecontainer_form").validate(_self.formValidateOption);

    var fw = getUrlParameter("fw");
    if (window.location.href.indexOf("ratecontainer") >= 0 && !(window.opener && fw)) {
      $("#btnBackContact").on("click", function () {
        window.history.back();
      });
    }
  },
  initUpdate: function (id) {
    console.log("da vao init update: ", id);

    contact_state = new State({ element: "#ratecontainer_form" });
    var _self = this;
    $.ajax({
      url: link._rate_container_id,
      type: "POST",
      data: {
        token: localStorage.getItemValue("token"),
        rate_container_id: parseInt(id),
        private_key: localStorage.getItemValue("userID"),
      },
      dataType: "json",
      error: function (res) {
      },
      success: function (res) {
        var _rateContainer = res;
        if (_rateContainer == undefined || !_rateContainer.rate_container_id) {
          messageForm(
            "No data found with ratecontainer id = " +
              id +
              ", please choose another id",
            false,
            "#ratecontainer_form #message_form"
          );
          return;
        } else {
          for (var key in _rateContainer) {
            $("#ratecontainer_form input:text[name='" + key + "']").val(
              _rateContainer[key]
            );
            $("#ratecontainer_form input:hidden[name='" + key + "']").val(
              _rateContainer[key]
            );
          }

          if (_rateContainer.vendor_id && _rateContainer.company_name) {
            $('#ratecontainer_form [name="company_name"]').append('<option value="' + _rateContainer.vendor_id + '" selected>' + _rateContainer.company_name + '</option>').trigger('change');
                $.cookie('companyID', _rateContainer.vendor_id, { path: '/', maxAge: 15 });

            $('#ratecontainer_form [name="depot_name"]').append('<option value="' + _rateContainer.depot_id + '" selected>' + _rateContainer.depot_name + '</option>').trigger('change');
                $.cookie('depotID', _rateContainer.depot_id, { path: '/', maxAge: 15 });

            $('#ratecontainer_form [name="container_type_name"]').append('<option value="' + _rateContainer.container_type_id + '" selected>' + _rateContainer.container_type_name + '</option>').trigger('change');
                $.cookie('containertypeID', _rateContainer.container_type_id, { path: '/', maxAge: 15 });
                
          }
        }
      },
    });
  },
  formValidateOption: {
    rules: {
      company_name: { required: true },
      depot_name: { required: true },
      container_type_name: { required: true },
      container_rate: { maxlength: 50, digits: false, number: true },
      container_cost: { maxlength: 50, digits: false, number: true },
    },
    messages: {
      company_name: {
        required: "Please enter company name",
      },
      depot_name: {
        required: "Please enter depot name",
      },
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

      if (getUrlParameter("id") && window.location.href.indexOf("ratecontainer") >= 0) {
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

      _f_data.vendor_id = $('#ratecontainer_form [name=company_name]').val();
      _f_data.depot_id = $('#ratecontainer_form [name=depot_name]').val();
      _f_data.container_type_id = $('#ratecontainer_form [name=container_type_name]').val();

      delete _f_data.company_name
      delete _f_data.depot_name
      delete _f_data.container_type_name

      if (getUrlParameter("id") && window.location.href.indexOf("ratecontainer") >= 0) {
        _formData.rate_container_id = parseInt(getUrlParameter("id"));
      }

      console.log('_formData', _formData);

      $.ajax({
        async: true,
        crossDomain: true,
        url: link._rate_container_new_update,
        method: "POST",
        dataType: "json",
        data: _formData,
        success: function (res) {
          if (res.Save_Update === false) {
            messageForm(
              "Error! An error occurred. " + res.ERROR,
              false,
              "#ratecontainer_form #message_form"
            );
            return;
          } else if (res.Save_Update === true) {
            if (
              getUrlParameter("id") &&
              window.location.href.indexOf("ratecontainer") >= 0
            ) {
              messageForm(
                "You have successfully edited the ratecontainer",
                true,
                "#ratecontainer_form #message_form"
              );
            } else {
              messageForm(
                "You have successfully added the ratecontainer",
                true,
                "#ratecontainer_form #message_form"
              );
              $("#ratecontainer_form").trigger("reset");
              $("#ratecontainer_form .error").empty();
              $(
                "#ratecontainer_form .postal_code, #ratecontainer_form .state, #ratecontainer_form .city"
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
        "#ratecontainer_form #message_form"
      );
    },
  },

  /**
   *
   * @param {Function} callback
   * @purpose : Load state for sale option in Contact type Sales checked
   */
};
var _RateContainer = new RateContainer();
_RateContainer.init(function () {
  if (getUrlParameter("id") && window.location.href.indexOf("ratecontainer") >= 0) {
    RateContainer.prototype.initUpdate(getUrlParameter("id"));
  } else {
    contact_state = new State({ element: "#ratecontainer_form" });
  }
});
