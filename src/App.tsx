import React, {useState, useEffect} from 'react';
import "./App.css";
import {AiOutlineHome} from "react-icons/ai";
import {FaDiscord} from "react-icons/fa";
import {BsGithub, BsCodeSlash, BsSunFill, BsMoonFill} from "react-icons/bs";
import Home from "./components/Home";
import Skills from "./components/Skills";

export default function Nav() {
  let home: string = "",
       skill: string = "",
       emoji: any = (<BsSunFill size={40}/>),
       [page, setPage] = useState("/"),
       [mode, setMode] = useState(true),
       App = Home;
  useEffect(() => {
    let item = localStorage.getItem("dark");
    if (!item) {
      if (window.matchMedia) {
        item = (window.matchMedia('(prefers-color-scheme: dark)').matches) ? "true" : "false";
      } else item = "true";
      localStorage.setItem("dark", item);
    }
    switch (item) {
      case "false":
        setMode(false)
        break;
      default:
        setMode(true);
        break;
    }
  }, []);
  window.addEventListener("resize", () => {
    if (window.innerHeight <= 600) {
      alert("Your screen should be at least 600pixels high to render the page correcty! Try portrait mode");
    }
  });
  switch (page) {
    case "/": 
      home = "active";
      break;
    case "/skills":
      skill = "active";
      App = Skills;
      break;
    default:
      alert("Not found!");
  }
  try {
  switch (mode) {
    case false:
      emoji = (<BsMoonFill size={40}/>);
      const items = document.getElementsByClassName("item");
      for (let i = 0; i < items.length; i++) {
        items[i].setAttribute("style", "background-color: white; color: black;");
      }
      const text = document.getElementsByClassName("text-area")[0];
      text.classList.remove("bg-gray-900");
      text.classList.add("bg-gray-200");
      text.classList.remove("text-white");
      text.classList.add("text-black");
      document.getElementById("nav")?.setAttribute("style", "background-color: gray;");
      document.getElementById("line")?.setAttribute("style", "border-bottom: 1.5px solid black;");
      break;
    case true:
      const components = document.getElementsByClassName("item");
      for (let i = 0; i < components.length; i++) {
        components[i].setAttribute("style", "");
      }
      const texts = document.getElementsByClassName("text-area")[0];
      texts.classList.add("bg-gray-900");
      texts.classList.remove("bg-gray-200");
      texts.classList.add("text-white");
      texts.classList.remove("text-black");
      document.getElementById("nav")?.setAttribute("style", "");
      document.getElementById("line")?.setAttribute("style", "");
      break;
    default: 
      break;
  }
  } catch(e) {}
  return (
    <header>
      <div className='nav-normal' id="nav">
        <button className={`item ${home}`} onClick={(event) => {if (page !== "/") {setPage("/")}; if (!mode) event.currentTarget.click()}}><AiOutlineHome size={40} /></button>
        <div className="line" id="line"></div>
        <div className="pt-[2px]">
          <button className={`item ${skill}`} onClick={(event) => { if (page !=="/skills") {setPage("/skills")} if (!mode) event.currentTarget.click()}}><BsCodeSlash size={40} /></button>
          <button className="item" id="gh" onClick={() => {const directives = document.getElementsByClassName("item");for (let i = 0; i < directives.length; i++) {directives[i].classList.remove("active");};document.getElementById("gh")?.classList.add("active");window.location.href = "https://github.com/ahqsoftwares";}}><BsGithub size={40} /></button>
          <button className="item" id="dsc" onClick={() => {const directives = document.getElementsByClassName("item");for (let i = 0; i < directives.length; i++) {directives[i].classList.remove("active");};document.getElementById("dsc")?.classList.add("active");window.location.href = "https://discord.com/";}}><FaDiscord size={40} /></button>
        </div>
        <i className='item dark-item mode' onClick={() => {localStorage.setItem("dark", String(!mode));setMode(!mode);}}>{emoji}</i>
      </div>
      <div className="pl-[4.5rem] flex w-screen h-screen text-white bg-gray-900 text-area">
        < App />
      </div>
    </header>
  );
}
