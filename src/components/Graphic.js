import react from 'react';
import Chart from 'chart.js';

class Graphic extends React.Component{
    constructor(props){
        super(props)
        this.chartRef = React.createRef();
    }
    componentDidMount(){
        this.myChart = new Chart(this.canvasRef.current,{
            type:'bar',
            data:{
                labels:this.props.data.map(d=>d.label),
                datasets:[{
                    label: this.props.title,
                    data: this.props.data.map(d=>d.value),
                    backgroundColor:this.props.color
                }]
            }
        })
    }
    componentDidUpdate(){
        this.myChart.data.labels = this.props.data.map(d=>d.label);
        this.myChart.data.datasets[0].data = this.props.data.map(d=>d.value);
        this.myChart.update()
    }
    render(){
        return(
            <canvas ref={this.chartRef}/>
        )
    }
}