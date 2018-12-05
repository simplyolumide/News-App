
/*
 Simple React Native 
 TopNews from bbc
*/


import React, { Component } from 'react';
import { Text, FlatList, Linking, View } from 'react-native';
import { Header, List, ListItem } from "react-native-elements";

import "@expo/vector-icons";

export default class NewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this._executeQuery()
    }

    _executeQuery = () => {
        fetch('https://newsapi.org/v2/top-headlines?country=ng&category=business&apiKey=89d13920648444ad98d65e1c19ba2346')
            .then(response => response.json())
            .then(json => this.setState({ data: json.articles }))
            .catch(error => console.log(error));
    };

    _onPressItem = (url) => {
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    };

    _keyExtractor = (item, index) => index;

    render() {
        return (
            <View>
                <Header
                    statusBarProps={{ barStyle: 'light-content' }}
                    centerComponent={{ text: 'Latest Nigeria News', style: { color: '#fff'} }}
                    outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
                    innerContainerStyles={{ justifyContent: 'space-around',}}
                />
            <List >
                <FlatList
                keyExtractor={this._keyExtractor}
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            roundAvatar
                            title={item.title}
                            subtitle={item.description}
                            titleNumberOfLines={0}
                            subtitleNumberOfLines={0}
                            avatar={{ uri: item.urlToImage }}
                            onPress={() => this._onPressItem(item.url)}
                        />
                    )}
                />
            </List>
            </View>
        );
    }
}