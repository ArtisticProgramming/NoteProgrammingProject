import { noteJsModel } from "./model/noteJsModel"
import { codeMirrorComponent } from "./components/codeMirrorComponent"
import { utility } from "./common/utilityJs"
import { dropdowns } from "./common/dropdownsJs";
import { select2 } from "./components/select2"


window.EnableVusJs = function () {
  console.log(noteJsModel.test.name);

  var action = 'inactive';
  var page = 1;
  var app = new Vue({
    el: '#app',
    data: {
      noteType: {},
      message: 'Hello Vue!',
      searchModel: {
        searchTextBox: "",
        bookMark: false,
        noteType: "",
        projectName: "",
        technology: "",
        specificSubject: "",
      },

      boxmodel: [],
      deleteModalNote: {
        id: 0,
        index: 0,
        text: ""
      },
      componentKey: 0,

    },
    components: {
      codeMirrorComponent,
      select2
    },
    updated: function () {

    },
    methods: {
      getNoteTypeSelectValue(data) {
        this.searchModel.noteType = data.text;
      },
      getProjectSelectValue(data) {
        this.searchModel.projectName = data.text;
      },
      getGeneralSubjectSelectValue(data) {
        this.searchModel.technology = data.text;
      },
      getSpecificSubjectSelectValue(data) {
        this.searchModel.specificSubject = data.text;
      },
      search: function () {
        page = 1;
        this.loadNote(page, true);
      },
      loadNote(page, reset) {
        console.log("LLLLLLLLLLLLLLLLOOODDD")
        var param = {
          page: page,
          perPage: 8,
          title: "",
          bookMark: "",
          noteType: "",
          projectName: "",
          technology: "",
          specificSubject: "",
        }

        console.log(this.searchModel.searchTextBox)

        if (this.searchModel.searchTextBox !== undefined && this.searchModel.searchTextBox != "")
          param.title = "&title=" + this.searchModel.searchTextBox;

        if (this.searchModel.bookMark !== undefined && this.searchModel.bookMark != false)
          param.bookMark = "&bookMark=" + this.searchModel.bookMark;

        if (this.searchModel.noteType !== undefined && this.searchModel.noteType != false)
          param.noteType = "&noteType=" + this.searchModel.noteType;

        if (this.searchModel.projectName !== undefined && this.searchModel.projectName != false)
          param.projectName = "&projectName=" + this.searchModel.projectName;

        if (this.searchModel.technology !== undefined && this.searchModel.technology != false)
          param.technology = "&technology=" + this.searchModel.technology;

        if (this.searchModel.specificSubject !== undefined && this.searchModel.specificSubject != false)
          param.specificSubject = "&specificSubject=" + this.searchModel.specificSubject;


        noteJsModel.getNotes(param)
          .then(response => {
            if (reset) {
              this.boxmodel = [];
              this.boxmodel = response.data.model
            }
            else {
              response.data.model.forEach(element => {
                this.boxmodel.push(element);
              });
            }
            action = 'inactive';
            this.$nextTick(function () {
              // DOM is now updated
              // `this` is bound to the current instance
              this.componentKey += 1;

            })
          }
          )
      },
      OpenCloseNote(id) {
        var heigth = "100px";
        debugger;
        $("#oc-" + id)
        console.log($(this).parent().parent().children(".cardHeigth"))
        var selctor = $("#oc-" + id);
        var sele = $(selctor).parent().parent()
        var h = $(selctor).css("height");
        if (h == heigth) {
          $(selctor).css('height', 'auto');
          $(selctor).css('overflow-y', 'hidden');
          $(sele).removeClass("col-lg-6")
          $(sele).addClass("col-lg-12")
        } else {
          $(selctor).css('height', heigth);
          $(selctor).css('overflow-y', 'scroll');
          $(sele).removeClass("col-lg-12")
          $(sele).addClass("col-lg-6")
          // $(selctor).animate({height:"100px"}, 400, function() {
          //     // Animation complete.
          //   });
        }
        return false;
      },
      openDeleteModal(id, index) {
        console.log(id)
        this.deleteModalNote.id = id;
        this.deleteModalNote.index = index;
        index
        this.$nextTick(function () {
          $('#deleteModal').modal('toggle');
        })
      },
      deleteNote(id, index) {
        // if (confirm("Wanna Delete?")) {
        noteJsModel.deleteNote(id)
          .then(response => {
            debugger;
            this.$delete(this.boxmodel, index)
            this.$nextTick(function () {
              $('#deleteModal').modal('hide');
              //Update Components and everyThing
              this.componentKey += 1;
            })
          }
          )
        // }
      }
    },
    created: function () {
      // alert("dsdfs")
    },
    mounted() {
      // dropdowns.enableNoteType(app);
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
      console.log("page=>")
      console.log(utility.getUrlParameter("project"))
      this.loadNote(page);

    }
  });

  $(window).scroll(function () {
    if (($(window).scrollTop() + $(window).height() > $(document).height() - 5) && action == 'inactive') {
      action = 'active';
      //  start = start + limit;
      setTimeout(function () {
        page = page + 1;
        app.loadNote(page);
      }, 500);
    }
  });
  $(document).ready(function () {
    $("#searchTxt").focus();
  });


  $('body').on('click', '.OpenCloseNote', function () {

  });

}