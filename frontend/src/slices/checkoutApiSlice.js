import { Stripe_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const checkoutApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        receiveKey: builder.query({
            query: () => ({
                url: Stripe_URL
            }),
            keepUnusedDataFor: 5
        })
    })
})

export const { useReceiveKeyQuery } = checkoutApiSlice 