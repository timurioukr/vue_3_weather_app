import{u as i,_ as g,S as u,a as y}from"./sweetalert2.all-171dfb24.js";import{u as S,s as d,o as B,a as c,b as s,c as m,d as k,t as L,e as W,F as b}from"./index-44675143.js";const v={key:1,class:"text-center"},D={__name:"Bookmarks",setup(w){const{t:o}=S(),{getLocationWeather:p,changeAppComponentState:l}=i(),{locationsBookmarksWeather:a,isLoad:f}=d(i());B(()=>h());const h=()=>{l("locationsBookmarksWeather",[]);const e=JSON.parse(localStorage.getItem("myWeather"));e!==null&&e.forEach(n=>{const t={...n,forBookmarks:!0};p(t)})},_=async e=>{const{isConfirmed:n}=await u.fire({showCancelButton:!0,text:o("youWantContinue"),buttons:[o("btn.not"),o("btn.ok")]});if(n)if(e>=0&&e<a.value.length){const t=a.value.toSpliced(e,1);l("locationsBookmarksWeather",t),localStorage.setItem("myWeather",JSON.stringify(t))}else u.fire({text:o("invalidIndex")})};return(e,n)=>c(f)?c(a).length?(s(!0),k(b,{key:2},W(c(a),(t,r)=>(s(),m(g,{key:r+t.lat,index:r+t.lat,currentLocation:t,onDeleteLocation:C=>_(r)},null,8,["index","currentLocation","onDeleteLocation"]))),128)):(s(),k("h3",v,L(e.$t("empty")),1)):(s(),m(y,{key:0}))}};export{D as default};