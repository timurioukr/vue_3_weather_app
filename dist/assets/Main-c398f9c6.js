import{u as J,r as h,s as M,o as N,a as k,b as m,c as v,d as O,e as w,F as T}from"./index-44675143.js";import{u as g,S as r,a as E,_ as V}from"./sweetalert2.all-171dfb24.js";const q={__name:"MainWrapper",setup(y){const{t:s}=J(),d=h(null),i=h(null),p=h([]),{getLocations:S}=g(),{locationsWeather:n,isLoad:_,locationsBookmarksWeather:B}=M(g()),{getLocationWeather:W,changeAppComponentState:f,getMyLocations:I}=g();N(()=>{!n.value.length&&C(),l()});const D=e=>{clearTimeout(d.value),d.value=setTimeout(async()=>{e!==""&&S(e)},300)},L=e=>{const[a,o,t]=e.value.place_name.split(",");W({lat:e.value.geometry.coordinates[1],lon:e.value.geometry.coordinates[0],index:e.index,city:a,state:o,country:t,isDefault:e.isDefault}).then(()=>l())},x=e=>{if(i.value=JSON.parse(localStorage.getItem("myWeather"))||[],i.value.length>=5){r.fire({text:s("bookmarksLimit")});return}const{lat:a,lon:o,city:t,state:c,country:u}=n.value[e],F=[...i.value,{lat:a,lon:o,city:t,state:c,country:u}];localStorage.setItem("myWeather",JSON.stringify(F)),l()},A=async e=>{const{isConfirmed:a}=await r.fire({showCancelButton:!0,text:s("youWantContinue"),buttons:[s("btn.not"),s("btn.ok")]});if(a){if(i.value=JSON.parse(localStorage.getItem("myWeather"))||[],e>=0&&e<i.value.length){const o=B.value.toSpliced(e,1);f("locationsBookmarksWeather",o),localStorage.setItem("myWeather",JSON.stringify(o))}else r.fire({text:s("invalidIndex")});l()}},$=e=>{n.value.length<5?f("locationsWeather",[{...n.value[e],isDefault:!1},...n.value]):r.fire({text:s("locationsLimit")}),l()},b=e=>{if(n.value.length>1){const a=n.value.slice();a.splice(e,1),f("locationsWeather",a)}else r.fire({text:s("notDeleteLastElement")});l()},C=()=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(e=>{const{latitude:a,longitude:o}=e.coords;I({lat:a,lon:o}).then(t=>{L({value:t.data.features[0],isDefault:!0})})}):r.fire({text:s("notSupportedGeolocation")})},l=()=>{const e=JSON.parse(localStorage.getItem("myWeather"))||[],a=[];n.value.forEach((o,t)=>{e.find(u=>o.lat===u.lat&&o.lon===u.lon)&&a.push(t)}),p.value=a};return(e,a)=>k(_)&&!k(n).length?(m(),v(E,{key:0})):(m(!0),O(T,{key:1},w(k(n),(o,t)=>(m(),v(V,{key:t+o.lat,currentLocation:o,isBookmarked:p.value.includes(t),index:t+o.lat,onSearchLocation:D,onSelectLocation:c=>L({...c,index:t}),onAddInBookmarks:c=>x(t),onDeleteFromBookmarks:c=>A(t),onAddLocation:c=>$(t),onDeleteLocation:c=>b(t)},null,8,["currentLocation","isBookmarked","index","onSelectLocation","onAddInBookmarks","onDeleteFromBookmarks","onAddLocation","onDeleteLocation"]))),128))}},R={__name:"Main",setup(y){return(s,d)=>(m(),v(q))}};export{R as default};