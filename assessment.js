const web3 = new Web3(window.ethereum);
console.log("web3 => ",web3.eth);
const contractAddress = "0xcC14D97e71C4dECDfd2514d69d6E81Fac2b1f2fa"

const ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "entered_password_hash",
				"type": "string"
			}
		],
		"name": "login",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "user_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email_address",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "password_hash",
						"type": "string"
					}
				],
				"internalType": "struct Assessment.User",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email_address",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password_hash",
				"type": "string"
			}
		],
		"name": "registerMe",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

async function register()
{
    console.log(" ==> ",ABI);
    const accounts =  await ethereum.request({ method: "eth_requestAccounts" });
    console.log(accounts);
    const registerEmail = document.getElementById('email').value;
    const userName = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

        const contract = new web3.eth.Contract(ABI, contractAddress);
        console.log("Contract => ",contract);

        console.log("contract.methods ", contract.methods);
    
        if(registerEmail.includes('@') && registerEmail.includes('.'))
        {
            contract.methods.registerMe(userName,registerEmail,password)
                    .send({from: accounts[0]})
                    .then(function(receipt){
                        console.log(receipt);
                    })
        }
        else{
            alert("Invalid Email");
        }
}