import React from 'react'
import FAQ from './FAQ'
import { GetFAQData } from '@/app/services/faqCache'

async function page() {
  return (
    <FAQ faq={GetFAQData()}/>
  )
}

export default page