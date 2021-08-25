import React, { Component } from "react";
import { toast } from 'react-toastify';



class Searchbar extends Component {
  state = { searcName: "", };
  getNameChange = e => {
this.setState({searcName:e.currentTarget.value.toLowerCase() });
  };

  getSubmitForm = e=> {
    e.preventDefault();
    if(this.state.searcName.trim() === "") {
      return toast.error("Введите слово для поиска", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    this.props.onGetSubmit(this.state.searcName);
    this.setState({searcName: ""});
    
  };

  render() {
    return (
      <header className="Searchbar">
          <form className="SearchForm" onSubmit={this.getSubmitForm}>
      <button type="submit" className="SearchForm-button">
        <span className="SearchForm-button-label">Search</span>
      </button>

  
      <input
        className="SearchForm-input"
        type="text"
        value={this.state.searcName}
        onChange={this.getNameChange}
        // autocomplete="off"
        // autofocus
        placeholder="Search images and photos"
      />
    </form>
  </header>
      );
  };
}

export default Searchbar;
