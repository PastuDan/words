const fetch = require('node-fetch')
const fs = require('fs')
const cheerio = require('cheerio')

let path = `words.txt`
let allPhrases = []
let fromHubble = []
let fromSeaSky = []

async function writeData() {

    await fetch('http://hubblesite.org/api/v3/glossary')
    .then(response => response.json())
    .then(data => {
        fromHubble = data.map(word => word.name)
    })

    // https://www.teachstarter.com/us/teaching-resource/space-word-wall-vocabulary-us/
    let schoolPhrases = "Space, Earth, Solar System, Jupiter, Mars, quarter moon, Neptune, moon, gibbous moon, Mercury, Pluto, half moon, Saturn, Venus, crescent moon, Uranus, planet, axial tilt, waning, waxing, asteroid belt, asteroid, black hole, big bang theory, astronaut, comet, binary star, astronomer, astronomy, elliptical orbit, density, constellation, deep space, cosmonaut, cosmos, dwarf planet, crater, day, dwarf star, dust, equinox, inner planets, eclipse, ecliptic, inferior planets, galaxy, lunar, falling star, meteorite, meteor, meteor shower, meteoroid, lens, gravity, full moon, inertia, Milky Way, mass, magnitude, outer planets, nebula, orbit, shooting star, rocket, solar, space exploration, solstice, star, total eclipse, umbra, space, vernal equinox, sky, satellite, solar system, new moon, penumbra, solar wind, light-year, rings, partial eclipse, observatory, phase, orbital inclination, universe, zodiac, space station, sun, starlight and telescope"
    let fromTeacherStarter = schoolPhrases.split(',')

    await fetch('http://www.seasky.org/astronomy/astronomy-glossary.html')
    .then(response => response.text())
    .then(html => {
        const $ = cheerio.load(html)
        $('.word').map(function(i, el) {
            fromSeaSky.push($(this).text())
          })
    })

    await fs.writeFile(path, JSON.stringify(allPhrases.concat(fromHubble, fromTeacherStarter, fromSeaSky)), function() {
        console.log(`Wrote to: ${path}`)
    })
    
}

writeData()