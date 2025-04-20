import React from 'react'
import Image from "next/image"

interface CryptoCurrenciesProps {
  currency: string;
  image: string;
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
}

function CryptoCurrencies({ currency, image, selectedCurrency, setSelectedCurrency }: CryptoCurrenciesProps) {
  const isSelected = selectedCurrency === currency;
  
  return (
    <div 
      className={`flex items-center border ${isSelected ? 'border-[#2b2829]' : 'border-[#5A5555]'} rounded-full w-20 p-2 mt-5 cursor-pointer`}
      onClick={() => setSelectedCurrency(currency)}
      style={{ borderWidth: isSelected ? '2px' : '1px' }}
    >
      <Image src={image} alt={currency} width={20} height={20} className='object-contain pointer-events-none' />
      <span className={`${isSelected ? 'text-[#2b2829]' : 'text-[#5A5555]'} text-sm font-medium`}>{currency}</span>
    </div>
  );
}

export default CryptoCurrencies   
