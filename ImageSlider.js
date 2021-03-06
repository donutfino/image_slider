import React, { Component } from 'react'
import {
    StyleSheet,
    ListView,
    View,
    TouchableOpacity,
    Image,
    Modal,
    BackHandler,
    ScrollView,
    Alert,
    Animated
} from 'react-native'

import Gallery from 'react-native-image-gallery'

const imagesForGallery = [];
class ImageSlider extends Component {
    constructor(props) {
        super(props)

        this.state =  {
            selectedIndex: 0,
            showModal: false,
            initialPage: 0,
        }

        _scrollView : null
    }

    componentDidMount() {
        for (i = 0; i<this.props.objects.length; i++) {
            imagesForGallery.push({
                source: this.props.objects[i],
                dimensions: { width: 150, height: 150 }
            })
        }
        console.disableYellowBox = true;
    } 

    scrollHandler = (e) => {
    //    Alert.alert("" + e.nativeEvent.contentOffset.x);
    var index = parseInt((e.nativeEvent.contentOffset.x+60)/120, 10);
    var posX = index * 120;
    this._scrollView.getScrollResponder().scrollTo({x: posX, y:0, animated: true});
    }

    render() {
        return (
            <View>
                <ScrollView ref={(view) => this._scrollView = view}
                style={{flexDirection:'row', width: '100%', height: 120}} horizontal={true} 
                showsHorizontalScrollIndicator={false}
                //snapToInterval={120}
                onScrollEndDrag={this.scrollHandler.bind(this)}
                scrollEventThrottle={16}
                >
                {
                    this.props.objects.map((data, index) => {
                        console.disableYellowBox = true;
                        return (this.renderObject(data, index) );
                    })
                }
                </ScrollView>

                <Modal visible={this.state.showModal} transparent={true} onRequestClose={this.hideModal}>
                    <Gallery style={styles.gallery}
                        images={imagesForGallery}
                        index={this.state.selectedIndex}
                        initialPage={this.state.initialPage}
                    />
                    <TouchableOpacity style={styles.closeModal} onPress={() => this.hideModal() }>
                        <Image style={styles.closeImage} source={require("./images/closeButton.png")} />
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }

    renderObject = (rowData, rowIndex) => {
        return (
            <TouchableOpacity onPress={() => this.showModal(rowIndex)}>
                <Image style={styles.item} source={rowData} />
            </TouchableOpacity>
        );
    }

    showModal = (index) => {
        this.setState({
            showModal: true,
            initialPage: index
        });
    }
    
    hideModal = () => {
        this.setState({
            showModal: false,
        });
    }
}

export default ImageSlider;

const styles = {
    container: {
        width: '100%',
        height: 120,
    },
    item: {
        margin: 10,
        width: 100, 
        height: 100,
        resizeMode: 'stretch'
    },
    gallery: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black'
    },
    closeModal: {
        position: 'absolute',
        top: 30,
        left: 30,
        width: 30,
        height: 30,
    },
    closeImage: {
        width: 30,
        height: 30
    }
}
