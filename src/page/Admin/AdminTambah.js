import React from 'react'
import {InputRounded} from '../../components/Input';
var request = require('../../class/request')
class AdminTambah extends React.Component{
    constructor(props){
        super(props)
        this.state={
            nama:"",
            username:"",
            password:"",
            passwordKonfirmasi:""
        }
    }
    handleSubmit = e=>{
        e.preventDefault()
        var data = {
            nama:this.state.nama,
            username:this.state.username,
            password:this.state.password,
            hakAkses:"Admin"
        }
        request.post('admin', data)
        .then(res=>{
            if(res.success){
                this.props.history.push('/admin/admin')
            }
        })
    }
    render(){
        var message;
        if(this.state.password === this.state.passwordKonfirmasi){
            message=''
        }else{
            message=<div className="bg-yellow-400">Password Konfirmasi Salah</div>
        }
        return(
            <div className="flex flex-col sm:flex-wrap">
                <div className="lg:flex lg:items-center lg:justify-between col-span-12">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Tambah Admin
                        </h2>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 col-span-12">
                    <form onSubmit={this.handleSubmit}>
                        <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 bg-white sm:p-3">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <InputRounded type="text" name="Nama" label="Nama" value={this.state.nama} onChange={(value)=>this.setState({nama:value})}/>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 bg-white sm:p-3">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <InputRounded type="text" name="Username" label="Username" value={this.state.username} onChange={(value)=>this.setState({username:value})}/>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 bg-white sm:p-3">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <InputRounded type="password" name="Password1" label="Password" value={this.state.password} onChange={(value)=>this.setState({password:value})}/>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 bg-white sm:p-3">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    {message}
                                    <InputRounded type="password" name="Password2" label="Password Konfirmasi" value={this.state.passwordKonfirmasi} onChange={(value)=>this.setState({passwordKonfirmasi:value})}/>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-blue-400 shadow-sm text-sm font-medium text-blue-400 hover:bg-yellow-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
export default AdminTambah