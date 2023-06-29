let clicked1 = document.getElementById(`country`);
clicked1.addEventListener(
  `click`,
  async function getCountry() {
    let api = await fetch(`http://de1.api.radio-browser.info/json/countries`);
    let result = await api.json();
    let allCountry = result.map((x) => x.name);

    let select1 = document.getElementById(`country`);
    for (let i = 0; i < allCountry.length; i++) {
      let newOption = document.createElement(`option`);
      newOption.innerHTML = `${allCountry[i]}`;
      select1.append(newOption);
    }
  },
  { once: true }
);
clicked1.addEventListener(`change`, async function getGenres() {
  let arrWithTags = [];
  let country = document.getElementById(`country`).value;
  let api = await fetch(
    `http://de1.api.radio-browser.info/json/stations/bycountry/${country}`
  );
  let res = await api.json();
  let select2 = document.getElementById(`genres`);
  let allTags = res.map((x) => x.tags);
  let optionsTags = genres.getElementsByTagName(`option`);
  for (let str of allTags) {
    if (!arrWithTags.includes(str)) {
      if (arrWithTags !== "") {
        arrWithTags.push(str);
      }
    }
  }
  while (optionsTags.length > 1) {
    select2[1].remove();
  }
  for (let i = 0; i < arrWithTags.length; i++) {
    let newOption = document.createElement(`option`);
    newOption.innerHTML = `${arrWithTags[i]}`;
    select2.append(newOption);
  }
});
async function getStation() {
  let country = document.getElementById(`country`).value;
  let genre = document.getElementById(`genres`).value;
  let api = await fetch(
    `http://de1.api.radio-browser.info/json/stations/bycountry/${country}`
  );
  let res = await api.json();
  console.log(res);
  let allDecription = res.map((x) => x.stationuuid);
  let i = 0;
  let url = allDecription[Math.floor(Math.random() * allDecription.length)];
  console.log(`Выбранная случайная станция(UUID код): ${url}`);
  let api2 = await fetch(
    `http://de1.api.radio-browser.info/json/checks/${url}`
  );
  let res2 = await api2.json();
  let allDesc = res2.map((y) => y.description);
  let url2 = allDesc[Math.floor(Math.random() * allDesc.length)];
  console.log(`Описание случайной станции: ${url2}`);
  for (i; i < res.length; i++) {
    if (res[i].tags.includes(genre) && allDesc[i] !== null) {
      window.open(`https://www.google.ru/search?q=${url2}`, `_blank`).focus();
      break;
    } else if (allDesc[i] == null) {
      window
        .open(
          `https://www.google.ru/search?q=Описания+нет!+Смотрите+консоль`,
          `_blank`
        )
        .focus();
      break;
    }
  }
}
