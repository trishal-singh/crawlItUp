const { JSDOM } = require('jsdom')
const fs = require('fs');
function getURLsFromHTML(htmlBody, baseURL){
  const urls = []
  const dom = new JSDOM(htmlBody)
  const aElements = dom.window.document.querySelectorAll('a')
  for (const aElement of aElements){
    if (aElement.href.slice(0,1) === '/'){
      try {
        urls.push(new URL(aElement.href, baseURL).href)
      } catch (err){
        console.log(`${err.message}: ${aElement.href}`)
      }
    } else {
      try {
        urls.push(new URL(aElement.href).href)
      } catch (err){
        console.log(`${err.message}: ${aElement.href}`)
      }
    }
  }
  return urls
}
function normalizeUrl(path)
{
  const url=new URL(path)
  let newurl= url.hostname + url.pathname
  if(newurl.length>0 && newurl.slice(-1)==='/')
   newurl=newurl.slice(0,-1)
  return newurl
}
async function crawlPage(baseURL, currentURL, pages){
  // if this is an offsite URL, bail immediately
  const currentUrlObj = new URL(currentURL)
  const baseUrlObj = new URL(baseURL)
  if (currentUrlObj.hostname !== baseUrlObj.hostname){
    return pages
  }
  
  const normalizedURL = normalizeUrl(currentURL)

  // if we've already visited this page
  // just increase the count and don't repeat
  // the http request
  if (pages[normalizedURL] > 0){
    pages[normalizedURL]++
    return pages
  }

  // initialize this page in the map
  // since it doesn't exist yet
  if (currentURL === baseURL){
    // don't count the base URL as a link to itself
    pages[normalizedURL] = 0
  } else {
    pages[normalizedURL] = 1
  }

  // fetch and parse the html of the currentURL
  console.log(`crawling ${currentURL}`)
  let htmlBody = ''
  try {
    const resp = await fetch(currentURL)
    if (resp.status > 399){
      console.log(`Got HTTP error, status code: ${resp.status}`)
      return pages
    }
    const contentType = resp.headers.get('content-type')
    if (!contentType.includes('text/html')){
      console.log(`Got non-html response: ${contentType}`)
      return pages
    }
    htmlBody = await resp.text()
  } catch (err){
    console.log(err.message)
  }

  const nextURLs = getURLsFromHTML(htmlBody, baseURL)
  for (const nextURL of nextURLs){
    pages = await crawlPage(baseURL, nextURL, pages)
  }

  return pages
}
// printReport takes a dictionary of pages and prints them
// to the console in a human-friendly way
// and save them in a csv file
function printReport(pages){
  console.log('==========')
  console.log('REPORT')
  console.log('==========')
  const sortedPages = sortPages(pages)
  let file= fs.createWriteStream('Report.csv')
  
  file.write("url,frequency\n")
  for (const sortedPage of sortedPages){
    const url = sortedPage[0]
    const count = sortedPage[1]
    console.log(`Found ${count} internal links to ${url}`)
    file.write(`${url},${count}\n`)
  }
}

// sortPages sorts a dictionary of pages
// into a list of tuples (url, count)
// with the highest counts first in the list
function sortPages(pages){
  // 2D array where the
  // inner array: [ url, count ]
  const pagesArr = Object.entries(pages)
  pagesArr.sort((pageA, pageB) => {
    return pageB[1] - pageA[1]
  })
  return pagesArr
}
module.exports = {
    normalizeUrl,
    getURLsFromHTML,
    crawlPage,
    printReport,
    sortPages
  }
  