import React from 'react';
import {CardCart, InputRounded} from '../../components/Input'
var request = require('../../class/request')
class Cart extends React.Component{
    constructor(props){
        super(props)
        this.state={
            cart:[],
            jumlah:0,
            discount:0,
            message:"",
            listProvinsi:[],
            listKota:[],
            ongkosKirim:30000
        }
        request.get('cart/mycart/CheckoutNull')
        .then(res=>{
            this.setState({
                cart:res.result,
                jumlah:res.jumlah
            })
        })
    }
    componentDidMount(){
        request.get('cart/mycart/CheckoutNull')
        .then(res=>{
            this.setState({
                cart:res.result,
                jumlah:res.jumlah
            })
        })
        this.getDataDefault()
        request.get('https://dev.farizdotid.com/api/daerahindonesia/provinsi')
        .then(res=>{
            this.setState({
                listProvinsi:res.provinsi.map(row=>{return {nama:row.nama, value:row.id}})
            })
        })
        request.get("https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi="+11)
        .then(res=>{
            this.setState({
                listKota:res.kota_kabupaten
            })
        })
    }
    
    getDataDefault=()=>{
        request.get('user/myData')
        .then(res=>{
            this.setState({
                username:res.result.username, 
                atasNama:res.result.nama,
                noTelpon:res.result.noTelpon,
                provinsi:res.result.provinsi,
                kota:res.result.kota,
                kecamatan:res.result.kecamatan,
                kelurahan:res.result.kelurahan,
                alamat:res.result.alamat
            })
            this.changeProvinsi(res.result.provinsi)
        })
    }
    getData=(subkategori)=>{
        request.get('cart/mycart/CheckoutNull')
        .then(res=>{
            this.setState({
                cart:res.result,
                jumlah:res.jumlah
            })
        })
    }
    updateCart = (value, idCart)=>{
        var data={
            jumlah:value
        }
        request.post(
            'cart/'+idCart,
            data
        ).then(res=>{
            this.getData()
        })
    }
    hapusCart = (idCart)=>{
        request.hapus(
            'cart/'+idCart
        ).then(res=>{
            this.getData()
        })
    }
    changeProvinsi = (id)=>{
        this.setState({
            provinsi:id
        })
        request.get("https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi="+id)
        .then(res=>{
            this.setState({
                listKota:res.kota_kabupaten
            })
        })
    }
    cekKodeDiscount = ()=>{
        request.get('kodeDiscount/'+this.state.kodeDiscount)
        .then(res=>{
            if(res.success){
                this.setState({
                    discount:res.discount,
                    message:"Discount "+(res.discount)+" %"
                })
            }else{
                this.setState({
                    message:res.message
                })
            }
        })
    }
    convertToRp=(angka)=>{
        return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    totalToDiscount=(total)=>{
        return (total*(100-this.state.discount)/100)+this.state.ongkosKirim
    }
    handleSubmit = e=>{
        e.preventDefault()
        if(this.state.cart.length>0){
            var namaProvinsi = this.state.listProvinsi.filter((row)=>row.value.toString()===this.state.provinsi.toString())[0].nama
            var data={
                atasNama:this.state.atasNama,
                noTelpon:this.state.noTelpon,
                provinsi:namaProvinsi,
                kota:this.state.kota,
                kecamatan:this.state.kecamatan,
                kelurahan:this.state.kelurahan,
                alamat:this.state.alamat,
                kodeDiscount:this.state.kodeDiscount,
                total:this.totalToDiscount(this.state.jumlah),
                ongkosKirim:this.state.ongkosKirim
            }
            request.post(
                'checkout', data
            ).then(res=>{
                if(res.success){
                    window.location.reload('/dashboard/tagihan/'+res.id)
                }
            })
        }else{
            alert('Mohon masukkan barang ke keranjang sebelum checkout')
        }
        
    }
    render(){
        var total = this.convertToRp(this.state.jumlah+this.state.ongkosKirim)
        return(
            < form onSubmit={this.handleSubmit}>
                <div className="bg-gray-primary min-h-screen h-fit w-screen z-50 md:px-80 pt-48 pb-48">
                    <div className="flex flex-wrap w-full h-full justify-start">
                        {
                            this.state.cart.map(barang=>(
                                <div className=" mx-1 md:w-1/6 overflow-x-hidden flex justify-center mx-3">
                                    <CardCart data={barang} updateCart={(value, idCart)=>this.updateCart(value,idCart)} hapusCart={this.hapusCart} hapus={true}/>
                                </div>
                            ))
                        }
                    </div>
                        <div className="md:w-full flex flex-wrap justify-center mx-3 mt-24">
                            <h2 className="w-full text-2xl text-center">Alamat Pengiriman</h2>
                            <div className="flex w-full flex-wrap">
                                <div className="w-full md:w-1/2 h-fit px-3">
                                    <InputRounded name="atasNama" label="Atas Nama" value={this.state.atasNama} onChange={(value)=>this.setState({atasNama:value})}/>
                                    <InputRounded name="noTelpon" label="No Telpon" value={this.state.noTelpon} onChange={(value)=>this.setState({noTelpon:value})}/>
                                </div>
                                <div className="w-full flex flex-wrap">
                                    <div className="w-full md:w-1/2 px-3">
                                        <InputRounded name="provinsi" type="select" listData={this.state.listProvinsi} label="Provinsi" value={this.state.provinsi} onChange={(value)=>this.changeProvinsi(value)} className="w-1/2"/>
                                    </div>
                                    <div className="w-full md:w-1/2 px-3">
                                        <InputRounded name="kota" type="select" label="Kota" listData={this.state.listKota} value={this.state.kota} onChange={(value)=>this.setState({kota:value})}/>
                                    </div>
                                    <div className="w-full md:w-1/2 px-3">
                                        <InputRounded name="kecamatan" type="text" label="Kecamatan" value={this.state.kecamatan} onChange={(value)=>this.setState({kecamatan:value})} className="w-1/2"/>
                                    </div>
                                    <div className="w-full md:w-1/2 px-3">
                                        <InputRounded name="kelurahan" type="text" label="Kelurahan" value={this.state.kelurahan} onChange={(value)=>this.setState({kelurahan:value})} className="w-1/2"/>
                                    </div>
                                    <div className="w-full px-3">
                                        <InputRounded name="Alamat" type="text" label="Alamat" value={this.state.alamat} onChange={(value)=>this.setState({alamat:value})} className="w-1/2"/>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                </div>
                <div className="fixed bottom-0 bg-gray-800 text-white w-full md:px-80 h-fit flex flex-wrap justify-center pt-5 pb-5 overflow-y-scroll">
                    <div className="w-1/3 h-fit">
                        <div className="block">{this.state.message}</div>
                        <input type="text" placeholder="Masukkan kode discount" className="w-fit border-2 border-gray-500 h-10 text-gray-800" onChange={e=>this.setState({kodeDiscount:e.target.value})}/>
                        <button type="button" className="text-white bg-gray-700 h-10 px-2" onClick={this.cekKodeDiscount}>Gunakan</button>
                    </div>
                    <div className="w-1/3 pt-2 h-fit">
                        <div className="w-fit text-center ml-auto mr-auto">
                            ongkosKirim Rp. <span>{this.convertToRp(this.state.ongkosKirim)}</span>
                        </div>
                        <div className="w-fit text-center ml-auto mr-auto">
                            Total Barang Rp. {(this.state.discount>0)?<span className="line-through">{total}</span>:total}
                        </div>
                        <div className="w-fit text-right ml-auto mr-auto">
                            {(this.state.discount>0)?<span className="text-red-700 text-4xl font-extrabold">{this.convertToRp(this.totalToDiscount(this.state.jumlah))}</span>:""}
                        </div>
                    </div>
                        <div className="w-1/3 pt-6 h-fit">
                            <button className="text-white border-2 border-white px-5 py-1 float-right" type="submit">Checkout</button>
                        </div>
                </div>
            </form>
        )
    }
}
export default Cart;