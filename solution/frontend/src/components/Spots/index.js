import { useSelector, useDispatch } from 'react-redux';
import { getSpots } from '../../store/spots';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Spots() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpots())
    }, [])

    const spots = useSelector(store => store.spotReducer);
    const spotsArr = Object.values(spots);

    return (
        <>
            <h1>spots!</h1>
        </>
    )
}
