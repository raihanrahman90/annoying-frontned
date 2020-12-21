import React from 'react'
import {InputRounded} from '../../components/Input';
var request = require('../../class/request')
class DiscountTambah extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            gambar:[]
        }
    }
    handleSubmit = e=>{
        e.preventDefault();
        var data = {
            kodeDiscount:this.state.kodeDiscount,
            discount:this.state.discount,
            mulai:this.state.mulai,
            berakhir:this.state.berakhir
        }
        request.post('discount', data)
        .then(res=>{
            if(res.success){
                window.location.assign('/admin/discount')
            }
        })
    }
    render(){
        return(
            <div className="flex flex-col sm:flex-wrap">
                <div className="lg:flex lg:items-center lg:justify-between col-span-12">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Tambah Discount
                        </h2>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 col-span-12">
                    <form onSubmit={this.handleSubmit}>
                        <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 bg-white sm:p-3">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <InputRounded type="text" name="kodeDiscount" label="Kode Discount" onChange={(value)=>this.setState({kodeDiscount:value})} value={this.state.kodeDiscount}/>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 bg-white sm:p-3">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <InputRounded type="number" name="Discount" label="Jumlah Discount(dalam persen)" onChange={(value)=>this.setState({discount:value})} value={this.state.discount}/>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 bg-white sm:p-3">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <InputRounded type="date" name="Awal" label="Dapat digunakan dari tanggal"  onChange={(value)=>this.setState({mulai:value})} value={this.state.mulai}/>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 bg-white sm:p-3">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <InputRounded type="date" name="Akhir" label="Dapat digunakan sampai tanggal"  onChange={(value)=>this.setState({berakhir:value})} value={this.state.berakhir}/>
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
export default DiscountTambah