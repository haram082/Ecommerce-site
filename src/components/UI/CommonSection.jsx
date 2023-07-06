import React from 'react'

import "../../pages/styles/commonsec.css"

const CommonSection = ({title}) => {
  return (
    <section className="common__section">
            <div className='text-center'>
                <h1>{title}</h1>
            </div>
    </section>
  )
}

export default CommonSection
