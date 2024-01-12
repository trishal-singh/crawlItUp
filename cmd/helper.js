function normalizeUrl(path)
{
  const url=new URL(path)
  let newurl= url.hostname + url.pathname
  if(newurl.length>0 && newurl.slice(-1)==='/')
   newurl=newurl.slice(0,-1)
  return newurl
}
module.exports = {
    normalizeUrl
  }
  