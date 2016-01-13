var StudentListView = Backbone.View.extend ({

    el: '#app',

    events: {
        'submit form': 'addStudent',
        'change input[type="radio"]': 'seeStudent'
    },

    initialize: function() {

        this.myStudentCollection = new StudentCollection();
        this.render();

  },

    addStudent: function(event) {
        event.preventDefault();

        var $form = $(event.currentTarget);
        var fname = $form.find(".student-name").val();
        var fsurname = $form.find(".student-surname").val();

        var student = new StudentModel({
            name: fname,
            surname: fsurname
        });

        this.myStudentCollection.add(student);
        this.render();
    },

    seeStudent: function(event) {

        var $input = $(event.currentTarget);
        var inputValue = $input.val();
        var studentName = $input.parents('li').attr('data-name');
        var student = this.myStudentCollection.findWhere({'name': studentName});
        if (student) {
            if (inputValue === 'seen') {
                student.set({'seen': true});
            } else {
                student.set({'seen': false});
            }
        }
    },

    getTemplate: function(movie) {

        var isSeenChecked = '';
        var isNotSeenChecked = 'checked';

        if (movie.seen) {
            isSeenChecked = 'checked';
            isNotSeenChecked = '';
        }

        var studentTemplate = '\
        <li data-name="' + student.name + '">\
            <div class="new-attendance">\
                <div class="student-name">\
                    <p>' + student.name + '</p>\
                </div>\
            </div>\
            <form>\
                <div class="seen">\
                    <input type="radio" name="seenRadio" value="seen" '+ isSeenChecked + ' /> Seen\
                </div>\
                <div class="seen">\
                    <input type="radio" name="seenRadio" value="notseen" ' + isNotSeenChecked + '> Not seen\
                </div>\
            </form>\
        </li>';

        return $(studentTemplate);
    },

    render: function() {
        var $renderTarget = this.$('.student-list');
        $renderTarget.empty();

        var allStudent = this.myStudentCollection.toJSON();

        for (var i = 0; i < allStudent.length; i++) {
            var student = allStudent[i];
            var studentTemplate = this.getTemplate(student);
            $renderTarget.append(studentTemplate);
        }
    }

});