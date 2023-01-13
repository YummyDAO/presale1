import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import './App.css';
import Hamburger from './components/Hamburger'
import SideMenu from './components/SideMenu'

function App() {
// Set the date we're counting down to
var countDownDate = new Date("Jan 13, 2023 12:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

  const [isMenuActive, activeMenu] = useState(false)
  return (
    <div className="App">
      <div className="" id="gatsby-focus-wrapper">
      <div className='bIMEZc'>
          <div className='section-inner desktop-version'>
            <div className='newHeader__LeftSection-sc-1f19k3t-1 fJgvVH'>
              <a className='logo-link' href='/'>
                <img src={logo} alt='Logo'></img>
              </a>
            </div>
            <div className='newHeader__CenterSection-sc-1f19k3t-2 curGpu'>
              <a href='https://docs.maddyprotocol.xyz' className='text-link'>
                Docs
              </a>
              <a href='#' className='text-link'>
                Academy
              </a>
              <a href='#' className='text-link'>
                Leaderboard
              </a>
              <a href='#' className='text-link'>
                Earn
              </a>
              <a href='#' className='text-link'>
                Presale
              </a>
            </div>
            <div className='newHeader__RightSection-sc-1f19k3t-3 OtCnG'>
              <a href='#'>GO TO BETA</a>
              <div type="button" className='newHeader__ThemeController-sc-1f19k3t-5 fvUBmM'>
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcuODgzNzIgMTQuOTk5N0M1Ljc3MjAzIDE0Ljk5OTcgMy43OTA2NiAxNC4xODEyIDIuMzA0NTMgMTIuNjk1MkMwLjgxODQwNyAxMS4yMDkxIDEuODQ2MzVlLTA3IDkuMjI3NTkgMS44NDYzNWUtMDcgNy4xMTU4N0MtMC4wMDAzMTUwNTQgNS42NTkxMiAwLjQwMzA0NCA0LjIzMDc3IDEuMTY1MzEgMi45ODkzNkMxLjkyNzU3IDEuNzQ3OTYgMy4wMTg5MiAwLjc0MjA1OCA0LjMxODIyIDAuMDgzMzEwM0M0LjQ1MTg5IDAuMDE1MTY4MyA0LjYwMjY4IC0wLjAxMjA5MTYgNC43NTE3NSAwLjAwNDkzMzIxQzQuOTAwODIgMC4wMjE5NTgxIDUuMDQxNTcgMC4wODI1MTM1IDUuMTU2NDQgMC4xNzkwNEM1LjI3MTMgMC4yNzU1NjcgNS4zNTUyIDAuNDAzNzg5IDUuMzk3NjQgMC41NDc3MDFDNS40NDAwOCAwLjY5MTYxMiA1LjQzOTIgMC44NDQ4MzYgNS4zOTUwOSAwLjk4ODI0OEM1LjAyNDMzIDIuMTg1ODEgNC45ODc4OSAzLjQ2MTkzIDUuMjg5NzEgNC42Nzg3QzUuNTkxNTMgNS44OTU0NyA2LjIyMDE0IDcuMDA2NjMgNy4xMDc1OSA3Ljg5MjA5QzcuNzQ0NDYgOC41MzM3IDguNTAyMjcgOS4wNDI2IDkuMzM3MTQgOS4zODkzNUMxMC4xNzIgOS43MzYxIDExLjA2NzQgOS45MTM4MSAxMS45NzE0IDkuOTEyMTlDMTIuNjYzIDkuOTEyNzEgMTMuMzUwNyA5LjgwODk4IDE0LjAxMTMgOS42MDQ1QzE0LjE1NDcgOS41NjAzNyAxNC4zMDggOS41NTk0NiAxNC40NTE5IDkuNjAxOUMxNC41OTU4IDkuNjQ0MzMgMTQuNzI0MSA5LjcyODIzIDE0LjgyMDYgOS44NDMxQzE0LjkxNzEgOS45NTc5OCAxNC45Nzc3IDEwLjA5ODggMTQuOTk0NyAxMC4yNDc4QzE1LjAxMTcgMTAuMzk2OSAxNC45ODQ1IDEwLjU0NzcgMTQuOTE2MyAxMC42ODE0QzE0LjI1NzUgMTEuOTgwNyAxMy4yNTE2IDEzLjA3MjEgMTIuMDEwMiAxMy44MzQzQzEwLjc2ODggMTQuNTk2NiA5LjM0MDQ4IDE1IDcuODgzNzIgMTQuOTk5N1pNNC4yOTA5NCAxLjI0Mjg0QzMuMjgzNCAxLjg1NTg3IDIuNDUxMTEgMi43MTg1NCAxLjg3NDU5IDMuNzQ3NEMxLjI5ODA3IDQuNzc2MjYgMC45OTY4MjggNS45MzY1IDEgNy4xMTU4N0MxIDEwLjkxMTYgNC4wODggMTMuOTk5NyA3Ljg4MzcyIDEzLjk5OTdDOS4wNjMxIDE0LjAwMjkgMTAuMjIzMyAxMy43MDE2IDExLjI1MjIgMTMuMTI1MUMxMi4yODExIDEyLjU0ODYgMTMuMTQzOCAxMS43MTYzIDEzLjc1NjggMTAuNzA4N0MxMy4xNzEzIDEwLjg0NDIgMTIuNTcyNCAxMC45MTI1IDExLjk3MTUgMTAuOTEyM0MxMC45MzYxIDEwLjkxNDMgOS45MTA1OCAxMC43MTA4IDguOTU0MzQgMTAuMzEzOEM3Ljk5ODEgOS45MTY3OCA3LjEzMDEgOS4zMzQwMyA2LjQwMDU5IDguNTk5MjhDNS40NTI4OSA3LjY1MzM3IDQuNzYxODcgNi40ODE1NyA0LjM5Mjc1IDUuMTk0NDZDNC4wMjM2MyAzLjkwNzM2IDMuOTg4NTkgMi41NDc0MyA0LjI5MDk0IDEuMjQzMDNWMS4yNDI4NFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" alt=""></img>
              </div>
            </div>
          </div>
          <div className='newHeader__MobileHeader-sc-1f19k3t-4 fBprAR'>
            <div className='mobile-nav'>
              <a className='logo-link' href='/'>
              <img src={logo} alt='Logo'></img>
              </a>
              <div>
                <div className='newHeader__StyledSvg-sc-1f19k3t-7 fINqws'>
                <Hamburger className="" fill="#fff" onMenuClick={() => activeMenu(!isMenuActive)} />
                    <SideMenu isMenuActive={isMenuActive} onOverLayClick={() => activeMenu(!isMenuActive)}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='presale'>
          <h1 className='presale-text'>Presale starts in</h1>
          <div className='presale-body'>
            {/*<span>12 : 10 : 10</span>*/}
            <span id="demo"></span>
          </div>
          <div className='presale-card'>
            <h1 className=''>Instructions for presale</h1>
            <p>1. Max individual purchase limit</p>
            <p>2. Presale hardcap is $25k</p>
            <p>3. Presale contract audit link is <a href='#'>Audit</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
