import{a as O,S as P,i as o}from"./assets/vendor-frHSA4Lh.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const w="36979931-b9ebd2c49fac6caefdf5e0dc3",C="https://pixabay.com/api/";async function g(a,t=1){try{return(await O.get(C,{params:{key:w,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})).data}catch{throw new Error("Failed to fetch images")}}const u=document.querySelector(".image-gallery"),p=document.querySelector(".spinner"),h=document.querySelector(".load-more-btn");let n=null;function $(){n&&n.destroy(),n=new P(".gallery-link",{captionsData:"alt",captionPosition:"bottom",captionDelay:250})}function y(a){const t=a.map(({webformatURL:r,largeImageURL:c,tags:e,likes:s,views:l,comments:x,downloads:S})=>`<li class="gallery-item">
      <a class="gallery-link" href="${c}">
        <div class="image-container">
          <img class="gallery-image" src="${r}" alt="${e}" />
        </div>
        <div class="image-inform">
          <div>
            <h3 class="image-inform-title">Likes</h3>
            <span class="image-inform-text">${s}</span>
          </div>
          <div>
            <h3 class="image-inform-title">Views</h3>
            <span class="image-inform-text">${l}</span>
          </div>
          <div>
            <h3 class="image-inform-title">Comments</h3>
            <span class="image-inform-text">${x}</span>
          </div>
          <div>
            <h3 class="image-inform-title">Downloads</h3>
            <span class="image-inform-text">${S}</span>
          </div>
        </div>
      </a>
    </li>`).join("");u.insertAdjacentHTML("beforeend",t),$()}function H(){u.innerHTML="",n&&(n.destroy(),n=null)}function L(){p.classList.remove("hidden")}function v(){p.classList.add("hidden")}function M(){h.style.display="block"}function f(){h.style.display="none"}const b=document.querySelector(".search-form"),k=document.querySelector(".load-more-btn");let d="",i=1,m=0;f();b.addEventListener("submit",q);k.addEventListener("click",R);async function q(a){a.preventDefault();const t=a.target.elements["search-text"].value.trim();if(!t){o.error({message:"Please enter some valid search value!",messageSize:"16px",messageLineHeight:"24px",messageColor:"#fafafb",closeOnClick:!0,position:"topRight"});return}d=t,i=1,H(),f();try{L();const r=await g(t,i);if(r.hits.length===0){o.error({message:"Sorry, there are no images matching your search query. Please try again!",messageSize:"16px",messageLineHeight:"24px",messageColor:"#fafafb",closeOnClick:!0,position:"topRight"});return}m=r.totalHits,y(r.hits),r.hits.length<m&&M(),o.success({message:`Hooray! We found ${m} images.`,messageSize:"16px",messageLineHeight:"24px",messageColor:"#fafafb",closeOnClick:!0,position:"topRight"})}catch(r){o.error({message:`${r.message}. Please try again later`,closeOnClick:!0,position:"topRight"})}finally{v(),b.reset()}}async function R(){if(d){i+=1;try{L();const a=await g(d,i);y(a.hits);const t=Math.ceil(m/15);i>=t&&(f(),o.info({message:"We're sorry, but you've reached the end of search results.",messageSize:"16px",messageLineHeight:"24px",messageColor:"#fafafb",closeOnClick:!0,position:"topRight"}))}catch(a){o.error({message:`${a.message}. Please try again later`,closeOnClick:!0,position:"topRight"}),i-=1}finally{v()}}}
//# sourceMappingURL=index.js.map
