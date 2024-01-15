const { JSDOM } = require('jsdom')

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
async function crawlPage(url)
{
  try{
    const page =await fetch(url)
    if(page.status>399)
    {
    console.log("An Error Ocurred "+page.status)
    return
    }
    const contentType = page.headers.get('content-type')
    if (!contentType.includes('text/html')){
      console.log(`Got non-html response: ${contentType}`)
      return
    }
    console.log(await page.text())
  }
  catch(e){
   console.log(e.message)
  }
}
module.exports = {
    normalizeUrl,
    getURLsFromHTML,
    crawlPage
  }
  