import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ pageNumber }) => ({
                url: '/api/products',
                params: {
                    pageNumber
                }
            }),
            provideTags: ['Product'],
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `/api/products/${id}`
            }),
            keepUnusedDataFor: 5
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: `/api/products`,
                method: "POST",
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `/api/products/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Product']
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: '/api/uploads',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Product']
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/api/products/${id}`,
                method: 'delete',
            }),
            invalidatesTags: ['Product']
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `/api/products/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product']
        }),
    })
})

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation, useCreateReviewMutation } = productsApiSlice;

