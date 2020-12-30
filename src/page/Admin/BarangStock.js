import React from 'react'
import { Link } from 'react-router-dom'
var request = require('../../class/request');
class BarangList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            idBarang:this.props.match.params.idBarang,
            stock:{}
        }
    }
    getBarang =()=>{
        request.get(
            'barang/'+this.state.idBarang
         ).then(res=>{
             this.setState({
                 stock:res.result.warna
             })
         })
    }
    componentDidMount(){
        this.getBarang()
    }
    render(){
        var stock = this.state.stock
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
                                                Warna
                                            </th>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Ukuran
                                            </th>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Stock
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {Object.keys(stock).map((key, index)=>(
                                            <>
                                            {Object.keys(stock[key]).map((key1,index)=>(
                                                <tr>
                                                    <td>{key}</td>
                                                    <td>{key1}</td>
                                                    <td>{index}</td>
                                                </tr>
                                            ))}
                                            </>
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