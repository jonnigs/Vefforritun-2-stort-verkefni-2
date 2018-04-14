# Hópverkefni 2

Hópverkefni 2 snýst um að útbúa react framenda ofan á vefþjónustu úr hópaverkefni 1. Hægt er að nota eigin lausn áfram eða [nýta sýnilausn](https://github.com/vefforritun/vef2-2018-h1-synilausn).

## Notendaumsjón

### Innskráning

Þegar notandi skráir sig inn er notandi staðfestur á móti vefþjónustu og villur birtar ef ekki er hægt að skrá inn. Eftir að notandi skráir sig inn eru upplýsingar um notanda og token geymd í `localStorage`.

Næst þegar notandi opnar vef og til eru upplýsingar í `localStorage` skal láta sem notandi sé skráður inn, við fyrsta vefþjónustukall kemur í ljós hvort token sé enn gilt. Ef svo er ekki skal færa notanda á innskráningarsíðu.

### Skráning

Af innskráningarsíðu er hlekkur yfir á skráningarsíðu.

Þegar notandi skráir sig er gert `POST` kall á `/register` á vefþjónustu og upplýsingar staðfestar, villuskilaboð birt ef ekki tókst að búa notanda til.

### Aðgangsstýring

Óinnskráðir notendur geta:

* Skoðað allar síður af bókum á `/books`
* Leitað að bókum, t.d. `/books?query=book`
* Búið sér til aðgang á `/register`
* Skráð sig inn á `/login`

Innskráðir notendur geta:

* Uppfært upplýsingar um sjálfa sig á `/profile`, skipta skal aðgerðum upp í
  - Setja inn mynd
  - Uppfæra nafn
  - Uppfæra lykilorð
* Skráð nýja bók á `/books/new`
* Skoðað bók á `/books/:id` og á sama stað
  - Skráð lestur á bók
  - Eytt lestur á bók
* Uppfært bók sem til er á `/books/:id/edit`
* Skoðað lista af notendum á `/users`
* Skoðað notendur og lestur þeirra á `/users/:id`

Allar aðgerðir tengjast viðeigandi aðgerðum í vefþjónustu.

## Leit og síður

Leit er aðgengileg úr haus og við að leitað er skal setja í querystring hvað leitað var að, t.d. `/books?search=sword`. Þegar farið er á milli síðna skal einnig setja síðu í querystring, t.d. `/books?search=sword&page=2`. Ef notandi er á annari síðu en fyrstu skal setja takka til að fara til baka, ef fjöldi færsla á síðu eru 10 skal sýna takka til að fara áfram. Það er best að reyna _ekki_ að samræma stöðu sem kemur frá `react-router` við eitthvað annað. Frekar skal horft á stöðuna úr url og viðmót smíðað m.v. það. Ef farið er á nýja síðu er hægt að athuga í `componentDidUpdate` hvort að querystring hafi breyst (með `this.props.location.search`) og bregðast þá við með því að sækja viðeigandi gögn. [`querystring`](https://github.com/Gozala/querystring) pakki er settur upp í lausn til að lesa breytur úr querystring.

## Form og tenging við vefþjónustu

Fyrir form er nóg að nota attribute á elementum fyrir _client side validation_, t.d. `<input required>`. Staðfesting í vefþjónustu skal tryggja að öll gögn séu rétt og þarf því að birta villur þaðan rétt.

Ekki er krafa um að geta uppfært einn og einn reit á bók í einu, aðeins á notanda.

Ekki er krafa um að geta útbúið nýja flokka.

Æskilegt er að hjúpa alla tengingu við vefþjónustu í einni skrá, t.d. `api.js` í rót verkefnis. Þar er hægt að lesa úr `env` hver slóð er, hver token er úr `localStorage` og gera fyrirspurnir með `fetch`. Annaðhvort er hægt að gera sér föll fyrir hverja HTTP aðferð (t.d. `get()`, `post()` o.s.fr.) eða útfæra almennt fall sem tekur við aðferð (t.d. `call(method)`). Ef villa kemur frá vefþjónustu um að token sé útrunnið skal færa notanda á t.d. `/login?tokenExpired` (í lagi að nota `window.location` þó það sé svolítið _skrítið_) þar sem birt eru viðeigandi skilaboð.

## Útlit

Gefið er lágmarksútlit þar sem:

* Útlit er skalanlegt, sjá úr `1600px` breiðum vafra ásamt einni úr `500px` breiðum
* Leturgerðir eru Open Sans og Raleway og eru stilltir í `index.html` og `index.css`
* Litir eru: `#dcbe87` fyrir haus, `#4e1d04` fyrir takka, `#941111` fyrir takka sem eyðir/hættir við og `#999` fyrir óvirkan takka
* Haus hefur heiti síðu (t.d. „Bókasafnið“), möguleika á leit (`input` með takka) og hlekk til að skrá sig inn
  - Í minni upplausn má fela leit
  - Eftir innskráningu eru upplýsingar um notanda í stað innskráningarhlekks
* Upplýsingar um notanda eru nafn notanda ásamt mynd, ef engin mynd er til staðar skal nota `profile.jpg` í `public/`
* Einfaldir listar af bókum með titli og höfundi
* Einfaldir listar af notendum með nafni notanda
* Síðuflettingar eru fyrir neðan lista með tökkum fyrir næstu og fyrri síðu
* Notandasíða sýnir mynd af notanda ef einhver, ananrs default mynd ásamt nafni og lista af lesnum bókum notanda
* Síða notanda þar sem hægt er að uppfæra mynd, nafn og lykilorð notanda í þrem formum ásamt lista af því sem notandi hefur lesið

[Sjá skjámyndir](layout/).

## Almennt

Nota má redux en það er ekki krafa. Mælt er með að nota a.m.k. fyrir auðkenningu og notanda. Auðveldara er að halda stöðu fyrir aðra hluti í einum eða tveim componentum.

Titla skal setja fyrir hverja síðu, t.d. `Bækur – síða N`, `<Titill á bók>`

Í gefnum grunn verkefnis er:

* Verkefni sett upp með `create-react-app` með öllum dependencies sem ætti að þurfa
* Mynd til að birta af notanda ef engin mynd er til staðar
* `components/private-route` til að aðgangsstýra routes, sjá dæmi í `App.js`
* `api.js` sem ætti að innihalda allar tengingar við vefþjónustu, gefin er byrjun á `get` falli

Lausn skal keyra á Heroku.

## Hópavinna

Verkefnið skal unnið í hóp, helst með þremur einstaklingum. Hópar með tveim eða fjórum einstaklingum eru einnig í lagi. Hafið samband við kennara ef ekki tekst eða ekki mögulegt að vinna í hóp.

## README

Í rót verkefnis skal vera `README.md` skjal sem tilgreinir:

* Upplýsingar um hvernig setja skuli upp verkefnið
  - Hvernig setja skuli upp tengingu við vefþjónustu
* Nöfn og notendanöfn allra í hóp

## Git og GitHub

Verkefni þetta er sett fyrir á GitHub og almennt ætti að skila því úr einka (private) repo nemanda. Nemendur geta fengið gjaldfrjálsan aðgang að einka repos á meðan námi stendur, sjá https://education.github.com/.

Til að byrja er hægt að afrita þetta repo og bæta við á sínu eigin:

```bash
> git clone https://github.com/vefforritun/vef2-2018-h2.git
> cd vef2-2018-h2
> git remote remove origin # fjarlægja remote sem verkefni er í
> git remote add origin <slóð á repo> # bæta við í þínu repo
> git push
```

## Mat

* 30% – Notendaumsjón með skráningu, innskráningu og breytingum á notanda
* 40% – Bókalisti með síðuflettingu, birtingum á bók og breytingu á bók
* 20% - Skrá lestur á bók og eyða lestri
* 10% – Skoða aðra notendur og lestur þeirra

## Sett fyrir

Verkefni sett fyrir í fyrirlestri fimmtudaginn 22. mars 2018.

## Skil

Skila skal undir „Verkefni og hlutaprófa“ á Uglu í seinasta lagi fyrir lok dags miðvikudaginn 18. apríl 2018.

Skilaboð skulu innihalda slóð á GitHub repo fyrir verkefni, og kennurum skal hafa verið boðið í repo ([sjá leiðbeiningar](https://help.github.com/articles/inviting-collaborators-to-a-personal-repository/)). Notendanöfn þeirra eru `ernir`, `elvarhelga` og `osk`.

## Einkunn

Sett verða fyrir fimm minni verkefni þar sem fjögur bestu gilda 7,5% hvert, samtals 30% af lokaeinkunn.

Sett verða fyrir tvö hópa verkefni þar sem hvort um sig gildir 15%, samtals 30% af lokaeinkunn.
