import LiquorTree from 'liquor-tree'
import { noteJsModel } from "./model/noteJsModel"
import { codeMirrorComponent } from "./components/codeMirrorComponent"
var app = new Vue({
  el: '#appList',
  components: {
    LiquorTree,
    codeMirrorComponent
  },
  data: function () {
    
    return {
      editMode:false,
      componentKey:1,
      boxmodel:[],
      // treeData0: f0,
      treeFilter0: '',
      treeOptions0: {
        filter: {
          emptyText: ''
        }
      },
      treeData: this.getData(),
      treeOptions: {
      }
    }
  },
  mounted() {
    $("#filter").focus();

  },
  methods: {
   
    filter() {

    },
    getData() {
      return fetch("/GetNoteTree")
      .then(r =>
        r.json()
      )
      .catch(e => console.log(e))
    },
    getNote(model)
    {
      noteJsModel.getNote(model).then(response => {
        console.log(response.data.model);
        this.boxmodel=[];
        this.boxmodel.push(response.data.model)

        this.$nextTick(function () {
          // DOM is now updated
          // `this` is bound to the current instance
          this.componentKey += 1;

        })
      })
    },
    updateCodeMirrorText(item) {
      console.log(item)
      this.boxmodel[0].code[item.index].mainbody = item.value
    },    
    search: function () {
      // alert("s")
      console.log(this.$refs)
    },
    updateNote(){
      var model=this.boxmodel[0];
      noteJsModel.updateNote(model)
      .then(response => {
        debugger;
        this.editMode=false
        alert("The recorde was updated successfully.")
        this.$nextTick(function () {
          this.componentKey += 1;
        })
      })
    },
    editMode(){
      alert("editMode")
      if(this.editMode)
        this.editMode = false;
      else
        this.editMode = true;
    },
    onNodeSelected(item) {
      if (item.children.length == 0) {
        // window.location.href = '/Note?id='+item.id+'&title='+item.text.replace(/ /g,'_')()
        this.getNote(item)
      }
    }
  }
})
