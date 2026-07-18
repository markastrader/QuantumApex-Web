/*
==========================================================

QuantumApex AI

Main JavaScript

Version 1.1  — Added bilingual EN / ID language switcher

==========================================================
*/


document.addEventListener("DOMContentLoaded", () => {

    initNavigation();

    initSmoothScroll();

    initScrollEffects();

    initLanguageSwitcher();   // NEW — i18n

});



/* =======================================================
   Navigation Effect
======================================================= */

function initNavigation(){

    const navbar = document.querySelector(".navbar");


    if(!navbar){
        return;
    }


    window.addEventListener("scroll",()=>{


        if(window.scrollY > 60){

            navbar.classList.add("navbar-scrolled");

        }
        else{

            navbar.classList.remove("navbar-scrolled");

        }


    });

}



/* =======================================================
   Smooth Scroll
======================================================= */

function initSmoothScroll(){


    document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor=>{


        anchor.addEventListener("click",function(e){


            const target =
            document.querySelector(
                this.getAttribute("href")
            );


            if(target){

                e.preventDefault();


                target.scrollIntoView({

                    behavior:"smooth"

                });

            }


        });


    });


}



/* =======================================================
   Section Reveal Animation
======================================================= */

function initScrollEffects(){


    const sections =
    document.querySelectorAll("section");


    if(!sections.length){

        return;

    }


    const observer =
    new IntersectionObserver(
    entries=>{


        entries.forEach(entry=>{


            if(entry.isIntersecting){


                entry.target.classList.add("show");


            }


        });


    },
    {

        threshold:0.15

    });


    sections.forEach(section=>{


        section.classList.add("hidden");


        observer.observe(section);


    });


}



/* =======================================================
   Language Switcher  (EN / ID)
   -------------------------------------------------------
   Strategy:
   - All translatable text lives in data-en / data-id
     attributes directly on the element that renders it.
   - applyLanguage() walks every [data-en] node and sets
     textContent to the chosen language value.
   - User preference is persisted in localStorage.
   - On first load, browser language is detected:
       Indonesian  → default ID
       anything else → default EN
======================================================= */

function initLanguageSwitcher(){

    const STORAGE_KEY = "qa_lang";

    const buttons = document.querySelectorAll(".lang-btn");

    if(!buttons.length){ return; }


    /* ---- Detect or restore language ---- */

    let lang = localStorage.getItem(STORAGE_KEY);

    if(!lang){

        const browserLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();

        lang = browserLang.startsWith("id") ? "id" : "en";

    }


    /* ---- Apply on load ---- */

    applyLanguage(lang);

    updateButtons(lang, buttons);


    /* ---- Button click handlers ---- */

    buttons.forEach(btn=>{

        btn.addEventListener("click", ()=>{

            const chosen = btn.getAttribute("data-lang");

            if(chosen === getLang()){ return; }  // no-op if already active

            localStorage.setItem(STORAGE_KEY, chosen);

            applyLanguage(chosen);

            updateButtons(chosen, buttons);

        });

    });


    /* ---- Core: walk all translatable nodes ---- */

    function applyLanguage(l){

        document.documentElement.lang = l;

        document.querySelectorAll("[data-en]").forEach(el=>{

            const text = el.getAttribute("data-" + l);

            if(text !== null){

                el.textContent = text;

            }

        });

    }


    /* ---- Sync button active state ---- */

    function updateButtons(l, btns){

        btns.forEach(btn=>{

            const isActive = btn.getAttribute("data-lang") === l;

            btn.classList.toggle("active", isActive);

            btn.setAttribute("aria-pressed", isActive ? "true" : "false");

        });

    }


    /* ---- Helper: current language ---- */

    function getLang(){

        return localStorage.getItem(STORAGE_KEY) || "en";

    }

}
