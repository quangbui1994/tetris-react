import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import Aux from 'react-aux';
import WeatherResultItem from '../../component/WeatherResult/WeatherResultItem/WeatherResultItem';

import './MyCities.css';
// import withAuthorization from '../../hoc/withAuthorization';
import { withFirebase } from '../../component/Firebase';

class MyCities extends Component {
    state = {
        listCity: []
    }
    componentDidMount () {
        let uid = localStorage.getItem('uid');
        this.props.firebase.db.collection('cities').where('userUid', '==', uid).get()
            .then(docSnapshot => {
                
                if (docSnapshot) {
                    docSnapshot.forEach(doc => {
                        let listCity = [...this.state.listCity];
                        listCity.push(doc.data());
                        this.setState({ listCity });
                    });
                } else {

                }    
            })
            .catch(error => {
                console.log('Getting error', error);
            });
        // this.props.getCityData(this.props.userCityId);
    }

    removeDataHandler = (id) => {
        this.props.firebase.db.collection('cities').where('cityId', '==', id).get().then(docSnapshot => {
            docSnapshot.forEach(doc => doc.ref.delete());
        })
        .catch(error => {
            console.log('Getting error', error.message);
        });
        let listCity = this.state.listCity.filter(el => el.cityId !== id);
        this.setState({ listCity });
    }

    render() {
        let listUserCity = null;

        if (this.state.listCity == '') {
            listUserCity = (
                <div className="addAccount">
                    <h2 className="secondary__heading">Please add your city</h2>
                </div>
            )
        } else {
            listUserCity = this.state.listCity.map(city => (
                <div key={city.name}>
                    <WeatherResultItem 
                        authUser
                        cityName={city.name}
                        temp={Math.round(city.temp)}
                        tempMin={city.tempMin}
                        tempMax={city.tempMax}
                        humidity={city.humidity}
                        windSpeed={city.windSpeed}
                        windDeg={city.windDeg}
                        remove={() => this.removeDataHandler(city.cityId)}
                        description={city.description}/>
                </div>
            ));  
        }
        return (
            <Aux>
                <div className="row col-6-of-12">
                    <h1 className="primary__heading title">Save weather for your adventures</h1>
                </div>
                {this.state.listCity.length !== 0 && <h2 className="secondary__heading" style={{marginTop: '2rem', marginBottom: '3rem'}}>Your saved cities</h2>}   
                {listUserCity}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        userCityId: state.user.idList,
        listCity: state.user.listCity
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCityData: (id) => dispatch(actionCreators.getCityData(id)),
        removeCityData: (id) => dispatch(actionCreators.removeCityData(id))
    }
}

// const condition = authUser => !!authUser;

export default withFirebase((connect(mapStateToProps, mapDispatchToProps)(MyCities)));