import React from 'react'
import {InputRounded} from '../../components/Input';
var request = require('../../class/request')
class AdminTambah extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            gambar:[],
            idBarang:this.props.match.params.idBarang,
            listKategori:[
            {
                nama:"Laki-laki",
                value:"Laki-laki"
            },
            {
                nama:"Perempuan",
                value:"Perempuan"
            },
            {
                nama:"Anak-anak",
                value:"Anak-anak"
            },
            ],
            
            namaBarang:'',
            harga:0,
            kategori:'',
            subKategori:'',
            deskripsi:''
        }
        this.kategori=this.state.listKategori[0].value
    }
    handleSubmit = e=>{
        e.preventDefault();
        var data = {
            namaBarang:this.state.namaBarang,
            harga:this.state.harga,
            kategori:this.state.kategori,
            subkategori:this.state.subkategori,
            deskripsi:this.state.deskripsi
        }
        request.post('barang/'+this.state.idBarang, data)
        .then(res=>{
            if(res.success){
                this.props.history.push('/admin/barang')
            }
        })
    }
    componentDidMount(){
        this.getBarang();
    }
    getBarang =()=>{
        console.log('ini ngeget lagi')
        request.get(
            'barang/'+this.state.idBarang
         ).then(res=>{
             this.setState({
                namaBarang:res.result.namaBarang,
                harga:res.result.harga,
                kategori:res.result.kategori,
                subkategori:res.result.subkategori,
                deskripsi:res.result.deskripsi
            })
         })
    }
    render(){
        return(
            <div className="flex flex-col sm:flex-wrap">
                <div className="lg:flex lg:items-center lg:justify-between col-span-12">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Tambah Barang
                        </h2>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 col-span-12">
                    <form onSubmit={this.handleSubmit}>
                        <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 bg-white sm:p-3">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <InputRounded type="text" name="Barang" label="Barang" onChange={(value)=>this.setState({namaBarang:value})} value={this.state.namaBarang}/>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 bg-white sm:p-3">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <InputRounded type="select" name="Kategori" label="Kategori" onChange={(value)=>this.setState({kategori:value})} 
                                    listData={this.state.listKategori}
                                    value={this.state.kategori}/>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 bg-white sm:p-3">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <InputRounded type="text" name="subkategori" label="Sub Kategori" onChange={(value)=>this.setState({subkategori:value})} value={this.state.subkategori}/>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 bg-white sm:p-3">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <InputRounded type="number" name="Harga" label="Harga" onChange={(value)=>this.setState({harga:value})} value={this.state.harga}/>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 bg-white sm:p-3">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <InputRounded type="text" name="Deskripsi" label="Deskripsi" onChange={(value)=>this.setState({deskripsi:value})} value={this.state.deskripsi}/>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button type="submit" 
                            className="inline-flex justify-center py-2 px-4 border border-green-500 text-green-500 hover:text-white hover:bg-green-500 shadow-sm text-sm font-medium text-white bg-yellow-light hover:bg-yellow-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Tambah
                            </button>
                        </div>
                        </div>
                    </form>
                    </div>
            </div>
            
        )
    }
}
export default AdminTambah