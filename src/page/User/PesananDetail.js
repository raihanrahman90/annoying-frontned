import jwt_decode from 'jwt-decode';
import React from 'react';
import {CardCart, InputRounded} from '../../components/Input'

var request = require('../../class/request')
class PesananDetail extends React.Component{
    constructor(props){
        super(props)
        var token = sessionStorage.getItem('token')
        this.state={
            result:[],
            idUserLogin:jwt_decode(token).idUser,
            idCheckout:this.props.match.params.idCheckout,
            jumlah:0,
            atasNama:"",
            noTelpon:"",
            provinsi:"",
            kota:"",
            kecamatan:"",
            kelurahan:"",
            ongkosKirim:0,
            discount:0,
            total:0,
            buktiGambar:"http://via.placeholder.com/150x150",
            bukti:null
        }
    }
    componentDidMount(){
        this.getData()
    }
    
    getData=()=>{
        request.get('checkout/'+this.state.idCheckout)
        .then(res=>{
            if(this.state.idUserLogin!==res.idUser){
                alert('Anda tidak memiliki akses ke halaman ini')
                window.location.reload('dashboard/pesanan')
            }else{
            this.setState({
                ...res,  buktiGambar:(res.bukti?"https://localhost:3000/images/buktiPembayaran/"+res.bukti:"http://via.placeholder.com/150x150"),terulas:(res.ulasan?true:false)
            })
            }
        })
    }
    convertToRp=(angka)=>{
        return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    totalToDiscount=()=>{
        return (this.state.total*(100-this.state.discount)/100)+this.state.ongkosKirim
    }
    uploadBukti=(event)=>{
        this.setState({
            buktiFile:event.target.files[0],
            buktiGambar:URL.createObjectURL(event.target.files[0])
        })
    }
    handleSubmit = e =>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('gambar',this.state.buktiFile);
        request.post(
            "checkout/"+this.state.idCheckout+"/bukti", formData
        ).then(res=>{
            if(res.success){
                alert('Berhasil')
            }else{
                alert('gagal')
            }
        })
    }
    submitPenilaian = e =>{
        e.preventDefault()
        var data = {
            idCheckout:this.state.idCheckout,
            nilai:this.state.nilai,
            ulasan:this.state.ulasan
        }
        request.post('ulasan', data)
        .then(res=>{
            if(res.success){
                alert('Ulasan terkirim')
                this.getData()
            }
        })
    }
    setNilai=(nilai)=>this.setState({nilai:nilai})
    render(){
        var total = this.convertToRp(this.totalToDiscount())
        var  totalBarang
        if(this.state.result.length > 0){
            console.log("c")
            totalBarang = this.convertToRp(this.state.result.map(data=>data.harga*data.jumlah).reduce((a,b)=>a+b))
        }
        return(
            <>
                <div className="bg-gray-primary min-h-screen h-fit w-screen z-50 px-80 pt-48 pb-48">
                    <div className="flex flex-wrap w-full h-full justify-start">
                        <table className="w-full text-white py-5 text-center">
                            <thead className="bg-gray-700">
                                <tr>
                                    <td>Nama Barang</td>
                                    <td>Harga</td>  
                                    <td>Jumlah</td>
                                    <td>Total</td>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                {this.state.result.map(barang=>(
                                    <tr className="border-b-2 border-gray-700">
                                        <td>
                                            <div className="block font-bold">{barang.namaBarang}</div>
                                            <div className="block">{barang.ukuran+"-"+barang.warna}</div>
                                        </td>
                                        <td>Rp. {this.convertToRp(barang.harga)}</td>
                                        <td>{barang.jumlah}</td>
                                        <td>Rp. {this.convertToRp(barang.harga*barang.jumlah)}</td>
                                    </tr>
                                ))}
                                <tr className="border-b-2 border-gray-700">
                                    <td colSpan="3">Ongkos Kirim</td>
                                    <td>Rp. {this.convertToRp(this.state.ongkosKirim)}</td>
                                </tr>
                                <tr className="border-b-2 border-gray-700">
                                    <td colSpan="3" className="font-bold">Total</td>
                                    <td>
                                        {this.state.discount>0?
                                            <>
                                                <span className="line-through">Rp.{totalBarang}</span>
                                                <span>Rp.{this.convertToRp(this.state.total)}</span>
                                            </>:
                                            <>
                                                <span>Rp. {this.convertToRp(this.state.total)}</span>
                                            </>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                        <div className="md:w-full flex flex-wrap justify-center mx-3 mt-24">
                            <h2 className="w-full text-2xl text-center">Alamat Pengiriman</h2>
                            <div className="flex w-full flex-wrap">
                                <div className="w-full md:w-1/2 h-fit px-3">    
                                    <InputRounded name="Status" label="Status Pengiriman" value={this.state.status} onChange={(value)=>this.setState({status:value})} readonly="true"/>
                                    <InputRounded name="atasNama" label="Atas Nama" value={this.state.atasNama} onChange={(value)=>this.setState({atasNama:value})} readonly="true"/>
                                    <InputRounded name="noTelpon" label="No Telpon" value={this.state.noTelpon} onChange={(value)=>this.setState({noTelpon:value})} readonly="true"/>
                                </div>
                                <div className="w-full flex flex-wrap">
                                    <div className="w-full md:w-1/2 px-3">
                                        <InputRounded name="provinsi" type="text" label="Provinsi" value={this.state.provinsi} onChange={(value)=>this.changeProvinsi(value)} className="w-1/2" readonly="true"/>
                                    </div>
                                    <div className="w-full md:w-1/2 px-3">
                                        <InputRounded name="kota" type="text" label="Kota" value={this.state.kota} onChange={(value)=>this.setState({kota:value})} readonly="true"/>
                                    </div>
                                    <div className="w-full md:w-1/2 px-3">
                                        <InputRounded name="kecamatan" type="text" label="Kecamatan" value={this.state.kecamatan} onChange={(value)=>this.setState({kecamatan:value})} className="w-1/2" readonly="true"/>
                                    </div>
                                    <div className="w-full md:w-1/2 px-3">
                                        <InputRounded name="kelurahan" type="text" label="Kelurahan" value={this.state.kelurahan} onChange={(value)=>this.setState({kelurahan:value})} className="w-1/2" readonly="true"/>
                                    </div>
                                    <div className="w-full px-3">
                                        <InputRounded name="Alamat" type="text" label="Alamat" value={this.state.alamat} onChange={(value)=>this.setState({alamat:value})} className="w-1/2" readonly="true"/>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className="w-full mt-5">
                                <h2 className="w-full text-2xl text-center">Bukti Pembayaran</h2>
                                <form className="w-full" onSubmit={this.handleSubmit}>
                                    <div className="md:w-full">
                                        <img src={this.state.buktiGambar} className="w-auto h-80 ml-auto mr-auto" name="gambar"/>
                                    </div>
                                    <div className="flex flex-wrap w-full">
                                        {(this.state.status!=='Terkonfirmasi')?
                                        <>
                                         <input type="file" onChange={this.uploadBukti} required className="md:ml-auto"/>
                                         <button type="submit" className="px-3 py-1 border-2 border-gray-700 md:mr-auto">Simpan</button>
                                         </>
                                            :
                                            <>
                                            </>
                                        }
                                       
                                        
                                    </div>
                                </form>
                            </div>
                            <div className="w-full mt-5">
                                <h2 className="w-full text-2xl text-center">Berikan Ulasan</h2>
                                <form className="w-1/2 flex flex-wrap justify-center" onSubmit={this.submitPenilaian}>
                                    <div className="w-full">
                                        {(this.state.status==='Terkonfirmasi' && !this.state.terulas)?
                                        <>
                                            <label>Nilai</label><br/>
                                            <input type="radio" name="nilai" onChange={()=>this.setNilai(1)} id="nilai_1" checked={this.state.nilai===1} required/> <label for="nilai_1" className="mr-2">1</label>
                                            <input type="radio" name="nilai" onChange={()=>this.setNilai(2)} id="nilai_2" checked={this.state.nilai===2} required/> <label for="nilai_1" className="mr-2">2</label>
                                            <input type="radio" name="nilai" onChange={()=>this.setNilai(3)} id="nilai_3" checked={this.state.nilai===3} required/> <label for="nilai_1" className="mr-2">3</label>
                                            <input type="radio" name="nilai" onChange={()=>this.setNilai(4)} id="nilai_4" checked={this.state.nilai===4} required/> <label for="nilai_1" className="mr-2">4</label>
                                            <input type="radio" name="nilai" onChange={()=>this.setNilai(5)} id="nilai_5" checked={this.state.nilai===5} required/> <label for="nilai_1">5</label>
                                            <InputRounded type="text" name="Ulasan" label="Ulasan" onChange={(value)=>this.setState({ulasan:value})} value={this.state.ulasan} required className="md:ml-auto" readonly={false}/>
                                            <button type="submit" className="px-3 py-1 border-2 border-gray-700 md:mr-auto mt-5 float-right">Simpan</button>
                                         </>
                                            :
                                            <>
                                            <InputRounded type="number" name="nilai" label="Nilai" onChange={(value)=>this.setState({nilai:value})} value={this.state.nilai} required className="md:ml-auto" readonly={true}/>
                                            <InputRounded type="text" name="Ulasan" label="Ulasan" onChange={(value)=>this.setState({ulasan:value})} value={this.state.ulasan} required className="md:ml-auto" readonly={true}/>
                                            </>
                                        }
                                       
                                        
                                    </div>
                                </form>
                            </div>
                        </div>
                </div>
                <div className="fixed bottom-0 bg-gray-800 text-white w-full px-80 h-fit flex justify-center pt-5 pb-5">
                {this.state.discount?
                    <div className="w-1/3">
                        <div className="block text-2xl">{"Voucher Discount "+this.state.discount+"%"}</div>
                    </div>
                :""}
                    <div className="w-1/3 pt-2">
                        <div className="w-fit text-center ml-auto mr-auto">
                            ongkosKirim Rp. <span>{this.convertToRp(this.state.ongkosKirim)}</span>
                        </div>
                        <div className="w-fit text-center ml-auto mr-auto">
                            Total Barang Rp. {(this.state.kodeDiscount)?<span className="line-through">{totalBarang}</span>:totalBarang}
                        </div>
                        <div className="w-fit text-right ml-auto mr-auto">
                            {(this.state.kodeDiscount)?<span className="text-red-700 text-4xl font-extrabold">{this.convertToRp(this.state.total)}</span>:""}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default PesananDetail;