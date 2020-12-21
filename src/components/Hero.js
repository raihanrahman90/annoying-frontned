import React from 'react';
import {Link} from 'react-router-dom';
import SliderBarang, {CommentSlider} from './SliderBarang';
import Footer from './Footer'
var request = require('../class/request')
class Hero extends React.Component{
    constructor(props){
        super(props)
        console.log("in constructor")
        this.state={
            kategori:this.props.match.params.kategori || 'P',
            bestSeller:[],
            newItem:[],
            shopNow:null,
            comment:[]
        }
        this.bestSeller=[]
        this.newItem = []
        this.getData()
    }
    tutupNavbar = ()=>{
        document.getElementById('')
    }
    getData = ()=>{
        request.get('kategori/'+this.props.match.params.kategori)
        .then(res=>{
            request.get('kategori/'+this.props.match.params.kategori)
            .then(res2=>{
                this.setState({
                    bestSeller:res.result,
                    newItem:res2.result,
                    kategori:this.props.match.params.kategori
                })
            })
        })
        request.get('ulasan')
        .then(res=>{
            this.setState({comment:res.result.filter((el)=>el.nilai>3)})
        })
    }
    componentDidUpdate(){
        if(this.state.kategori!==this.props.match.params.kategori){
            this.getData()
        }
    }
    render(){
        var headline;
        var tagline;
        var gambar;      
        this.kategori = this.props.match.params.kategori
        console.log(this.state) 
        if(this.kategori==='Laki-laki'){
            headline = <span class="block xl:inline">Be Gentle, Be Elegant</span>
            tagline = "Annoy everyone eye with your style"
            gambar = "/images/hero-l.jpg"
        }else if (this.kategori==='Perempuan'){
            headline = <span class="block xl:inline">Everyone is Beautifull</span>
            tagline="It isn't wrong to be yourself"
            gambar = "/images/background.jpg"
        }else{
            headline = <span class="block xl:inline">Annoy everyone eye's</span>
            tagline = "Keep playing and annoy everyone"
            gambar="/images/hero-a.jpg"
        }
        return(
            <div>
                <div class="relative bg-gray-primary overflow-hidden">
                    <div class="mx-auto">
                        <div class="relative z-10 pb-8 bg-gray-primary sm:pb-16 md:pb-20 lg:max-w-full lg:w-screen lg:h-screen lg:pb-28 xl:pb-32 min-h-full">
                            <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-40 lg:px-20
                                        text-center flex flex-wrap flex-col content-center items-center
                                        md:w-1/2 md:absolute lg:left-0">
                                    <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                        {headline}
                                    </h1>
                                    <p class="text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-poppins">
                                        {tagline}
                                    </p>
                                    <Link className="bg-transparent border-2 border-yellow-600 w-32 mt-10 p-2 text-yellow-600"
                                        to={"barang-kategori/"+this.state.kategori}>
                                        Shop Now
                                    </Link>
                            </main>
                            <div class="lg:absolute lg:inset-y-0 lg:h-full lg:right-0 lg:w-1/2 sm:h-fit">
                                <img class="h-56 w-auto object-cover sm:h-auto sm:w-screen md:h-96 lg:w-auto lg:h-full lg:ml-auto" src={gambar} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:px-20 py-20">
                    <div className="w-full mb-5 px-10 relative text-center text-4xl">
                        Best Seller
                    </div>
                    <div className=" h-fit">
                        <SliderBarang data={this.state.bestSeller}/>
                    </div>
                </div>
                <div className="lg:px-20 py-20">
                    <div className="w-full mb-5 px-10 relative">
                        <span className="text-4xl text-poppins text-bold">
                            Terbaru
                        </span>
                        <Link className="text-lg text-poppins text-bold ml-auto text-right absolute bottom-0 right-10 underline-hover">
                            Lihat Semuanya
                        </Link>
                    </div>
                    <div>
                        <SliderBarang data={this.state.newItem}/>
                    </div>
                </div>
                <div>
                    <div className="w-screen flex flex-wrap">
                        <div className="bg-blue-300 w-1/2 h-32 md:h-screen-1/2">
                            <img src="/images/bag.jpg" className="w-full h-auto" alt="bag"/>
                        </div>
                        <div className="bg-blue-700 w-1/2 h-32 md:h-screen-1/2">
                            <img src="/images/sweater.jpg" className="w-full h-auto" alt="sweater"/>
                        </div>
                        <div className="bg-blue-500 w-1/3 h-32 md:h-screen-1/2">
                            <img src="/images/pants.jpg" className="h-full w-auto" alt="pants"/>
                        </div>
                        <div className="bg-blue-900 w-1/3 h-32 md:h-screen-1/2">
                            <img src="/images/shirt.jpg" className="h-full w-auto" alt="shirt"/>
                        </div>
                        <div className="bg-blue-100 w-1/3 h-32 md:h-screen-1/2">
                            <img src="/images/shoes.jpg" className="h-full w-auto" alt="shoes"/>
                        </div>
                    </div>
                </div>
                <div className="pb-10">
                    <CommentSlider comment={this.state.comment}/>
                </div>
                <Footer/>
                
            </div>
        )
    }
}


export default Hero