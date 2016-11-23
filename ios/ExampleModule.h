//
//  ExampleModule.h
//  ExampleApp
//
//  Created by evan xue on 22/11/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"
@interface ExampleModule : NSObject<RCTBridgeModule>
@property (nonatomic, strong) NSString *contactName;
@property (nonatomic, strong) NSString *contactPhoneNumer;
@end
