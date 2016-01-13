var StudentListView = Backbone.View.extend ({

    el: '#app',

    events: {
        'submit form': 'addStudent',
        'change input[type="radio"]': 'seeStudent'
    },

    initialize: function() {
        this.myStudentCollection = new StudentCollection();
        this.myStudentCollection.fetch();
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
        student.save();
        this.render();
    },

    seeStudent: function(event) {

        var $input = $(event.currentTarget);
        var inputValue = $input.val();
        var studentName = $input.parents('li').attr('data-name');
        var student = this.myStudentCollection.findWhere({'name': studentName});
        if (student) {
            if (inputValue === 'present') {
                student.set({'seen': true});
            } else {
                student.set({'seen': false});
            } 
            student.save();
        }
    },

    getTemplate: function(student) {

        var isPresentChecked = 'checked';
        var isNotPresentChecked = '';

        if (!student.seen) {
            isPresentChecked = '';
            isNotPresentChecked = 'checked';
        }

        var studentTemplate = '\
        <li data-name="' + student.name + '">\
            <div class="new-attendance">\
                <div class="student-name">\
                    <p>' + student.name + '</p>\
                </div>\
            </div>\
            <form>\
                <div class="here">\
                    <input type="radio" name="presentRadio" value="present" '+ isPresentChecked + ' /> Présent\
                </div>\
                <div class="here">\
                    <input type="radio" name="presentRadio" value="notpresent" ' + isNotPresentChecked + '> Absent\
                </div>\
            </form>\
        </li>';

        return $(studentTemplate);
    },

    render: function() {
        var $renderTarget = this.$('.student-list');
        $renderTarget.empty();

        var allStudent = this.myStudentCollection.toJSON();

        var absents = 0;

        var presents = 0;

        for (var i = 0; i < allStudent.length; i++) {

            var student = allStudent[i];
            if (!student.seen) {
                absents++;
            } else {
                presents++;
            }
            var studentTemplate = this.getTemplate(student);
            $renderTarget.append(studentTemplate);
        }
        $('.class').html(allStudent.length);
        $('.present').html(presents);
        $('.truant').html(absents);
    }

});