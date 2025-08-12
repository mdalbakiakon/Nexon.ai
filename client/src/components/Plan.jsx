import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
    return (
        <div className='px-4 sm:px-20 max-w-4xl mx-auto my-60'>
            <div className='text-center'>
                <h2 className='text-primary text-[28px] sm:text-[36px] lg:text-[42px] font-semibold'>Choose Your Plan</h2>
                <p className='text-gray-600 max-w-lg mx-auto'>Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>

                <div className='mt-14 max-sm:mx-8'>
                    <PricingTable />
                </div>
            </div>
        </div>
    )
}

export default Plan