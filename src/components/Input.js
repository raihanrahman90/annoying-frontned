import React from 'react';
import {Link} from 'react-router-dom'
export class InputBottomBorder extends React.Component{
    render(){
        var name = this.props.name
        var type= this.props.type
        var label = this.props.label
        if(type==='textarea'){
            return(
                <>
                    <label for={name} class="block text-sm font-medium">{label}</label>
                    <textarea 
                        id={name} 
                        name={name} 
                        rows="5"
                        onChange={e=>this.props.onChange(e.target.value)}
                        className="bg-transparent mt-1 block w-full py-2 px-3 border border-gray-300 border-t-0  border-l-0 border-r-0 border-b-1 bg-whiteshadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    </textarea>
                </>
            )
        }else{
            return(
                <>
                    <label for={name} class="block text-sm font-medium">{label}</label>
                    <input type={type} id={name} name={name} 
                    
                    onChange={e=>this.props.onChange(e.target.value)}
                    className=" bg-transparent mt-1 block w-full py-2 px-3 border border-gray-300 border-t-0  border-l-0 border-r-0 border-b-1 bg-whiteshadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </>
            )
        }
    }
};

export class InputRounded extends React.Component{

    createList = ()=>{
        let list =[]
        for(let i = 0;i<3;i++){
            list.push(<option value={this.props.listData[i]}>{this.props.listData[i]}</option>)
        }
        return list
    }
    render(){
        var name = this.props.name
        var type= this.props.type
        var label = this.props.label
        var value = this.props.value || ""
        var readonly = (this.props.readonly?this.props.readonly:false)
        if(type==='select'){
            return(
                <>
                    <label for={name} className="block text-sm font-medium text-gray-700">{label}</label>
                    <select 
                        value={value}
                        name={name} 
                        id={name} 
                        onChange={e=>this.props.onChange(e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        {this.props.listData.map(data=>(
                            <option value={data.value}>{data.nama}</option>
                        ))}
                    </select>
                </>
            )
        }else{
            return(
                <>
                    <label for={name} className="block text-sm font-medium text-gray-700">{label}</label>
                    <input 
                        type={type} 
                        id={name} 
                        name={name}
                        onChange={e=>this.props.onChange(e.target.value)}
                        value={value}
                        readOnly={readonly}
                        required
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </>
            )
        }
        
    }
}

export function CardBarang(props){
    return (
    <Link className='h-20 relative' to={props.link}>
        <div className="h-5/6 bg-transparent w-5/6 flex items-center overflow-hidden">
            <img src={"https://ann.tambak.in/images/barang/"+props.image} alt={props.image} className="h-full w-auto"></img>
        </div>
        <p className="text-gray-900 font-bold font-poppins text-md">
            {props.namaBarang}
        </p>
        <p className="text-red-600">
            Rp. {props.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
    </Link>)
}
export function CardCart(props){
    var data = props.data
    return (
    <div className='h-fit relative w-full relative'>
        <div className="h-fit bg-transparent flex items-center overflow-hidden w-full">
            <img src={"https://ann.tambak.in/images/barang/"+data.gambar} alt={data.gambar} className="h-auto w-full"></img>
        </div>
        <p className="text-gray-900 font-bold font-poppins text-md">
            {data.namaBarang}<br/>
        </p>
        <p className="text-gray-900 text-sm">
            {data.ukuran} - {data.warna}<br/>
            
        </p>
        <p className="text-red-600">
            Rp. {(data.harga*data.jumlah).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <div className="w-full">
            <input type="number" className="w-3/5 text-center" value={data.jumlah} onChange={e=>props.updateCart(e.target.value, data.idCart)} disabled={!props.hapus}/>
            {props.hapus?<button type="button" className="w-3/5 text-center" onClick={e=>props.hapusCart(data.idCart)}>Hapus</button>:<></>}
        </div>
    </div>)
}