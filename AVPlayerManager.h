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
