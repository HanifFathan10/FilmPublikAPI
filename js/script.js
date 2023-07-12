function searchMovie() {
    $('#movie-list').html(''); 
    
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '77c4a010',
            's': $('#search-input').val()
        },
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search;

                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img src="` + data.Poster + `" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title">` + data.Tittle + `</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">` + data.Year + `</h6>
                                <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` + data.imdbID + `">See Detail</a>
                                </div>
                            </div>
                        </div>
                    `)
                })

                $('#search-input').val('');

            } else {
                $('#movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">` + result.Error + `</h1>
                    </div>
                `)
            }
        }
    });
}

$('#search-button').on('click', function() {
    searchMovie();
});

$('#search-input').on('keyup', function(e) {
    if (e.which === 13) {
        searchMovie();
    }
})

$('#movie-list').on('click', '.see-detail', function() {
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '77c4a010',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if(movie.Response === "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="` + movie.Poster + `" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>` + movie.Title + `</h3></li>
                                </ul>
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>Realesed : ` + movie.Released + `</h3></li>
                                </ul>
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>Genre : ` + movie.Genre + `</h3></li>
                                </ul>
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>Director : ` + movie.Director + `</h3></li>
                                </ul>
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>Actor : ` + movie.Actors + `</h3></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `)
            }
        }
    });
});