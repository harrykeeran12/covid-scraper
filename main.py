import bs4
import requests as r

url = "https://www.worldometers.info/coronavirus/"

html_text = r.get(url).text
soup = bs4.BeautifulSoup(html_text, 'html.parser')
soup = soup.find("table")
only_tablerows = bs4.SoupStrainer("td")


tablerows = []

def all_countries():
  countries = []
  only_links = bs4.SoupStrainer("a")
  links = bs4.BeautifulSoup(html_text, 'html.parser', parse_only=only_links)
  for link in links:
    href = link.get('href')
    if href.startswith("country/"):
      countries.append(link.string)

  countries = list(dict.fromkeys(countries))
  countries.sort()
  return countries



def covid_info(country):
  for link in soup.find_all("a"):
    if link.string == country:
      table = link.parent.parent
      pass
  for rows in table.find_all("td"):
    tablerows.append(rows.string)


  print(tablerows)

  country = tablerows[1]
  totalcases= tablerows[2]
  totaldeaths = tablerows[4]
  totalrecovered = tablerows[6]

  return {"Country" : country, "Total Cases" : totalcases, "Total Deaths" : totaldeaths, "Total Recovered" : totalrecovered}


countries = all_countries()
#This code below does not work, the only country it prints is Afghanistan, when it should print the other countries too
""" for x in range(len(countries) // 5):
  country = countries[x]
  print(covid_info(country)) """



