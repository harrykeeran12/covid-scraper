const puppeteer = require('puppeteer');

async function scrapeCompleteTable(){
  const url = 'https://www.worldometers.info/coronavirus/';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  
  const data = await page.evaluate(() => {
    const trs = Array.from(document.querySelectorAll('#main_table_countries_today tbody tr:not(.total_row_world)'))
    return trs.map(tr => tr.innerText)
  });
  const listdata = data.map(function(e){
    return e.split('\t')
  })
  browser.close()
  return listdata
  
}
async function countrySearch(data, country){
  for (let i = 0; i < data.length; i++) {
    if (data[i][1] == country) {
      return data[i]
    }
  }
}
async function findCountry(country){
  const data = await scrapeCompleteTable().then(function(result){
    return countrySearch(result, country);
  });
  return await data
}

async function countryData(country){
  findCountry(country).then(function(result){
    console.log('Country =', result[1])
    console.log('Total Cases =', result[2])
    console.log('Total Deaths =', result[4])
    console.log('Total Recovered =', result[6])
})
}
countryData('Iran').then(result => {
  console.log(result)
})




