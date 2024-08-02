import React from 'react'
import Banner from './_components/Banner'
import Service from './_components/Service'
import Products from './_components/Products'
import Coment from './_components/Coment'
import ProductsChose from './_components/ProductsChose'
import Oder from './_components/Oder'
import Education from './_components/Education'

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div>
      <Banner />
      <Service />
      <Products />
      <Coment />
      <ProductsChose />
      <Oder />
      <Education />
    </div>
  )
}

export default HomePage