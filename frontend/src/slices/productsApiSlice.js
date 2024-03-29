import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: '/api/products',
            }),
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `/api/products/${id}`
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;

