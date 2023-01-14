import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import maddy from './maddy.jpeg'
import './App.css';
import Hamburger from './components/Hamburger'
import SideMenu from './components/SideMenu'
import Countdown from 'react-countdown'
import {ethers, utils} from "ethers";
import contractAbi from './contract.json';
//import ERC20Abi from './utils/Erc20faucet.json';
//abi

function App() {

  const CONTRACT_ADDRESS = '0x4175f81c5DE65E16A777769cFC85ADe675778fBb';//vault
const ERC20 = '0x674de548F003506d5B2001413517e2d1ad00348b';//testtoken
const YIELD = '0x674de548F003506d5B2001413517e2d1ad00348b';

  const [isMenuActive, activeMenu] = useState(false)
  const [currentAccount, setCurrentAccount] = useState('');
  const [value, setValue] = useState('');
  const [tvl1, settvl1] = useState('');
  const [balwallet, setbalwallet] = useState('');

  const connectWallet = async () => {
		try {
			const { ethereum } = window;

			if (!ethereum) {
				alert("Get MetaMask -> https://metamask.io/");
				return;
			}

			// Fancy method to request access to account.
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
		
			// Boom! This should print out public address once we authorize Metamask.
			console.log("Connected", accounts[0]);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error)
		}
	};

  	const checkIfWalletIsConnected = async () => {
		// First make sure we have access to window.ethereum
		const { ethereum } = window;
	
		if (!ethereum) {
			console.log("Make sure you have MetaMask!");
			return;
		} else {
			console.log("We have the ethereum object", ethereum);
		}

		// Check if we're authorized to access the user's wallet
		const accounts = await ethereum.request({ method: 'eth_accounts' });

		// Users can have multiple authorized accounts, we grab the first one if its there!
		if (accounts.length !== 0) {
			const account = accounts[0];
			console.log('Found an authorized account:', account);
			setCurrentAccount(account);
		} else {
			console.log('No authorized account found');
		}
	};

  const deposit = async () => {
	  try {
		const { ethereum } = window;
    const accounts = await ethereum.request({ method: 'eth_accounts' });
		if (ethereum) {
		  const provider = new ethers.providers.Web3Provider(ethereum);
		  const signer = provider.getSigner();
		  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
		  let amount = ethers.utils.parseUnits(value, "ether");
	
				console.log("check deposit value.", amount.toString())
        //console.log(signer.getAddress())

        // Users can have multiple authorized accounts, we grab the first one if its there!
          const account = accounts[0];
          console.log(account)
        //const address = await signer.getAddress();
		  let tx = await contract.buyTokens(account.toString(), amount.toString(),{value: amount.toString()});
		  // Wait for the transaction to be mined
				const receipt = await tx.wait();
	
				// Check if the transaction was successfully completed
				if (receipt.status === 1) {
					console.log("Domain minted! https://mumbai.polygonscan.com/tx/"+tx.hash);//change to oklink
					
					// Set the record for the domain
					//tx = await contract.setDetails (domain, record);
					//await tx.wait();
	
					console.log("Record set! https://mumbai.polygonscan.com/tx/"+tx.hash);
					// Call fetchMints after 2 seconds
				    //setTimeout(() => {
					    //fetchMints();
				    //}, 5000);
					
					//setRecord('');
					//setDomain('');
				}
				else {
					alert("Transaction failed! Please try again");
				}
		}
	  }
	  catch(error){
		console.log(error);
	  }
	};

  const withdraw = async () => {
	  try {
		const { ethereum } = window;
		if (ethereum) {
		  const provider = new ethers.providers.Web3Provider(ethereum);
		  const signer = provider.getSigner();
		  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
		  //let amount = ethers.utils.parseUnits(value.toString(), "ether");
	
				//console.log("check deposit value.", amount)
		  let tx = await contract.withdrawTokens();
		  // Wait for the transaction to be mined
				const receipt = await tx.wait();
	
				// Check if the transaction was successfully completed
				if (receipt.status === 1) {
					console.log("Domain minted! https://mumbai.polygonscan.com/tx/"+tx.hash);//change to oklink
					
					// Set the record for the domain
					//tx = await contract.setDetails (domain, record);
					//await tx.wait();
	
					console.log("Record set! https://mumbai.polygonscan.com/tx/"+tx.hash);
					// Call fetchMints after 2 seconds
				    //setTimeout(() => {
					    //fetchMints();
				    //}, 5000);
					
					//setRecord('');
					//setDomain('');
				}
				else {
					alert("Transaction failed! Please try again");
				}
		}
	  }
	  catch(error){
		console.log(error);
	  }
	};

    const fetchbalance = async () => {
    try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
      const address1 = currentAccount;
      const params = await contract.getBalance();
      console.log("56",params)

      let tx = utils.formatUnits(params, 18);
      console.log("12",tx)
      let newvalue = tx.toString();
      console.log(newvalue)
      const ethvalue = ethers.utils.formatEther(newvalue)
      const ethvalue1 = Math.round(ethvalue * 1e4) / 1e4;
      console.log("tx",ethvalue)
      //console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
      setbalwallet(Math.round(tx))

      //fetchMints();
      //setRecord('');
      //setDomain('');
    }
    } catch(error) {
    console.log(error);
    }
  //setLoading(false);
};

  const fetchRaised = async () => {
    try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);
      const address1 = currentAccount;
      const params = await contract.TotalRaised();
      console.log("p",params.toString())

      /*let tx = utils.formatUnits(params, 18);
      console.log("tx",tx)
      let newvalue = tx.toString();
      console.log(newvalue)
      const ethvalue = ethers.utils.formatEther(newvalue)
      const ethvalue1 = Math.round(ethvalue * 1e4) / 1e4;
      console.log("value",ethvalue)*/
      //console.log("Record set https://mumbai.polygonscan.com/tx/"+tx.hash);
      settvl1(params.toString())

      console.log("tvl",tvl1)
      console.log("value", value)

      //fetchMints();
      //setRecord('');
      //setDomain('');
    }
    } catch(error) {
    console.log(error);
    }
  //setLoading(false);
};

