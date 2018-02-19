import React from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {Text, StyleSheet, View} from "react-native";
import weatherIconUtility from '../../utility/weatherIcon';
import SvgUri from 'react-native-svg-uri';
import Moment from 'moment';
import PropTypes from 'prop-types';
export const CurrentWeather = ({currentTemp,currentTime,currentSummary,weatherIcon,humidity,precip,wind}) => (
    <Grid>
        <Col style={styles.container}>
            <Row size={10} style={styles.timeRow}>
                <Text style={styles.timeText}>{Moment.unix(currentTime).format('dddd')}</Text>
            </Row>
            <Row size={60} style={styles.tempRow}>
                <Col>
                <Text style={styles.currentTempText}>{Math.round(currentTemp)}°</Text>
                </Col>
                <Col style={styles.weatherIconContainer}>
                    <SvgUri width={150} height={150} source={weatherIconUtility(weatherIcon)}/>
                    <Text style={styles.currentSummaryText}>{currentSummary}</Text>
                </Col>
            </Row>
            <Row size={30} style={styles.weatherStatsRow}>
                <Col style={styles.weatherStatsContainer}>
                    <Row><Text style={styles.weatherStatsNumber}>{Math.round(humidity * 100)}%</Text></Row>
                    <Row><Text style={styles.weatherStatsText}>Humidity</Text></Row>
                </Col>
                <Col style={styles.weatherStatsContainer}>
                    <Row><Text style={styles.weatherStatsNumber}>{Math.round(precip * 100)}%</Text></Row>
                    <Row><Text style={styles.weatherStatsText}>Precipitation</Text></Row>
                </Col>
                <Col style={styles.weatherStatsContainer}>
                    <Row><Text style={styles.weatherStatsNumber}>{Math.round(wind)}</Text></Row>
                    <Row><Text style={styles.weatherStatsText}>Wind Speed</Text></Row>
                </Col>
            </Row>
        </Col>
    </Grid>
);
CurrentWeather.propTypes = {
    currentTemp: PropTypes.number,
    currentSummary: PropTypes.string,
    currentTime: PropTypes.number,
    weatherIcon: PropTypes.string,
    humidity: PropTypes.number,
    precip: PropTypes.number,
    wind: PropTypes.number
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white'
    },
    weatherIconContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: -30
    },
    timeRow: {
        marginTop: '15%',
    },
    timeText: {
        fontSize: 30,
        color: '#4f4f4f'
    },
    currentTempText: {
        fontSize: 95,
        color: 'black',
        marginLeft: 30,
    },
    currentSummaryText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginTop: -35
    },
    tempRow: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    weatherStatsRow: {
        backgroundColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    weatherStatsText: {
        color: 'white',
        fontSize: 16
    },
    weatherStatsNumber: {
        color: 'white',
        fontSize: 35,
        paddingTop: 15,
        fontWeight: 'bold'
    },
    weatherStatsContainer: {
        alignItems:'center'
    }
});