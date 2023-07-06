
import CommonSection from '../components/UI/CommonSection'
import ProductList from '../components/UI/ProductList'
import useGetData from '../custom_hooks/useGetData'

const ShopByCategory = ({category}) => {
  const {data: products, loading} = useGetData('products')
    const filteredCategoryProducts = products.filter(item=> item.category=== category)
  return (
    <div>
       <div className="new_releases_page">
      <CommonSection title={category}/>
      {loading? <div className="custom-loader"></div>:
      <ProductList data={filteredCategoryProducts}/> 
  }

      
    </div>
    </div>
  )
}

export default ShopByCategory
