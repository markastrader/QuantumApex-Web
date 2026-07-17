/*
==========================================================

QuantumApex AI

Main JavaScript

Version 1.0

==========================================================
*/


document.addEventListener("DOMContentLoaded", () => {

    initNavigation();

    initSmoothScroll();

    initScrollEffects();

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
