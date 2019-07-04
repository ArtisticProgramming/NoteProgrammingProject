var noteJsModel = {
    test: {
        name: "mostafa"
    },
    getNotes: function (param) {
        return axios.get('/GetNotes?page=' +param.page + "&perPage="
         + param.perPage 
         + param.title 
         + param.bookMark 
         + param.noteType
         + param.projectName
         + param.technology
         + param.specificSubject
         )
    },
    deleteNote: function (id) {
        return axios.get('/DeleteNote?id=' + id)
    }

}

export { noteJsModel };