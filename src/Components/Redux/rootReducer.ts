import { combineReducers } from 'redux'
// import BookingReducer from './Booking/BookingReducer'
// import RideReducer from './Ride/RideReducer'
import UserReducer from './User/UserReducer'


const rootReducer = combineReducers({
  // ride:RideReducer,
  // booking:BookingReducer,
  user:UserReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>