useEffect(() => {
  checkIfWalletIsConnected();
}, [])

  useEffect(() => {
  setTimeout(() => {
  fetchbalance()
  fetchRaised()
  }, 5000)
}, [fetchbalance,fetchRaised])
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
              <a href='https://presale.maddyprotocol.xyz' className='text-link'>
                Presale
              </a>
            </div>
            <div className='newHeader__RightSection-sc-1f19k3t-3 OtCnG'>
              <a href='https://msd.test.maddyprotocol.xyz/#/'>GO TO BETA</a>
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
<<<<<<< HEAD
          {/*<h1 className='presale-text'>Presale starts at</h1>*/}
          <div className='presale-body flex'>
            <div className="presale-card1">
              <span>Buy Maddy Token</span>
              <div className='next'>
                <span className='next-text'>Amount in ETH</span>
                <input onChange={e => setValue(e.target.value)}></input>
              </div>
              <div className='next1'>
              <span className='next-text'>0.000000206005754427 ether per token</span>
                <span></span>
              </div>
              { currentAccount ?<button className='btn' onClick={deposit}>Buy Now</button> :
              <button className='btn' onClick={connectWallet }>Connect Wallet</button>}
            </div>
            <div className="presale-card2 flex">
              <div className='maddytab'>
                <img className='maddyimg' src={maddy} alt='maddy'></img>
                <span className='wes'>Maddy balance</span>
                <span>{balwallet}</span>
                <button className='btn' onClick={withdraw}>Claim</button>
              </div>
              <div className='esmaddytab maddytab'>
              <img className='maddyimg' src={maddy} alt='maddy'></img>
                <span className='wes'>esMaddy balance</span>
                <span>{balwallet / 2 * 1}</span>
                <button className='btn'>Claim</button>
              </div>
            </div>
            {/*<span>8 pm UTC</span>*/}
=======
          <h1 className='presale-text'>Presale starts at</h1>
          <div className='presale-body'>
            <span>8 pm UTC</span>
>>>>>>> 6ee841045f802e2cf06db43096431a0fb6ed08e7
            {/*<span id="demo"></span>*/}
            {/*<Countdown date={data.date + data.delay} onStart={(delta) => {
              if (localStorage.getItem("end_date") == null)
              localStorage.setItem(
                "end_date",
                JSON.stringify(data.date + data.delay)
                );
              }}
              onComplete={() => {
                if (localStorage.getItem("end_date") != null)
                localStorage.removeItem("end_date");
              }}
            />*/}
            
            {/*<MemoCountdown />*/}
          </div>
          <div className='wut'>
            Total amount raised: {tvl1/1000000000000000000} ETH
          </div>
          <div className='presale-card'>
            <h1 className=''>Instructions for presale</h1>
            <p>1. Max individual purchase limit</p>
            <p>2. Presale hardcap is $25k</p>
            <p>3. Presale contract audit link is <a href='https://contractwolf.io/projects/maddy-protocol'>Audit</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
