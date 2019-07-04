
import { noteJsModel } from "./model/noteJsModel"
import { codeMirrorComponent } from "./components/codeMirrorComponent"
import { select2 } from "./components/select2"
import { dropdowns } from "./common/dropdownsJs"

window.EnableAddNode = function () {
  var app = new Vue({
    el: '#anapp',
    // template: '#demo-template',
    data: {
      selected: "kkk",
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
      select2
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
            this.selected = "";

            // $("#nType").select2("val", "");
            $("#specificSubject").select2("val", "");

          })
          .catch((error) => {
            alert(error)
          })

      },
      getSelectValue(data) {

        // alert( data.text)
        this.nodeModel.noteType.text = data.text;
        this.nodeModel.noteType.id = data.id;
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

    beforeCreate() {
      console.log('Nothing gets called before me!')
    },
    created() {
      console.log('created ')
    },
    mounted() {
      console.log("sssssssssssssssssssssssssssssssssss")
      // dropdowns.enableNoteType(app);
      dropdowns.enableProject(app);
      dropdowns.enableGeneralSubject(app);
      dropdowns.enableSpecificSubject(app);
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
  })
}