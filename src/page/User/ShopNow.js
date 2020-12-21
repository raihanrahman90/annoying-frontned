import React from 'react';
import {CardBarang} from '../../components/Input'
var request = require('../../class/request')
class ShopNow extends React.Component{
    constructor(props){
        super(props)
        this.state={
            kategori:this.props.match.params.kategori,
            subkategori:[
            ],
            barang:[]
        }
        request.get('kategori/'+this.state.kategori+'/subkategori')
        .then(res=>{
            this.setState({
                subkategori:res.result
            })

            request.get('kategori/'+this.state.kategori+'/subkategori/'+this.state.subkategori[0])
            .then(res=>{
                this.setState({
                    barang:res.result
                })
            })
        })
    }
    componentDidMount(){
        request.get('kategori/'+this.state.kategori+'/subkategori')
        .then(res=>{
            this.setState({
                subkategori:res.result
            })
            if(this.props.subkategori){
                request.get('kategori/'+this.state.kategori+'/subkategori/'+this.props.subkategori)
                .then(res=>{
                    this.setState({
                        barang:res.result
                    })
                })
            }else if(res.result[0]){
                request.get('kategori/'+this.state.kategori+'/subkategori/'+this.state.subkategori[0].subkategori)
                .then(res=>{
                    this.setState({
                        barang:res.result
                    })
                })
            }
        })
    }
    getData=(subkategori)=>{
        request.get('kategori/'+this.state.kategori+'/subkategori/'+subkategori)
        .then(res=>{
            this.setState({
                barang:res.result
            })
        })
    }
    render(){
        return(
            <>
                <div className="bg-gray-primary min-h-screen h-fit w-screen z-50 px-10 py-10">
                    <div className="mt-20 flex flex-wrap top-10 w-full h-20 justify-center">
                        {
                            this.state.subkategori.map(data=>(
                                <button className="text-lg text-poppins text-bold text-center underline-hover mx-3 relative h-10"
                                    onClick={e=>
                                        this.getData(data.subkategori)
                                    }
                                    >
                                    {data.subkategori}
                                </button>
                            ))
                        }
                    </div>
                    <div className="flex flex-wrap w-full h-full justify-start">
                        {
                            this.state.barang.map(barang=>(
                                <div className="w-2/5 mx-5 h-80 md:w-1/5 overflow-x-hidden">
                                    <CardBarang namaBarang={barang.namaBarang} link={"/dashboard/barang/"+barang.idBarang} className="h-full w-auto" image={barang.gambar} harga={barang.harga}/>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
            </>
        )
    }
}
export default ShopNow;