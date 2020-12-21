import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// components

import Sidebar from "../../components/Sidebar.js";
import AdminList from './AdminList';
import AdminTambah from './AdminTambah'
import BarangList from './BarangList';
import BarangTambah from './BarangTambah';
import BarangEdit from './BarangEdit'
import StockingList from './StockingList';
import StockingTambah from './StockingTambah';
import UserList from './UsersList';
import UserEdit from './UserEdit';
import GambarList from './GambarList';
import BarangStock from './BarangStock'
import DiscountTambah from './DiscountTambah'
import DiscountList from './DiscountList'
import DiscountEdit from './DiscountEdit'
import PembayaranList from './PembayaranList'
import PembayaranDetail from './PembayaranDetail'
// views
import Dashboard from './Dashboard';

export default function Admin() {
  return (
    <>
      <Sidebar />
      
      <div className="relative md:ml-64 bg-gray-200 min-h-screen">
        <div className="px-4 md:px-10 mx-auto w-full pt-5">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/admin" exact component={AdminList} />
            <Route path="/admin/adminTambah" exact component={AdminTambah} />
            <Route path="/admin/barang" exact component={BarangList} />
            <Route path="/admin/barangTambah" exact component={BarangTambah} />
            <Route path="/admin/barang/:idBarang" exact component={BarangEdit}/>
            <Route path="/admin/barang/:idBarang/gambar" exact component={GambarList}/>
            <Route path="/admin/barang/:idBarang/stock" exact component={BarangStock}/>
            <Route path="/admin/stocking" exact component={StockingList} />
            <Route path="/admin/stockingTambah" exact component={StockingTambah} />
            <Route path="/admin/user" exact component={UserList}/>
            <Route path="/admin/user/:idUser" exact component={UserEdit}/>
            <Route path="/admin/discount" exact component={DiscountList}/>
            <Route path="/admin/discountTambah" exact component={DiscountTambah}/>
            <Route path="/admin/discount/:idDiscount" exact component={DiscountEdit}/>
            <Route path="/admin/pembayaran" exact component={PembayaranList}/>
            <Route path="/admin/pembayaran/:idCheckout" exact component={PembayaranDetail}/>
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
        </div>
      </div>
    </>
  );
}
