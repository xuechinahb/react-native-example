//
//  ExampleModule.m
//  ExampleApp
//
//  Created by evan xue on 22/11/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "ExampleModule.h"
#import "ReadContactViewController.h"
#import "ExampleViewController.h"

@interface ExampleModule()

@property (nonatomic, strong) NSDictionary *dict;

@end

@implementation ExampleModule
-(NSString *)contactName{
  if (!_contactName) {
    return @"";
  }
  return _contactName;
}

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(sendMessage : (NSString *)msg){
  NSLog(@"receive msg from react native：%@", msg);
  NSData *data = [msg dataUsingEncoding:NSUTF8StringEncoding];
  NSError *error;
  NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingMutableLeaves error:&error];
  if (error != nil) {
    NSLog(@"error：%@", error);
  }
  
  NSString *login = dict[@"msgType"];
  if ([login isEqualToString:@"pickContact"]) {
    [self callAddress];
  }
  
}
//RCT_EXPORT_METHOD(sendMessage : (NSDictionary *)msg){
//  NSLog(@"receive msg from react native：%@", msg);
//
//}
- (dispatch_queue_t)methodQueue{
  return dispatch_get_main_queue();
}

-(void)callAddress{
  UIViewController *controller = (UIViewController *)[[[UIApplication sharedApplication]keyWindow] rootViewController];
  ReadContactViewController *contactViewController = [ReadContactViewController new];
  [controller presentViewController:contactViewController animated:YES completion:nil];
  self.contactName = contactViewController.contactName;
  self.contactPhoneNumer = contactViewController.contactPhoneNumber;
  [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(calendarEventReminderReceived:) name:@"Num" object:nil];
}

-(void)calendarEventReminderReceived:(NSNotification *)notification{
  self.contactPhoneNumer = notification.object;
  self.contactName = notification.userInfo[@"name"];
  self.contactPhoneNumer = [self.contactPhoneNumer stringByReplacingOccurrencesOfString:@"-" withString:@""];
  self.contactPhoneNumer = [self.contactPhoneNumer stringByReplacingOccurrencesOfString:@"(" withString:@""];
  self.contactPhoneNumer = [self.contactPhoneNumer stringByReplacingOccurrencesOfString:@")" withString:@""];
  self.contactPhoneNumer = [self.contactPhoneNumer stringByReplacingOccurrencesOfString:@" " withString:@""];
  
  NSMutableDictionary *dict = [NSMutableDictionary new];
  dict[@"msgType"] = @"pickContactResult";
  if (!self.contactPhoneNumer) {
    self.contactPhoneNumer = @"";
  }
  dict[@"phoneNumber"] = self.contactPhoneNumer;
  if (!self.contactName) {
    self.contactName = @"";
  }
  dict[@"displayName"] = self.contactName;
  self.dict = [dict copy];
  NSError *error;
  NSData *data = [NSJSONSerialization dataWithJSONObject:self.dict options:0 error:&error];
  NSString *str = [[NSString alloc]initWithData:data encoding:NSUTF8StringEncoding];
  [self.bridge.eventDispatcher sendAppEventWithName:@"NativeModuleMsg" body:@{@"message": str}];
  
}

//pragma mark - promise
RCT_REMAP_METHOD(promiseEvent,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSError *error = [[NSError alloc]initWithDomain:@"error domain" code:404 userInfo:@{@"key":@"value"}];
  BOOL flag = 1+1;
  if (flag) {
    resolve(@"promise success");
  } else {
    reject(@"code", @"promise fail", error);
  }
}
//pragma mark - callback
RCT_EXPORT_METHOD(callbackEvent:(RCTResponseSenderBlock)callback){
  NSLog(@"%s", __FUNCTION__);
  callback(@[@"callback msg"]);
}

RCT_EXPORT_METHOD(openNativeView: (NSString *)msg{
//  UIViewController *controller = (UIViewController *)[[[UIApplication sharedApplication]keyWindow] rootViewController];
//  ExampleViewController *exmapleViewController = [ExampleViewController new];
//  [controller presentViewController:exmapleViewController animated:YES completion:nil];
  UINavigationController *navigationController = (UINavigationController *)[[[UIApplication sharedApplication]keyWindow] rootViewController];
  ExampleViewController *exmapleViewController = [ExampleViewController new];
  [navigationController pushViewController:exmapleViewController animated:YES];

  
})

//pragma mark - 导出常量
-(NSDictionary *)constantsToExport{
  return @{@"contantName":@"constantValue"};
}
@end
