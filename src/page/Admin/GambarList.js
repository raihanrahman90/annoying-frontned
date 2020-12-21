import React from 'react'
import axios from 'axios'
var request = require('../../class/request');
class GambarList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            idBarang:this.props.match.params.idBarang,
            barang:[],
            gambar:null
        }
        this.token = sessionStorage.getItem("token")
    }
    componentDidMount(){
        this.getGambar()
    }
    onSubmit = e=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('gambar',this.gambar);
        request.post(
            "barang/"+this.state.idBarang+"/gambar", formData
        ).then(res=>{
            if(res.success){
                console.log("disini")
                this.getGambar()
            }
        })
    }
    getGambar =()=>{
        axios.get(
            'barang/'+ this.state.idBarang+'/gambar'
         ).then(res=>{
             this.setState(()=>({
                 barang:res.data.result
             }))
         })
    }
    deleteGambar = (idBarangGambar)=>{
        request.hapus('barang/'+this.state.idBarang+"/gambar/"+idBarangGambar)
        .then(data=>{
            console.log(data)
            this.getGambar()
        })
    }
    render(){
        return(
            <div className="flex flex-col sm:flex-wrap">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Gambar {this.state.barang.namaBarang}
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
                                                Gambar
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
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img className="h-10 w-10 rounded-full" src={"https://ann.tambak.in/images/barang/"+barang.gambar} alt=""/>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button class="text-red-500 hover:text-red-600 mx-5" onClick={()=>this.deleteGambar(barang.idBarangGambar)}>Delete</button>
                                                </td>
                                            </tr>    
                                        ))}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <form className="mt-5 lg:mt-0 sm:ml-3" onSubmit={this.onSubmit}>
                        <div className="my-3">
                            <input type="file" onChange={e=>this.gambar=e.target.files[0]} required/>
                        </div>
                        <div className="my-3">
                            <button
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                type="submit">
                                <i className="fa fa-plus-circle mr-3"></i>
                                Tambah
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
        )
    }
}
export default GambarList