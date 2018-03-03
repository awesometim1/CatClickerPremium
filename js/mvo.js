$(function(){

    var model = {
        currentCat: null,
        init: function() {
            if (!localStorage.cats) {
                var models = [];
                //Initialize all of the cats
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
        addScore: function(id) {
            var cats = JSON.parse(localStorage.cats);
            for (var i = 0; i < cats.length; i ++){
                var catName = "kitten" + id;
                if (cats[i]['catName']==catName){
                    cats[i]['catScore']++;
                    break;
                }
            }
            localStorage.cats = JSON.stringify(cats);
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
            model.currentCat = model.getModel()[0];
            view.init();
        },
        incScore: function(id){
            model.addScore(id);
        },
        matchCat: function(catName){
            var cats = model.getModel();
            for (var i = 0; i < cats.length; i ++){
                if (cats[i]['catName']==catName){
                    return cats[i];
                }
            };//end for
        },
        getCurrentCat: function(){
            return model.currentCat;
        },
        setCurrentCat: function(cat){
            model.currentCat = cat;
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
            var cats = [];
            octopus.getCats().forEach(function(cat){
                linkStr += '<button type = "button" id="'+ cat.catName +'">' + cat.catName + '</button>';
                cats.push(cat);
            });
            this.catLinks.html( linkStr );
            var display = this.catDisplay;
            var buttons = $('button');
            display.html('<img class = "display" src ="">');

            // Add event Listeners for cat buttons
            for (var i = 0; i < buttons.length; i ++){
                var cat = cats[i];
                //Select all of the buttons by id and add eventlistener onClick()
                $('#' + "kitten" + (i+1)).click((function(catCopy){
                    return function(){
                        if ($('h1').length > 1){
                            $('h1')[0].remove();
                            $('h1')[0].remove();
                        }
                        $('.cat-display').prepend('<h1>' + catCopy.catName + '</h1>')
                        $('.display').attr('src', catCopy.catLink);
                        $('.cat-display').append('<h1 class = "score">' + catCopy.catScore + '</h1>');
                        octopus.setCurrentCat(catCopy);
                        catCopy = octopus.getCurrentCat();
                    }
                    
                })(cat));

            }; //end for

            // Add all eventlisteners
            $('.display').click(function(){
                var idNum = parseInt($('.display').attr('src').slice(17));
                octopus.incScore(idNum);
                var score = $('.score').html();
                $('.score').html("" + (parseInt(score) + 1));
                
            });
            $('#admin').click(function(){
                $('.form').css('display', "inline-block");
                var currentCat = octopus.getCurrentCat();
                $('#name').attr('placeholder', currentCat.catName);
                $('#url').attr('placeholder', currentCat.catLink);
                $('#clicks').attr('placeholder', currentCat.catScore);
            })
            $("#cancel").click(function(){
                $('.form').css('display', "none");
            })
            $('#submit').click(function(){
                $('#name').attr('placeholder')
                $('#url').html();
                $('#clicks').html();
                //Get all inputs
                var name = $('#name').html();
                var url = $('#url').html();
                var clicks = $('#clicks').html();
            })

        }//end render
    };//end view

    octopus.init();


});