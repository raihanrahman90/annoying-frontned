import React from 'react'
import {InputBottomBorder} from '../components/Input';
export default class Footer extends React.Component{
    render(){
        return(
            <div className="h-fit bg-gray-900 text-white md:px-40 px-5 py-20 font-poppins">
                <div className="flex flex-wrap">
                    <div className="md:w-1/2 w-full">
                        <h2 className="text-5xl mb-5">Contact us</h2>
                        <p className="text-md font-bold">Mail</p>
                        <p className="text-md">customer_service@annoyingbrand.com</p>
                    </div>
                    <form className="md:w-1/2 w-full flex flex-wrap relative">
                        <div className="md:w-1/2 w-full md:px-1 py-1">
                            <InputBottomBorder name="nama" type="text" label="Nama"/>
                        </div>
                        <div className="md:w-1/2 w-full md:px-1 py-1">
                            <InputBottomBorder name="email" type="email" label="Email"/>
                        </div>
                        <div className="w-full md:px-1 py-1">
                            <InputBottomBorder name="pesan" type="textarea" label="Pesan"/>
                        </div>
                        <div className="w-full px-1 mt-3 right-0 bottom-0 flex justify-items-end">
                            <button type="submit" class="border-white w-20 border-2 ml-auto">Kirim</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}