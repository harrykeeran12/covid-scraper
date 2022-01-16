const puppeteer = require('puppeteer');

function separateString(string, separator){
  if ((string == " ") || (string == 'N/A') || (string == undefined)){
    return '0'
  }
  else{
    let separate = string.split(separator);
    temp = separate.join('')
    return temp
  }
  
}
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

async function scrapeWorldData(){
  const url = 'https://www.worldometers.info/coronavirus/';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  
  const data = await page.evaluate(() => {
    const trs = Array.from(document.querySelectorAll('#main_table_countries_today tbody .total_row_world'))
    return trs.map(tr => tr.innerText)
  });
  const listdata = data.map(function(e){
    return e.split('\t')
  })
  browser.close()
  return listdata[0]
}

async function countrySearch(data, country){
  for (let i = 0; i < data.length; i++) {
    if (data[i][1] == country) {
      return data[i]
    }
  }
}
async function allCountries(data){
  let countries = []
  for (let i = 0; i < data.length; i++) {
    countries.push(data[i][1])
  }
  return countries
}


async function findCountry(country){
  const data = await scrapeCompleteTable().then(function(result){
    return countrySearch(result, country);
  });
  return await data
}
async function getTotalData(){
  const data = await scrapeCompleteTable().then(function(result){
    return allCountries(result);
  });
  
  const countries = data;
  return await countries

  /* return await data; */
  
}


async function countryData(country){
  findCountry(country).then(function(result){
    console.log('Country =', result[1])
    console.log('Total Cases =', result[2])
    console.log('Total Deaths =', result[4])
    console.log('Total Recovered =', result[6])
})
}

/* findCountry('USA').then(result => {
  console.log(result)
}) */

/* getTotalData().then(result=>{
  console.log(result.sort())
}) */

scrapeWorldData().then(result=>{
  console.log(result)
})


