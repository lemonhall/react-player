1、构建工程
react-native init AwesomeProject


=================================================================

2、加入ICON

2.1
npm install react-native-icons@latest --save

2.2
工程中找到Libraries子目录，对着这个目录右键，然后点击
Add Files to [your project's name]

node_modules ➜ react-native-icons➜ ios and add ReactNativeIcons.xcodeproj

引入库文件

2.3
到主工程文件的Build Phases选项夹
然后看Link Binary With Libraries
加入libReactNativeIcons.a静态链接

2.4 
将字体文件夹加入到Copy Bundle Resources阶段
具体目录为：
node_modules/react-native-icons/ios/ReactNativeIcons/Libraries/FontAwesomeKit

记得，你需呀拷贝的是具体的字体文件，不是整个目录

2.5
var Icon            = require('FAKIconImage');

var AwesomeProject = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          My Way
        </Text>
        <Icon
          name='fontawesome|play'
          size={30}
          color='#3b5998'
          style={styles.facebook}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  smallIcon: {
    height: 20,
    width: 20
  },
  facebook:{
    height: 60,
    width: 60
  },
});

=================================================================

3. 按键可点击

要在index.io.js的开头的那个引用里加上

  TouchableHighlight,
  TouchableOpacity,


        <TouchableOpacity onPress={() => this.onPressPause()}>
              <Icon
                name='fontawesome|play'
                size={30}
                color='#3b5998'
                style={styles.facebook}/>
        </TouchableOpacity>

绑定事件


然后呢

在该类当中加入处理事件的具体代码：
比如

  onPressPause: function () {
      var mediaUrl = "http://mr3.douban.com/201506011724/a59a6e0872624ef35add616602156924/view/song/small/p2120606.mp3";
      setTimeout(function(){
          AVPlayerManager.playMedia(mediaUrl);
      },1000);
  },

=================================================================

4. 引用原生模块


这里的原生模块即播放器

首先参考链接为：https://facebook.github.io/react-native/docs/nativemodulesios.html#content


----------------------------------------------------------------------------------------------------

4.1 添加实际运行程序，暴露原生程序到js

//
//  AVPlayerManager.m
//  AwesomeProject
//
//  Created by Hall Lemon on 15/6/1.
//  Copyright (c) 2015年 Facebook. All rights reserved.
//

#import "AVPlayerManager.h"
#import "RCTConvert.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"


@implementation AVPlayerManager

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(playMedia:(NSString *)mediaUrl)
{
  NSURL *urlStream = [NSURL URLWithString:mediaUrl];
  self.player = [AVPlayer playerWithURL:urlStream];
  [[NSNotificationCenter defaultCenter]
   addObserver:self
   selector:@selector(playerItemDidReachEnd:)
   name:AVPlayerItemDidPlayToEndTimeNotification
   object:[self.player currentItem]];
  [self.player play];
  RCTLogInfo(@"Play media from %@", urlStream);
  __unsafe_unretained typeof(self) weakSelf = self;
  [self.player addPeriodicTimeObserverForInterval:CMTimeMake(1, 1) queue:NULL usingBlock:^(CMTime time) {
    
    if (!weakSelf.bridge) {
      return;
    }
    RCTLogInfo(@"Current media playback: %f", CMTimeGetSeconds(time));
    [weakSelf.bridge.eventDispatcher sendDeviceEventWithName:@"UpdatePlaybackTime"
                                                        body:@{@"iCurrentTime": @(CMTimeGetSeconds(time))}];
  }];
}


- (void)playerItemDidReachEnd:(NSNotification *)notification {
  RCTLogInfo(@"Media ended: %@", notification);
  [self.bridge.eventDispatcher sendDeviceEventWithName:@"UpdatePlaybackTime"
                                                  body:@{@"iCurrentTime": @(0)}];
}


RCT_EXPORT_METHOD(pause)
{
  //  If AVPlayer is playing
  if (self.player.rate > 0) {
    [self.player pause];
  }
}

RCT_EXPORT_METHOD(unpause)
{
  //  If AVPlayer is playing
  if (self.player.rate == 0) {
    [self.player play];
  }
}

@end

----------------------------------------------------------------------------------------------------

4.2 添加header文件

//
//  AVPlayerManager.h
//  AwesomeProject
//
//  Created by Hall Lemon on 15/6/1.
//  Copyright (c) 2015年 Facebook. All rights reserved.
//

#import <AVFoundation/AVFoundation.h>
#import "RCTBridgeModule.h"
#import "RCTLog.h"

@interface AVPlayerManager : NSObject  <RCTBridgeModule>
@property (nonatomic) AVPlayer *player;

@end

----------------------------------------------------------------------------------------------------

4.3 js当中调用

var AVPlayerManager = require('NativeModules').AVPlayerManager;

  onPressPause: function () {
      var mediaUrl = "http://mr3.douban.com/201506011724/a59a6e0872624ef35add616602156924/view/song/small/p2120606.mp3";
      setTimeout(function(){
          AVPlayerManager.playMedia(mediaUrl);
      },1000);
  },

----------------------------------------------------------------------------------------------------



=================================================================


5. 排版问题

横向排版，某种什么flex模型吧


flexDirection

  button:{
    alignItems: 'center',
    flexDirection:'row'
  },


================================================================= 


