import React from 'react';
import './invoice.css';
export default class Invoice extends React.Component{
    constructor(){
		super();
		this.state = {
            invoice:null,
        };
    }

    fetchInvoice=()=>{

        fetch('http://ec2-13-231-224-159.ap-northeast-1.compute.amazonaws.com:8080/api/invoice', {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        }).then(response=>{response.json().then(data=>{if(data){this.setState({invoice:data}) 
    }})})
        
        }

    componentDidMount(){
        this.fetchInvoice();
    }
    

    render(){
        if(this.state.invoice)
        var {data}=this.state.invoice;
        return(
            this.state.invoice?( <div className="invoice">
            {/*this.state.invoice&&this.state.invoice.data.client.name*/}
                <div className="invoice_str">
                    <div class="company">
                        <img src={data.company.logo} alt={data.company.name} /><br/>
                        {data.company.name}<br/>
                        {data.company.address}<br/>
                        {data.company.email}<br/>
                        {data.company.mobile}
                    </div>   

                    <div className="about">
                        <div className="client">
                            <h6>CLIENT INFORMATION:</h6>
                            <p>
                                <strong className="dark">{data.client.name}</strong><br/>
                                {data.client.address}<br/>
                                {data.client.mobile}<br/>
                                {data.client.email}<br/>
                            </p>
                        </div>

                        <div className="order">
                            <h6>ORDER INFORMATION:</h6>
                            <table>
                                <tr><td>Date:</td> <td>{data.order.date}</td></tr>
                                <tr><td>Status:</td> <td className="status">{data.order.status}</td></tr>
                                <tr><td>Id:</td> <td>#{data.order.id}</td></tr>
                            </table>
                        </div>

                        <div className="inv">
                            <h6>INVOICE NUMBER #{data.order.invoice_number} </h6>
                            <p style={{color:"#5eb3ce" ,fontSize:"11px"}}><strong >TOTAL DUE : {data.order.currency+data.order.amount}</strong> </p>
                        </div>

                    </div>

                    <div className="inv_table">

                    </div>

                    <div className="total">

                    </div>

                    <div className="tc">

                    </div>

                    <div className="action">

                    </div>

                </div>    
            
            </div>):(<div>Unable to reach our servers.Please Check your Internet Connection</div>)
        )
    }

}