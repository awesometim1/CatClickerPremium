$(function(){

    var model = {
        init: function() {
            if (!localStorage.cats) {
                var models = [];
                for (var i = 1; i <= 5; i ++){
                    models.push({
                        catName: "kitten" + i,
                        catLink: "static/img/kitten" + i + ".jpg",
                        catScore: 0
                    });
                }
                localStorage.cats = JSON.stringify(models);
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
        addNewCat: function(catName) {
            model.add({
                catName: newCat,
                catLink: "static/img/" + catName + ".jpg",
                catScore: 0
            });
            view.render();
        },

        getCats: function() {
            return model.getModel();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.catLinks = $('.cat-links');
            this.catDisplay = $('.cat-display');
            view.render();
        },
        render: function(){
            var linkStr = '';
            octopus.getCats().forEach(function(cat){
                linkStr += '<button type = "button" class="note">' + cat.catName + '</button>';
            });
            this.catLinks.html( linkStr );
        }
    };

    octopus.init();
});