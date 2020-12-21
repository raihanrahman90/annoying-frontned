import {Component} from 'react'
import {Link} from 'react-router-dom'
var request = require('../../class/request')
export default class PembayaranList extends Component{
    constructor(props){
        super(props)
        this.state={
            checkout:[]
        }
    }
    componentDidMount(){
        this.getData()
    }
    getData=()=>{
        request.get('/pembayaran')
        .then(res=>{
            this.setState({
                checkout:res.result
            })
        })
    }
    render(){
        console.log(this.state)
        return(
            <>
            <div className="flex flex-col sm:flex-wrap">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Pembayaran
                        </h2>
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
                                        Id Checkout
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {this.state.checkout.map(checkout=>(
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{checkout.idCheckout}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{checkout.status}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link to={'/admin/pembayaran/'+checkout.idCheckout} className="text-indigo-600 hover:text-indigo-900">Detail</Link>
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
            </>
        )
    }
}