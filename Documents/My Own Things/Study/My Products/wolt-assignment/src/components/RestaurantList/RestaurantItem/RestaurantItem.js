import React from 'react';
import styles from './RestaurantItem.module.css';
import { useState } from 'react';
import { API } from 'aws-amplify';

const RestaurantItem = ({ name, city, image, tags, currency, like, addUserList, removeUserList }) => {
    const [likeStatus, setLikeStatus] = useState(like);
    const [id, setId] = useState('');

    const handleLikeRestaurant = async () => {
        if (!likeStatus) {
            try {
                const restaurant = await API.post("restaurants", "/restaurants", {
                    body: {
                        restaurantName: name,
                        attachment: image
                    }
                });
                setId(restaurant.restaurantId);

                // addUserList(name, id);
            } catch (e) {
                console.log(e.message);
            }
        } else {
            try {
                await API.del("restaurants", `/restaurants/${id}`);
                removeUserList(name);
            } catch (e) {
                console.log(e.message);
            }
        }
        setLikeStatus(!likeStatus);
    }

    return(    
        <div className={styles.RestaurantItem} onClick={() => handleLikeRestaurant()}>
            <div className={styles.coverPhoto} style={{ backgroundImage: `url(${image})` }}/>
            <div className={styles.restaurantName}>
                <div className={styles.name}>{name}</div>
                <div className={styles.city}>{city}</div>
                <div className={styles.likeIcon}>
                    {likeStatus ? <ion-icon name="heart"></ion-icon> : <ion-icon name="heart-outline"></ion-icon> }
                </div> 
            </div>
            <div className={styles.description}>
                <div>{currency}</div>
                <div>
                    {
                        tags.join(', ')
                    }
                </div>
            </div>
        </div> 
    )
};

export default RestaurantItem;