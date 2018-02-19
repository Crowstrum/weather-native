import wind from '../img/weather-icons/Wind.svg';
import sun from '../img/weather-icons/Sun.svg';
import partlyCloud from '../img/weather-icons/Cloud.svg'
export default function(iconName){
    switch(iconName){
        case 'wind':
            return wind;
        case 'partly-cloudy-night':
        case 'partly-cloudy-day':
            return partlyCloud;

        default: return sun;
    }
}