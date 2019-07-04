let dropdowns = {
  //-----------------------------------NoteType---------------------
    enableNoteType : function (app) {
        $("#nType").select2({
            // tags: [],
            // allowClear: true,
            initSelection: function (element, callback) {
              // var data = { id: 1, text: 'initSelection test' };
              // callback(data);
              // app.projectType = data;
              // console.log(app.projectType)
            },
            // multiple: true,
            //maximumInputLength: 30,
            // maximumSelectionSize: 1,
            ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
              url: "/GetNoteTypes",
              dataType: 'json',
              quietMillis: 100,
              data: function (term, page) {
                return {
                  query: term, // search term
                };
              },
              results: function (data, page) { // parse the results into the format expected by Select2.
                // since we are using custom formatting functions we do not need to alter the remote JSON data
                return { results: data.model };
              },
              // cache: true
            },
            createSearchChoice: function (term, data) {
              if ($(data).filter(function () {
                return this.text.localeCompare(term) === 0;
              }).length === 0) {
                return { id: "$*NewTag*$", text: term };
              }
            },
            //multiple: true,
          }).select2('val', '').on("change", function (e) {
            var data = $(this).select2('data');
            console.log(data)
            // alert("enableNoteType");
        
            if (data !== undefined) {
              app.nodeModel.noteType.text = data.text;
              app.nodeModel.noteType.id = data.id;
            }
          });
    },
    //---------------------------------Project----------------------
    enableProject:function(app){
      $("#project").select2({
        tags: [],
        // allowClear: true,
        initSelection: function (element, callback) {
          // var data = { id: 1, text: 'initSelection test' };
          // callback(data);
          // app.projectType = data;
          // console.log(app.projectType)
        },
        // multiple: true,
        maximumInputLength: 30,
        maximumSelectionSize: 1,
        ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
          url: "/GetProjectTypes",
          dataType: 'json',
          quietMillis: 100,
          data: function (term, page) {
            return {
              query: term, // search term
            };
          },
          results: function (data, page) { // parse the results into the format expected by Select2.
            // since we are using custom formatting functions we do not need to alter the remote JSON data
            return { results: data.model };
          },
          // cache: true
        },
        createSearchChoice: function (term, data) {
          if ($(data).filter(function () {
            return this.text.localeCompare(term) === 0;
          }).length === 0) {
            return { id: "$*NewTag*$", text: term };
          }
        },
        multiple: true,
      }).select2('val', []).on("change", function (e) {
        app.projectType = "";
        var data = $(this).select2('data')[0];
        console.log(data)
        if (data !== undefined) {
          app.nodeModel.projectType.text = data.text;
          app.nodeModel.projectType.id = data.id;
        }
        console.log(app.projectType)
      });
    },
    //-------------------------------GeneralSubject-----------------
    enableGeneralSubject:function(app){
      $("#technology").select2({
        tags: [],
        // allowClear: true,
        initSelection: function (element, callback) {
          // var data = { id: 1, text: 'initSelection test' };
          // callback(data);
          // app.projectType = data;
        },
        // multiple: true,
        maximumInputLength: 30,
        maximumSelectionSize: 1,
        ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
          url: "/GetTechnologies",
          dataType: 'json',
          quietMillis: 100,
          data: function (term, page) {
            return {
              query: term, // search term
            };
          },
          results: function (data, page) { // parse the results into the format expected by Select2.
            // since we are using custom formatting functions we do not need to alter the remote JSON data
            return { results: data.model };
          },
          // cache: true
        },
        createSearchChoice: function (term, data) {
          if ($(data).filter(function () {
            return this.text.localeCompare(term) === 0;
          }).length === 0) {
            return { id: "$*NewTag*$", text: term };
          }
        },
        multiple: true,
      }).select2('val', []).on("change", function (e) {
    
        var data = $(this).select2('data')[0];
        if (data !== undefined) {
          app.nodeModel.technologyType.text = data.text;
          app.nodeModel.technologyType.id = data.id;
        }
    
      });
    
    },
    //-----------------------------SpecificSubject------------------
    enableSpecificSubject:function(app){
      $("#specificSubject").select2({
        tags: [],
        // allowClear: true,
        initSelection: function (element, callback) {
          // var data = { id: 1, text: 'initSelection test' };
          // callback(data);
          // app.projectType = data;
        },
        // multiple: true,
        maximumInputLength: 30,
        maximumSelectionSize: 1,
        ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
          url: "/GetSpecificSubject",
          dataType: 'json',
          quietMillis: 100,
          data: function (term, page) {
            return {
              query: term, // search term
            };
          },
          results: function (data, page) { // parse the results into the format expected by Select2.
            // since we are using custom formatting functions we do not need to alter the remote JSON data
            return { results: data.model };
          },
          // cache: true
        },
        createSearchChoice: function (term, data) {
          if ($(data).filter(function () {
            return this.text.localeCompare(term) === 0;
          }).length === 0) {
            return { id: "$*NewTag*$", text: term };
          }
        },
        multiple: true,
      }).select2('val', []).on("change", function (e) {
      
        var data = $(this).select2('data')[0];
        if (data !== undefined) {
          app.nodeModel.specificSubject.text = data.text;
          app.nodeModel.specificSubject.id = data.id;
        }
      
      });
    }
}
export { dropdowns };