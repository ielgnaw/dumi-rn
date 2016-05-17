'use strict';
var styles = require('../styles');
var React = require('react-native');
var ListItem = require('./ListItem');
var { ListView } = React;


class List extends React.Component {

    componentWillMount() {
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
    }

    render() {
        var dataSource = this.dataSource.cloneWithRows(this.props.items);
        return (
            <ListView
                dataSource={dataSource}
                renderRow={
                    (rowData, sectionID, rowID) =>
                        <ListItem item={rowData}
                            onPress={() => this.props.onPressItem(rowData, rowID)}
                            onLongPress={() => this.props.onLongPressItem(rowData, rowID)} />
                }
                style={styles.listView}/>
        );
    }

}


module.exports = List;
