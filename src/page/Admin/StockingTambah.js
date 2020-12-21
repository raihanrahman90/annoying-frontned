import React from 'react'
import {InputRounded} from '../../components/Input';
var request = require('../../class/request')
export default class StockingTambah extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pencarianNamaBarang:'',
            pencarianIdBarang:'',
            search:null,
            listKategori:[
                {
                    nama:"",
                    value:""
                },
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
                }
            ],
            detailStocking:[
            ],
            barang:[]
        }
        this.getFilterBarang = this.getFilterBarang.bind(this)
    }
    deleteIndex = (index)=>{
        var array = [...this.state.detailStocking]
        array.splice(index, 1);
        this.setState({detailStocking:array})
    }
    componentDidMount(){
        request.get('barang')
        .then(res=>{
            this.setState({barang:res.result})
        })
    }
    getFilterBarang=()=>{
        return this.state.barang.filter((el)=>{
            return el.namaBarang.search(this.state.pencarianNamaBarang) > -1 && el.kategori.search(this.state.pencarianKategori)>-1 && el.subkategori.search(this.state.pencarianSubKategori)>-1    
          });
    }
    submitStocking=e=>{
        e.preventDefault()
        if(this.state.detailStocking.length > 0){
            var data = {
                detailStocking:this.state.detailStocking
            }
            request.post("stocking",data)
            .then(res=>{
                if(res.success){
                    this.props.history.push('/admin/stocking')
                }
            })
        }else{
            alert("Mohon tambah barang sebelum menyimpan data stocking")
        }
    }
    tambahList = e =>{
        e.preventDefault()
        if(!this.namaBarang || this.namaBarang===''){
           alert('Id Barang tidak ditemukan')
        }else{
            var array = [...this.state.detailStocking]
            array.push({
                idBarang:this.state.idBarang,
                namaBarang:this.namaBarang,
                ukuran:this.state.ukuran,
                warna:this.state.warna,
                stock:this.state.stock
            })
            this.setState({
                detailStocking:array,
                namaBarang:null,
                idBarang:null,
                warna:null,
                ukuran:null,
                stock:null
            })
            document.getElementById('Id').focus()
        }
            
    }
    changeId=value=>{
        var id = parseInt(value)
        console.log(this.state.barang)
        var barang = this.state.barang.filter((arr)=>{
            return arr.idBarang===id
        })
        if(barang[0]){
            this.namaBarang= barang[0].namaBarang
        }else{
            this.namaBarang=""
        }
        this.setState({idBarang:id})
    }
    pilihBarang=(idBarang, namaBarang)=>{
        this.setState({idBarang:idBarang})
        this.namaBarang = namaBarang
        this.closeSearch()
    }
    openSearch=()=>{
        document.getElementById("search").classList.remove('hidden')
        document.getElementById('pencarianNama').focus()
    }
    closeSearch=()=>{
        document.getElementById("search").classList.add('hidden')
    }
    render(){
        return(
            <div className="flex flex-col sm:flex-wrap min-h-screen">
                <div className="lg:flex lg:items-center lg:justify-between col-span-12">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Tambah Stocking
                        </h2>
                    </div>
                </div>
                
                            {/*Search*/}
                            <>
                            <div className="absolute w-full h-full bg-white z-50 left-0 md:px-32 md:py-20 bg-opacity-80 hidden " id="search">
                                <div className="bg-opacity-100 bg-white relative h-full">
                                    
                                    <div className="grid grid-cols-6 gap-6 mb-5 sticky">
                                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate col-span-6">
                                            Pencarian
                                        </h2>
                                        <span className="absolute right-0 top-0">
                                            <button className="w-10 h-10" onClick={this.closeSearch}><span className="fa fa-times"></span></button>
                                        </span>
                                        <div className="col-span-1 col-span-6 md:col-span-2">     
                                            <InputRounded type="text" name="pencarianNama" label="Nama Barang" onChange={(value)=>this.setState({pencarianNamaBarang:value})} value={this.state.pencarianNamaBarang}/>
                                        </div>
                                        <div className="col-span-1 col-span-6 md:col-span-2">                                    
                                            <InputRounded type="select" name="pencarianKategori" label="Kategori" 
                                                listData={this.state.listKategori}
                                                onChange={(value)=>this.setState({pencarianKategori:value})}
                                                value={this.state.pencarianKategori}/>
                                        </div>
                                        <div className="col-span-1 col-span-6 md:col-span-2">
                                            <InputRounded type="text" name="pencarianSubKategori" label="Sub Kategori" value={this.state.pencarianSubKategori} onChange={(value)=>this.setState({pencarianSubKategori:value})}/>
                                        </div>
                                        
                                    </div>
                                    <div className="w-full overflow-x-scroll mt-3 h-full">
                                    <table className="min-w-full divide-y divide-gray-200 overflow-y-scroll h-full overflow-x-scroll table-fixed">
                                        <thead>
                                            <tr>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama barang
                                            </th>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Kategori
                                            </th>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Subkategori                                            
                                            </th>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi                                           
                                            </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 overflow-y-auto  h-full w-full">
                                            {this.getFilterBarang().map(barang=>(
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button className="text-red-600 hover:text-red-900" onClick={()=>this.pilihBarang(barang.idBarang, barang.namaBarang)}>Pilih</button>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{barang.namaBarang}</div>                                                       
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{barang.kategori}</div>                                                       
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{barang.subkategori}</div>                                                       
                                                    </td>
                                                    
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button className="text-red-600 hover:text-red-900" onClick={()=>this.pilihBarang(barang.idBarang, barang.namaBarang)}>Pilih</button>
                                                    </td>
                                                </tr>    
                                            ))}
                                            
                                        </tbody>
                                        </table>
                                    </div>
                                
                                </div>
                                
                            </div>
                        </>
                            {/*Search*/}
                <div className="mt-5 md:mt-0 col-span-12 h-full">
                        <div className="shadow overflow-y-auto sm:rounded-md relative ">
                            <form className="px-4 bg-white sm:p-3 relative" onSubmit={this.tambahList}>
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-2 sm:col-span-2">
                                        <InputRounded type="text" name="Id" label="Id" onChange={(value)=>this.changeId(value)} value={this.state.idBarang}/>
                                    </div>
                                    <div className="col-span-2 sm:col-span-2">
                                        <InputRounded type="text" name="nama" label="Nama Barang" value={this.namaBarang} readonly="true"/>
                                    </div>
                                    <div className="col-span-2 sm:col-span-2 pt-6">
                                        <button type="button" className="bg-blue-500 w-8 h-8 text-white hover:bg-blue-700" onClick={this.openSearch}><span className="fa fa-search"></span></button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-2 sm:col-span-2">
                                        <InputRounded type="text" name="Warna" label="Warna" onChange={(value)=>this.setState({warna:value})} value={this.state.warna}/>
                                    </div>
                                    <div className="col-span-2 sm:col-span-2">
                                        <InputRounded type="text" name="Ukuran" label="Ukuran"  onChange={(value)=>this.setState({ukuran:value})} value={this.state.ukuran}/>
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-2 sm:col-span-2">
                                        <InputRounded type="number" name="Stock" label="Stock"  onChange={(value)=>this.setState({stock:value})} value={this.state.stock}/>
                                    </div>
                                    <div className="col-start-5 col-end-6 pt-8">
                                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-blue-400 shadow-sm text-sm font-medium text-blue-400 hover:bg-yellow-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Tambah
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="px-4 bg-white sm:p-3">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-6">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Id
                                            </th>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama barang
                                            </th>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Ukuran
                                            </th>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Warna
                                            </th>
                                            <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Stock
                                            </th>
                                            <th scope="col" className="px-6 py-3 bg-gray-50">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {this.state.detailStocking.map((detailStocking, index)=>(
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{detailStocking.idBarang}</div>                                                       
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{detailStocking.namaBarang}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{detailStocking.warna}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{detailStocking.ukuran}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{detailStocking.stock}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button className="text-red-600 hover:text-red-900" onClick={()=>this.deleteIndex(index)}>Hapus</button>
                                                    </td>
                                                </tr>    
                                            ))}
                                            
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-blue-400 shadow-sm text-sm font-medium text-blue-400 hover:bg-yellow-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={this.submitStocking}>
                                    Tambah
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}