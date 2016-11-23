//
//  ReadContactViewController.m
//  ExampleApp
//
//  Created by evan xue on 22/11/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "ReadContactViewController.h"
@import AddressBook;
@import AddressBookUI;
@interface ReadContactViewController ()<ABPeoplePickerNavigationControllerDelegate>

@end

@implementation ReadContactViewController


- (void)viewDidLoad {
  [super viewDidLoad];
  self.view.backgroundColor = [UIColor whiteColor];
  
  
  ABPeoplePickerNavigationController *peoplePicker = [[ABPeoplePickerNavigationController alloc] init];
  peoplePicker.peoplePickerDelegate = self;
  
  [self presentViewController:peoplePicker animated:YES completion:nil];
  
  
  [self authoriy];
  
}

- (void)authoriy{
  
  if (&ABAddressBookRequestAccessWithCompletion != NULL) {
    ABAddressBookRef abRef = ABAddressBookCreateWithOptions(NULL, NULL);
    if (ABAddressBookGetAuthorizationStatus() == kABAuthorizationStatusNotDetermined) {
      ABAddressBookRequestAccessWithCompletion(abRef, ^(bool granted, CFErrorRef error) {
        if (granted) {
          [self getContacts];
        }
      });
    }else if (ABAddressBookGetAuthorizationStatus() == kABAuthorizationStatusAuthorized){
      [self getContacts];
    }else{
      UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"提示" message:@"请您允许APP访问您的通讯录\n设置>通用>访问权限" delegate:self cancelButtonTitle:@"" otherButtonTitles:nil, nil];
      [alert show];
      return;
    }
    if (abRef) {
      CFRelease(abRef);
    }
  }
}

- (void)getContacts{
  
  ABAddressBookRef addressBook = ABAddressBookCreateWithOptions(NULL, NULL);
  CFArrayRef allPerson = ABAddressBookCopyArrayOfAllPeople(addressBook);
  CFIndex number = ABAddressBookGetPersonCount(addressBook);
  for (NSInteger i = 0; i < number; i ++) {
    ABRecordRef people = CFArrayGetValueAtIndex(allPerson, i);
    NSString *firstName = (__bridge NSString *)(ABRecordCopyValue(people, kABPersonFirstNameProperty));
    NSString *middleName = (__bridge NSString *)(ABRecordCopyValue(people, kABPersonMiddleNameProperty));
    NSString *lastName = (__bridge NSString *)(ABRecordCopyValue(people, kABPersonLastNameProperty));
    NSString *nameString  = nil;
    if (firstName.length != 0) nameString = firstName;
    if (middleName.length != 0) nameString = [nameString stringByAppendingString:middleName];
    if (lastName.length != 0) nameString = [nameString stringByAppendingString:lastName];
    //         if (firstName.length == 0 || lastName.length == 0) nameString = firstName ? [NSString stringWithFormat:@"%@%@" , firstName(lastName ? lastName : @"") ] : @"";
    //    nameString = middleName.length ?  [NSString stringWithFormat:@"%@%@%@", lastName, middleName, firstName] : [NSString stringWithFormat:@"%@%@", lastName, firstName];
    NSLog(@"name：%@", nameString);
    ABMutableMultiValueRef phoneMutil = ABRecordCopyValue(people, kABPersonPhoneProperty);
    NSMutableArray *phones = [[NSMutableArray alloc] init];
    for (int  i = 0; i < ABMultiValueGetCount(phoneMutil); i ++) {
      //            NSString *phone = (__bridge NSString *)(ABMultiValueCopyValueAtIndex(phoneMutil, i));
      NSString *phoneLabel = (__bridge NSString *)(ABMultiValueCopyLabelAtIndex(phoneMutil, i));
      //            if (phone.length  <  11) {
      //                break;
      //            }
      if ([phoneLabel isEqualToString:@"_$!<Mobile>!$_"]) {
        [phones addObject:(__bridge id _Nonnull)(ABMultiValueCopyValueAtIndex(phoneMutil, i))];
      }else{
        [phones addObject:(__bridge id _Nonnull)(ABMultiValueCopyValueAtIndex(phoneMutil, i))];
      }
    }
    for (int  i = 0; i < phones.count; i ++) {
      NSLog(@"phone%d：%@", i+1, phones[i]);
    }
  }
}




- (void)peoplePickerNavigationControllerDidCancel:(ABPeoplePickerNavigationController *)peoplePicker{
  [self dismissViewControllerAnimated:YES completion:^{
    [self dismissViewControllerAnimated:YES completion:nil];
  }];
}



- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}

- (void)peoplePickerNavigationController:(ABPeoplePickerNavigationController*)peoplePicker didSelectPerson:(ABRecordRef)person NS_AVAILABLE_IOS(8_0){
  
  CFStringRef anFullName = ABRecordCopyCompositeName(person);
  
  
  ABMultiValueRef phones = ABRecordCopyValue(person,kABPersonPhoneProperty);
  NSString *phone  = nil;
  for (int i = 0; i < ABMultiValueGetCount(phones); i++) {
    phone = (__bridge NSString *)(ABMultiValueCopyValueAtIndex(phones, i));
    NSLog(@"telephone = %@",phone);
  }
  self.contactPhoneNumber = phone;
  self.contactName = (__bridge NSString *)(anFullName);
  
  
  [[NSNotificationCenter defaultCenter] postNotificationName:@"Num" object:self.contactPhoneNumber userInfo: @{@"name" : self.contactName}];
  
  NSLog(@"%@ %@", self.contactPhoneNumber, self.contactName);
  
  
  [peoplePicker dismissViewControllerAnimated:YES completion:^{
    [self dismissViewControllerAnimated:YES completion:nil];
  }];
  
}


- (void)peoplePickerNavigationController:(ABPeoplePickerNavigationController *)peoplePicker didSelectPerson:(ABRecordRef)person property:(ABPropertyID)property identifier:(ABMultiValueIdentifier)identifier {
  [self peoplePickerNavigationController:peoplePicker shouldContinueAfterSelectingPerson:person property:property identifier:identifier];
  
  
  NSString *contactName = CFBridgingRelease(ABRecordCopyCompositeName(person));
  self.contactName = [NSString stringWithFormat:@"%@", contactName ? contactName : @"No Name"];
  
  
  ABMultiValueRef phoneRecord = ABRecordCopyValue(person, kABPersonPhoneProperty);
  CFStringRef phoneNumber = ABMultiValueCopyValueAtIndex(phoneRecord, 0);
  self.contactPhoneNumber = (__bridge_transfer NSString *)phoneNumber;
  CFRelease(phoneRecord);
  
  [self dismissViewControllerAnimated:YES completion:nil];
  
}



-(BOOL)peoplePickerNavigationController:(ABPeoplePickerNavigationController *)peoplePicker
     shouldContinueAfterSelectingPerson:(ABRecordRef)person property:(ABPropertyID)property
                             identifier:(ABMultiValueIdentifier)identifier
{
  [self dismissViewControllerAnimated:YES completion:nil];
  return NO; }

@end
