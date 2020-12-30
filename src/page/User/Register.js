import React from 'react';
import axios from 'axios';
import {InputBottomBorder} from '../../components/Input'
import {Link} from 'react-router-dom'
export default class RegisterUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    handleSubmit = e =>{
        e.preventDefault();
        const data = {
            username:this.username,
            password:this.password,
            nama:this.nama
        }
        axios.post(
            'user',data
        ).then(res=>{
            if(res.data.success){
                sessionStorage.setItem('token', res.data.token)
                this.props.history.push('/')
            }else{
                this.setState({
                    message:res.data.message
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    passwordChange = ()=>{
        if(this.password !==this.passwordKonfirmasi){
            this.setState(()=>({
                message:"Password Konfirmasi salah"
            }))
        }else{
            this.setState(()=>({
                message:undefined
            }))
        }
    }
    render(){
        let Message;
        if(this.state.message===undefined){
            Message = <></>
        }else{
            Message = <div className="w-full bg-yellow-400 text-white">{this.state.message}</div>
        }
        return(
            <div className="bg-gray-primary text-gray-700">
                <div class="relative bg-gray-primary overflow-hidden">
                    <div class="mx-auto">
                        <div class="relative z-10 pb-8 bg-gray-primary sm:pb-16 md:pb-20 lg:max-w-full lg:w-screen lg:h-screen lg:pb-28 xl:pb-32 min-h-full flex justify-center">
                           
                            <Link to="/" className="absolute left-20 top-20"><span className="fa fa-chevron-left"></span> Back</Link>
                           <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-40 lg:px-20
                                        text-center flex flex-wrap flex-col content-center items-center
                                        md:w-1/2 md:absolute lg:left-0">
                                        <div>
                                            <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
                                                Daftar
                                            </h2>
                                            {Message}
                                        </div>
                                        <form className="mt-8 space-y-6 text-left w-full md:w-1/2" onSubmit={this.handleSubmit}>
                                            <div className="-space-y-px">
                                                <div>
                                                    <InputBottomBorder className="my-3" name="Nama" label="Nama Lengkap" type="text" onChange={(value)=>this.nama=value}/>
                                                </div>
                                                <div>
                                                    <InputBottomBorder className="my-3" name="Email" label="Email" type="email" onChange={(value)=>this.username=value}/>
                                                </div>
                                                <div>
                                                    <InputBottomBorder className="my-3" name="Password" label="Password" type="password" onChange={(value)=>{
                                                        this.password=value
                                                        this.passwordChange()}}/>
                                                </div>
                                                <div>
                                                    <InputBottomBorder className="my-3" name="Password" label="Password Konfirmasi" type="password" onChange={(value)=>{
                                                        this.passwordKonfirmasi=value
                                                        this.passwordChange()
                                                        }
                                                        }/>
                                                </div>
                                            </div>


                                            <div>
                                                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-mediumtext-white hover:bg-yellow-800 bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white">
                                                    Sign Up
                                                </button>
                                            </div>
                                            <div>
                                                <p className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-black bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                        Sudah punya akun? <Link className="text-yellow-600" to="/login">Masuk</Link>
                                                </p>
                                            </div>
                                        </form>
                            </main>
                            <div class="lg:absolute lg:inset-y-0 lg:h-full lg:right-0 lg:w-1/2 sm:h-fit">
                                <img class="h-56 w-auto object-cover sm:h-auto sm:w-screen md:h-96 lg:w-auto lg:h-full lg:ml-auto" src="/images/background.jpg" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}