import React from 'react'
import { Link } from 'react-router-dom'
var request = require('../../class/request')
class DiscountList extends React.Component{
    constructor(props){
        super(props)
        this.state = {discount:[]}
    }
    componentDidMount(){
        request.get('/discount'
        ).then(res=>{
            console.log(res)
            this.setState({
                discount:res.result
            })
        })
    }
    render(){
        return(
            <div className="flex flex-col sm:flex-wrap">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Discount
                        </h2>
                    </div>
                    <div className="mt-5 flex lg:mt-0 lg:ml-auto">
                        <span className="sm:ml-3">
                            <Link 
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                to="/admin/discountTambah">
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
                                        Kode
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Discount
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Mulai
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Selesai
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {this.state.discount.map(discount=>(
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                
                                                <div className="text-sm text-gray-900">{discount.kodeDiscount}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{discount.discount} %</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{discount.mulai}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{discount.berakhir}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link to={'/discount/discount/'+discount.idDiscount} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
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
export default DiscountList