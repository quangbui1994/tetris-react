import React, { useState } from 'react';
import data from '../../restaurants';
import RestaurantItem from './RestaurantItem/RestaurantItem';
import './RestaurantList.css';
import Filter from '../Filter/Filter';
import Arrow from '../../UI/Arrow/Arrow';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { v1 } from 'uuid';
import { useEffect } from 'react';
import { API } from 'aws-amplify';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState(data.restaurants.slice(0,6));
    const [userRestaurants, setUserRestaurants] = useState([]);
    const [order, setOrder] = useState(false);
    const [error, setError] = useState(false);

    // const restaurants = updateRestaurantList(data.restaurants, userRestaurants);

    useEffect(() => {
        getRestaurants();
    }, []);

    const getRestaurants = async () => {
        const result = await API.get('restaurants', '/restaurants');
        setUserRestaurants(result);  
        
        updateRestaurantList(data.restaurants, result);
    }

    const updateRestaurantList = (list, userRestaurants) => {
        const restaurantNameList = userRestaurants.map(restaurant => restaurant.restaurantName);
        const updatedRestaurant = list.map(restaurant => {
            if (restaurantNameList.includes(restaurant.name)) {
                return {
                    ...restaurant,
                    like: true,
                    id: userRestaurants.find(el => el.restaurantName === restaurant.name).restaurantId
                };
            } else {
                return restaurant;
            }
        });
        return updatedRestaurant;
    }

    const toggleSortAlphabetically = () => {
        const newOrder = !order;
        const sortedRestaurant = restaurants.sort((a, b) => {
            const restaurantA = a.name.toUpperCase();
            const restaurantB = b.name.toUpperCase();
            if (newOrder) {
                return (restaurantA > restaurantB) ? 1 : (restaurantA < restaurantB) ? -1 : 0;
            } else {
                return (restaurantA > restaurantB) ? -1 : (restaurantA < restaurantB) ? 1 : 0;
            }
        });
        setUserRestaurants(sortedRestaurant);
        setOrder(newOrder);
    }

    const searchRestaurant = searchQuery => {
        if (searchQuery.length !== 0) {
            const searchedRestaurants = data.restaurants.filter(
                restaurant => restaurant.name.toUpperCase().includes(searchQuery.toUpperCase())
            );
            if (searchedRestaurants.length === 0) {
                setError(true);
            } else {
                setError(false);
            }
    
            setRestaurants(searchedRestaurants);
        } else {
            setRestaurants(data.restaurants.slice(0,6));
        }
    }

    const showMoreRestaurants = () => {
        const getRestaurants = data.restaurants.slice(0, restaurants.length + 3);
        setRestaurants(getRestaurants);
    }

    const addUserList = (name, id) => {
        const addedRestaurant = {
            ...restaurants.find(el => el.name === name),
            id,
            like: true
        }
        console.log(userRestaurants);
        const updatedUserRestaurants = userRestaurants.concat(addedRestaurant);
        setUserRestaurants(updatedUserRestaurants);
    }

    const removeUserList = name => {
        userRestaurants.filter(restaurants => restaurants.name !== name);
    }

    return (
        <>
            <Filter sortAlphabetically={toggleSortAlphabetically} searchRestaurant={searchRestaurant}/>
            <div className='RestaurantList'>
                {
                    restaurants.map(restaurant => {
                        return <RestaurantItem
                                    addUserList={addUserList}
                                    removeUserList={removeUserList}
                                    like={restaurant.like}
                                    id={restaurant.id}
                                    key={v1()}
                                    name={restaurant.name} 
                                    city={restaurant.city} 
                                    image={restaurant.image} 
                                    tags={restaurant.tags} 
                                    currency={restaurant.currency}/>
                    })
                }
            </div>
            {error ? <NotFoundPage /> : null}
            {!error ? <Arrow clickHandler={showMoreRestaurants}/> : null}
        </>
    )
}

export default RestaurantList;