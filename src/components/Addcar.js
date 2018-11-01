import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

class Addcar extends Component {

  constructor(props) {
    super(props);
    this.state = {brand: '', model: '', color: '', year: '', fuel: '', price: ''};
    this.addModal = React.createRef();
  }

  saveCar = () => {
    const car = {brand: this.state.brand, model: this.state.model, color: this.state.color,
    year: this.state.year, price: this.state.price, fuel: this.state.fuel};
    this.props.saveCar(car);
    this.setState({brand: '', model: ''})
    this.addModal.current.hide();
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
       <SkyLight dialogStyles={addDialog} hideOnOverlayClicked ref={this.addModal} title="New Car">
         <TextField placeholder="Brand" name="brand" onChange={this.handleChange} value={this.state.brand} /> <br/>
         <TextField placeholder="Model" name="model" onChange={this.handleChange} value={this.state.model} /> <br/>
         <TextField placeholder="Color" name="color" onChange={this.handleChange} value={this.state.color} /> <br/>
         <TextField placeholder="Year" name="year" onChange={this.handleChange} value={this.state.year} /> <br/>
         <TextField placeholder="Fuel" name="fuel" onChange={this.handleChange} value={this.state.fuel} /> <br/>
         <TextField placeholder="Price" name="price" onChange={this.handleChange} value={this.state.price} /> <br/>
         <Button style={{margin:15}} onClick={this.saveCar} variant="contained" color="default">Save
        <SaveIcon/>
         </Button>
        </SkyLight> 

      </div>
    );
  }
}

export default Addcar;