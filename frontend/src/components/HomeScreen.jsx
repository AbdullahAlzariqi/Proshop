
import { Row, Col } from 'react-bootstrap'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import { Product, Loader, Message } from '../components'
const HomeScreen = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();
    console.log(products, error)





    return (
        <>
            {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error?.error}</Message>) : (<><h1>Latest Products</h1><Row>
                {
                    products.map((product) => {
                        return <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    })
                }
            </Row></>)}

        </>
    )
}

export default HomeScreen