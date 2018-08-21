import {API_SERVER} from 'constants/index'
let server
if(!API_SERVER)
  server='http://rapi.md'
else
  server=API_SERVER
export const get=(url,params)=>{
  if(params)
    url+='?'+Object.keys(params).reduce(function(a,k){a.push(k+'='+encodeURIComponent(params[k]));return a},[]).join('&')
  return fetch(server+url)
    .then(function(response) {
      return response.json();
    })
}

export const del=(url)=>{
    return fetch(server+url,{
      method: 'delete'
    })
      .then(function(response) {
        return response.json();
      })
}
