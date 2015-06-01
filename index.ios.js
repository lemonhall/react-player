/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React           = require('react-native');
var AVPlayerManager = require('NativeModules').AVPlayerManager;
var Icon            = require('FAKIconImage');

var {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} = React;

var AwesomeProject = React.createClass({

  onPressPlay: function () {
      var mediaUrl = "http://mr3.douban.com/201506011724/a59a6e0872624ef35add616602156924/view/song/small/p2120606.mp3";
      AVPlayerManager.playMedia(mediaUrl);
  },

  onPressPause : function() {
    AVPlayerManager.pause();
  },

  render: function() {
    var playerButton;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          My Way
        </Text>
        <View style={styles.button}>
        <TouchableOpacity onPress={() => this.onPressPlay()}>
              <Icon
                name='fontawesome|fast-backward'
                size={30}
                color='#000000'
                style={styles.facebook}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onPressPlay()}>
              <Icon
                name='fontawesome|play'
                size={30}
                color='#000000'
                style={styles.facebook}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onPressPause()}>
              <Icon
                name='fontawesome|pause'
                size={30}
                color='#000000'
                style={styles.facebook}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onPressPlay()}>
              <Icon
                name='fontawesome|fast-forward'
                size={30}
                color='#000000'
                style={styles.facebook}/>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button:{
    alignItems: 'center',
    flexDirection:'row'
  },
  smallIcon: {
    height: 20,
    width: 20
  },
  facebook:{
    height: 40,
    width: 40
  },
});


AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

