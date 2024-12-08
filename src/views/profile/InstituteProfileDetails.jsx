import React from 'react'
import Card from '@/components/ui/Card';
import Loading from '@/components/shared/Loading'
import {HiOutlineGlobe, HiOutlineLocationMarker, HiOutlinePhone, HiOutlineFlag, HiOutlineMail } from 'react-icons/hi';

function InstituteProfileDetails({reading,updating,data}) {

  if (reading) {
    <div className="flex justify-center items-center min-h-60">
        <Loading loading={true}/>
    </div>
  }
  return (
    <Card>
        <div>
            <div>
                <h3>{data.name}</h3>
                <p className='mt-1'>{data.slogan}</p>
            </div>
            <div className="my-5 h-px w-full bg-neutral-300"></div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="flex items-center space-x-2">
                    <HiOutlinePhone className="text-lg"/>
                    <p>{data.contactNumber}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <HiOutlineLocationMarker className="text-lg"/>
                    <p>{data.address + ' ' + data.city}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <HiOutlineGlobe className="text-lg"/>
                    <p>{data.website}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <HiOutlineFlag className="text-lg"/>
                    <p>{data.country}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <HiOutlineMail className="text-lg"/>
                    <p>{data.email}</p>
                </div>
            </div>
        </div>
    </Card>
  )
}

export default InstituteProfileDetails