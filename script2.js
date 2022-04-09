const access_token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcyZjdhNmNkZDI5YzIxNGQxYjM5ODMwMGY0NWQ5YjY0MGJjYzEyZmQ3Y2E1YjNkOTc4Nzc0NjQyMDU2MjlkNmU0YzgwNzM0ZGFjNjljY2U4In0.eyJhdWQiOiI3ODUzIiwianRpIjoiNzJmN2E2Y2RkMjljMjE0ZDFiMzk4MzAwZjQ1ZDliNjQwYmNjMTJmZDdjYTViM2Q5Nzg3NzQ2NDIwNTYyOWQ2ZTRjODA3MzRkYWM2OWNjZTgiLCJpYXQiOjE2NDg0MjU0OTgsIm5iZiI6MTY0ODQyNTQ5OCwiZXhwIjoxNjc5OTYxNDk4LCJzdWIiOiIxOTAxNzMiLCJzY29wZXMiOltdfQ.bqn4_nrjJj0OcvWjhJQm9VQyf76KhqfMstKZ-b4xG5Z-9I1zY1QAD5TGff1Y_xI-cHzkx6oBzboWruB_td6FAB5YhUalzkorHiGVqBpD0HHwxXiZIS79-9gPlo6TW6ktx2weaOm-fGcXWx4hZn8hb8XIVE-8DF6evDO596gDVtBIQb75QTPWeqR3AJbtiC8hzFTfDZDcYrAveqGoiAhi92PNJoPcEmJMno7ygoVSUfwGn0MRLWBu7m5nYx5xTU7Jm6KsTsnD-tklLoCdTcPxqVzK5MnZZiWjl6wuakyQ9CUpQDpuBuSLeYQcrA9F-npxYxSMdHuHsqvWMfzBAfRIxWjWfo-cTnWK5s8dewm6AHMeEPOBgePT8tCgC6W16Luzf1PhGuCgt_WFGiYVUUct5Wtx2mHZ3XbGpzu07Mov4bfOutBg63YF-Ev4yGBTa5EPUqJYinFuFZJR3-u8RJ9IpyCK9loBcEpBc9fvYfOCWvh3k3RiJthpdPz3wgkmmgbbhWUZE1OFmJwW5rcqhl-Mkk2zWq_cTxhMjI4lfCHgCjlVizsh5Y3aUXKfhdOeObjAAkFlf_9Hc07JeErm2u5F2_XbVydv4TYyN9Er6ykzeTZBRaNJyCAoarVsaRlSjqYSVCq-wIk46j2T5Tn9W-iRx7Icqq62k7xvnAzL4QBIjKo";

var query = `{
    MediaListCollection(userId: 190173, type: ANIME, status_in: PLANNING) {
      lists {
        entries {
          media {
            id
            title {
              userPreferred
            }
            episodes
            description
            season
            seasonYear
            coverImage {
              extraLarge
            }
            trailer {
              site
              thumbnail
              id
            }
            genres
            averageScore
            streamingEpisodes {
              site
            }
          }
        }
      }
    }
  }`;

var url = "https://graphql.anilist.co",
  options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + access_token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
  };

fetch(url, options)
  .then((response) => response.json())
  .then((response) => response.data.MediaListCollection.lists[0].entries)
  .then((response) => randomize(response));
// .then(createTrailer())

const randomize = (data) => {
  for (i = 0; i < 5; i++) {
    var k = Math.floor(Math.random() * (data.length - 0 + 1));

    displayAnime(k, data);
  }
  createTrailer(data);
};

const displayAnime = (i, planList) => {
  let anime = planList[i].media;
  console.log(anime);

  const table = $('<div id="table" class="container-fluid">');
  $("body").append(table);

  const name = $('<div class="col-6">');
  const score = $('<div class="col-3">');
  const episode = $('<div class="col-3">');

  name.text(anime.title.userPreferred);
  episode.text(`Episodes:${anime.episodes}`);
  score.text(`Score:${anime.averageScore}`);

  const row1 = $('<div class="row">');
  table.append(row1);

  row1.append(name);
  row1.append(episode);
  row1.append(score);

  const picture = $('<div class="col-4 picture">');
  picture.css("background-image", `url('  ${anime.coverImage.extraLarge} ')`);
  picture.css("background-size", "contain");
  picture.css("background-repeat", "no-repeat");

  const description = $('<div class="col-12 overflow-scroll dis">');
  description.text(anime.description);
  const genre = $('<div class="col-8 text-wrap genre-season">');
  genre.text(anime.genres);
  const season = $('<div class="col-4 genre-season">');
  season.text(`${anime.season} ${anime.seasonYear}`);

  const row2 = $('<div class="row">');
  const row2_2 = $('<div class="row">');
  const pictureRow = $('<div class="col-8">');

  table.append(row2);
  row2.append(picture);
  row2.append(pictureRow);
  pictureRow.append(row2_2);
  row2_2.append(description);
  row2_2.append(genre);
  row2_2.append(season);

  if (anime.trailer !== null) {
    if (anime.trailer.site == "youtube") {
      var trailer = $(
        `<button type="button" class="btn btn-primary trailer col-6" id="${i}">`
        );
        trailer.text("Play Trailer");
  //     var trailer = $(
  //       `<iframe width="127" height="100" allowfullscreen src="https://www.youtube.com/embed/${anime.trailer.id}?showinfo=0&controls=0&autohid=1"  frameborder="0"  class="col-12 trailer">`
  //     );
    }
  } else {
    var trailer = $('<div class = "col-12">')
    trailer.text("NOT FOUND");
  }
  row2_2.append(trailer);
};

const createTrailer = (data) => {
  $(".trailer").on("click", function (event) {

    let i = $(event.target).attr('id')
    console.log(event.target)
    console.log($(event.target).attr('id'));
    anime = data[i].media
    var modalBody = $('#modalBody')
    const trailer = $(
             `<iframe allowfullscreen src="https://www.youtube.com/embed/${anime.trailer.id}?showinfo=0&controls=0&autohid=1&autoplay=1"  frameborder="0">`)
      modalBody.html(trailer)
      
    var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));

    myModal.show();

    $(".btn-close").on("click", function (event) {
      myModal.hide();
      console.log("1");
    });
  });
};
