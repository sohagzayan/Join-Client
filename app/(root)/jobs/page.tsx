'use client'
import JobFilterSidebar from '@/components/containers/find_job_page/job-filter-sidebar/JobFilterSidebar'
import JobResults from '@/components/containers/find_job_page/job-results/JobResults'
import Header from '@/components/shared/Nav/Header'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const FindJob = ({ searchParams }: any) => {
    console.log("searchParams", searchParams)

    return (
        <div className='bg-light_gray'>
            <Header variant="primary" />
            <div className='container lg:px-16 xl:px-20 mt-10'>
                <section className='grid grid-cols-12 gap-4 md:flex-row   '>
                    <div className='lg:col-span-3 col-span-12'>
                        <div className=''>
                            <JobFilterSidebar searchParamsObj={searchParams} />
                        </div>
                    </div>
                    <div className='lg:col-span-9 col-span-12'>
                        <JobResults searchParams={searchParams} />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default FindJob