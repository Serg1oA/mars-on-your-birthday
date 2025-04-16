//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
  // clean the gallery by deleting all images
  document.querySelectorAll('img').forEach(img => img.remove())
  // set dateChosen to what's in the date input
  let dateChosen = document.querySelector("input").value
  // API url
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=px5I2KVHe55Q6ETav0ocjSaIEhM9297KCjq51hRW&earth_date=${dateChosen}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        // explain to the user why no photos show up on some days
        if (data.photos.length === 0) {
          document.querySelector("p").innerHTML = "NASA's Mars Rovers were recharging batteries on this date, pick another one!"
          return
        } else {
          document.querySelector("p").innerHTML = "Photos taken by NASA's Mars Rovers on your picked date:"
        }

        // for each photo fetched, create new img and add it below the p element
        for (let i = 0; i < data.photos.length; i++) {
          let newImg = document.createElement("img")
          newImg.src = data.photos[i].img_src
          document.querySelector("span").insertAdjacentElement("afterend", newImg)
        }
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}