
import { noteJsModel } from "./model/noteJsModel"
import { codeMirrorComponent } from "./components/codeMirrorComponent"
import { select2 } from "./components/select2"


window.EnableAddNode = function () {
  var app = new Vue({
    el: '#anapp',
    // template: '#demo-template',
    data: {
      selectedProject: "",
      selectedSpecificSubject: "",
      selectedGeneralSubject: "",
      selectedNoteType: "",
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
            this.selectedProject= "";
            this.selectedNoteType= "";
            this.selectedSpecificSubject= "";
            this.selectedGeneralSubject= "";
          })
          .catch((error) => {
            alert(error)
          })

      },
      getNoteTypeSelectValue(data) {
        this.nodeModel.noteType.text = data.text;
        this.nodeModel.noteType.id = data.id;
        this.selectedNoteType = data.text;

      },
      getProjectSelectValue(data) {
        app.nodeModel.projectType.text = data.text;
        app.nodeModel.projectType.id = data.id;
        this.selectedProject= data.text;

      },
      getGeneralSubjectSelectValue(data) {
        app.nodeModel.technologyType.text = data.text;
        app.nodeModel.technologyType.id = data.id;
        this.selectedGeneralSubject= data.text;

      },      
      getSpecificSubjectSelectValue(data) {
        app.nodeModel.specificSubject.text = data.text;
        app.nodeModel.specificSubject.id = data.id;
        this.selectedSpecificSubject= data.text;

      },
      // -----------------------------------------------------------------

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
     // $(".cardHeigth").blur();
    }
  });


 
}