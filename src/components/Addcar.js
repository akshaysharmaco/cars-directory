import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

class Addcar extends Component {

  constructor(props) {
    super(props);
    this.state = {brand: '', model: '', color: '', year: '', fuel: '', price: ''};
    this.addModal = React.createRef();
  }

  handleChange =  (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {

    const addDialog = {
      
      width: '30%',
      height: '300px',
      marginLeft: '-15%',
      
    };

    return (
      <div>
        <Button style={{margin:10}} variant="contained" color="primary" onClick={() => this.addModal.current.show()}><AddIcon />New Car</Button>
       <SkyLight dialogStyles={addDialog} hideOnOverlayClicked ref={this.addModal} title="Hi, I'm a simple modal">
         <TextField placeholder="Brand" name="brand" onChange={this.handleChange} value={this.state.brand} /> <br/>
         <TextField placeholder="Model" name="model" onChange={this.handleChange} value={this.state.model} /> <br/>
         <TextField placeholder="Color" name="color" onChange={this.handleChange} value={this.state.color} /> <br/>
         <TextField placeholder="Year" name="year" onChange={this.handleChange} value={this.state.year} /> <br/>
         <TextField placeholder="Fuel" name="fuel" onChange={this.handleChange} value={this.state.fuel} /> <br/>
         <TextField placeholder="Price" name="price" onChange={this.handleChange} value={this.state.price} /> <br/>
        </SkyLight> 

      </div>
    );
  }
}

export default Addcar;