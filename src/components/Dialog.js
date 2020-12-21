import React from 'react'
export default class Dialog extends React.Component{
    close = ()=>{
        var idDialog = this.props.idDialog
        document.getElementById(idDialog).classList.add('hidden')
    }
    render(){
        return(
            <div className="fixed h-screen w-screen bg-gray-400 z-40 flex justify-center items-center bg-opacity-60 hidden" id={this.props.idDialog}>
                <div className="bg-white w-92 h-48 opacity-100 bg-opacity-100 mx-8 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold w-full">
                        {this.props.message}
                    </h2>
                    <button onClick={this.close} className="w-28 ml-auto mr-auto bg-yellow-600 text-white mt-5 h-8">Close</button>
                </div>
            </div>
        )
    }
}