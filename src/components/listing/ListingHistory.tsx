import React, {useEffect, useState} from "react";
import Button from "../button/Button";
import ExtraInfoPopUp from "../popUp/ExtraInfoPopUp";
import axios from "axios";
import {BASE_URL, PORT} from "../../utils/constants";
import dayjs from "dayjs";

const ListingHistory = ({listingId, booking, isClient} : {
    listingId: number,
    booking: {
        id: number,
        user_id: number,
        start_date: string,
        end_date: string,
        initial_damage: string,
        final_damage: string,
        price: number,
        extra_fees: number,
        owner: string,
        createdAt: string
    },
    isClient?: Boolean
}) => {
    const [listingData, setListingData] = useState(Object);
    const [client, setClientName] = useState("");

    useEffect(() => {
        axios.get(BASE_URL + ':' + PORT + `/api/listings/get/${listingId}`)
            .then(res => setListingData(res.data))
            .catch(e => alert(e.response.data.message));
    }, []);

    useEffect(() => {
        axios.get(BASE_URL + ':' + PORT + `/api/users/get/${booking.user_id}`)
            .then(res => setClientName(res.data.name))
            .catch(e => alert(e.response.data.message));
    })

    let additionalDamage = booking.initial_damage === booking.final_damage ? "none" : booking.final_damage;
    let bookedDays = dayjs(booking.end_date).diff(dayjs(booking.start_date),"day")

    return(
        <div style={{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            background:"white",
            borderRadius:30,
            paddingRight:16,
            paddingLeft:16,
            marginBottom:16
        }}>
            <div>
                <h3>{listingData.title}</h3>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <p>
                    <strong>{booking.start_date.split('T')[0]}</strong> to <strong>{booking.end_date.split('T')[0]}</strong>
                </p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <p>
                    Total cost: {booking.price * bookedDays + booking.extra_fees}
                </p>
            </div>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                {isClient ? (
                    <ExtraInfoPopUp title={listingData.title} rate={listingData.price} owner={booking.owner} dateOfReservation={booking.createdAt.split('T')[0]} prevDamage={listingData.damage} finalPrice={booking.price * bookedDays + booking.extra_fees} additionalDamage={additionalDamage} isClient={true} bookingId={booking.id}/>
                ) : (
                    <div>
                        <ExtraInfoPopUp title={listingData.title} rate={listingData.price} client={client} dateOfReservation={booking.createdAt.split('T')[0]} prevDamage={listingData.damage} finalPrice={booking.price * bookedDays + booking.extra_fees} additionalDamage={additionalDamage} isClient={false} bookingId={booking.id}/>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListingHistory;
