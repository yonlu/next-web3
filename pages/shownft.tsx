import { Button, Container, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { ConnectWallet, useWallet } from "@web3-ui/core";
import { ReactElement, useEffect, useState } from "react";
import { NFTGallery } from '@web3-ui/components'

function ShowNFT() {
	const [address, setAddress] = useState('');
	const [nftGallery, setNftGallery] = useState<ReactElement | null>(null);
	const { correctNetwork, switchToCorrectNetwork, connected, provider } = useWallet();

	useEffect(() => {
		console.log('correctNetwork', correctNetwork);
	}, [correctNetwork]);

	return (
		<Container>
			<ConnectWallet />
			{!correctNetwork && (
				<Button onClick={switchToCorrectNetwork}>Switch to Mainnet.</Button>
			)}

			<Stack p={3}>
				<Heading>Demo</Heading>
				<Text>Type in an address to view their NFTs</Text>
				<Input
					placeholder="Address"
					value={address}
					onChange={e => setAddress(e.target.value)}
				/>
				<Button
					disabled={!connected}
					onClick={() => 
						setNftGallery(
							<NFTGallery
								address={address}
								gridWidth={2}
								web3Provider={provider}
							 />
						)
					}
				>
					{connected ? 'Submit' : 'Connect your wallet first!'}
			</Button>
			{nftGallery}
			</Stack>
		</Container>
	)
}

export default ShowNFT;