import {Component} from 'react'
import { Link } from 'react-router-dom'
var request = require('../../class/request')
export default class PesananList extends Component{
    constructor(props){
        super(props)
        this.state={
            checkout:[]
        }
    }
    componentDidMount(){
        this.getCheckout()
    }

    getCheckout=()=>{
        request.get('checkout/getMyCheckout')
        .then(res=>{
            this.setState({
                checkout:res.result
            })
        })
    }
    convertToRp=(angka)=>{
        return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    render(){
        return(
            <>
                <div className="pt-24 min-h-screen h-fit w-screen px-2 md:px-80">
                    <table className="w-full text-white font-light overflow-x-scroll">
                        <thead>
                            <tr className="bg-gray-700 px-1 text-center">
                                <td className="py-5">Tanggal</td>
                                <td className="py-5">Total</td>
                                <td className="py-5">Status</td>
                                <td className="py-5">Status</td>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {
                                this.state.checkout.map(data=>(
                                    <tr className="border-b-2 border-gray-700 h-fit text-center pt-5 border-b-2">
                                        <td>{data.pemesanan}</td>
                                        <td>Rp. {this.convertToRp(data.total)}</td>
                                        <td>{data.status}</td>
                                        <td><Link className="border-2 border-gray-700 text-gray-700
                                                                bg-transparent hover:text-white hover:bg-gray-700
                                                                px-2 py-2
                                                                font-bold h-fit block my-2"
                                                    to={"/dashboard/pesanan/"+data.idCheckout}>Detail</Link></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}