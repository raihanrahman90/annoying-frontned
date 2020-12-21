import React from 'react';
import {InputRounded} from '../../components/Input'
import Dialog from '../../components/Dialog';
var request = require('../../class/request')
class Cart extends React.Component{
    constructor(props){
        super(props)
        this.state={
            idProvinsi:11,
            provinsi:"Aceh",
            listProvinsi:[],
            listKota:[]
        }
    }
    componentDidMount(){
        this.getData()
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
    getData=()=>{
        request.get('user/myData')
        .then(res=>{
            this.setState({
                username:res.result.username, 
                nama:res.result.nama,
                atasNama:res.result.atasNama,
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
    changeProvinsi = (id)=>{
        this.setState({
            provinsi:id
        })
        request.get("https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi="+id)
        .then(res=>{
            this.setState({
                listKota:res.kota_kabupaten,
                kota:res.kota_kabupaten[0].nama
            })
        })
    }
    handleSubmit = e =>{
        e.preventDefault()
        var data = {
            username:this.state.username,
            nama:this.state.nama,
            provinsi:this.state.provinsi,
            kota:this.state.kota,
            kecamatan:this.state.kecamatan,
            kelurahan:this.state.kelurahan,
            alamat:this.state.alamat,
            noTelpon:this.state.noTelpon
        }
        request.post('user/myData', data)
        .then(res=>{
            if(res.success){
                sessionStorage.setItem('token', res.token)
                document.getElementById('complete').classList.remove('hidden')
            }
        })
    }
    render(){
        return(
            <>
            <Dialog idDialog="complete" message="Data Berhasil disimpan"/>
                <div className="bg-gray-primary min-h-screen h-fit w-screen z-50 md:px-80 pt-48 pb-48">
                        <div className="md:w-full flex flex-wrap justify-center mx-3">
                            <h2 className="w-full text-2xl text-center font-bold">Data Diri</h2>
                            <form className="flex w-full flex-wrap" onSubmit={this.handleSubmit}>
                                <div className="w-full md:w-1/2 h-fit px-3">
                                    <InputRounded name="Username" label="Username" value={this.state.username} onChange={(value)=>this.setState({username:value})}/>
                                    <InputRounded name="Nama" label="Nama" value={this.state.nama} onChange={(value)=>this.setState({nama:value})}/>
                                </div>
                                <hr className="w-full bg-gray-600 h-1 my-4"/>
                                <h2 className="w-full text-2xl text-center font-bold">Data Pengiriman</h2>
                                <div className="w-full md:w-1/2 h-fit px-3">
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
                                    <div className="w-full flex  justify-end mt-3 px-3">
                                        <button type="submit" className="border-2 border-gray-800 text-gray-800 px-3 py-2 hover:bg-gray-800 hover:text-white">Simpan</button>
                                    </div>
                                </div>
                                
                            </form>
                        </div>
                </div>
            </>
        )
    }
}
export default Cart;