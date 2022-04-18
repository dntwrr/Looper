//Secret = KDoHhmRC03HIRIIwTl4VzboWwfmWmMtferoPoyE5
// ID = 7853

var id = 7853;

function PasteLogin() {
  link = $(
    `<a href='https://anilist.co/api/v2/oauth/authorize?client_id=${id}&response_type=token'>`
  );
  link.text("Login");
  link.attr("id", "Login");
  $("body").append(link);
}

var access_token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcyZjdhNmNkZDI5YzIxNGQxYjM5ODMwMGY0NWQ5YjY0MGJjYzEyZmQ3Y2E1YjNkOTc4Nzc0NjQyMDU2MjlkNmU0YzgwNzM0ZGFjNjljY2U4In0.eyJhdWQiOiI3ODUzIiwianRpIjoiNzJmN2E2Y2RkMjljMjE0ZDFiMzk4MzAwZjQ1ZDliNjQwYmNjMTJmZDdjYTViM2Q5Nzg3NzQ2NDIwNTYyOWQ2ZTRjODA3MzRkYWM2OWNjZTgiLCJpYXQiOjE2NDg0MjU0OTgsIm5iZiI6MTY0ODQyNTQ5OCwiZXhwIjoxNjc5OTYxNDk4LCJzdWIiOiIxOTAxNzMiLCJzY29wZXMiOltdfQ.bqn4_nrjJj0OcvWjhJQm9VQyf76KhqfMstKZ-b4xG5Z-9I1zY1QAD5TGff1Y_xI-cHzkx6oBzboWruB_td6FAB5YhUalzkorHiGVqBpD0HHwxXiZIS79-9gPlo6TW6ktx2weaOm-fGcXWx4hZn8hb8XIVE-8DF6evDO596gDVtBIQb75QTPWeqR3AJbtiC8hzFTfDZDcYrAveqGoiAhi92PNJoPcEmJMno7ygoVSUfwGn0MRLWBu7m5nYx5xTU7Jm6KsTsnD-tklLoCdTcPxqVzK5MnZZiWjl6wuakyQ9CUpQDpuBuSLeYQcrA9F-npxYxSMdHuHsqvWMfzBAfRIxWjWfo-cTnWK5s8dewm6AHMeEPOBgePT8tCgC6W16Luzf1PhGuCgt_WFGiYVUUct5Wtx2mHZ3XbGpzu07Mov4bfOutBg63YF-Ev4yGBTa5EPUqJYinFuFZJR3-u8RJ9IpyCK9loBcEpBc9fvYfOCWvh3k3RiJthpdPz3wgkmmgbbhWUZE1OFmJwW5rcqhl-Mkk2zWq_cTxhMjI4lfCHgCjlVizsh5Y3aUXKfhdOeObjAAkFlf_9Hc07JeErm2u5F2_XbVydv4TYyN9Er6ykzeTZBRaNJyCAoarVsaRlSjqYSVCq-wIk46j2T5Tn9W-iRx7Icqq62k7xvnAzL4QBIjKo";

// access_token = window.location.hash.split('access_token=')[1]
console.log(access_token);

PasteLogin();

var query = `

query ($id: Int!, $listType: MediaType) {
  Page {
    mediaList(userId: 573, type: $listType) {
      id
      score
      scoreRaw: score(format: POINT_100)
      progress
      progressVolumes
      repeat
      private
      priority
      notes
      hiddenFromStatusLists
      startedAt {
        year
        month
        day
      }
      completedAt {
        year
        month
        day
      }
      updatedAt
      createdAt
      media {
        id
        title {
          userPreferred
        }
      }
    }
  }
}`;
190173
var variable = {
  id: 573,
};

var query2 = `{
  MediaListCollection(userId: 190173, type: ANIME, status_in: PLANNING) {
    lists {
      entries {
        media {
          id
          title {
            romaji
            english
            native
            userPreferred
          }
          episodes
          description
          season
          seasonYear
          coverImage {
            extraLarge
            large
            medium
          }
          trailer {
            site
            thumbnail
            id
          }
          genres
          tags {
            name
          }
          averageScore
          streamingEpisodes {
            site
          }
        }
      }
    }
  }
}`;

var queryTest = `{
  Media(search:"Fate/Zero") {
    id
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
      query: query2,
    }),
  };

fetch(url, options)
  .then((response) => response.json())
  .then(responseJson =>console.log(responseJson.data.MediaListCollection.lists[0].entries))
  .then((response) => randomize(response));

function randomize(response) {
  data = response.data.MediaListCollection.lists[0].entries;
  console.log("test", data);
  for (i = 0; i < 5; i++) {
    let k = Math.floor(Math.random() * (data.length - 0 + 1));

    createTable(k);
  }
}

function createTable(k) {
  console.log("table", data[k]);
  const table = $('<div id="table" class="col-12 container">');
  const row1 = $('<div id="1" class="col-12 row">');
  const row2 = $('<div id="2" class="col-12 row h-25">');
  const row3 = $('<div id="3" class="col-12 row">');
  let anime = data[k].media;

  const name = $('<div class="col-6">');
  const season = $('<p class="col-3">');
  const score = $('<p class="col-2">');

  table.append(row1);
  row1.append(name);
  row1.append(season);
  row1.append(score);

  const image = $('<div class="col-6 image">');
  const description = $('<div class="overflow-scroll col-5 descript">');

  table.append(row2);
  row2.append(image);
  row2.append(description);

  const episodes = $('<p class="col-3">');
  const genre = $('<p class="col-7" class="genre">');

  if (anime.trailer != null) {
     var trailer = $(
      `<iframe src="https://www.youtube.com/embed/${anime.trailer.id}"  frameborder="0" allowfullscreen class="col-3">`
    );
  } else {
     var trailer = $("<p>");
  }

  table.append(row3);
  row3.append(episodes);
  row3.append(genre);
  table.append(trailer);

  name.text(anime.title.userPreferred);
  episodes.text(`Episodes: ${anime.episodes}`);
  description.html(anime.description.replace(/<br\s*\/?>/g, "\n"));
  season.text(`${anime.season} ${anime.seasonYear}`);

  image.css("background-image", `url('  ${anime.coverImage.extraLarge} ')`);
  image.css("background-size", "contain");
  image.css("background-repeat", "no-repeat");

  if (screen.availWidth > 400) {
    image.height(300);
    // image.width(200);
  } else {
    image.height(300);
    image.width(200);
  }

  // image.prepend(`<img src=${anime.coverImage.extraLarge}>`)
  // trailer.prepend(`<video src=https://www.youtube.com/watch?v=${anime.trailer.id}`)
  trailer.text("TEST");
  genre.text(anime.genres);
  score.text(`Score ${anime.averageScore}`);

  $("body").append(table);
  // $('#table').append(row)

  // row.append(image)
  // row.append(name)
  // row.append(episodes)
  // row.append(description)
  // row.append(season)
  // row.append(trailer)
  // row.append(genre)
  // row.append(score)

  console.log(screen.availWidth);
}
