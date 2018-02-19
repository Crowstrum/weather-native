import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchRequiredData} from '../../modules/weather';
import { Row, Grid } from 'react-native-easy-grid';
import {CurrentWeather} from '../../components/current-weather/index';

class WeatherContainer extends React.Component {
    componentDidMount(){
        this.props.fetchData();
    }
    render(){
        return(
                <Grid>
                    <Row size={1} style={{backgroundColor: '#031c29'}}>
                        {this.props.isLoading
                            ? <Text>Loading...</Text>
                            : <CurrentWeather
                                currentTemp={this.props.weather.temperature}
                                currentTime={this.props.weather.time}
                                currentSummary={this.props.weather.summary}
                                weatherIcon={this.props.weather.icon}
                                humidity={this.props.weather.humidity}
                                precip={this.props.weather.precipProbability}
                                wind={this.props.weather.windSpeed}
                            />}
                    </Row>
                    <Row size={1}/>
                </Grid>
        )
    }
}

WeatherContainer.propTypes = {
    weather: PropTypes.object,
    isLoading: PropTypes.boolean,
    fetchData: PropTypes.func
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: "#c3c3c3",
    }
});

const mapStateToProps = state => {
    return{
        isLoading: state.weather.isLoading,
        weather: state.weather.currentWeather
    }
};

const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch(fetchRequiredData()),
});

export default connect(mapStateToProps,mapDispatchToProps)(WeatherContainer);
