import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {CardBarang} from './Input';
function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "red"}}
        onClick={onClick}
      />
    );
  }
export default class SliderBarang extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      swipeToSlide: true,
      initialSlide: 0,
      nextArrow:<Arrow/>,
      prevArrow:<Arrow/>,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            swipeToSlide: true,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            swipeToSlide: true,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            swipeToSlide: true,
          }
        }
      ]
    };
    return (
        <div className="bg-gray-primary px-10 pt-10 overflow-hidden w-full">
        <Slider {...settings}>
          {
              this.props.data.map(barang=>(
                <div className="h-96 px-2">
                  <CardBarang namaBarang={barang.namaBarang} link={"/dashboard/barang/"+barang.idBarang} className="w-40" image={barang.gambar} harga={barang.harga}/>
                </div>
                )
              )
          }
        </Slider>
      </div>
    );
  }
}
export class CommentSlider extends Component {
  constructor(props){
      super(props)
      this.state = {}
  }
  render() {
      const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow:<Arrow/>,
          prevArrow:<Arrow/>,
      };
      console.log(this.props.comment)
      return (
          <div className="bg-gray-primary h-screen-1/2 md:px-40 px-10 pt-32 overflow-hidden w-full">
              <h2 className="text-2xl text-center mb-5">Testimoni</h2>
              <Slider {...settings}>
                  {this.props.comment.map(comment=>(
                          <div className="md:h-5/6 text-center">
                              <div>
                                {comment.nilai+"/5"}
                              </div>
                              <div>
                                  {comment.ulasan}
                              </div>
                              <div className='text-xl font-bold'>
                                  {comment.username}
                              </div>
                          </div>
                      )
                  )}
              </Slider>
          </div>
      );
  }
}
export class SliderGambar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  render() {
    return (
      <div>
        <Slider
          asNavFor={this.state.nav2}
          ref={slider => (this.slider1 = slider)}
        >
          {this.props.data.map(gambar=>(
            <div className="md:px-20">
              <img src={"https://ann.tambak.in/images/barang/"+gambar.gambar}/>
            </div>
          ))}
        </Slider>
        <Slider
          asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          slidesToShow={(this.props.data.length>3?3:this.props.data.length)}
          swipeToSlide={true}
          focusOnSelect={true}
          variableWidth={true}
          className="md:px-20 slider variable-width"
        >
          
          {this.props.data.map(gambar=>(
            <div style={{width:100}}>
              <img src={"https://ann.tambak.in/images/barang/"+gambar.gambar} className="h-32"/>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}