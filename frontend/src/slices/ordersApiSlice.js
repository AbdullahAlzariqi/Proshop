import { ORDERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const OrdersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: { ...order }
            })
        }),
        //add here
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
            }),
            keepUnusedDataFor: 5
        }),
    })
})

export const { useCreateOrderMutation, useGetOrderDetailsQuery } = OrdersApiSlice;