var noteJsModel = {
    test: {
        name: "mostafa"
    },
    getNotes: function (page, perPage, title) {
        return axios.get('/GetNotes?page=' + page + "&perPage=" + perPage + title)
    },
    deleteNote: function (id) {
        return axios.get('/DeleteNote?id=' + id)
    }

}

export { noteJsModel };