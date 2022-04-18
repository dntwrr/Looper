class anime {
  constructor(data) {
    this.title = data.title.userPreferred;
    this.score = data.averageScore;
    this.img = data.coverImage.extraLarge;
    this.description = data.description;
    this.episodes = data.episodes;
    this.genres = data.genres.join(" ");
    this.season = `${data.season} ${data.seasonYear}`;
    this.streamEpisodes = data.streamingEpisodes;
    this.trailer = data.trailer;
    // this.trailerID = data.trailer.id ??
  }
}

const test = {
  title: { userPreferred: "test" },
  averageScore: "score",
  coverImage: { extraLarge: "pic" },
  description: "descript",
  episodes: "epis",
  genres: ["test", "test"],
};

const test2 = new anime(test);
console.log(test2);

console.log(test);

const apiID = 7853;
var access_token = "";
var userId = 0;
const rand5 = [];
const rand5Anime = [];

function GetToken() {
  const URL = window.location.href;
  const token = URL.split("token=")[1].split("&token")[0];
  access_token = token;
}

GetToken();
const GetID = () => {
  const query = `{
        Viewer {
            id 
        }
    }`;

  const url = "https://graphql.anilist.co",
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
    .then((response) => {
      userId = response.data.Viewer.id;
    })
    .then(fetchAnime);
};

const fetchAnime = () => {
  const query = `{
        MediaListCollection(userId: ${userId}, type: ANIME, status_in: PLANNING) {
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

  const url = "https://graphql.anilist.co",
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
    .then((response) => getTop5(response))
    // .then(DisplayTop5());
};

const getTop5 = (data) => {
  planList = data.data.MediaListCollection.lists[0].entries;

  for (i = 0; i < 5; i++) {
    let k = Math.floor(Math.random() * (planList.length - 0 + 1));
    rand5.push(k);

    if (rand5.indexOf(k) === -1) {
      rand5.pop();
      k = Math.floor(Math.random() * (planList.length - 0 + 1));
      rand5.push(k);
    }
  }

  rand5.forEach((element) => {
    const randomAnime = new anime(planList[element].media);
    rand5Anime.push(randomAnime);

  });

  DisplayTop5()
};

const DisplayTop5 = () => {
  console.log(rand5Anime.length)
  rand5Anime.forEach((anime) => {
    console.log(anime)
    const table = document.createElement("div");
    table.classList.add("container");

    const name = document.createElement("div");
    name.classList.add("col-6 name");
    name.classList.add('name')
    name.textContent(anime.title);
    const score = document.createElement("div");
    score.classList.add("col-3 score-episode");
    scoreclassList.add('score-episode')
    score.textContent(anime.score);
    const episode = document.createElement("div");
    episode.classList.add("col-3 score episode");
    episode.classList.add('score-episode')
    episode.textContent(anime.episodes);
    const row1 = document.createElement("div");
    row1.classList.add("row align-items-center justify-content-start");

    const picture = document.createElement("div");
    picture.classList.add("col-6 picture");
    picture.style.backgroundImage = anime.img;

    const description = document.createElement("div");
    description.classList.add("col-12 overflow-scroll dis");
    description.textContent(anime.description);
    const genre = document.createElement("div");
    genre.classList.add("col-8 text-wrap genre-season");
    genre.textContent(anime.genres);
    const season = document.createElement("div");
    season.classList.add("col-4 genre-season");
    season.textContent(anime.season);
    const row2 = document.createElement("div");
    row2.classList.add("row");
    const pictureRow = document.createElement("div");
    pictureRow.classList.add("col-6");
    const row2_2 = document.createElement("div");
    row2_2.classList.add("row");

    document.body.appendChild(table);
    table.appendChild(row1);
    row1.appendChild(name);
    row1.appendChild(episode);
    row1.appendChild(score);

    table.appendChild(row2);
    row2.appendChild(picture);
    row2.appendChild(pictureRow);

    pictureRow.appendChild(row2_2);
    row2_2.appendChild(description);
    row2_2.appendChild(genre);
    row2_2.appendChild(season);
  });
};
GetID();
