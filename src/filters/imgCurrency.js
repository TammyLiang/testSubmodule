export function imgCurrency (url) {
  if(url && !url.includes('http')){
    return  '//file.beeplay123.com'+ url
  }else {
    return url
  }
}

