import React from "react";

function Notes() {
    return(
        <html>
            <head>
                    <title>Note taker</title>
                    <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css" />
                    <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
                    <script>
                            $(function(){
                            var notesList= [];
                            var selectedID = 0;

                            //custom funcs

                            //event listener
                            $("#btn_addNote").on("click", function(){
                                var note = new Object();
                                note.title = $("#tf_title").val();
                                note.content = $("#tf_content").val();
                                notesList.push(note);

                                localStorage.notesList = JSON.stringify (notesList);
                            });

                            $("#page_notes").on("pagebeforeshow", function() {
                                $("#list_notes").html("");

                                if (localStorage.notesList != undefined)
                                notesList = JSON.parse (localStorage.notesList);

                                for(i=0; i<notesList.length;i++){
                                    $("#list_notes").append("<li id='" + i + "'> <a href='#page_viewNote'>" + notesList[i].title + "</a></li>");
                                }

                                $("#list_notes li").on("click", function(){
                                    selectedID = this.id;
                                });
                                $("#list_notes").listview("refresh");
                            });

                            $("#page_viewNote").on("pagebeforeshow", function(){
                                $(this).find(".ui-content h2").html(notesList[selectedID].title);
                                $(this).find(".ui-content p").html(notesList[selectedID].content);
                            });

                        });
                    </script>
                    <script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>


            </head>

            <body>
                <div id="page_notes" data-role="page">
                    <div data-role="header">
                        <h2>Your notes</h2>
                        <a href="#page_addNote" data-icon="plus" class="ui-btn-right" data-role="button">Add</a>
                    </div>
                    <div class="ui-content">
                        <ul id="list_notes" data-role="listview">
                            <li><a href="#page_viewNote"></a></li>
                        </ul>
                    </div>
                </div>

                <div id="page_viewNote" data-role="page">
                    <div data-role="header">
                        <a data-rel="back" data-role="button" data-icon="carat-l">Back</a>
                        <h2>View Notes</h2>
                    </div>
                    <div class="ui-content">
                        <h2>Example Note</h2>
                        <p>Content of Note</p>
                    </div>
                </div>

                <div id="page_addNote" data-role="page">
                    <div data-role="header">
                        <a data-rel="back" data-role="button" data-icon="carat-l">Back</a>
                        <h2>Add Note</h2>
                    </div>
                    <div class="ui-content">
                        <input type="text" id="tf_title"></input>
                        <textarea id="tf_content"></textarea>
                        <a id="btn_addNote" href="#page_notes" data-role="button">Add Note</a>
                    </div>
                </div>



            </body>

        </html>








    )
}