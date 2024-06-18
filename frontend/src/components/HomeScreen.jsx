
import { Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import { Product, Loader, Message, Paginate, ProductCarousel } from '../components'
const HomeScreen = () => {
    const { pageNumber, keyword } = useParams();
    const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });


    return (
        <>
            <ProductCarousel></ProductCarousel>
            {keyword && <Link to='/' className='btn btn-light mb-4'>Go back</Link>}
            {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error?.data?.message || error?.error}</Message>) : (<><h1>Latest Products</h1><Row>
                {
                    data.products.map((product) => {
                        return <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    })
                }
            </Row>
                <Paginate
                    pages={data.pages}
                    page={data.page}
                    keyword={keyword}
                ></Paginate>
            </>)}

        </>
    )
}

export default HomeScreen