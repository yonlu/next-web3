import { useEffect, useState } from 'react';
import { useWallet, useWriteContract } from '@web3-ui/core';
import GreeterABI from '../abis/Greeter.json';

export default function Greeter() {
	const [greetText, setGreetText] = useState('web3-ui hello world');
	const [greetResult, setGreetResult] = useState('');
	const { correctNetwork, switchToCorrectNetwork } = useWallet();
	const [greeterContract, isReady ] = useWriteContract('0x7e1D33FcF1C6b6fd301e0B7305dD40E543CF7135', GreeterABI);

	useEffect(() => {
		console.log('correctNetwork rinkeby', correctNetwork)
	}, [correctNetwork]);

	async function setGreeting() {
		const response = await greeterContract?.setGreeting(greetText);
		console.log('setGreeting', response);
	}

	async function greet() {
		const response = await greeterContract?.greet();
		console.log('greet', response);
	}

}