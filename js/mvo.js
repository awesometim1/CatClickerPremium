$(function(){

    var model = {
        init: function() {
            if (!localStorage.cats) {
                localStorage.cats = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.cats);
            data.push(obj);
            localStorage.cats = JSON.stringify(data);
        },
        getModel: function() {
            return JSON.parse(localStorage.cats);
        }
    };


    var octopus = {
        addNewCat: function(catName, ) {
            model.add({
                catName: newCat,
                catLink:catName + ".jpg"
            });
            view.render();
        },

        getCats: function() {
            return model.getModel().reverse();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                        '<span class = "note-date">' +  new Date(note.date).toString() + '</span>' + 
                        note.content + 
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});