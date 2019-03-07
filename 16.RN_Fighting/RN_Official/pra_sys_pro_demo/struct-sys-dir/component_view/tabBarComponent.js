import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native'

import PropTypes from 'prop-types'

let {width, height} = require('Dimensions').get('window')

export default class tabBarComponent extends Component {
    static defaultProps = {
        goToPage: PropTypes.func,
        tabs: PropTypes.array,
        activeTab: PropTypes.number,

        tabNames: PropTypes.array,
        tabIconNames: PropTypes.array
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.tabs.map((tab, index) => {
                    return this.renderItem(tab, index);
                })}
            </View>
        )
    }

    renderItem(tab, index) {

        let style = this.props.activeTab === index ? {color: 'red',fontSize: 18} : {color: '#fff',fontSize: 16}

        return (
            <TouchableOpacity
                style={styles.wrapperStyle}
                activeOpacity={0.6}
                onPress={() => {
                    this.props.goToPage(index)
                }}
                key={index}
            >
                <View style={styles.itemStyle}>
                    <Text style={style}>{this.props.tabNames[index]}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 36,
        width: width,
        backgroundColor: 'gray',
        flexDirection: 'row'
    },
    wrapperStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemStyle: {}
});