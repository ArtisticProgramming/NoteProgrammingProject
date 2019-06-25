var noteJsModel = {
    test: {
        name: "mostafa"
    },
    getNotes: function (page, perPage, title,bookMark) {
        return axios.get('/GetNotes?page=' + page + "&perPage=" + perPage + title + bookMark)
    },
    deleteNote: function (id) {
        return axios.get('/DeleteNote?id=' + id)
    }

}

export { noteJsModel };