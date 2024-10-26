import React from 'react'
import ServiceProviderImage from './sections/ServiceProviderImage'
import ServiceProviderInfo from './sections/ServiceProviderInfo'
import ServiceProviderReview from './sections/ServiceProviderReview'

const ServiceProvider = () => {
  return (
   <>
   <div className='width-container'>
    <div className='grid grid-cols-[30rem_1fr] gap-10 grid-rows-2'>
      <ServiceProviderImage/>
        <ServiceProviderInfo/>
        <ServiceProviderReview/>
    </div>
   </div>
   </>
  )
}

export default ServiceProvider
