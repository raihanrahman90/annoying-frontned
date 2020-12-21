import React from 'react'
class Dashboard extends React.Component{
    render(){
        return(
            <div className="flex flex-col sm:flex-wrap">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                            Dashboard
                        </h2>
                    </div>
                </div>
                <div className="flex flex-col mt-5 font-poppins">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden py-10 flex flex-wrap text-white">
                                <div className="md:w-1/5 w-1/3 mx-5 my-5 h-32 bg-blue-500 shadow">
                                    <div className="h-5/6 content-center items-center flex flex-col">
                                        <img className="h-3/4 w-auto" src="/icon/User.png" alt="user"/>
                                        <p>124</p>
                                    </div>
                                    <div className="h-1/6">
                                        <h2 className="text-md font-bold leading-7 sm:text-md sm:truncate bg-white text-gray-500 text-center">
                                            Pengguna
                                        </h2>
                                    </div>
                                </div>
                                <div className="md:w-1/5 w-1/3 mx-5 my-5 h-32 bg-green-500 shadow">
                                    <div className="h-5/6 content-center items-center flex flex-col">
                                        <img className="h-3/4 w-auto" src="/icon/Income.png" alt="income"/>
                                        <p>124</p>
                                    </div>
                                    <div className="h-1/6">
                                        <h2 className="text-md font-bold leading-7 sm:text-md sm:truncate bg-white text-gray-500 text-center">
                                            Pengguna
                                        </h2>
                                    </div>
                                </div>
                                <div className="md:w-1/5 w-1/3 mx-5 my-5 h-32 bg-yellow-500 shadow">
                                    <div className="h-5/6 content-center items-center flex flex-col">
                                        <img className="h-3/4 w-auto" src="/icon/Trolley.png" alt="trolley"/>
                                        <p>124</p>
                                    </div>
                                    <div className="h-1/6">
                                        <h2 className="text-md font-bold leading-7 sm:text-md sm:truncate bg-white text-gray-500 text-center">
                                            Terjual
                                        </h2>
                                    </div>
                                </div>
                                <div className="md:w-1/5 w-1/3 mx-5 my-5 h-32 bg-red-500 shadow">
                                    <div className="h-5/6 content-center items-center flex flex-col">
                                        <img className="h-3/4 w-auto" src="/icon/Stock.png" alt="stock"/>
                                        <p>124</p>
                                    </div>
                                    <div className="h-1/6">
                                        <h2 className="text-md font-bold leading-7 sm:text-md sm:truncate bg-white text-gray-500 text-center">
                                            Barang
                                        </h2>
                                    </div>
                                </div>
                                <div className="h-screen-1/2 bg-white" id="graphic">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard