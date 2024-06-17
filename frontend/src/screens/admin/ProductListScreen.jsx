import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaTimes, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Message, Loader } from "../../components";
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
const ProductListScreen = () => {
    const { data: products, isLoading, error, refetch } = useGetProductsQuery();
    const [createProduct, { isLoading: newProductLoading }] = useCreateProductMutation();
    const [deleteProduct, { isLoading: deleteProductLoading }] = useDeleteProductMutation();


    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete a product')) {
            try {
                await deleteProduct(id);
                toast.success('product was deleted successfully!');
                refetch();
            } catch (error) {
                toast.error(e?.data?.message || e.message)
            }
        }
    }

    const handleCreateProduct = async () => {
        if (window.confirm('Are you sure you want to create a new product')) {
            try {
                await createProduct();
                refetch()

            } catch (e) {
                toast.error(e?.data?.message || e.message)
            }
        }
    }

    return (
        <>
            <Row>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end">
                    <Button className="btn-sm my-3 " onClick={handleCreateProduct}><FaPlus className="my-1"></FaPlus> Create Product</Button>
                </Col>
            </Row>
            {newProductLoading && <div> <Loader></Loader></div>}
            {deleteProductLoading && <div> <Loader></Loader></div>}
            {isLoading ? <div>  <Loader></Loader></div> : error ? <Message variant="danger">{error}</Message> :
                (<>
                    <Table striped hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className="btn-sm mx-2" >
                                                <FaEdit className="my-1" />
                                            </Button>
                                        </LinkContainer>

                                        <Button variant='danger' onClick={() => handleDeleteProduct(product._id)} className="btn-sm" disabled={deleteProductLoading}>
                                            <FaTrash className="my-1 mx-1" style={{ color: "white" }} />
                                        </Button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>)
            }
        </>
    )
}

export default ProductListScreen