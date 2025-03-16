import React from 'react'
import { FaArrowRight } from "react-icons/fa6";

export default function JoinCommunity() {
  return (
    <div className='mt-24 bg-[#183251] text-white w-10/12 mx-auto text-center flex flex-col items-center py-8 space-y-4 rounded-3xl'>
        <div className="text-xl md:text-2xl lg:text-3xl font-semibold">Ready to be part of the solution?</div>
        <div className="text-sm px-3 lg:text-lg lg:max-w-6xl">
            Join the RefreeG community and become a RefreeGerian today! 
            By joining us, you contribute to empowering less privileged individuals 
            in African communities, supporting causes that foster socio-economic growth, 
            and promoting sustainable development. Together, we can make a significant 
            impact and create a brighter future for all.
        </div>
        <div>
            <button className="text-sm lg:text-xl flex items-center gap-x-2 bg-white text-[#003366] p-2 lg:p-4 rounded">
                Join our community <FaArrowRight />
            </button>
        </div>
    </div>

  )
}
