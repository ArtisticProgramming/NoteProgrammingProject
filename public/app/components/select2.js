export const select2 = Vue.component('select2', {
    props: ['options', 'value','url'],
    data() {
        return {
            selectValue: '1234',
        };
    },
    template: `<input /> `,
 
    mounted: function () {
        var vm = this
         select2=  $(this.$el).select2({
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
              url:vm.url,
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
                console.log()
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
               vm.$emit("input-data", data);
            //   app.nodeModel.noteType.text = data.text;
            //   app.nodeModel.noteType.id = data.id;
            }
          })
    },
    watch: {
        value: function (value) {
            console.log(value)
     
            // alert(value)
            if(value ==""){
                $(this.$el).select2("val", "");
            }
        },
        options: function (options) {
            console.log(options)
        }
    },
    destroyed: function () {
            $(this.$el).off().select2('destroy')
    }
})











// -----------------------------------------------------------------------------------------------

// export const selectize = Vue.component('selectize', {
//     props: ['options', 'value'],
//     template: `  
//     <select>
//     <slot></slot>
//     </select>`,
//     mounted: function () {
//         debugger
//         var vm = this
//         $(this.$el).selectize({
//             maxItems: 4,
//             delimiter: ',',
//             persist: false,
//             //  options: [
//             //     {email: 'brian@thirdroute.com', text: 'Brian Reavis'},
//             //     {email: 'nikola@tesla.com', text: 'Nikola Tesla'},
//             // ],
//             create: function (input) {
//               return {
//                 value: input,
//                 text: input
//               }
//             }
//           }).on('change',function(){   
//             alert("sdfsd") 
//           // $('#mySelect').attr('size','1');
//           // $('#mySelect').trigger('blur');
//            });
//         //   $(sz).on('change',function(){   
//         //       alert("sdfsd") 
//         //     // $('#mySelect').attr('size','1');
//         //     // $('#mySelect').trigger('blur');
//         //      });
//             // init select2
//             // .select2({ 
//             //     data: this.options,
//             //      theme: "bootstrap4" ,multiple: true,})
//             // .val(this.value)
//             // .trigger('change')
//             // // emit event on change.
//             // .on('change', function () {
//             //     vm.$emit('input', this.value)
//             // })
//     },
//     watch: {
//         value: function (value) {
//             console.log("sfddsf")
//             // update value
//             // console.log("Hello")
//             // $(this.$el)
//             //     .val(value)
//             //     .trigger('change')
//         },
//         options: function (options) {
//             // update options
//             // $(this.$el).empty().select2({ data: options })
//         }
//     },
//     destroyed: function () {
//         // $(this.$el).off().select2('destroy')
//     }
// })
