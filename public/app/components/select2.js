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
