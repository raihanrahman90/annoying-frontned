/*eslint-disable*/
import React from "react";
import jwt_decode from 'jwt-decode'
import { Link } from "react-router-dom";

export default class SidebarHome extends React.Component{
  constructor(props){
    super(props)
    this.dropdown = <div id="dropdown" 
                      className="flex flex-wrap items-center justify-between z-10 py-4 fixed z-50
                                transition-all duration-500 ease-in-out px-0 items-center justify-between w-fit
                                absolute px-6 hidden
                                shadow top-10 right-10 z-40
                                items-center flex-1 rounded bg-gray-900 m-2 py-3">
                                <ul className="flex flex-col list-none">
                                      <li className="items-center">
                                          <Link 
                                              to="/dashboard/pesanan"
                                              onClick={this.popDropDown}
                                              className="text-xs py-1 px-5 block rounded-lg 
                                                          rounded-lg mt-4 text-white 
                                                          ">
                                                Pesanan
                                          </Link>
                                      </li>
                                      <li className="items-center">
                                          <Link 
                                              to="/dashboard/pengaturan"
                                              onClick={this.popDropDown}
                                              className="text-xs py-1 px-5 block rounded-lg 
                                                          rounded-lg mt-4 text-white">
                                              Pengaturan
                                          </Link>
                                      </li>
                                      <li className="items-center">
                                          <button
                                              onClick={this.logout}
                                              className="text-xs py-1 px-5 block rounded-lg 
                                                          rounded-lg mt-4 text-white">  
                                              Log Out
                                          </button>
                                      </li>
                                  </ul>
                    </div>
  }
  showSidebar = ()=>{
    document.getElementById('sidebar').classList.toggle('md:w-64')
    document.getElementById('sidebar').classList.toggle('md:w-0')
    document.getElementById('sidebar').classList.toggle('hidden')
  }
  logout=()=>{
    this.popDropDown()
    sessionStorage.clear()
    window.location.reload()
  }
  popDropDown=()=>{
    document.getElementById('dropdown').classList.toggle('hidden')
  }
  render(){
    var loginNavbar;
    if(sessionStorage.getItem('token')){
      loginNavbar=<>
        <Link to="/dashboard/cart" className="font-normal text-gray-500 hover:text-gray-900 mx-2 underline-hover relative"><span className="fa fa-shopping-bag"></span></Link>
        <button className="font-normal text-gray-500 hover:text-gray-900 mx-2 underline-hover relative" onClick={this.popDropDown}><span className="fa fa-user"></span></button>
        {this.dropdown}
      </>
    }else{
      loginNavbar=<>
      <Link to="/login" className="font-normal text-gray-500 hover:text-gray-900 mx-2 underline-hover relative">Login</Link>
      <Link to="/register" className="font-normal text-gray-500 hover:text-gray-900 mx-2 underline-hover relative">Daftar</Link></>
    }
    return (
      <>
        <nav className="fixed flex items-center justify-between sm:h-10 lg:justify-start w-full mt-6" aria-label="Global" id="navbar">
          <div className="flex items-center">
              <div className="flex items-center justify-between w-full md:w-auto">
                  <button 
                    onClick={() => this.showSidebar()}>
                      <span className="sr-only">Workflow</span>
                      <img className="h-8 w-auto sm:h-10" src="/icon/More.png"/>
                  </button>
              </div>
          </div>
          <div className="block md:ml-auto md:pr-20 md:space-x-8 float-right relative z-50 w-fit pr-5" id="navbar-login-daftar">
            {
              loginNavbar
            }
              
          </div>
      </nav>
        <nav id="sidebar" 
          className="md:left-0 md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden 
                    md:px-0 md:py-0
                    bg-transparent flex flex-wrap items-center justify-between z-10 py-4 px-6 fixed z-50 md:block md:w-0 fixed w-full
                    transition-all duration-500 ease-in-out md:min-h-full h-0
                    hidden">
          <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
  
            {/* Brand */}
            {/* Collapse */}
            <div
              className="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:shadow-none px-6
                    shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded bg-gray-900 m-2 md:m-0 py-3"
            >
              {/* Collapse header */}
              <div className="md:min-w-fullblock pb-4 mb-4 border-b border-solid border-gray-300">
                <div className="flex flex-wrap">
                  <div className="w-6/12">
                    <div
                      className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                    >
                      Annoying Brand
                    </div>
                  </div>
                  <div className="w-6/12 flex justify-end">
                  <button
                      type="button"
                      className="cursor-pointer text-white opacity-50 px-3 py-1 text-xl leading-none bg-grey-900 rounded border border-solid border-transparent"
                      onClick={() => this.showSidebar()}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
  
              {/* Divider */}
              <hr className="my-4 md:min-w-full" />
                <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                  <li className="items-center">
                      <Link 
                          to="/dashboard/Laki-laki"
                          onClick={() => this.showSidebar()}
                          className="text-xs py-1 px-5 block rounded-lg rounded-lg mt-4 text-yellow-light text-white hover:bg-transparent hover:text-yellow-dark">
                            Laki-laki
                      </Link>
                  </li>
                  <li className="items-center">
                      <Link 
                          to="/dashboard/Perempuan"
                          onClick={() => this.showSidebar()}
                          className="text-xs py-1 px-5 block rounded-lg rounded-lg mt-4 text-yellow-light text-white hover:bg-transparent hover:text-yellow-dark">
                          Perempuan
                      </Link>
                  </li>
                  <li className="items-center">
                      <Link 
                          to="/dashboard/Anak-anak"
                          onClick={() => this.showSidebar()}
                          className="text-xs py-1 px-5 block rounded-lg rounded-lg mt-4 text-yellow-light text-white hover:bg-transparent hover:text-yellow-dark">
                            Anak-anak
                      </Link>
                  </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
  
}
