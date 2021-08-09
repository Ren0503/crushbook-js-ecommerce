import React from 'react'
import { Route } from 'react-router-dom'
import { ScrollToTop } from 'src/components/shared'
import {
    OrderScreen,
    PaymentScreen,
    ShippingScreen,
    PlaceOrderScreen,
} from 'src/screens/Order'

export default function OrderRoutes() {
    return (
        <ScrollToTop>
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/place_order' component={PlaceOrderScreen} />
        </ScrollToTop>
    )
}