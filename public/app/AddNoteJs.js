
import { noteJsModel } from "./model/noteJsModel"
import { codeMirrorComponent } from "./components/codeMirrorComponent"
import { selectize } from "./components/selectize"

var app = new Vue({
  el: '#anapp',
  // template: '#demo-template',
  data: {
    message: 'Create a Note',
    nodeModel: {
      bookMark: false,
      title: "",
      projectType: {},
      technologyType: {},
      specificSubject: {},
      noteType: {},
      model: [
        {
          mainbody: "",
          desc: "",
          lang: "htmlmixed"
        }]
    },
    componentKey: 1,
  },
  components: {
    codeMirrorComponent,
    selectize
  },
  updated: function () {

  },
  methods: {
    submit() {

      // var nodeModel = console.log(this.nodeModel.model);
      axios.post('/PostAddNote', { model: this.nodeModel })
        .then((response) => {
          this.nodeModel = {
            bookMark: false,
            title: "",
            projectType: {},
            technologyType: {},
            specificSubject: {},
            noteType: {},
            model: [
              {
                mainbody: "",
                desc: "",
                lang: "htmlmixed"
              }],
            componentKey: 1,
          }
          this.componentKey += 1;
          $("#technology").select2("val", "");
          $("#project").select2("val", "");
          $("#nType").select2("val", "");
          $("#specificSubject").select2("val", "");

        })
        .catch((error) => {
          alert(error)
        })

    },
    updateType(variable) {

    },
    updateTechnology(variable) {

    },
    updateProjectType(variable) {
      console.log(variable)
      this.nodeModel.projectType = variable;
    },
    updateCodeMirrorText(item) {
      console.log(item)
      this.nodeModel.model[item.index].mainbody = item.value
    },
    add() {
      this.nodeModel.model.push({
        mainbody: "",
        desc: "",
        lang: ""
      })
    }
  },
  mounted() {
  }
});




$(document).ready(function () {

  window.getProjectValue = function () {
    debugger;
    var s = $('#project').select2('data')
    console.log(s);
    var sss = s[0].text;
    return sss;
  }

  // --------------------------------------------------Project-------------------------------------
  $("#project").select2({
    tags: [],
    // allowClear: true,
    initSelection: function (element, callback) {
      // var data = { id: 1, text: 'initSelection test' };
      // callback(data);
      // app.projectType = data;
      console.log(app.projectType)
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


  //++++++++++++++++++++++++++++++++++++++++++++++_Technology_++++++++++++++++++++++++++++++++++++++++++++++
  //delete =>  $("#technology").select2("val", "");
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

  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@_NoteType_@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2



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

    if (data !== undefined) {
      app.nodeModel.noteType.text = data.text;
      app.nodeModel.noteType.id = data.id;
    }
  });
// --------------------------------------------------------------------------------
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
// --------------------------------------------------------------------


  // $("#").select2({
  //   tags: ["red", "green", "blue"],
  //   maximumInputLength: 30,
  //   maximumSelectionSize: 1

  // });
  // $("#note").select2({
  //   tags: ["red", "green", "blue"],
  //   maximumInputLength: 30,
  //   maximumSelectionSize: 1
  // });


  // $('.moreContent').moreContent();



  // var preload_data = [
  //   { id: 'user0', text: 'Disabled User', locked: true }
  //   , { id: 'user1', text: 'Jane Doe' }
  //   , { id: 'user2', text: 'John Doe', locked: true }
  //   , { id: 'user3', text: 'Robert Paulson', locked: true }
  //   , { id: 'user5', text: 'Spongebob Squarepants' }
  //   , { id: 'user6', text: 'Planet Bob' }
  //   , { id: 'user7', text: 'Inigo Montoya' }
  // ];


  // $('#w2').select2({
  //   theme: "bootstrap4", tags: true, multiple: true
  // });
  // // $('#w').select2({ tags: ["red", "green", "blue"] });
  // var lastResults = [];
  // var data = [{
  //   "id": 1,
  //   "text": "tag1",
  // }, {
  //   "id": 2,
  //   "text": "tag2",
  // }, {
  //   "id": 3,
  //   "text": "game",
  // }, {
  //   "id": 4,
  //   "text": "example",
  // }, {
  //   "id": 5,
  //   "text": "test",
  // }];

  // $('#w2').select2({
  //   placeholder: "Problem Tags",
  //   allowClear: true,
  //   minimumInputLength: 2,
  //   tags: true,
  //   multiple: true,
  //   width: "300px",
  //   tags: data,
  //   createTag: function (params) {
  //     var term = $.trim(params.term);
  //     if (term === '') {
  //       return null;
  //     }
  //     return {
  //       id: term,
  //       text: term,
  //       newTag: true // add additional parameters
  //     }
  //   }
  // });

  // initial values
  // $('.addTags').val(['2', '5']).trigger('change');

  // $("#e12").select2({ tags: ["red", "green", "blue"], theme: "bootstrap4" });

  // $('#tags').select2({
  //   data: ["Clare","Cork","South Dublin"],
  //     tags: true,
  //     tokenSeparators: [','], 
  //     placeholder: "Add your tags here"
  // });

  // $('#projectType').selectize({
  //   maxItems: 1,
  //   delimiter: ',',
  //   persist: false,
  //   //  options: [
  //   //     {email: 'brian@thirdroute.com', text: 'Brian Reavis'},
  //   //     {email: 'nikola@tesla.com', text: 'Nikola Tesla'},
  //   // ],
  //   create: function (input) {
  //     return {
  //       value: input,
  //       text: input
  //     }
  //   }
  // });

  // $('#technology').selectize({
  //   maxItems: 1,
  //   delimiter: ',',
  //   persist: false,
  //   //  options: [
  //   //     {email: 'brian@thirdroute.com', text: 'Brian Reavis'},
  //   //     {email: 'nikola@tesla.com', text: 'Nikola Tesla'},
  //   // ],
  //   create: function (input) {
  //     return {
  //       value: input,
  //       text: input
  //     }
  //   }
  // });

  // $('#type').selectize({
  //   maxItems: 1,
  //   delimiter: ',',
  //   persist: false,
  //   //  options: [
  //   //     {email: 'brian@thirdroute.com', text: 'Brian Reavis'},
  //   //     {email: 'nikola@tesla.com', text: 'Nikola Tesla'},
  //   // ],
  //   create: function (input) {
  //     return {
  //       value: input,
  //       text: input
  //     }
  //   }
  // });


  // 
  // 
})
