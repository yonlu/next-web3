import NaturedDevelopers from '../abis/NaturedDevelopers.json';

const naturedDevelopersContract = {
  addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  contractInterface: NaturedDevelopers.abi,
};

const Test = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-sky-50 text-black selection:bg-indigo-500 selection:text-white">
      <main className="w-full pt-24"></main>
    </div>
  );
};

export default Test;
