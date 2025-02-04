<script>
        function showLoadingSpinner() {
        document.getElementById('loading').style.display = 'flex';
    }

    ClassicEditor
        .create(document.querySelector('#lessonContent'))
        .catch(error => {
            console.error(error);
        });

    function submitForm() {
        console.log("Submitting form with module_id:", $('#module_id').val());
        return true;
    }

    

    $(document).ready(function () {
        $('#hasVideo').change(function () {
            if ($(this).val() == '1') {
                $('#videoField').removeClass('d-none');
            } else {
                $('#videoField').addClass('d-none');
            }
        });

        $('#hasQuiz').change(function () {
            if ($(this).val() == '1') {
                $('#quizField').removeClass('d-none');
            } else {
                $('#quizField').addClass('d-none');
            }
        });

        $('#hasAssignment').change(function () {
            if ($(this).val() == '1') {
                $('#assignmentField').removeClass('d-none');
            } else {
                $('#assignmentField').addClass('d-none');
            }
        });

        $('#hasResource').change(function () {
            if ($(this).val() == '1') {
                $('#resourceField').removeClass('d-none');
            } else {
                $('#resourceField').addClass('d-none');
            }
        });

        $('#courseSelect').change(function () {
            var courseId = $(this).val();
            if (courseId) {
                $.ajax({
                    url: '<?= base_url('lesson/getModules') ?>',
                    type: 'GET',
                    data: { course_id: courseId },
                    success: function (response) {
                        var modules = response.modules;
                        var moduleList = $('#moduleList');
                        moduleList.empty();
                        if (modules.length > 0) {
                            modules.forEach(function (module) {
                                moduleList.append('<button type="button" class="btn btn-outline-primary text-left module-btn" data-module-id="' + module.module_id + '">' + module.module_name + '</button>');
                            });
                        } else {
                            moduleList.append('<p>No modules found for the selected course.</p>');
                        }
                    },
                    error: function (error) {
                        console.error('Error fetching modules:', error);
                    }
                });
            } else {
                $('#moduleList').empty();
            }
        });


        

        $(document).on('click', '.module-btn', function () {
            var moduleId = $(this).data('module-id');
            $('#module_id').val(moduleId);
            $('.module-btn').removeClass('active-module');
            $(this).addClass('active-module');

            // Show the lesson form container
            $('#lessonFormContainer').removeClass('d-none');
            $('#editLessonBtn').addClass('d-none');

            $.ajax({
                url: '<?= base_url('lesson/getModuleDetails') ?>',
                type: 'GET',
                data: { module_id: moduleId },
                success: function (response) {
                    if (response.lesson_title) {
                        $('#lessonTitle').val(response.lesson_title);
                        $('#lessonContent').val(response.lesson_content);
                        $('#hasVideo').val(response.has_video);
                        if (response.has_video == '1') {
                            $('#videoField').removeClass('d-none');
                            $('#videoSelection').val(response.video_id);
                        } else {
                            $('#videoField').addClass('d-none');
                        }
                        $('#hasQuiz').val(response.has_quiz);
                        if (response.has_quiz == '1') {
                            $('#quizField').removeClass('d-none');
                            $('#quizSelection').val(response.quiz_id);
                        } else {
                            $('#quizField').addClass('d-none');
                        }
                        $('#hasAssignment').val(response.has_assignment);
                        if (response.has_assignment == '1') {
                            $('#assignmentField').removeClass('d-none');
                            $('#assignmentSelection').val(response.assignment_id);
                        } else {
                            $('#assignmentField').addClass('d-none');
                        }
                        $('#hasResource').val(response.has_resource);
                        if (response.has_resource == '1') {
                            $('#resourceField').removeClass('d-none');
                            $('#resourceSelection').val(response.resource_id);
                        } else {
                            $('#resourceField').addClass('d-none');
                        }
                        $('#duration').val(response.duration);

                        // Hide the form and show the edit button
                        $('#lessonFormContainer').addClass('d-none');
                        $('#editLessonBtn').removeClass('d-none');
                    } else {
                        // Clear the form fields if no data is returned
                        $('#lessonTitle').val('');
                        $('#lessonContent').val('');
                        $('#hasVideo').val('0');
                        $('#videoField').addClass('d-none');
                        $('#hasQuiz').val('0');
                        $('#quizField').addClass('d-none');
                        $('#hasAssignment').val('0');
                        $('#assignmentField').addClass('d-none');
                        $('#hasResource').val('0');
                        $('#resourceField').addClass('d-none');
                        $('#duration').val('');

                        // Show the form and hide the edit button
                        $('#lessonFormContainer').removeClass('d-none');
                        $('#editLessonBtn').addClass('d-none');
                    }
                },
                error: function (error) {
                    console.error('Error fetching module details:', error);
                }
            });
        });

        $('#editLessonBtn').click(function () {
            $('#lessonFormContainer').removeClass('d-none');
            $('#editLessonBtn').addClass('d-none');
        });

        $('#lessonForm').on('submit', function (event) {
            event.preventDefault();

            // Show loading animation
            $('#loadingAnimation').removeClass('d-none');

            var formData = $(this).serialize();

            $.ajax({
                url: '<?= base_url('lesson/save') ?>',
                type: 'POST',
                data: formData,
                success: function (response) {
                    // Handle success response
                    alert('Lesson saved successfully');

                    // Hide the form and show the edit button
                    $('#lessonFormContainer').addClass('d-none');
                    $('#editLessonBtn').removeClass('d-none');
                },
                error: function (error) {
                    // Handle error response
                    alert('Failed to save the lesson');
                },
                complete: function () {
                    // Hide loading animation
                    $('#loadingAnimation').addClass('d-none');
                }
            });
        });
    });
</script>