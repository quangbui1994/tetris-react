import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { updatedObject } from '../../shared/utility';
import * as actionCreators from '../../store/actions/index';
import { connect } from 'react-redux';

import Script from 'react-load-script';
import styles from './SearchForm.module.css';

class SearchForm extends Component {
    state = {
        searchForm: {
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City',
                    id: 'City'
                },
                value: '',
                label: 'City',
                isValid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                    id: 'Country'
                },
                value: '',
                label: 'Country',
                isValid: false
            }
        },
        formValid: false,
        city: '',
        query: ''
    }

    inputChangedHandler = (event, element) => {
        let value = event.target.value;
        let updatedElement = null;

        if (value.length === 0) {
            updatedElement = updatedObject(this.state.searchForm[element], { isValid: false });
        } else {
            updatedElement = updatedObject(this.state.searchForm[element], { isValid: true, value });
        };

        let updatedSearchForm = updatedObject(this.state.searchForm, { [element]: updatedElement });
        let formValid = true;

        for (updatedElement in updatedSearchForm) {
            formValid = updatedSearchForm[updatedElement].isValid && formValid;
        };

        this.setState({ searchForm: updatedSearchForm, formValid });
    }

    submitDataHandler = event => {
        event.preventDefault();
        let submitData = Object.keys(this.state.searchForm).map(el => {
            return {
                [el]: this.state.searchForm[el].value
            }
        })
        this.props.fetchWeatherData(submitData);
    }

    handleScriptLoad = () => {
        var options = {
          types: ['(cities)'],
        };
    
        // Initialize Google Autocomplete
        /*global google*/ // To disable any eslint 'google not defined' errors
        this.autocomplete = new google.maps.places.Autocomplete(
          document.getElementById('City'),
          options,
        );
        this.autocomplete.setFields(['address_components', 'formatted_address']);
    
        // Fire Event when a suggested name is selected
        this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
    }

    handlePlaceSelect = () => {
        let addressObject = this.autocomplete.getPlace();
        let address = addressObject.address_components;

        if (address) {
            let updatedCity = updatedObject(this.state.searchForm.city, { value: address[0].long_name })
            let updatedCountry = updatedObject(this.state.searchForm.country, { value: address[address.length - 1].long_name })
            let updatedSearchForm = updatedObject(this.state.searchForm, { city: updatedCity, country: updatedCountry });
            this.setState({ searchForm: updatedSearchForm, formValid: true });
        }
        
    }
    
    
    render() {
        return (
            <div className="row">
                <Script
                    url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDyddX6wQCk9PY-jxHnZj_8X3M3RbzuJy4&libraries=places&language=en"
                    onLoad={this.handleScriptLoad}
                    />
                <h2 className="secondary__heading">Search</h2>
                <form className={styles.SearchForm} onSubmit={this.submitDataHandler}>
                    {
                        Object.entries(this.state.searchForm).map(el => {
                            return (
                                <div className="col-4-of-12" key={el[1].label}>
                                    <Input 
                                        elementtype={el[1].elementType} 
                                        elementconfig={el[1].elementConfig}
                                        inputId={el[1].elementConfig.id}
                                        label={el[1].label}
                                        value={el[1].value}
                                        changed={event => this.inputChangedHandler(event, el[0])}/> 
                                </div>
                            )
                        })
                    }
                    <Button disabled={!this.state.formValid} btnType='Btn-primary'>See weather</Button>
                    <Button btnType='Btn-primary' click={() => this.props.history.push('/map')}>Use Map</Button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchWeatherData: (submitData) => dispatch(actionCreators.fetchWeatherData(submitData))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(SearchForm));