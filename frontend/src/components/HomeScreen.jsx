
import { Row, Col } from 'react-bootstrap'
import { useGetProductsQuery } from '../slices/productsApiSlice'
const HomeScreen = () => {
    const { data: products, isLoading, isError } = useGetProductsQuery();
    console.log(products)





    return (
        <>
            <Row>
                {
                    products.map((product) => {
                        return <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    })
                }
            </Row>
        </>
    )
}

export default HomeScreen