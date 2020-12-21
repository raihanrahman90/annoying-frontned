import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
var request = require('../../class/request');
class BarangList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            barang:[]
        }
        this.token = sessionStorage.getItem("token")
    }
    componentDidMount(){
        this.getBarang()
    }
    getBarang =()=>{
        axios.get(
            'barang'
         ).then(res=>{
             this.setState({
                 barang:res.data.result
             })
         })
    }
    deleteBarang = (idBarang)=>{
        console.log(idBarang)
        request.hapus('barang/'+idBarang)
        .then(data=>{
            console.log(idBarang)
            this.getBarang()
        })
    }
    render(){
        console.log(this.state.barang)
        return(
            <div className="flex flex-col sm:flex-wrap">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Barang
                        </h2>
                    </div>
                    <div className="mt-5 flex lg:mt-0 lg:ml-auto">
                        <span className="sm:ml-3">
                            <Link 
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                to="/admin/barangTambah">
                                <i className="fa fa-plus-circle mr-3"></i>
                                Tambah
                            </Link>
                        </span>
                    </div>
                </div>
                <div className="flex flex-col mt-5">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama Barang
                                            </th>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Sub Kategori
                                            </th>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Harga
                                            </th>
                                            <th scope="col" className="px-6 py-3 bg-gray-50">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {this.state.barang.map(barang=>(
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                        {barang.namaBarang}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                        {barang.kategori}
                                                        </div>
                                                    </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {barang.subkategori}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{barang.harga}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link to={'/admin/barang/'+barang.idBarang+'/stock'} className='text-yellow-600 mx-5'>Stock</Link>
                                                    <Link to={'/admin/barang/'+barang.idBarang+'/gambar'} className='text-green-600 mx-5'>Gambar</Link>
                                                    <Link to={'/admin/barang/'+barang.idBarang} className="text-indigo-600 hover:text-indigo-900 mx-5">Edit</Link>
                                                    <button class="text-red-500 hover:text-red-600 mx-5" onClick={()=>this.deleteBarang(barang.idBarang)}>Delete</button>
                                                </td>
                                            </tr>    
                                        ))}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}
export default BarangList