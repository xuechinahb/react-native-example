//
//  ExampleViewController.m
//  ExampleApp
//
//  Created by evan xue on 22/11/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "ExampleViewController.h"

@interface ExampleViewController ()

@end

@implementation ExampleViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  self.view.backgroundColor = [UIColor whiteColor];
  CGFloat width = [UIScreen mainScreen].bounds.size.width;
  CGFloat height = [UIScreen mainScreen].bounds.size.height;

  UIButton *button = [UIButton buttonWithType:UIButtonTypeSystem];
  button.frame = CGRectMake(width/2 - 40, height/2 - 15, 80, 30);
  [button setTitle:@"Go Back" forState:UIControlStateNormal];
  [button addTarget:self action:@selector(goBack) forControlEvents:UIControlEventTouchDown];
  [self.view addSubview:button];
}

-(void)goBack{
//  [self dismissViewControllerAnimated:YES completion:nil];
  [self.navigationController popViewControllerAnimated:YES];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
