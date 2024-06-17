import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import {
    Message, FormContainer, Loader
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from '../../slices/productsApiSlice';

const ProductEditScreen = () => {

    const { id } = useParams();
    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(id)
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [brand, setBrand] = useState('');
    const [image, setImage] = useState('');
    const [isChanged, setIsChanged] = useState(false)

    const [updateProduct, { isLoading: updateProductLoading }] = useUpdateProductMutation();
    const [uploadProductImage, { isloading: uploadImageLoading }] = useUploadProductImageMutation();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setImage(product.image);
            setBrand(product.brand);
        }
    }, [product])

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handleSubmission = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        };
        const result = await updateProduct(updatedProduct);
        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success("Product has been upated successfully");
            navigate('/admin/productList')
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0])
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message)
            setImage(res.image)
            setIsChanged(true)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }


    };

    return (
        <>
            <Link to='/admin/productList' className="btn btn-light my-3">Go Back</Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {updateProductLoading && <Loader />}
                {isLoading ? <Loader /> : error ? <Message variant='danger'>Error Fetching the Product: {error}</Message> : (
                    <Form onSubmit={handleSubmission} >

                        {/* NAME */}
                        <Form.Group controlId='name' className="my-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                    setIsChanged(true)
                                }}
                            >
                            </Form.Control>
                        </Form.Group>

                        {/* PRICE */}
                        <Form.Group controlId='price' className="my-2">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Price'
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value)
                                    setIsChanged(true)
                                }}
                            >
                            </Form.Control>
                        </Form.Group>

                        {/* IMAGE */}
                        <Form.Group controlId='image'>
                            <Form.Label className='my-2'>Upload Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Image Url'
                                value={image}
                                onChange={(e) => {
                                    setImage(e.target.value)
                                    setIsChanged(true)
                                }}
                            ></Form.Control>
                            <Form.Control
                                type='file'
                                label='Choose File'
                                onChange={uploadFileHandler}
                            >

                            </Form.Control>
                        </Form.Group>

                        {/* BRAND */}
                        <Form.Group controlId='brand' className="my-2">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Brand'
                                value={brand}
                                onChange={(e) => {
                                    setBrand(e.target.value)
                                    setIsChanged(true)
                                }}

                            >
                            </Form.Control>
                        </Form.Group>

                        {/* COUNT IN STOCK */}
                        <Form.Group controlId='countInStock' className="my-2">
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Name'
                                value={countInStock}
                                onChange={(e) => {
                                    setCountInStock(e.target.value)
                                    setIsChanged(true)
                                }}
                            >
                            </Form.Control>
                        </Form.Group>


                        {/* CATEGORY */}
                        <Form.Group controlId='category' className="my-2">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='category'
                                placeholder='Enter Category'
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value)
                                    setIsChanged(true)
                                }}

                            >
                            </Form.Control>
                        </Form.Group>


                        {/* DESCRIPTION */}
                        <Form.Group controlId='description' className="my-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='textArea'
                                placeholder='Enter Description'
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                    setIsChanged(true)
                                }}

                            >
                            </Form.Control>
                        </Form.Group>
                        <Button
                            type='submit'
                            variant='primary'
                            className='my-2'
                            style={{ float: 'right' }}
                            disabled={!isChanged}
                        >Update</Button>

                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default ProductEditScreen