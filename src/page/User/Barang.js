import React from 'react'
import SliderBarang, {SliderGambar, CommentSlider} from '../../components/SliderBarang'
import Footer from '../../components/Footer';
import Dialog from '../../components/Dialog';
var request = require('../../class/request');
class Barang extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            idBarang:this.props.match.params.idBarang,
            stock:{namaBarang:'',warna:{},harga:0,kategori:""},
            gambar:[],
            warna:null,
            ukuran:null,
            rekomendasi:[]
        }
    }
    getBarang =()=>{
        request.get(
            'barang/'+this.props.match.params.idBarang
         ).then(res=>{
             this.setState({
                 stock:res.result,
                 idBarang:this.props.match.params.idBarang
             })
             request.get(
                 'kategori/'+res.result.kategori+"/subkategori/"+res.result.subkategori
             ).then(res=>{
                 this.setState({rekomendasi:res.result})
             })
             document.body.scrollTop = 0;
         })
         request.get(
             'barang/'+this.props.match.params.idBarang+'/gambar'
         ).then(res=>{
             this.setState({
                 gambar:res.result
             })
         })
    }
    componentDidMount(){
        this.getBarang()
    }
    componentDidUpdate(){
        if(this.state.idBarang!==this.props.match.params.idBarang){
            this.getBarang()
        }
    }
    addCart = e =>{
        e.preventDefault()
        if(this.state.jumlah > this.state.stock.warna[this.state.warna][this.state.ukuran].stock){
            alert("Total barang melebihi jumlah stock")
        }else{
            var data = {
                idBarangStock:this.state.idBarangStock,
                jumlah:this.state.jumlah
            }
            if(sessionStorage.getItem('token')){
                request.post('cart', data)
                .then(res=>{
                    if(res.success){
                        document.getElementById('completeCart').classList.remove('hidden')
                    }
                })
            } else{
                alert("Mohon login sebelum melakukan pembelian")
            }
        }
        
    }
    render(){
        var stock = this.state.stock
        return(
            <div className="bg-gray-primary min-h-screen h-fit w-screen z-50 pt-10">
                <Dialog idDialog="completeCart" message="Berhasil ditambahkan ke keranjang"/>
                    <div className="mt-20  flex flex-wrap top-10 w-full justify-center md:px-32">
                        <div className="md:w-1/2 px-10 w-full">
                            <SliderGambar data={this.state.gambar} className="w-1/2"/>
                        </div>
                        <div className="flex flex-col mt-5 md:w-1/2 w-full px-4">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                                            {stock.namaBarang}
                                        </h2>
                                        <h2 className="text-xl leading-6 text-gray-900">
                                            Rp. {stock.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}                             
                                        </h2>
                                        <p>
                                            {stock.deskripsi}
                                        </p>
                                        <p className="mt-5">
                                            Warna
                                        </p>
                                        <div className="mt-3">
                                            {(stock.warna)?Object.keys(stock.warna).map((key, index)=>(
                                                <button onClick={e=>this.setState({warna:key, idBarangStock:null, ukuran:null})} 
                                                className={"shadow px-5 py-2 bg-white mx-2 w-24 "+(this.state.warna===key?"bg-gray-700 text-white":"")}
                                                >{key}</button>
                                            )):<p>Stock belum tersedia</p>}
                                        </div>
                                        <div className="mt-3">
                                            {(this.state.warna)?
                                                    <p className="mt-5">
                                                        Ukuran
                                                    </p>:""}
                                            {(this.state.warna)?Object.keys(stock.warna[this.state.warna]).map((key, index)=>(
                                                <>
                                                    <button onClick={e=>{
                                                        
                                                        this.setState({
                                                            ukuran:key,
                                                            idBarangStock:stock.warna[this.state.warna][key].idBarangStock
                                                        })
                                                        }
                                                    } 
                                                    className={"shadow px-5 py-2 bg-white mx-2 w-24 "+(this.state.ukuran===key?"bg-gray-700 text-white":"")}
                                                    >{key}</button>
                                                </>
                                            )):""}
                                        </div>
                                        <div className="mt-3">
                                            {(this.state.ukuran)?
                                                    <p className="mt-5">
                                                        Jumlah
                                                    </p>:""}
                                            {(this.state.ukuran)?
                                                <input type="number"
                                                        className="border-2 border-gray-500 w-24 text-center" 
                                                        max={stock.warna[this.state.warna][this.state.ukuran].stock}
                                                        onChange={e=>this.setState({jumlah:e.target.value})}
                                                        />:""}
                                        </div>
                                        {(this.state.jumlah>0)?<div className="mt-3">
                                            <button className="w-full bg-yellow-600 text-white py-2" onClick={this.addCart}>Tambah Ke Keranjang</button>
                                        </div>:<></>}
                                </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap my-10 w-full">
                        <h2 className="text-2xl text-center w-full">Rekomendasi</h2>
                       <SliderBarang data={this.state.rekomendasi} className="w-full"/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default Barang