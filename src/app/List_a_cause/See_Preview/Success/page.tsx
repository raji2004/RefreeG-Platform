import React from 'react';
import Image from 'next/image';

export default function SuccessPage() {
  return (
    <div>
        <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="text-xl font-semibold">🎉 Congratulations! Your Cause is Live 🎉</div>
            <div className="text-gray-600">
                Thank you for sharing your cause with RefreeG. Your cause is now live on our platform, <br /> 
                ready to reach supporters who care about making a difference. Let's get the word out!
            </div>
            <Image src='/list_a_cause/success/success.svg' width={250} height={250} alt="successful picture" className=" py-6 " />
        </div>

        <div className='bg-[#214570] text-white px-3 pt-3 rounded-t-3xl fixed bottom-0 left-0 w-full z-50'>
            <Image src='/list_a_cause/success/toggleBar.png' width={50} height={10} alt="" className="mx-auto mb-3 w-24" />

            <div className='flex justify-between'>
                <div className='sideA w-1/2'>
                    <div className='flex mb-3'>
                        <Image src='/list_a_cause/success/attachedImage.svg' width={50} height={40} alt='Attached Image' className='w-48' />
                        <div className='pl-2'>
                            <div className='text-lg'>Support Flood Victims</div>
                            <div className='text-xs'>Goal Amount:</div>
                            <div className='text-xs'>Category:</div>
                            <div className='text-xs'>Description:</div>
                        </div>
                    </div>
                    <div className='mb-2 underline'>What's next?</div>
                    <div className='mb-2 underline'>Support and FAQs</div>
                    <button className="flex items-center space-x-2 bg-white text-black py-2 px-8 mb-8 rounded-md">
                        <span>View cause page</span>
                        <Image src='/list_a_cause/success/chevronRight.svg' alt="Right arrow" width={15} height={15} />
                    </button>

                </div>

                <div className='sideB flex w-1/2'>
                    <div className='pr-2'>
                        <Image src='/list_a_cause/success/line.svg' alt='' width={1} height={2} />
                    </div>
                    <div>
                        <div className='pb-4'>Help your cause gain visibility! Share it on social media to reach more potential supporters.</div>
                        <div className='flex pb-4'>
                            <div className='pr-4'><Image src='/list_a_cause/success/copyLink.svg' alt='' width={30} height={30} /></div>
                            <div className='pr-4'><Image src='/list_a_cause/success/facebook.svg' alt='' width={30} height={30} /></div>
                            <div className='pr-4'><Image src='/list_a_cause/success/instagram.svg' alt='' width={30} height={30} /></div>
                            <div className='pr-4'><Image src='/list_a_cause/success/youtube.svg' alt='' width={30} height={30} /></div>
                            <div className='pr-4'><Image src='/list_a_cause/success/x.svg' alt='' width={30} height={30} /></div>
                            <div className='pr-4'><Image src='/list_a_cause/success/whatsapp.svg' alt='' width={30} height={30} /></div>
                        </div>
                        <button className="flex items-center space-x-2 bg-white text-black py-2 px-8 rounded-md">
                            <span>Go to dashboard</span>
                            <Image src='/list_a_cause/success/chevronRight.svg' alt="Right arrow" width={15} height={15} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}
