import {Component} from 'react'
import {InputRounded} from '../../components/Input'
var request = require('../../class/request')
export default class PembayaranDetail extends Component{
    constructor(props){
        super(props)
        this.state={
            idCheckout:this.props.match.params.idCheckout,
            result:[],
            atasNama:null,
            noTelpon:null,
            alamat:null,
            provinsi:null,
            kota:null,
            kecamatan:null,
            kelurahan:null,

        }
    }
    componentDidMount(){
        this.getData()
    }
    getData=()=>{
        request.get('/checkout/'+this.state.idCheckout)
        .then(res=>{
            this.setState({
                ...res  
            })
        })
    }
    konfirmasi = e=>{
        e.preventDefault()
        var data={
            resi:this.state.resi
        }
        request.post('/pembayaran/'+this.state.idCheckout, data)
        .then(res=>{
            if(res.success){
                window.location.reload('admin/pembayaran')
            }
        })
    }
    convertToRp=(angka)=>angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    render(){
        return(
            <>
            <div className="flex flex-col sm:flex-wrap pb-32">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Pembayaran
                        </h2>
                    </div>
                </div>
                <div className="flex flex-col mt-5">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                    List Barang
                                </h2>
                                <div className="w-full overflow-x-scroll">

                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                        <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Id Barang
                                        </th>
                                        <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama Barang
                                        </th>
                                        <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Jumlah
                                        </th>
                                        <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Harga
                                        </th>
                                        <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {this.state.result.map(cart=>(
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{cart.idBarang}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{cart.namaBarang}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{cart.jumlah}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">Rp. {this.convertToRp(cart.harga)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">Rp. {this.convertToRp(cart.harga*cart.jumlah)}</div>
                                                </td>
                                            </tr>    
                                        ))}
                                        
                                    </tbody>
                                </table>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mt-10">
                                Bukti Pembayaran
                            </h2>
                            <div className="w-full flex justify-center">
                                {(this.state.bukti)?<img src={"https://ann.tambak.in/images/buktiPembayaran/"+this.state.bukti} className="h-80 w-auto"/>:
                                <>
                                    <h2 className="w-full text-center text-2xl text-gray-600">Bukti Pembayaran Belum diupload</h2>
                                </>
                                }
                            </div>
                            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mt-10">
                                Data Pengiriman
                            </h2>
                            <div className='flex w-full flex-wrap'>
                                <div className="w-full md:w-1/2 h-fit px-3">    
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
                                    <form className="px-3 mt-10" onSubmit={this.konfirmasi}>
                                        {(this.state.status==='Terkonfirmasi')? <InputRounded name="Resi" type="text" label="Resi" value={this.state.resi} onChange={(value)=>this.setState({resi:value})} value={this.state.resi} readonly={true}/>:
                                        <>
                                        <InputRounded name="Resi" type="text" label="Resi" value={this.state.resi} onChange={(value)=>this.setState({resi:value})} value={this.state.resi} readonly={false}/>
                                        <button
                                            type="submit"
                                            className='float-right border-2 border-yellow-700 px-3 py-1 text-yellow-700 hover:bg-yellow-700 hover:text-white'
                                            >Konfirmasi
                                        </button>
                                        </>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}