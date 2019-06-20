export const selectize = Vue.component('selectize', {
    props: ['options', 'value','url'],
    data() {
        return {
            selectValue: '1234',
        };
    },
    template: `  
    <select >
    <slot></slot>
    </select>`,
    mounted: function () {
        var vm = this
        var s = $(this.$el).selectize({
            maxItems: 1,
            delimiter: ',',
            persist: false,
            items: ["sdf", "sdfsdf"],
            renderCache:false,
            create: function (input) {
                console.log("Create")
                return {
                    newTag: true,
                    value: input,
                    text: input
                }
            },
            load: function(query, callback) {
                console.log("---LOAD---")
                if (!query.length) return callback();
                this.clear();
                this.clearOptions();
                $.ajax({
                    url: vm.url + "?query="+query,
                    cache:false,
                    type: 'GET',
                    error: function() {
                        callback();
                    },
                    success: function(res) {
                        console.log(res.model)
                        callback(res.model.slice(0,10));
                    }
                });
            }
        })
        $(s).on('change', function () {
            debugger;
            //console.log( s[0].selectize)
            var selectize = s[0].selectize;
            // console.log(s[0].selectize.items[0])
            console.log(s[0].selectize.getValue())
            console.log(s[0].selectize.getItem())
            console.log(s[0].selectize.items)

            var selected_objects = $.map(selectize.items, function (value) {
                console.log(selectize.options[value])
                return selectize.options[value];
            });
            this.selectValue = s[0].selectize.items[0];
            console.log(s[0].selectize)

            vm.$emit("input-data", this.selectValue);

        });
    },
    watch: {
        value: function (value) {
            console.log(value)
        },
        options: function (options) {
            console.log(options)
        }
    },
    destroyed: function () {
        // $(this.$el).off().select2('destroy')
    }
})
