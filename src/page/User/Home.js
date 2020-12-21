import React from 'react'
import {Switch, Route} from 'react-router-dom';
import ShopNow from './ShopNow'
import Hero from '../../components/Hero'
import SidebarHome from '../../components/SidebarHome'
import Barang from './Barang'
import PrivateRouter from '../../components/PrivateRoute';
import Pengaturan from './Pengaturan'
import PesananDetail from './PesananDetail'
import PesananList from './PesananList'
import Cart from './Cart';
export default class Home extends React.Component{
    render(){
        return(
            <div className="bg-gray-primary text-gray-700 h-fit">
                <div class="relative px-4 sm:px-6 lg:px-8 w-screen z-20">
                    <SidebarHome onClick={(value)=>this.setState({kategori:value})}/>
                </div>
                <Switch>
                    <PrivateRouter path="/dashboard/cart" component={Cart} authed={["User"]}/>
                    <PrivateRouter path="/dashboard/pengaturan" component={Pengaturan} authed={["User"]}/>
                    <PrivateRouter exact path="/dashboard/pesanan" component={PesananList} authed={["User"]}/>
                    <PrivateRouter exact path="/dashboard/pesanan/:idCheckout" component={PesananDetail} authed={["User"]}/>
                    <Route exact path="/dashboard/barang/:idBarang" component={Barang}/>
                    <Route exact path="/dashboard/barang-kategori/:kategori" component={ShopNow}/>
                    <Route exact path="/dashboard/:kategori" component={Hero}/>
                </Switch>
            </div>
        )
    }
}