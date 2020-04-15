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
        var subtotal=0;
        var currency="";
        return(
            this.state.invoice?( <div className="invoice">
            {/*this.state.invoice&&this.state.invoice.data.client.name*/}
                <div className="invoice_str">
                    <div className="company">
                        <img src={data.company.logo} alt={data.company.name} width="50px"/><br/>
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
                            <p ><strong >TOTAL DUE : {data.order.currency+data.order.amount}</strong> </p>
                        </div>

                    </div>

                    <div className="inv_table">
                        <table>
                            <tr>
                                <th width="70%">Description</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>Total</th>
                            </tr>

                            
                                {data.order_items.map((item)=>{
                                    subtotal+=parseInt(item.total);
                                    currency=item.currency;
                                   return(
                                    <tr> 
                                   <td><strong style={{color:"#000"}}>{item.name}</strong><br/>{item.description}</td>
                                   <td>{item.quantity}</td>
                                    <td>{item.currency+item.amount}</td>
                                    <td>{item.currency+item.total}</td>
                                    </tr>)
                                })}
                            
                        </table>

                    </div>

                    <div className="total">
                        <table>
                            <tr><td><strong>Sub Total:</strong></td> <td>{currency+subtotal}</td></tr>
                            <tr><td><strong>Taxes(10%):</strong></td> <td>{currency+(.1*.95*subtotal)}</td></tr>
                            <tr><td><strong>Discount(5%):</strong></td> <td>{currency+(subtotal/20)}</td></tr>
                            <br/>
                            <tr><td><strong>Total:</strong></td> <td><strong>{currency+(1.1*.95*subtotal)}</strong></td></tr>
                        </table>

                    </div>

                    <div className="tc">
                        <h6>Terms and Conditions:</h6>
                        <p>Lorem ipsum dolor sit amet, ipsum putant invenire an cum. Eu debitis lucilius pri, ne eum iusto ocurreret argumentum. Ei vim fabellas volutpat, an elit iriure aliquando eum, sea accusata principes ei. Similique scripserit ex vel.</p>
                    </div>

                    <div className="action">
                        <button>Print</button>
                        &nbsp;
                        <button>Cancel</button>
                    </div>

                </div>    
            
            </div>):(<div>Unable to reach our servers.Please Check your Internet Connection</div>)
        )
    }

}