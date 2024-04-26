import Image from 'next/image'
import React from 'react'
import ProfileView from '../profile-view/ProfileView'

export const Profile = () => {
    return (
        <div className='bg-primary-25'>
            <div className='container lg:px-16 xl:px-20 '>
                <div className=''>
                    <div className='flex items-center gap-6'>
                        <Image src="/assets/images/user-1.webp" style={{ width: "200px", height: "200px", borderRadius: "50%", objectFit: "cover" }} width={0} height={0} sizes='100wv' alt="Ranch Investor" />
                        <div>
                            <p className='text-[20px]  text-blue-steel_blue'>Hello,</p>
                            <h3 className='text-[28px] capitalize text-blue-midnight_blue font-medium'>Jhnathon Smith</h3>
                        </div>
                    </div>
                    <div>
                        <ProfileView />
                    </div>
                </div>
            </div>
        </div>
    )
}

